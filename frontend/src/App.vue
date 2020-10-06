<template>
  <div id="app">
    <nprogress-container></nprogress-container>

    <router-view />

    <Notifications />
  </div>
</template>

<script>
import Notifications from "@/components/Notifications.vue";
import NprogressContainer from "vue-nprogress/src/NprogressContainer";

export default {
  name: "App",
  components: {
    Notifications,
    NprogressContainer
  },
  data() {
    return {
      notificationType: "info"
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic");

input[type="text"],
input[type="password"],
input[type="number"] {
  @apply border border-black py-2 px-4 font-medium;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
.button:focus,
textarea:focus {
  @apply outline-none;
}

.button {
  letter-spacing: 0.2em;
  @apply px-8 py-2 cursor-pointer block rounded-sm font-medium uppercase bg-teal-900 text-white;
}
</style>
