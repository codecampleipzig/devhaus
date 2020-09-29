<template>
  <div id="app">
    <router-view />
   <Notifications />
  </div>
</template>

<script>
import Notifications from '@/components/Notifications.vue';

export default {
  data() {
    return {
      notificationType: 'info',
    };
  },
  name: 'App',
  components: {
    Notifications,
  },

};
</script>

<style>
.button-container {
  position: fixed;
  bottom: 4;
}

.notification-container {
  position: fixed;
  bottom: 0;
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
