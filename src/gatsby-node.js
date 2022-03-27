import { transformExifToNodeData } from './common';
import exifr from "exifr";

export function extractExifData (absolutePath) {
  return exifr.parse(absolutePath, true).then((exifData) => {
    return transformExifToNodeData(exifData)
  })
}

export function onCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions;
  if (node.internal.type === 'ImageSharp') {
    const parent = getNode(node.parent);

    extractExifData(parent.absolutePath)
      .then(nodeData => {
        createNodeField({
          node,
          name: 'exif',
          value: nodeData
        });
      })
      .catch(err => console.error(err));
  }
}
