<template>
  <div id="app">
    <router-view />
    <div class="button-container">
      <button @click="notify({type: 'info', text:'You have been notified!!!'})">Notify Me!!</button>
      <button @click="notify({type: 'error', text:'You have been errored!!!'})">Error Me!!!</button>
    </div>
    <div class="notification-container">
      <transition-group name="fade">
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :type="notification.type"
          :text="notification.text"
          @remove="$store.commit('REMOVE_NOTIFICATION', notification)"
        />
      </transition-group>
    </div>

  </div>
</template>

<script>
import Notification from '@/components/Notification.vue';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      notificationType: 'info',
    };
  },
  name: 'App',
  components: {
    Notification,
  },
  computed: mapState(['notifications']),
  methods: {
    ...mapActions(['notify']),
    postError() {
      this.notify({ type: 'error', text: 'This is an error.' });
    },
    removeNotification(notification) {
      this.$store.commit('REMOVE_NOTIFICATION', notification);
    },
  },
};
</script>

<style>
.button-container {
  position: fixed;
  bottom: 0;
}

.notification-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter {
  transform: scale(0);
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(-100%);
}

nav {
  top: 0;
  padding: 2rem;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  background-color: black;
  color: white;
  font-size: 30px;
}

.link {
  text-decoration-line: none;
  color: white;
}

.link:hover {
  color: red;
}

</style>
