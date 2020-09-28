"use strict";

exports.__esModule = true;
exports.transformExifToNodeData = transformExifToNodeData;

function convertDMSToDD(dms, positiveDirection) {
  var res = dms.map(function (item, i) {
    return item / Math.pow(60, i);
  }).reduce(function (a, b) {
    return a + b;
  });
  return positiveDirection ? res : -res;
}

function transformExifToNodeData(exifData) {
  var _exifData$exif;

  var gps = {
    longitude: null,
    latitude: null
  };

  if (exifData.gps && exifData.gps.GPSLongitude && exifData.gps.GPSLatitude) {
    gps.longitude = convertDMSToDD(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef === 'E');
    gps.latitude = convertDMSToDD(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef === 'N');
  }

  return {
    gps: gps,
    meta: {
      dateTaken: exifData === null || exifData === void 0 ? void 0 : (_exifData$exif = exifData.exif) === null || _exifData$exif === void 0 ? void 0 : _exifData$exif.DateTimeOriginal
    },
    raw: exifData
  };
}