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

input[type='text'],input[type='password'] {
  @apply border border-black py-2 px-4 font-medium
}

input[type='text']:focus,input[type='password']:focus {
  @apply outline-none;
}

.button {
  letter-spacing: 0.2em;
  @apply px-8 mt-4 py-2 cursor-pointer block rounded-sm font-medium uppercase
}

.button:focus {
  outline: none;
}

</style>
