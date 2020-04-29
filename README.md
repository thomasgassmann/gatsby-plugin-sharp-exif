# gatsby-plugin-sharp-exif

[![npm](https://img.shields.io/npm/v/gatsby-plugin-sharp-exif)](https://www.npmjs.com/package/gatsby-plugin-sharp-exif) ![GitHub](https://img.shields.io/github/license/thomasgassmann/gatsby-plugin-sharp-exif) ![](https://github.com/thomasgassmann/gatsby-plugin-sharp-exif/workflows/release/badge.svg)

Gatsby Plugin to extract EXIF data from images, compatible with gatsby-plugin-sharp

## Install

Install `gatsby-plugin-sharp-exif`...

...using [`yarn`](https://yarnpkg.com/en/package/jest):

```bash
yarn add --dev jest
```

...or [`npm`](https://www.npmjs.com/):

```bash
npm install --save-dev jest
```

## How to use

Add the plugin to your `gatsby-config.js`

```js
module.exports = {
  plugins: ['gatsby-plugin-sharp-exif']
};
```

Then just query the EXIF data as part of the `ImageSharp` type:

```graphql
{
  allImageSharp {
    edges {
      node {
        fields {
          exif {
            gps {
              longitude
              latitude
            }
            meta {
              dateTaken
            }
            raw {
              image {
                Make
              }
            }
          }
        }
      }
    }
  }
}
```
