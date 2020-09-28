import { read } from 'fast-exif';
import { transformExifToNodeData } from './common';

export function onCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions;
  if (node.internal.type === 'ImageSharp') {
    const parent = getNode(node.parent);

    read(parent.absolutePath)
      .then(exifData => {
        if (!exifData) {
          console.warn(`Could not read exif of ${parent.absolutePath}`);
          return;
        }

        createNodeField({
          node,
          name: 'exif',
          value: transformExifToNodeData(exifData)
        });
      })
      .catch(err => console.error(err));
  }
}
