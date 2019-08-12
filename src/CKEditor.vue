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
    ckeditor: CKEditor.component
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
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
  computed: {
    editorData: {
      get() {
        return this.value,
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
