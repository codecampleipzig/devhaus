<template>
  <div>
    <div class="m-40 text-3xl">
      <button @click="$router.push('/auth/signin')">Sign In</button>
      <button @click="$router.push('/auth/signup')">Sign Up</button>
      <button @click="logout">Logout</button>
      <h1>{{ modeTitle }}</h1>

      <form @submit.prevent="submit">
        <input
        type="text"
        placeholder="Email"
        v-model="email"
        required
        >
        <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
        >

        <input type="submit" :value="modeTitle">
      </form>
      <h4 v-if="error">{{ error }}</h4>
      <button>Sign Up with GitHub</button>

      <button
      @click="gitLogin"
      >Sign In with GitHub</button>

      <p v-if="$store.state.user">{{$store.state.user.email}}</p>

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
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    async submit() {
      if (this.mode == 'signin') {
        try {
          await auth.signInWithEmailAndPassword(this.email, this.password);
          this.email = '';
          this.password = '';
          this.$router.push('/');
        } catch (error) {
          this.error = 'Invalid email or password.';
        }
      } else {
        try {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
          this.email = '';
          this.password = '';
        } catch (error) {
          this.error = 'User already exists!';
        }
      }
    },
    async gitLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      try {
        await firebase.auth().signInWithPopup(provider).then((result) => {
          // const token = result.credential.accessToken;
          // const { user } = result;
          this.email = result.credential.email;
          console.log(result);
          this.$router.replace('home');
        });
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      auth.signOut();
    },
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
};
</script>

<style scoped>
.hidden {
  display: none;
}

</style>
