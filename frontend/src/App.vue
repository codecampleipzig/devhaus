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

</style>
