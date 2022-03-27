import exifr from "exifr";

export function transformExifToNodeData(exifData) {
  const gps = { longitude: null, latitude: null };
  if (exifData.longitude && exifData.latitude) {
    gps.longitude = exifData.longitude;
    gps.latitude = exifData.latitude;
  }

  return {
    gps,
    meta: {
      dateTaken: exifData?.DateTimeOriginal,
      keywords: exifData?.Keywords || [],
    },
    raw: exifData,
  };
}

export function extractExifData(absolutePath) {
  return exifr.parse(absolutePath, true).then((exifData) => {
    return transformExifToNodeData(exifData);
  });
}

