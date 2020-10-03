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
          <div
            class="form-group"
            :class="{ 'form-group--error': $v.email.$error }"
          >
            <input
              v-model.trim="email"
              class="form-input"
              type="text"
              placeholder="Email"
              @blur="$v.email.$touch()"
            >
          </div>
          <div
            v-if="!$v.email.required && $v.email.$dirty"
            class="error"
          >
            Email is required
          </div>
          <div
            v-if="!$v.email.email && $v.email.$dirty"
            class="error"
          >
            Email is invalid
          </div>
          <div
            class="form-group"
            :class="{ 'form-group--error': $v.password.$error }"
          >
            <input

              v-model.trim="password"
              class="form-input"
              type="password"
              placeholder="Password"
              @blur="$v.password.$touch()"
            >
          </div>
          <div
            v-if="!$v.password.required && $v.password.$dirty"
            class="error"
          >
            Password is required
          </div>
          <div
            v-if="!$v.password.minLength && $v.password.$dirty"
            class="error"
          >
            password must have at least {{ $v.password.$params.minLength.min }} charachters.
          </div>

          <p
            v-if="submitStatus === 'ERROR'"
            class="typo-p"
          >
            Please fill the form correctly.
          </p>
          <p
            v-if="submitStatus === 'PENDING'"
            class="typo-p"
          >
            Sending...
          </p>

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
import { required, minLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase';
import { auth } from '@/firebase';
import { mapState } from 'vuex';

export default {
  name: 'Auth',
  data() {
    return {
      error: null,
      email: '',
      password: '',
      submitStatus: '',
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    email: {
      email,
      required,
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
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        return;
      }
      this.submitStatus = 'PENDING';

      if (this.mode == 'signin') {
        this.signIn();
      }
      this.signUp();
    },
    async signIn() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        await this.bindProfiles();
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
        await this.bindProfiles();
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
          this.$router.push({ name: 'Home' });
        });
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
