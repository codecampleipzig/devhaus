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
@import url('https://fonts.googleapis.com/css?family=Raleway:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic');
</style>
