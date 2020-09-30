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
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userInfo: {
        userName: null,
        firstName: null,
        lastName: null,
        class: null,
      },
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async submit() {
      await db.collection('user').add({
        userName: this.userInfo.userName,
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        classNumber: this.userInfo.class,
        userId: this.user.uid,
      });
      this.userInfo.userName = '';
      this.userInfo.firstName = '';
      this.userInfo.lastName = '';
      this.userInfo.class = '';
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
