<template>
  <div>
    <nav
      class="top-0 right-0 left-0 p-5
    flex justify-evenly bg-blue-900 text-white text-2xl font-medium"
    >
      <router-link :to="{ name: 'Home'}">
        Home
      </router-link><router-link :to="{ name: 'Community'}">
        Community
      </router-link>
      <router-link :to="{ name: 'Profile', params: {userId: $store.state.user.uid}}">
        Profile
      </router-link>
      <input
        type="text"
        placeholder="...Search"
      >
      <router-link :to="{ name: 'EditProfile'}">
        Edit Profile
      </router-link>
      <router-link :to="{ name: 'Community'}">
        Community
      </router-link>
      <button @click="$store.dispatch('signOut')">
        Logout
      </button>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'HomeLayout',
};
</script>

<style scoped>

</style>
