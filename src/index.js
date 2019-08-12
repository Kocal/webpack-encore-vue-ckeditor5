import Vue from 'vue';

const vm = new Vue({
  template: `
    <div>
      CKEditor:
      <ckeditor v-model="text"></ckeditor>
      <p>Text: {{ text }}</p>
    </div>
  `,
  data() {
    return {
      text: null
    }
  }
}).$mount('#app');
