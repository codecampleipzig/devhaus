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

nav {
  position: fixed;
}

</style>
