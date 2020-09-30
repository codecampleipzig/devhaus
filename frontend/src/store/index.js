import { auth, db } from '@/firebase';
import Vue from 'vue';
import Vuex from 'vuex';
import CreatePersistedState from 'vuex-persistedstate';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import router from '@/router';

Vue.use(Vuex);

let lastUsedId = 0;

export default new Vuex.Store({
  state: {
    notifications: [],
    user: null,
    profiles: [],
  },
  plugins: [CreatePersistedState()],
  mutations: {
    ...vuexfireMutations,
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id != notificationToRemove.id,
      );
    },
    SET_USER(state, user) {
      state.user = user;
    },
    // SET_PROFILE(state, profile) {
    //   const query = profilesRef.where('uid', '==', state.user.uid);
    // },
  },
  actions: {
    notify({ commit }, { type, text }) {
      lastUsedId += 1;
      const id = lastUsedId;
      const notification = {
        id,
        type,
        text,
      };
      commit('PUSH_NOTIFICATION', notification);

      setTimeout(() => {
        commit('REMOVE_NOTIFICATION', notification);
      }, 5000);
    },
    async signOut() {
      await auth.signOut();
      router.push({
        name: 'Auth',
        params: {
          mode: 'signin',
        },
      });
    },
    bindProfiles: firestoreAction(({ bindFirestoreRef }) => bindFirestoreRef('profiles', db.collection('profiles'))),
  },
  modules: {},
});
