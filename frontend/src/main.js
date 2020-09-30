import { auth } from '@/firebase';
import { firestorePlugin } from 'vuefire';
import Vue from 'vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import App from './App.vue';

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('You are logged in');
  } else {
    console.log('You are not logged in');
  }
  store.commit('SET_USER', user);
});

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
