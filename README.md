# gatsby-plugin-sharp-exif

[![npm](https://img.shields.io/npm/v/gatsby-plugin-sharp-exif)](https://www.npmjs.com/package/gatsby-plugin-sharp-exif)  ![GitHub](https://img.shields.io/github/license/thomasgassmann/gatsby-plugin-sharp-exif)

Gatsby Plugin to extract EXIF data from images, compatible with gatsby-plugin-sharp

## Install

```sh
npm i --save gatsby-plugin-sharp-exif
```

## How to use

Add the plugin to your `gatsby-config.js`

```js
module.exports = {
  plugins: [
    'gatsby-plugin-sharp-exif'
  ]
}
```

You can also specify options

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-sharp-exif',
      options: {

      }
  ]
}
```
