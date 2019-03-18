import Vue from 'vue';
import ElementUI from 'element-ui';
import App from '@/App.vue';
import router from '@/router';
import locale from 'element-ui/lib/locale/lang/en';
import store from '@/store';
// import '@/registerServiceWorker';

import * as api from '@/api';

import '@/styles/index.scss';

Vue.config.productionTip = false;

api.setStore(store);

Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
