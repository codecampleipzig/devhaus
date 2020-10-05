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
        pb-12
        pt-4
        w-screen
        max-w-sm
        px-8
        text-black
        rounded-sm
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
        <div class="flex justify-center mb-6">
          <h1
            class="text-3xl text-black
        font-bold flex justify-center mt-8 pb-1 border-b-4 border-teal-700"
          >
            Create a profile
          </h1>
        </div>
        <form class="flex flex-col" @submit.prevent="submit">
          <input
            v-model="userInfo.userName"
            class="mb-6 focus:shadow-outline"
            type="text"
            placeholder="User Name"
          />
          <input
            v-model="userInfo.firstName"
            class="mb-6 focus:shadow-outline"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            v-model="userInfo.lastName"
            class="mb-6 focus:shadow-outline"
            type="text"
            placeholder="Last Name"
            required
          />
          <input
            v-model="userInfo.class"
            class="mb-6 focus:shadow-outline"
            type="number"
            placeholder="Class #"
            required
          />
          <input
            class="button mb-4 text-white  hover:bg-teal-800 bg-teal-900 w-full"
            type="submit"
          />
          <button
            class="button text-white  hover:bg-teal-800 bg-teal-900 w-full"
            @click="$store.dispatch('signOut')"
          >
            Logout
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      userInfo: this.createEmptyUserInfo()
    };
  },
  computed: {
    ...mapState(["user", "profile"])
  },
  methods: {
    async submit() {
      await db.collection("profiles").add({
        ...this.userInfo,
        userId: this.user.uid
      });
      this.userInfo = this.createEmptyUserInfo();
      await this.$router.push({ name: "Home" });
    },
    createEmptyUserInfo() {
      return {
        userName: "",
        firstName: "",
        lastName: "",
        classNumber: ""
      };
    }
  }
};
</script>

<style scoped></style>
