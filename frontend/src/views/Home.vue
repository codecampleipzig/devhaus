<template>
  <div class="p-4 max-w-screen-md sm:px-12">
    <header class="flex items-center justify-between mb-4">
      <h1 class="text-4xl font-bold">Devhaus Leipzig</h1>
      <div class="flex justify-center" v-if="!addPost">
        <font-awesome-icon
          class="text-2xl cursor-pointer text-teal-900"
          id="icon"
          icon="plus-circle"
          title="Add Post"
          @click="addPost = true"
        ></font-awesome-icon>
      </div>
    </header>
    <div class="">
      <!-- Whole Blog -->

      <div
        class="fixed left-0 top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25"
        v-if="addPost"
      >
        <!-- Create new post -->
        <form
          class="flex flex-col max-w-screen-md w-screen bg-white pt-4 pb-8 px-8"
          @submit.prevent=""
        >
          <h2 class="font-bold text-lg mb-4">Create Post</h2>
          <input
            class="mb-4"
            v-model="title"
            type="text"
            name="Title"
            placeholder="Insert title here"
          />
          <textarea
            rows="10"
            class="font-mono p-4 "
            type="text"
            name="Create Post"
            placeholder="Write your post in Markdown..."
          />
          <div class="flex justify-center space-x-4 mt-6 ">
            <button class="button" @click="submitPost()" type="submit">Submit</button>
            <button class="button" @click="addPost = false">Cancel</button>
          </div>
        </form>
      </div>
      <div class="">
        <!-- Show Posts -->

        <markedPost
          class="mb-16"
          :post="post"
          v-for="post in sortedPosts"
          :key="post.id"
        ></markedPost>
      </div>
    </div>
  </div>
</template>

<script>
import markedPost from "../components/Post";
import DOMPurify from "dompurify";
import { db } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      myProfile: undefined,
      addPost: false,
      title: "",
      text: ""
    };
  },
  computed: {
    ...mapState(["posts"]),
    sortedPosts() {
      return this.posts.slice().sort((a, b) => {
        return b.date.seconds - a.date.seconds;
      });
    }
  },
  mounted() {
    this.myProfile = this.$store.getters.myProfile;
    this.$store.dispatch("bindPosts");
  },
  components: {
    markedPost: markedPost
  },
  methods: {
    async submitPost() {
      const clean = DOMPurify.sanitize(this.text);

      const post = {
        title: this.title,
        text: clean,
        date: new Date(),
        author: this.myProfile.id
      };
      try {
        await db.collection("posts").add(post);
      } catch (error) {
        console.log(error);
        this.$store.dispatch("notify", { type: "error", text: "Ooops! Something went wrong..." });
      }

      this.$store.dispatch("notify", { type: "info", text: "Your post has been created" });
      this.text = "";
      this.title = "";
      this.addPost = false;
    }
  }
};
</script>

<style scoped></style>
