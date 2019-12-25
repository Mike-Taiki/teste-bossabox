import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* Styles SASS  */
import '@/styles/index.scss';

/* Icons */
import '@/fontawesome/fontawesome';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
