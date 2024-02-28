import { read } from 'fast-exif';
import fg from 'fast-glob';
import { once } from 'lodash';
import { transformExifToNodeData } from './common';
import { cwd } from 'process';

export function pluginOptionsSchema({ Joi }) {
  return Joi.object({
    includes: Joi.array().items(Joi.string()),
    excludes: Joi.array().items(Joi.string()),
  });
}

let includeImageListAsync = null;
let excludeImageListAsync = null;

function globQuery(globPatterns) {
  if (globPatterns?.length) {
    return fg.glob(globPatterns, {
      absolute: true,
      onlyFiles: true,
      unique: true,
      baseNameMatch: true,
      dot: true,
    });
  } else {
    return Promise.resolve([]);
  }
}

const getAllImages = once((includes, excludes) => {
  includeImageListAsync = globQuery(includes);
  excludeImageListAsync = globQuery(excludes);
});

async function processExif(absolutePath, createNodeField, node) {
  try {
    const exifData = await read(absolutePath);

    if (!exifData) {
      console.warn(`Could not read exif of ${absolutePath}`);
      return;
    }

    createNodeField({
      node,
      name: 'exif',
      value: transformExifToNodeData(exifData),
    });
  } catch (err) {
    throw err;
  }
}

export async function onCreateNode(
  { node, getNode, actions },
  { includes = [], excludes = [] }
) {
  const { createNodeField } = actions;
  if (node.internal.type === 'ImageSharp') {
    const parent = getNode(node.parent);
    try {
      if (includes?.length || excludes?.length) {
        getAllImages(includes, excludes);

        const includeImageList = await includeImageListAsync;
        const excludeImageList = await excludeImageListAsync;

        if (
          includeImageList.includes(parent.absolutePath) &&
          !excludeImageList.includes(parent.absolutePath)
        ) {
          await processExif(parent.absolutePath, createNodeField, node);
        }
      } else {
        await processExif(parent.absolutePath, createNodeField, node);
      }
    } catch (err) {
      console.warn(`Could not read exif of ${parent.absolutePath}`);
      console.error(err);
    }
  }
}
