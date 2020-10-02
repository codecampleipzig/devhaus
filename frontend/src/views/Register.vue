<template>
  <div class="py-10 flex justify-center">
    <div
      class="bg-teal-600 p-16
  flex flex-col justify-center
  max-w-screen-sm rounded-lg shadow-lg"
    >
      <div class="flex flex-row justify-center">
        <img
          class="w-auto rounded-l-full opacity-75"
          src="https://cdn.wedevs.com/uploads/2019/12/How-to-Customize-Your-WordPress-Login-Screen.png"
          alt=""
        >

        <div class="bg-indigo-400 rounded-r-lg p-4 shadow-lg">
          <h1 class="text-3xl font-bold flex justify-center mt-8">
            REGISTRATION INFO
          </h1>
          <form
            class="m-12 text-2xl flex flex-col space-y-8 rounded-lg"
            @submit.prevent="submit"
          >
            <input
              v-model="userInfo.userName"
              class="p-1 bg-blue-200 max-w-sm rounded"
              type="text"
              placeholder="User Name"
            >
            <input
              v-model="userInfo.firstName"
              class="p-1 bg-blue-200 max-w-sm rounded"
              type="text"
              placeholder="First Name"
              required
            >
            <input
              v-model="userInfo.lastName"
              class="p-1 bg-blue-200 max-w-sm rounded"
              type="text"
              placeholder="Last Name"
              required
            >
            <input
              v-model="userInfo.class"
              class="p-1 bg-blue-200 max-w-sm rounded"
              type="number"
              placeholder="Class #"
              required
            >
            <input
              class="p-1 bg-blue-700 max-w-sm rounded-full shadow font-medium"
              type="submit"
            >
          </form>
        </div>
      </div>
    </div>
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
    ...mapState(['user', 'profile']),
  },
  methods: {
    async submit() {
      await db.collection('profiles').add({
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

<style scoped>

</style>
