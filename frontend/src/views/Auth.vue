<template>
  <div>
    <div
      class="flex space-x-8 text-2xl text-black mb-8 font-bold
        justify-center mt-8"
    >
      <router-link
        class="border-b-4 pb-1 border-transparent"
        :to="{ name: 'Auth', params: { mode: 'signin' } }"
      >
        Sign In
      </router-link>
      <router-link
        class="border-b-4 pb-1 border-transparent"
        :to="{ name: 'Auth', params: { mode: 'signup' } }"
      >
        Sign Up
      </router-link>
    </div>

    <form class="flex flex-col" @submit.prevent="submit">
      <input v-model="email" class="bg-white mb-4 email" type="text" placeholder="Email" required />
      <input
        v-model="password"
        class="bg-white mb-4"
        type="password"
        placeholder="Password"
        required
      />

      <input
        class="button mt-2 mb-2 py-2 cursor-pointer text-white hover:bg-teal-800 bg-teal-900"
        type="submit"
        :value="modeTitle"
      />
    </form>

    <h4 v-if="error">
      {{ error }}
    </h4>
    <div class="flex justify-center">
      <p class="h-6 w-10 text-center text-black font-bold mt-2">
        OR
      </p>
    </div>
    <button
      class="button mt-3 cursor-pointer text-white  hover:bg-teal-800 bg-teal-900 w-full"
      @click="gitLogin"
    >
      Sign In with Github
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
import { auth } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "Auth",
  data() {
    return {
      error: null,

      email: null,
      password: null
    };
  },
  computed: {
    ...mapState(["user"]),
    mode() {
      return this.$route.params.mode;
    },
    modeTitle() {
      return this.mode == "signup" ? "Sign Up" : "Sign In";
    }
  },
  methods: {
    async submit() {
      try {
        if (this.mode == "signin") {
          await this.signIn();
        } else {
          await this.signUp();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async signIn() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.email = "";
        this.password = "";
        await this.$router.push({ name: "Home" });
      } catch (error) {
        this.error = "Invalid email or password.";
      }
    },
    async signUp() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.email = "";
        this.password = "";
        await this.$router.push({ name: "Register" });
      } catch (error) {
        this.error = "User already exists!";
      }
    },
    async gitLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      try {
        await firebase.auth().signInWithPopup(provider);
        await this.$router.push({ name: "Home" });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.router-link-active {
  @apply border-teal-700;
}
</style>
