<template>
  <div id="app">
    <router-view />
    <Notifications />
  </div>
</template>

<script>
import Notifications from '@/components/Notifications.vue';

export default {
  name: 'App',
  components: {
    Notifications,
  },
  data() {
    return {
      notificationType: 'info',
    };
  },

};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap');

* {
  font-family: 'Raleway', sans-serif;
}
</style>
