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
  faReact,
  faVuejs
} from "@fortawesome/fontawesome-free-brands";
import {
  faCoffee,
  faSpinner,
  faEdit,
  faCircle,
  faCheck,
  faCode,
  faPlus,
  faEquals,
  faArrowRight,
  faPencilAlt,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import store from "@/store";
import router from "@/router";
import App from "@/App.vue";
import vSelect from "vue-select/dist/vue-select.css";
import "./assets/tailwind.css";
import Vuelidate from "vuelidate";
import NProgress from "vue-nprogress";

Vue.use(Vuelidate);

const nprogress = new NProgress();
const options = {
  latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
  router: false, // Show progressbar when navigating routes, default: true
  http: false // Show progressbar when doing Vue.http, default: true,\
};
Vue.use(NProgress, options);

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
  faCode,
  faGithub,
  faFacebookF,
  faLinkedin,
  faInstagram,
  faJsSquare,
  faVuejs,
  faReact,
  faCoffee,
  faSpinner,
  faEdit,
  faCircle,
  faCheck,
  faPlus,
  faEquals,
  faArrowRight,
  faPencilAlt,
  faComment
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  nprogress,
  render: h => h(App)
}).$mount("#app");
