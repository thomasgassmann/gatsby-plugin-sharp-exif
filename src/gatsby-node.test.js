import { transformExifToNodeData } from './gatsby-node';

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
      longitude: 9.284583333333332,
      latitude: 48.01183333333333
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
