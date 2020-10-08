<template>
  <div class="home-layout max-h-screen">
    <transition>
      <NavMenu
        v-if="menuOpen"
        class="z-20"
        :class="viewportWidth < 900 ? 'fixed' : ''"
        :showCloseIcon="true"
      ></NavMenu>
    </transition>
    <div v-if="!menuOpen || viewportWidth < 900"></div>

    <div class="overflow-y-auto max-h-screen">
      <header
        class="py-2 px-4 flex items-center top-0 justify-between
      bg-white sticky border-b border-gray-200 z-10"
      >
        <font-awesome-icon
          v-if="!menuOpen"
          icon="bars"
          class="cursor-pointer"
          @click="$store.commit('TOGGLE_MENU')"
        ></font-awesome-icon>
        <portal-target class="flex-1 pl-4 pr-4" name="header"></portal-target>
        <div class="flex items-center space-x-4">
          <router-link :to="{ name: 'Calendar' }">
            <font-awesome-icon
              id="show-calendar"
              class="text-lg text-teal-900 hover:opacity-75 mt-1"
              :icon="['fa', 'calendar-alt']"
            ></font-awesome-icon>
          </router-link>
          <router-link
            class="nav-link"
            id="profile-link"
            :to="{ name: 'Profile', params: { userId: $store.state.user.uid } }"
          >
            <img class="rounded-full h-10 w-10" :src="$store.getters.myProfile.avatar" alt="" />
          </router-link>
        </div>
      </header>
      <router-view />
    </div>
    <transition name="fade">
      <div>
        <div
          v-if="sidebarOpen"
          class="fixed h-full w-full left-0 top-0 z-20
        bg-black bg-opacity-25"
          @click="$store.commit('HIDE_SIDEBAR')"
        ></div>
      </div>
    </transition>
    <transition name="slide">
      <div
        v-show="sidebarOpen"
        class="fixed h-full z-20 right-0 top-0 bg-white w-full max-w-screen-sm border-l overflow-y-scroll"
      >
        <div class="fixed m-6 text-teal-900">
          <font-awesome-icon
            class="text-xl cursor-pointer"
            :icon="['fa', 'window-close']"
            @click="$store.commit('HIDE_SIDEBAR')"
          ></font-awesome-icon>
        </div>
        <div class="">
          <portal-target name="sidebar"> </portal-target>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavMenu from "@/components/NavMenu.vue";

export default {
  name: "HomeLayout",
  components: {
    NavMenu
  },
  data() {
    return {
      viewportWidth: window.innerWidth
    };
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    resize() {
      this.viewportWidth = window.innerWidth;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.viewportWidth < 900) {
      this.$store.commit("COLLAPSE_MENU");
    }
    next();
  },
  computed: {
    ...mapState(["sidebarOpen", "menuOpen"])
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

@media (max-width: 500px) {
  .home-layout {
    grid-auto-flow: rows;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
.router-link-exact-active {
  @apply border-teal-100;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-left-enter-active {
  transition: transform 500ms ease-out;
}

.slide-leave-active,
.slide-left-leave-active {
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
