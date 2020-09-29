<template>
  <div>
    <nav>
    <router-link class="link" :to="{ name: 'Home'}">Home</router-link>
    <router-link class="link" :to="{ name: 'Profile'}">Profile</router-link>
    <router-link class="link" :to="{ name: 'Edit Profile'}">Edit Profile</router-link>
    <router-link class="link" :to="{ name: 'Community'}">Community</router-link>
    <router-link class="link" :to="{ name: 'Auth'}">Logout</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HomeLayout',
};
</script>

<style scoped>

</style>
