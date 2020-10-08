import { auth } from "@/firebase";
import { firestorePlugin } from "vuefire";
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faGithub,
  faFacebookF,
  faLinkedin,
  faInstagram,
  faJsSquare,
  faReact
} from "@fortawesome/fontawesome-free-brands";
import {
  faBriefcase,
  faGraduationCap,
  faCalendarDay,
  faCompass,
  faEnvelope,
  faEdit,
  faCode
} from "@fortawesome/free-solid-svg-icons";

import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import store from "@/store";
import router from "@/router";
import App from "@/App.vue";
import vSelect from "vue-select";
import Vuelidate from "vuelidate";

import "vue-select/dist/vue-select.css";
import "./assets/tailwind.css";

Vue.use(Vuelidate);

let markProfilesAsBound = null;
let profileBoolean = false;
export const boundProfiles = new Promise(resolve => {
  markProfilesAsBound = resolve;
});

let markFirebaseAuthAsConnected;
let firebaseAuthBoolean = false;
export const firebaseAuthConnected = new Promise(resolve => {
  markFirebaseAuthAsConnected = resolve;
});

auth.onAuthStateChanged(async user => {
  if (firebaseAuthBoolean == false) {
    markFirebaseAuthAsConnected();
    firebaseAuthBoolean = true;
  }
  store.commit("SET_USER", user);
  if (user) {
    await store.dispatch("bindProfiles");
    if (profileBoolean == false) {
      markProfilesAsBound();
      profileBoolean = true;
    }
  }
});

library.add(
  faBriefcase,
  faGraduationCap,
  faCalendarDay,
  faCompass,
  faCode,
  faGithub,
  faFacebookF,
  faLinkedin,
  faInstagram,
  faJsSquare,
  faReact,
  faEdit,
  faTrash,
  faPlusCircle,
  faEnvelope
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
