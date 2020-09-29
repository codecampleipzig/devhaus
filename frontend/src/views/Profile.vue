<template>
  <div class="profile">
    <nav>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/editprofile">Edit Profile</router-link>
      <router-link class="link" to="/community">Community</router-link>
      <router-link class="link" to="/auth">Logout</router-link>
    </nav>
    <h1>Profile</h1>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style scoped>
</style>
