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
            v-model="email"
            v-model.trim="$v.email.$model"
            class="form_input"
            type="text"
            placeholder="Email"
            required
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
          <label class="form__label">Password</label>
          <input
            v-model="password"
            v-model.trim="$v.password.$model"
            class="form__input"
            type="password"
            placeholder="Password"
            required
          >
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
          v-if="submitStatus === 'OK'"
          class="typo__p"
        >
          Thanks for your submission!
        </p>
        <p
          v-if="submitStatus === 'ERROR'"
          class="typo__p"
        >
          Please fill the form correctly.
        </p>
        <p
          v-if="submitStatus === 'PENDING'"
          class="typo__p"
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

      email: null,
      password: null,

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
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else if (this.mode == 'signin') {
        this.submitStatus = 'PENDING';
        setTimeout(() => {
          this.submitStatus = 'OK';
        }, 500);
        return this.signIn();
      }
      return this.signUp();
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
.hidden {
  display: none;
}

</style>
