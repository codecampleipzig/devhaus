import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCoffee, faSpinner, faEdit, faCircle, faCheck,
  faPlus, faEquals, faArrowRight, faPencilAlt, faComment,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';

library.add(
  faCoffee, faSpinner, faEdit, faCircle, faCheck,
  faPlus, faEquals, faArrowRight, faPencilAlt, faComment,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
