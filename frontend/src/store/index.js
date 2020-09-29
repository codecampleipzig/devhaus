import Vue from 'vue';
import Vuex from 'vuex';
import CreatePersistedState from 'vuex-persistedstate';
import { vuexFireMutations } from 'vuexfire';

Vue.use(Vuex);

let lastUsedId = 0;

export default new Vuex.Store({
  state: {
    notifications: [],
    user: null,
  },
  plugins: [CreatePersistedState()],
  mutations: {
    ...vuexFireMutations,
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
  },
  modules: {},
});
