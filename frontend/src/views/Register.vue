<template>
  <div class="py-6 flex justify-center">
    <div class="child">
      <h1 class="green flex h-40 w-40 pl-1 text-2xl font-medium">
        DEV
        HAUS
        LEIPZIG
      </h1>
    </div>
    <div class="parent rounded-lg">
      <div class="bg-teal-700 rounded-lg p-16 shadow-lg">
        <h1
          class="text-3xl text-gray-400
      font-bold flex justify-center mt-8 border-b border-black"
        >
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
            class="p-1 bg-gray-700 text-gray-400 max-w-sm rounded-full shadow font-medium"
            type="submit"
          >
        </form>
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

h1 {
  display: flex;
  align-items: flex-end;
  margin: 1rem;
}

.green {
  background-color:#AFCBC9;
  color:#847971;
}

.parent {
  position: relative;
  padding: 5rem;
  z-index: 0;
  opacity: 80%;
}

.child {
  position: absolute;
  z-index: 100;
  top: 20;
  left: 10%;
  opacity: 80%;

}
</style>
