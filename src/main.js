import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const moment = require('moment');
require('moment/locale/ru');

Vue.use(require('vue-moment'), {
  moment
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
