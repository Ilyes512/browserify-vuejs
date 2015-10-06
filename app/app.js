import vue from 'vue';
import _ from 'lodash';
import hello from './hello.html';

new vue({
  el: '#vueplay',
  template: hello,
  data: {
    title: 'Hello world... :)'
  }
});