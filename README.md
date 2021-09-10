# `@crossid/docusaurus-remote-content`

A plugin for Docusaurus to fetch content remotely.

## Usage

npm:
`npm install --save @crossid/docusaurus-remote-content`

yarn:
`yarn add @crossid/docusaurus-remote-content`

_docusaurus.config.js_:

```js
module.exports = {
  plugins: [
    [
      '@crossid/docusaurus-remote-content',
      {
        type: 'docs',
        contents: [
          {
            file: 'sample-nodejs.md',
            url: 'https://raw.githubusercontent.com/crossid/sample-nodejs/main/README.md',
            header: `:::note
This content is from the README file of https://github.com/crossid/sample-nodejs.
:::`,
            meta: {
              id: 'sample-nodejs',
              sidebar_label: 'Sample-Nodejs',
              hide_title: true,
            },
          },
      }
    ],
  ],
};
```

To fetch / clean remote files from CLI, add to your `package.json`:

```json
{
  "scripts": {
    "fetch-remote-docs": "docusaurus fetch-remote-docs",
    "clean-remote-docs": "docusaurus clean-remote-docs"
  }
}
```

For complete example, see [example/docusaurus.config.js](./example/docusaurus.config.js)
