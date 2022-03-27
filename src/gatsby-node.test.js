import { transformExifToNodeData } from './common';
import {extractExifData} from "./gatsby-node";

test('empty coordinates', () => {
  const input = {};
  expect(transformExifToNodeData(input)).toStrictEqual({
    raw: input,
    meta: {
      dateTaken: undefined,
      keywords: []
    },
    gps: {
      longitude: null,
      latitude: null
    }
  })
});

test('metadata extraction', () => {
  const input = { DateTimeOriginal: 961198800 };
  expect(transformExifToNodeData(input)).toStrictEqual({
    raw: input,
    meta: {
      dateTaken: input.DateTimeOriginal,
      keywords: [],
    },
    gps: {
      longitude: null,
      latitude: null
    }
  });
});

test('extract keywords', async () => {
  const exifData = await extractExifData("./__tests__/keywords.jpg");
  expect(exifData.gps).toStrictEqual({
    longitude: -90.12923333333333, latitude: 29.92095
  })
  expect(exifData.meta.keywords).toEqual(["new orleans", "tree"]);
})

test('do not fail with empty metadata', async () => {
  const exifData = await extractExifData("./__tests__/no-metadata.jpg");
  expect(exifData.meta.keywords).toEqual([]);
})
