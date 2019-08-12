import Vue from 'vue';
import CKEditor from './CKEditor';

const vm = new Vue({
  template: `
    <div>
      CKEditor:
      <CKEditor v-model="text"></CKEditor>
      <p>Text: {{ text }}</p>
    </div>
  `,
  components: {
    CKEditor,
  },
  data() {
    return {
      text: null
    }
  }
}).$mount('#app');
