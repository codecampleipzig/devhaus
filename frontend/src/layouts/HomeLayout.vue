<template>
  <div class="home-layout max-h-screen">
    <div
      class="pl-8 py-6 pr-8
        bg-teal-900 min-h-screen flex"
      v-if="viewportWidth > 500"
    >
      <NavMenu v-if="menuOpen"></NavMenu>
      <nav v-else>
        <font-awesome-icon
          icon="arrow-right"
          class="text-white cursor-pointer"
          @click="$store.commit('EXPAND_MENU')"
        ></font-awesome-icon>
      </nav>
    </div>
    <div v-else>
      <nav>
        <font-awesome-icon
          icon="arrow-right"
          class="text-black cursor-pointer"
          @click="$store.commit('EXPAND_MENU')"
        ></font-awesome-icon>
        <transition name="slide-left">
          <div
            v-if="menuOpen"
            class="pl-8 py-6 pr-8
          bg-teal-900 min-h-screen flex fixed top-0 left-0 z-20"
          >
            <NavMenu></NavMenu>
          </div>
        </transition>
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
        class="fixed h-full z-20 right-0 top-0 bg-white w-full max-w-screen-sm border-l overflow-y-scroll"
      >
        <div class="fixed m-4">
          <font-awesome-icon
            class="text-xl"
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
    window.removeEventListner("resize", this.resize);
  },
  methods: {
    resize() {
      this.viewportWidth = window.innerWidth;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.viewportWidth < 500) {
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
