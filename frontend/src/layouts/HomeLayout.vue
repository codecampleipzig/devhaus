<template>
  <div class="home-layout max-h-screen">
    <slide isOpen>
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
    </slide>
    <div class="overflow-y-auto max-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";
// import { component } from 'vue/types/umd';

export default {
  name: "HomeLayout",
  components: {
    Slide
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
  position: initial; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: rgb(63, 63, 65); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 20px;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: white;
}
</style>
