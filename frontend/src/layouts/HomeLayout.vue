<template>
  <div>
    <nav>
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/profile">Profile</router-link>
    <router-link class="link" to="/edit-profile">Edit Profile</router-link>
    <router-link class="link" to="/community">Community</router-link>
    <router-link class="link" to="/auth">Logout</router-link>
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
