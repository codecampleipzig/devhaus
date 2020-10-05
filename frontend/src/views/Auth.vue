<template>
  <div
    class="flex items-center flex-col md:flex-row
  justify-center md:space-x-24 min-h-screen"
  >
    <section>
      <div
        class="md:bg-teal-900 md:h-64 md:w-64 md:text-white items-end
      p-2 md:flex hidden"
      >
        <h1 class="text-5xl font-semibold leading-none md:uppercase flex md:flex-col">
          <h2>Dev<br />haus</h2>
          <h2>Leipzig</h2>
        </h1>
      </div>
    </section>

    <section>
      <div
        class="w-screen
      max-w-sm px-4"
      >
        <h1 class="md:hidden font-bold mb-6 text-4xl">
          Devhaus Leipzig
        </h1>
        <div
          class="flex space-x-8 text-2xl text-black mb-6 font-bold
        items-center"
        >
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
          <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
            <input
              v-model.trim="email"
              class="mb-4 "
              type="text"
              placeholder="Email"
              @blur="$v.email.$touch()"
            />
          </div>
          <div v-if="!$v.email.required && $v.email.$dirty" class="error">
            Email is required
          </div>
          <div v-if="!$v.email.email && $v.email.$dirty" class="error">
            Email is invalid
          </div>
          <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
            <input
              v-model.trim="password"
              class="mb-4"
              type="password"
              placeholder="Password"
              @blur="$v.password.$touch()"
            />
          </div>
          <div v-if="!$v.password.required && $v.password.$dirty" class="error">
            Password is required
          </div>
          <div v-if="!$v.password.minLength && $v.password.$dirty" class="error">
            password must have at least {{ $v.password.$params.minLength.min }} charachters.
          </div>
          <p v-if="submitStatus === 'ERROR'" class="typo-p">
            Please fill the form correctly.
          </p>

          <input
            class="button mt-4 bg-teal-800 hover:bg-teal-700 text-white"
            type="submit"
            :value="modeTitle"
          />
        </form>

        <h4 v-if="error">
          {{ error }}
        </h4>

        <button
          class="button mt-4 bg-blue-800 text-white hover:bg-blue-700 w-full"
          @click="gitLogin"
        >
          Sign In with Github
        </button>
      </div>
    </section>
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
      }
      this.signUp();
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
