# gatsby-plugin-sharp-exif

[![npm](https://img.shields.io/npm/v/<%= props.name %>)](https://www.npmjs.com/package/<%= props.name %>)  ![GitHub](https://img.shields.io/github/license/<%= props.github %>)

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
      resolve: '<%= props.name %>',
      options: {

      }
  ]
}
```
