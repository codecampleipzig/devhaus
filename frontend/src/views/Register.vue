<template>
  <div>
    <div class="flex justify-center mb-6">
      <h1
        class="text-3xl text-black
        font-bold flex justify-center mt-8 pb-1 border-b-4 border-teal-700"
      >
        Create a profile
      </h1>
    </div>
    <form class="flex flex-col" @submit.prevent="submit">
      <input
        v-model="userInfo.userName"
        class="mb-6 focus:shadow-outline"
        type="text"
        placeholder="User Name"
      />
      <input
        v-model="userInfo.firstName"
        class="mb-6 focus:shadow-outline"
        type="text"
        placeholder="First Name"
        required
      />
      <input
        v-model="userInfo.lastName"
        class="mb-6 focus:shadow-outline"
        type="text"
        placeholder="Last Name"
        required
      />
      <input
        v-model="userInfo.class"
        class="mb-6 focus:shadow-outline"
        type="number"
        placeholder="Class #"
        required
      />
      <input class="button mb-4 text-white  hover:bg-teal-800 bg-teal-900 w-full" type="submit" />
      <button
        class="button text-white  hover:bg-teal-800 bg-teal-900 w-full"
        @click="$store.dispatch('signOut')"
      >
        Logout
      </button>
    </form>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      userInfo: this.createEmptyUserInfo()
    };
  },
  computed: {
    ...mapState(["user", "profile"])
  },
  methods: {
    async submit() {
      await db
        .collection("profiles")
        .doc(this.user.uid)
        .set({
          ...this.userInfo
        });
      this.userInfo = this.createEmptyUserInfo();
      await this.$router.push({ name: "Home" });
    },
    createEmptyUserInfo() {
      return {
        userName: null,
        githubUsername: null,
        firstName: null,
        lastName: null,
        class: null,
        role: null,
        gender: null,
        birthday: null,
        location: null,
        jobTitle: null,
        company: null,
        mentor: false,
        facebook: "Facebook",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        hobbies: [],
        techLanguages: [],
        natLanguages: [],
        questions: {},
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/devhaus-testing.appspot.com/o/avatar%2Fdefault-harold.jpg?alt=media&token=4452ef96-2f45-482f-bf4a-45198bdaf4ab"
      };
    }
  }
};
</script>

<style scoped></style>
