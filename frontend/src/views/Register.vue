<template>
  <div>
    <h3>logged in as {{ $store.state.user.email }}</h3>
    <button @click="$store.dispatch('signOut')">
      Logout
    </button>
    <form @submit.prevent="submit">
      <input v-model="userInfo.userName" type="text" placeholder="User Name (optional)" /><input
        v-model="userInfo.githubUsername"
        type="text"
        placeholder="Github Username"
        required
      />
      <input v-model="userInfo.firstName" type="text" placeholder="First Name" required />
      <input v-model="userInfo.lastName" type="text" placeholder="Last Name" required />
      <input v-model="userInfo.class" type="number" placeholder="Class #" />
      <input v-model="userInfo.gender" type="text" placeholder="Gender (optional)" />
      <input v-model="userInfo.birthday" type="date" placeholder="Birthday (optional)" />
      <input v-model="userInfo.location" type="text" placeholder="Location (optional)" />
      <input type="submit" />
      <button @click="$store.dispatch('signOut')">
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
