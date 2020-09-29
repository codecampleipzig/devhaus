<template>
  <div class="home">
    <nav>
    <router-link class="link" to="/profile">Profile</router-link>
    <router-link class="link" to="/editprofile">Edit Profile</router-link>
    <router-link class="link" to="/community">Community</router-link>
    <router-link class="link" to="/auth">Logout</router-link>
    </nav>
      <h1>Hello DevHaus</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>

</style>
