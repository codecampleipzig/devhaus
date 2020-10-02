<template>
  <div>
    <h3>logged in as {{ $store.state.user.email }}</h3>
    <form @submit.prevent="submit">
      <input
        v-model="userInfo.userName"
        type="text"
        placeholder="User Name"
      >
      <input
        v-model="userInfo.firstName"
        type="text"
        placeholder="First Name"
        required
      >
      <input
        v-model="userInfo.lastName"
        type="text"
        placeholder="Last Name"
        required
      >
      <input
        v-model="userInfo.class"
        type="number"
        placeholder="Class #"
        required
      >
      <input type="submit">
      <button @click="$store.dispatch('signOut')">
        Logout
      </button>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userInfo: this.createEmptyUserInfo(),
    };
  },
  computed: {
    ...mapState(['user', 'profile']),
  },
  methods: {
    async submit() {
      await db.collection('profiles').add({
        ...this.userInfo,
        userId: this.user.uid,
      });
      this.userInfo = this.createEmptyUserInfo();
      await this.$router.push({ name: 'Home' });
    },
    createEmptyUserInfo() {
      return {
        userName: '',
        firstName: '',
        lastName: '',
        classNumber: '',
      };
    },
  },
};
</script>

<style scoped>

</style>
