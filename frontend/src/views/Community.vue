<template>
  <div class="community">
    <nav>
      <router-link class="link" to="/profile">Profile</router-link>
      <router-link class="link" to="/editprofile">Edit Profile</router-link>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/auth">Logout</router-link>
    </nav>
    <h1>Community</h1>
  </div>
</template>

<script>
export default {
  name: 'Community',
};
</script>

<style scoped>
</style>
