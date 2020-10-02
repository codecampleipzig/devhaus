import { auth } from '@/firebase';
import { firestorePlugin } from 'vuefire';
import Vuelidate from 'vuelidate';
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCoffee, faSpinner, faEdit, faCircle, faCheck,
  faPlus, faEquals, faArrowRight, faPencilAlt, faComment,
} from '@fortawesome/free-solid-svg-icons';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import App from './App.vue';

Vue.use(Vuelidate);
auth.onAuthStateChanged((user) => {
  store.commit('SET_USER', user);
});

library.add(
  faCoffee, faSpinner, faEdit, faCircle, faCheck,
  faPlus, faEquals, faArrowRight, faPencilAlt, faComment,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
