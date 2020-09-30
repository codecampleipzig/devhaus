<template>
  <div>
    <div class="m-40 text-3xl">
      <router-link :to="{name: 'Auth', params: {mode: 'signin'}}">
        Sign In
      </router-link>
      <router-link :to="{name: 'Auth', params: {mode: 'signup'}}">
        Sign Up
      </router-link>
      <button @click="$store.dispatch('signOut')">
        Logout
      </button>
      <h1>{{ modeTitle }}</h1>

      <form @submit.prevent="submit">
        <input
          v-model="email"
          type="text"
          placeholder="Email"
          required
        >
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        >

        <input
          type="submit"
          :value="modeTitle"
        >
      </form>
      <h4 v-if="error">
        {{ error }}
      </h4>
      <button>Sign Up with GitHub</button>

      <button
        @click="gitLogin"
      >
        Sign In with GitHub
      </button>

      <p v-if="$store.state.user">
        {{ $store.state.user.email }}
      </p>
    </div>
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
    submit() {
      if (this.mode == 'signin') {
        return this.signIn();
      }
      return this.signUp();
    },
    async signIn() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.email = '';
        this.password = '';
        this.$router.push({ name: 'Home' });
      } catch (error) {
        this.error = 'Invalid email or password.';
      }
    },
    async signUp() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.email = '';
        this.password = '';
        this.$router.push({ name: 'Register' });
      } catch (error) {
        this.error = 'User already exists!';
      }
    },
    async gitLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      try {
        await firebase.auth().signInWithPopup(provider).then((result) => {
          this.email = result.credential.email;
          this.$router.replace('home');
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}

</style>
