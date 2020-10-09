<template>
  <div>
    <nav
      class="z-50 flex flex-col justify-between pb-2 pr-2
          bg-white border-r-2 border-teal-700 min-h-screen"
    >
      <div>
        <header class="flex pt-6 mb-12 h-12 px-6 items-center space-x-2">
          <font-awesome-icon
            v-if="showCloseIcon"
            class="text-black cursor-pointer"
            icon="bars"
            @click="$store.commit('COLLAPSE_MENU')"
          ></font-awesome-icon>
          <h1 class="text-black font-semibold text-lg">
            Devhaus Leipzig
          </h1>
        </header>
        <div class="flex flex-col items-start flex-1 px-6">
          <router-link class="nav-link" :to="{ name: 'Home' }">
            News
          </router-link>
          <router-link
            class="nav-link"
            :to="{ name: 'AllEvents', params: { whose: 'all-events' } }"
          >
            Events
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Calendar' }">
            Calendar
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Members' }">
            Members
          </router-link>
        </div>
      </div>

      <button
        class="nav-link  text-left
          focus:outline-none justify-self-end px-6"
        @click="$store.dispatch('signOut')"
      >
        Logout
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    showCloseIcon: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.nav-link {
  @apply mb-5 pb-1 uppercase font-medium tracking-widest text-black
  border-b-2 border-transparent;
}

.router-link-active {
  @apply border-teal-800;
}
</style>
