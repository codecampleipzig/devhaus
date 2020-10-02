<template>
  <div class="flex items-center justify-center space-x-24 min-h-screen bg-gray-100">
    <section>
      <div class="bg-red-300 h-64 w-64 opacity-75">
        <h1 class="p-4 text-5xl text-end font-bold max-w-sm">
          DEV HAUS LEIPZIG
        </h1>
      </div>
      <div class="bg-gray-300 h-64 w-64 opacity-75">
        <h1 class="p-4 text-5xl text-end font-bold max-w-sm">
          DEV HAUS LEIPZIG
        </h1>
      </div>
      <div class="bg-yellow-300 h-64 w-64 opacity-75">
        <h1 class="p-4 text-5xl text-end font-bold max-w-sm">
          DEV HAUS LEIPZIG
        </h1>
      </div>
    </section>
    <section class="parent rounded-lg">
      <div class="bg-white rounded-lg p-16 shadow-lg">
        <h1
          class="text-3xl text-black
      font-bold flex justify-center mt-8 border-b border-black"
        >
          REGISTRATION INFO
        </h1>
        <form
          class="flex flex-col"
          @submit.prevent="submit"
        >
          <input
            v-model="userInfo.userName"
            class="bg-white rounded py-2 px-4 mt-6 mb-4 focus:shadow-outline focus:outline-none"
            type="text"
            placeholder="User Name"
          >
          <input
            v-model="userInfo.firstName"
            class="bg-white rounded py-2 px-4 mt-6 mb-4 focus:shadow-outline focus:outline-none"
            type="text"
            placeholder="First Name"
            required
          >
          <input
            v-model="userInfo.lastName"
            class="bg-white rounded py-2 px-4 mt-6 mb-4 focus:shadow-outline focus:outline-none"
            type="text"
            placeholder="Last Name"
            required
          >
          <input
            v-model="userInfo.class"
            class="bg-white rounded py-2 px-4 mt-6 mb-4 focus:shadow-outline focus:outline-none"
            type="number"
            placeholder="Class #"
            required
          >
          <input
            class="mt-2 py-2 cursor-pointer hover:bg-gray-400 bg-gray-200 rounded-full"
            type="submit"
          >
        </form>
      </div>
    </section>
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
