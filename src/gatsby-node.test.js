import { transformExifToNodeData } from './common';

test('test DMS to DD conversion', () => {
  const input = {
    gps: {
      GPSLongitude: [8, 53, 48.15],
      GPSLongitudeRef: 'E',
      GPSLatitude: [47, 33, 55.42],
      GPSLatitudeRef: 'N'
    }
  }

  expect(transformExifToNodeData(input)).toStrictEqual({
    raw: input,
    meta: {
      dateTaken: undefined
    },
    gps: {
      longitude: 8.896708333333333,
      latitude: 47.56539444444444
    }
  });
});

test('empty coordinates', () => {
  const input = {};
  expect(transformExifToNodeData(input)).toStrictEqual({
    raw: input,
    meta: {
      dateTaken: undefined
    },
    gps: {
      longitude: null,
      latitude: null
    }
  })
});

test('metadata extraction', () => {
  const input = { exif: { DateTimeOriginal: 961198800 } };
  expect(transformExifToNodeData(input)).toStrictEqual({
    raw: input,
    meta: {
      dateTaken: input.exif.DateTimeOriginal
    },
    gps: {
      longitude: null,
      latitude: null
    }
  });
});
