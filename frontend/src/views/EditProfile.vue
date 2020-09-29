<template>
  <div class="editprofile">
    <nav>
      <router-link class="link" to="/profile">Profile</router-link>
      <router-link class="link" to='/'>Home</router-link>
      <router-link class="link" to="/community">Community</router-link>
      <router-link class="link" to="/auth">Logout</router-link>
    </nav>
    <h1>Edit Profile</h1>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
};
</script>

<style scoped>
</style>
