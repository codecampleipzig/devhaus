<template>
  <div class="flex items-center justify-center md:space-x-32 min-h-screen md:bg-gray-100">
    <section>
      <div
        class="md:bg-teal-900 md:h-64 md:w-64 md:text-white items-end
      p-2 md:flex hidden opacity-50"
      >
        <h1 class="text-5xl font-semibold leading-none md:uppercase flex md:flex-col">
          <h2>Dev<br />haus</h2>
          <h2>Leipzig</h2>
        </h1>
      </div>
      <div
        class="md:bg-teal-900 md:h-64 md:w-64 md:text-white items-end
      p-2 md:flex hidden opacity-75"
      >
        <h1 class="text-5xl font-semibold leading-none md:uppercase flex md:flex-col">
          <h2>Dev<br />haus</h2>
          <h2>Leipzig</h2>
        </h1>
      </div>
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
        class="
        bg-white
        pb-16
        pt-4
        w-screen
        max-w-sm
        px-3
        my-10
        text-black
        md:shadow
        rounded
        "
      >
        <div class="flex justify-center md:hidden">
          <h1
            class="text-white bg-teal-900 flex justify-center mb-4 pt-10 px-1 h-32 w-32 text-2xl font-semibold leading-none uppercase flex-col opacity-50"
          >
            <h2>Dev<br />haus</h2>
            <h2>Leipzig</h2>
          </h1>
          <h1
            class="text-white bg-teal-900 flex justify-center mb-4 pt-10 px-1 h-32 w-32 text-2xl font-semibold leading-none uppercase flex-col opacity-75"
          >
            <h2>Dev<br />haus</h2>
            <h2>Leipzig</h2>
          </h1>
          <h1
            class="text-white bg-teal-900 flex justify-center mb-4 pt-10 px-1 h-32 w-32 text-2xl font-semibold leading-none uppercase flex-col"
          >
            <h2>Dev<br />haus</h2>
            <h2>Leipzig</h2>
          </h1>
        </div>
        <div
          class="flex space-x-8 text-2xl text-black mb-6 font-bold
        justify-center mt-8"
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

        <form class="flex flex-col ml-4 mr-4" @submit.prevent="submit">
          <input
            v-model="email"
            class="bg-white rounded py-2 px-4 mb-4 focus:shadow-outline focus:outline-none "
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
