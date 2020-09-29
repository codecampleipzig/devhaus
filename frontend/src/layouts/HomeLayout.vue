<template>
  <div>
    <nav class="top-0 right-0 left-0 p-8 flex justify-evenly bg-black text-white text-3xl">
    <router-link :to="{ name: 'Home'}">Home</router-link>
    <router-link :to="{ name: 'Profile'}">Profile</router-link>
    <router-link :to="{ name: 'EditProfile'}">Edit Profile</router-link>
    <router-link :to="{ name: 'Community'}">Community</router-link>
    <button @click="logout">Logout</button>
    <!-- <router-link to="/auth/signin">Logout</router-link> -->
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'HomeLayout',
  methods: {
    logout() {
      auth.signOut();
      this.$router.push('/auth/signin');
    },
  },
};
</script>

<style scoped>
h3 {
  text-decoration: underline;
}
</style>
