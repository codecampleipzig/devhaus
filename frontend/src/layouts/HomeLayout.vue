<template>
  <div class="home-layout max-h-screen">
    <header v-if="viewportWidth < 800">
      <slide
        @closeMenu="menuOpen = false"
        @openMenu="menuOpen = true"
        :isOpen="menuOpen"
        noOverlay
        closeOnNavigation
        :burgerIcon="false"
      >
        <NavMenu></NavMenu>
      </slide>
      <button @click="openMenu">Open</button>
    </header>
    <NavMenu v-else></NavMenu>
    <div class="overflow-y-auto max-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";
import NavMenu from "@/components/NavMenu.vue";
// import { component } from 'vue/types/umd';

export default {
  name: "HomeLayout",
  data() {
    return {
      menuOpen: false,
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
    },
    openMenu() {
      this.menuOpen = false;
      setTimeout(() => {
        this.menuOpen = true;
      }, 100);
    }
  },
  components: {
    Slide,
    NavMenu
  }
};
</script>

<style>
.home-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  max-height: 100vh;
}

@media (max-width: 800px) {
  .home-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 4rem 1fr;
  }
}

.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: #373a47;
}
.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: rgb(63, 63, 65); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 0px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
.bm-item-list > *:first-child {
  height: 100%;
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 0;
  height: 100%;
  font-size: 20px;
}
.bm-item-list > * {
  display: inherit;
  text-decoration: inherit;
  padding: inherit;
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: white;
}
</style>
