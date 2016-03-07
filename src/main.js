import Vue from 'vue';
import App from './App.vue';
import store from "./state/store";


new Vue({
  el: 'body',
  store,
  components: { App }
});
