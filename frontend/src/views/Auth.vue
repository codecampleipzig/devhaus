<template>
  <div class="flex items-center justify-center space-x-24 min-h-screen">
    <section>
      <div>
        <img
          src="https://codecampleipzig.de/images/code-camp-leipzig-logo.svg"
          alt="logo"
        >
        <h1 class="text-6xl font-bold">
          DEVHAUS
        </h1>
      </div>
    </section>

    <section>
      <div
        class="bg-blue-900 py-10 w-screen
      max-w-sm px-6 my-10 shadow-md rounded"
      >
        <div class="flex justify-center space-x-8 text-2xl mb-6 font-bold ">
          <router-link
            class="opacity-25"
            :to="{name: 'Auth', params: {mode: 'signin'}}"
          >
            Sign In
          </router-link>

          <router-link
            class="opacity-25"
            :to="{name: 'Auth', params: {mode: 'signup'}}"
          >
            Sign Up
          </router-link>
        </div>

        <!-- Do we need the mode here? <h1>{{ modeTitle }}</h1> -->

        <form
          class="flex flex-col"
          @submit.prevent="submit"
        >
          <input
            v-model="email"
            class="bg-white rounded py-2 px-4 mb-4 focus:shadow-outline focus:outline-none"
            type="text"
            placeholder="Email"
            required
          >
          <input
            v-model="password"
            class="bg-white rounded py-2 px-4 mb-4 focus:shadow-outline focus:outline-none"
            type="password"
            placeholder="Password"
            required
          >

          <input
            class="mt-2 py-2 bg-blue-600 cursor-pointer hover:bg-blue-500"
            type="submit"
            :value="modeTitle"
          >
        </form>

        <h4 v-if="error">
          {{ error }}
        </h4>

        <button
          class="mt-4 py-2 bg-red-800 hover:bg-red-700 cursor-pointer block w-full"
          @click="gitLogin"
        >
          Sign In with GitHub
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase';
import { auth } from '@/firebase';
import { mapState } from 'vuex';

export default {
  name: 'Auth',
  data() {
    return {
      error: null,

      email: null,
      password: null,

    };
  },
  computed: {
    ...mapState(['user']),
    mode() {
      return this.$route.params.mode;
    },
    modeTitle() {
      return this.mode == 'signup' ? 'Sign Up' : 'Sign In';
    },
  },
  methods: {
    async submit() {
      try {
        if (this.mode == 'signin') {
          await this.signIn();
        } else { await this.signUp(); }
      } catch (error) {
        console.error(error);
      }
    },
    async signIn() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.email = '';
        this.password = '';
        await this.$router.push({ name: 'Home' });
      } catch (error) {
        this.error = 'Invalid email or password.';
      }
    },
    async signUp() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.email = '';
        this.password = '';
        await this.$router.push({ name: 'Register' });
      } catch (error) {
        this.error = 'User already exists!';
      }
    },
    async gitLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      try {
        await firebase.auth().signInWithPopup(provider);
        await this.$router.push({ name: 'Home' });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>

.router-link-active {
  @apply opacity-100;
}

</style>
