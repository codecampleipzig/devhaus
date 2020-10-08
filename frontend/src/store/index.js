import { auth, db } from "@/firebase";
import Vue from "vue";
import Vuex from "vuex";
import CreatePersistedState from "vuex-persistedstate";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import router from "@/router";

Vue.use(Vuex);

let lastUsedId = 0;

export default new Vuex.Store({
  state: {
    notifications: [],
    user: null,
    profiles: [],
    events: [],
    posts: [],
    sidebarOpen: false,
    menuOpen: true
  },
  plugins: [
    CreatePersistedState({
      paths: ["user", "profiles", "events"]
    })
  ],
  mutations: {
    ...vuexfireMutations,
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id != notificationToRemove.id
      );
    },
    SET_USER(state, user) {
      state.user = user;
      if (!user) {
        state.profiles = [];
        state.events = [];
      }
    },
    SHOW_SIDEBAR(state) {
      state.sidebarOpen = true;
    },
    HIDE_SIDEBAR(state) {
      state.sidebarOpen = false;
    },
    EXPAND_MENU(state) {
      state.menuOpen = true;
    },
    COLLAPSE_MENU(state) {
      state.menuOpen = false;
    }
  },
  getters: {
    myProfile: state => {
      return state.profiles.find(profile => profile.id == state.user.uid);
    }
  },
  actions: {
    notify({ commit }, { type, text }) {
      lastUsedId += 1;
      const id = lastUsedId;
      const notification = {
        id,
        type,
        text
      };
      commit("PUSH_NOTIFICATION", notification);

      setTimeout(() => {
        commit("REMOVE_NOTIFICATION", notification);
      }, 5000);
    },
    async signOut() {
      await router.push({
        name: "Auth",
        params: {
          mode: "signin"
        }
      });
      await auth.signOut();
    },
    bindProfiles: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("profiles", db.collection("profiles"), { wait: true })
    ),
    bindEvents: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("events", db.collection("events"))
    ),
    bindPosts: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("posts", db.collection("posts"))
    )
  },
  modules: {}
});
