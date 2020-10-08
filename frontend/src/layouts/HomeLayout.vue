<template>
  <div class="home-layout max-h-screen">
    <div
      class="pl-8 py-6 pr-8
        bg-teal-900 max-h-screen min-h-screen flex"
    >
      <nav class="flex flex-col justify-between" v-if="showMenu">
        <div>
          <header class="flex items-center space-x-4 mb-6">
            <h1 class="text-white font-semibold text-2xl">
              Devhaus Leipzig
            </h1>
            <font-awesome-icon
              class="text-white cursor-pointer"
              icon="arrow-left"
              @click="showMenu = false"
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
      <nav v-else>
        <font-awesome-icon
          icon="arrow-right"
          class="text-white cursor-pointer"
          @click="showMenu = true"
        ></font-awesome-icon>
      </nav>
    </div>
    <div class="overflow-y-auto max-h-screen">
      <router-view />
    </div>
    <transition name="fade">
      <div>
        <div
          v-if="sidebarOpen"
          class="fixed h-full w-full left-0 top-0 z-0
        bg-black bg-opacity-25"
          @click="$store.commit('HIDE_SIDEBAR')"
        ></div>
      </div>
    </transition>
    <transition name="slide">
      <div
        v-show="sidebarOpen"
        class="fixed h-full z-20 right-0 top-0 bg-white w-full max-w-screen-sm border-l"
      >
        <header class="flex justify-end p-4">
          <font-awesome-icon
            class="text-xl"
            :icon="['fa', 'window-close']"
            @click="$store.commit('HIDE_SIDEBAR')"
          ></font-awesome-icon>
        </header>
        <portal-target name="sidebar"> </portal-target>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HomeLayout",
  data() {
    return {
      showMenu: true
    };
  },
  computed: {
    ...mapState(["sidebarOpen"])
  }
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

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active {
  transition: transform 500ms ease-out;
}

.slide-leave-active {
  transition: transform 700ms ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 25%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-in;
}
</style>
