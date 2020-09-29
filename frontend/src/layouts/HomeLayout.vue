<template>
  <div>
    <nav class="top-0 right-0 left-0 p-8 flex justify-evenly bg-black text-white text-3xl">
      <router-link :to="{ name: 'Home'}">
        Home
      </router-link>
      <router-link :to="{ name: 'Profile'}">
        Profile
      </router-link>
      <router-link :to="{ name: 'EditProfile'}">
        Edit Profile
      </router-link>
      <router-link :to="{ name: 'Community'}">
        Community
      </router-link>
      <router-link :to="{ name: 'Auth'}">
        Logout
      </router-link>
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
