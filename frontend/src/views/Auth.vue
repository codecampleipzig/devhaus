<template>
  <div class="flex items-center justify-center space-x-24 min-h-screen bg-gray-100">
    <section>
      <div class="bg-teal-150 h-64 w-64 opacity-50">
        <h1 class="p-4 text-5xl text-end font-bold max-w-sm">
          DEV HAUS LEIPZIG
        </h1>
      </div>
      <div class="bg-teal-150 h-64 w-64 opacity-75">
        <h1 class="p-4 text-5xl text-end font-bold max-w-sm">
          DEV HAUS LEIPZIG
        </h1>
      </div>
      <div class="bg-teal-150 h-64 w-64">
        <h1 class="p-4 text-5xl text-end font-bold max-w-sm">
          DEV HAUS LEIPZIG
        </h1>
      </div>
    </section>

    <section>
      <div
        class="
        bg-white
        py-16
        w-screen
        max-w-sm
        px-6
        my-10
        text-black
        shadow-md
        rounded
        "
      >
        <h1 class="md:hidden font-bold mb-6 text-4xl">
          Devhaus Leipzig
        </h1>
        <div
          class="flex space-x-8 text-2xl text-black mb-6 font-bold
        justify-center"
        >
          <router-link
            class="hover:opacity-25 underline"
            :to="{ name: 'Auth', params: { mode: 'signin' } }"
          >
            Sign In
          </router-link>
          <router-link
            class="hover:opacity-25 underline"
            :to="{ name: 'Auth', params: { mode: 'signup' } }"
          >
            Sign Up
          </router-link>
        </div>

        <form class="flex flex-col" @submit.prevent="submit">
          <input
            v-model="email"
            class="bg-white rounded py-2 px-4 mb-4 focus:shadow-outline focus:outline-none"
            type="text"
            placeholder="Email"
            required
          />
          <input
            v-model="password"
            class="bg-white rounded py-2 px-4 mb-4 focus:shadow-outline focus:outline-none"
            type="password"
            placeholder="Password"
            required
          />

          <input
            class="mt-2 mb-2 py-2 cursor-pointer hover:bg-gray-400 bg-gray-200 rounded-full"
            type="submit"
            :value="modeTitle"
          />
        </form>

        <h4 v-if="error">
          {{ error }}
        </h4>
        <div class="flex justify-center">
          <p
            class="bg-black border rounded-full
            h-6 w-10  shadow text-center text-white font-bold mt-2
        "
          >
            OR
          </p>
        </div>
        <button
          class="mt-3 py-2 cursor-pointer hover:bg-gray-400 bg-gray-200 rounded-full w-full"
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
