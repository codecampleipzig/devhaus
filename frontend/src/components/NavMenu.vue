<template>
  <nav
    class="flex flex-col jusitfy-start pl-8 py-6 pr-20
      bg-teal-900 max-h-screen"
  >
    <h1 class="text-white font-semibold mb-6 text-2xl">
      Devhaus Leipzig
    </h1>
    <div class="nav flex flex-col items-start flex-1">
      <router-link class="nav-link" :to="{ name: 'Home' }">
        Home
      </router-link>
      <router-link class="nav-link" :to="{ name: 'Calendar' }">
        Calendar
      </router-link>
      <router-link class="nav-link" :to="{ name: 'Members' }">
        Members
      </router-link>
      <router-link
        class="nav-link"
        :to="{ name: 'Profile', params: { userId: $store.state.user.uid } }"
      >
        Profile
      </router-link>
    </div>

    <button
      class="uppercase font-medium tracking-widest text-teal-100 text-left focus:outline-none"
      @click="$store.dispatch('signOut')"
    >
      Logout
    </button>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-link {
  @apply mb-5 pb-1 uppercase font-medium tracking-widest text-teal-100
  border-b-2 border-transparent;
}

.router-link-exact-active {
  @apply border-teal-100;
}
</style>
