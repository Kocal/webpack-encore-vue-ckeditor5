# Webpack Encore: CKEditor 5 from source + Vue

This repo shows how to build CKEditor 5 from source, with Webpack Encore and Vue support.

## How make it works

Install dependencies:
```bash
# Dev dependencies
$ yarn add --xdev @ckeditor/ckeditor5-dev-utils \
@ckeditor/ckeditor5-dev-webpack-plugin \
@ckeditor/ckeditor5-vue \
raw-loader

# Dependencies
$ yarn add @ckeditor/ckeditor5-basic-styles \
@ckeditor/ckeditor5-editor-classic \
@ckeditor/ckeditor5-essentials \
@ckeditor/ckeditor5-link \
@ckeditor/ckeditor5-paragraph \
@ckeditor/ckeditor5-theme-lark
```

In your `webpack.config.js`:
```js
// Imports ...

// Configuration ...
Encore
  // Your configuration ...
  
  // Configure PostCSS
  .enablePostCssLoader(options => {
    Object.assign(options, styles.getPostCssConfig({
      themeImporter: {
        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
      },
    }));
  })
  
  // See https://www.npmjs.com/package/@ckeditor/ckeditor5-dev-webpack-plugin
  .addPlugin(new CKEditorWebpackPlugin({
    language: 'fr',
  }))
  
  // Use raw-loader for CKEditor5 SVG files
  .addRule({
    test: /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/,
    loader: 'raw-loader'
  })
  
  // Configure other image loaders to exclude CKEditor5 SVG files, otherwise we will have some issue 
  .configureLoaderRule('images', loader => {
    loader.exclude = /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/;
  })
````

In a Vue component:
```vue
<template>
  <ckeditor v-model="editorData" :editor="editor" :config="editorConfig"></ckeditor>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
// ⚠️ NOTE: We don't use @ckeditor/ckeditor5-build-classic any more!
// Since we're building CKEditor from source, we use the source version of ClassicEditor.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

export default {
  name: "CKEditor",
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content</p>',
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
        ],

        toolbar: {
          items: [
            'bold',
            'italic',
            'link',
            'undo',
            'redo',
          ],
        },
      },
    };
  },
};
</script>

```

If everything goes well, you should see something like this:

![image](https://i.imgur.com/rbDa4Bk.png)

## Try it

- Clone this repo
- Install dependencies: `yarn`
- Run Webpack's dev-server: `yarn dev-server`
- Open http://localhost:8080
