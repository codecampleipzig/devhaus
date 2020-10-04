<template>
  <div class="home-layout max-h-screen">
    <nav
      class="flex flex-col jusitfy-start p-6 pr-12
      bg-teal-900 max-h-screen"
    >
      <div class="nav flex flex-col flex-1">
        <router-link
          class="nav-link"
          :to="{ name: 'Home'}"
        >
          Home
        </router-link>
        <router-link
          class="nav-link"
          :to="{ name: 'Calendar'}"
        >
          Calendar
        </router-link>
        <router-link
          class="nav-link"
          :to="{ name: 'Members'}"
        >
          Members
        </router-link>
        <router-link
          class="nav-link"
          :to="{ name: 'Profile', params: {userId: $store.state.user.uid}}"
        >
          Profile
        </router-link>
      </div>

      <button
        class="nav-link text-left"
        @click="$store.dispatch('signOut')"
      >
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
  name: 'HomeLayout',
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
  @apply mb-4 uppercase font-medium tracking-widest text-white
}
</style>
