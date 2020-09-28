function convertDMSToDD(dms, positiveDirection) {
  const res = dms
    .map((item, i) => {
      return item / Math.pow(60, i);
    })
    .reduce((a, b) => a + b);
  return positiveDirection ? res : -res;
}

export function transformExifToNodeData(exifData) {
  const gps = { longitude: null, latitude: null };

  if (
    exifData.gps &&
    exifData.gps.GPSLongitude &&
    exifData.gps.GPSLatitude
  ) {
    gps.longitude = convertDMSToDD(
      exifData.gps.GPSLongitude,
      exifData.gps.GPSLongitudeRef === 'E'
    );
    gps.latitude = convertDMSToDD(
      exifData.gps.GPSLatitude,
      exifData.gps.GPSLatitudeRef === 'N'
    );
  }

  return {
    gps,
    meta: {
      dateTaken: exifData?.exif?.DateTimeOriginal
    },
    raw: exifData
  };
}