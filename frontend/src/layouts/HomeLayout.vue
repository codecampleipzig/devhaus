<template>
  <div class="home-layout max-h-screen">
    <nav
      class="flex flex-col jusitfy-start pl-8 py-6 pb-2 pr-20
      bg-teal-900 max-h-screen"
    >
      <h1 class="text-white font-semibold mb-6 text-xl">
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

      <button class="nav-link text-left focus:outline-none" @click="$store.dispatch('signOut')">
        Logout
      </button>
    </nav>
    <div class="overflow-y-auto max-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLayout"
};
</script>

<style scoped>
.home-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  max-height: 100vh;
}
.nav-link {
  @apply mb-5 pb-1 uppercase font-medium tracking-widest text-teal-100
  border-b-2 border-transparent;
}

.router-link-exact-active {
  @apply border-teal-100;
}
</style>
