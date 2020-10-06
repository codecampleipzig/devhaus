<template>
  <div>
    <div class="flex space-x-8 text-2xl text-black mb-6 font-bold justify-center">
      <router-link
        class="pb-2 border-b-4 border-transparent"
        :to="{ name: 'Auth', params: { mode: 'signin' } }"
      >
        Sign In
      </router-link>
      <router-link
        class="pb-2 border-b-4 border-transparent"
        :to="{ name: 'Auth', params: { mode: 'signup' } }"
      >
        Sign Up
      </router-link>
    </div>

    <form class="flex flex-col" @submit.prevent="submit">
      <input
        v-model="email"
        class="bg-white mb-4 email"
        type="text"
        placeholder="Email"
        required
        @blur="$v.email.$touch()"
      />
      <div v-if="!$v.email.required && $v.email.$dirty" class="error">
        Email is required
      </div>
      <div v-if="!$v.email.email && $v.email.$dirty" class="error">
        Email is invalid
      </div>
      <input
        v-model="password"
        class="bg-white mb-4"
        type="password"
        placeholder="Password"
        @blur="$v.password.$touch()"
        required
      />
      <div v-if="!$v.password.required && $v.password.$dirty" class="error">
        Password is required
      </div>
      <div v-if="!$v.password.minLength && $v.password.$dirty" class="error">
        Password must have at least {{ $v.password.$params.minLength.min }} charachters.
      </div>

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

import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "Auth",
  data() {
    return {
      error: null,

      email: "",
      password: "",
      submitStatus: ""
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    email: {
      email,
      required
    }
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
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return;
      }
      this.submitStatus = "PENDING";

      if (this.mode == "signin") {
        this.signIn();
      } else {
        this.signUp();
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
