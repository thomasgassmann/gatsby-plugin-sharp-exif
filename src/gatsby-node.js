import { read } from 'fast-exif';

export function onCreateNode({ node, getNode, actions }) {
    const { createNodeField } = actions;
    if (node.internal.type === 'ImageSharp') {
        const parent = getNode(node.parent);

        read(parent.absolutePath)
            .then((exifData) => {
                createNodeField({
                    node,
                    name: 'exif',
                    value: {
                        ...exifData
                    }
                });
            })
            .catch((err) => console.error(err));
    }
}
