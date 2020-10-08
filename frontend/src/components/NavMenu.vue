<template>
  <nav class="flex flex-col justify-between">
    <div>
      <header class="flex items-center space-x-4 mb-6">
        <h1 class="text-white font-semibold text-2xl">
          Devhaus Leipzig
        </h1>
        <font-awesome-icon
          class="text-white cursor-pointer"
          icon="arrow-left"
          @click="$store.commit('COLLAPSE_MENU')"
        ></font-awesome-icon>
      </header>
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
    </div>

    <button
      class="uppercase font-medium tracking-widest text-teal-100 text-left
        focus:outline-none justify-self-end"
      @click="$store.dispatch('signOut')"
    >
      Logout
    </button>
  </nav>
</template>

<script>
export default {
  name: "NavMenu"
};
</script>

<style scoped>
.nav-link {
  @apply mb-5 pb-1 uppercase font-medium tracking-widest text-teal-100
  border-b-2 border-transparent;
}
</style>
