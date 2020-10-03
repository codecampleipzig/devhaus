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
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.email.$error }"
        >
          <label class="form__label">Email</label>
          <input
            v-model.trim="$v.email.$model"
            class="form-input"
            type="text"
            placeholder="Email"
          >
        </div>
        <div
          v-if="!$v.email.required"
          class="error"
        >
          Email is required
        </div>
        <input
          type="submit"
          :value="modeTitle"
        >
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.password.$error }"
        >
          <label class="form-label">Password</label>
          <input

            v-model.trim="$v.password.$model"
            class="form-input"
            type="password"
            placeholder="Password"
          >
        </div>
        <div
          v-if="!$v.password.required"
          class="error"
        >
          Password is required
        </div>
        <div
          v-if="!$v.password.minLength"
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
import { required, minLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase';
import { auth } from '@/firebase';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Auth',
  data() {
    return {
      error: null,

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
    ...mapActions(['bindProfiles']),
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
        await auth.signInWithEmailAndPassword(this.$v.email.$model, this.$v.password.$model);
        await this.bindProfiles();
        this.$v.email.$model = '';
        this.$v.password.$model = '';
        this.$router.push({ name: 'Home' });
      } catch (error) {
        this.error = 'Invalid email or password.';
      }
    },
    async signUp() {
      try {
        await auth.createUserWithEmailAndPassword(this.$v.email.$model, this.$v.password.$model);
        await this.bindProfiles();
        this.$v.email.$model = '';
        this.$v.password.$model = '';
        this.$router.push({ name: 'Register' });
      } catch (error) {
        this.error = 'User already exists!';
      }
    },
    async gitLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      try {
        await firebase.auth().signInWithPopup(provider).then((result) => {
          this.$v.email.$model = result.credential.email;
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
.hidden {
  display: none;
}

</style>
