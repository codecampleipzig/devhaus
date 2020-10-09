<template>
  <div class="p-8 md:pl-16 max-w-screen-md sm:px-12">
    <portal to="header">
      <div class="flex justify-between items-center" v-if="$store.state.user.uid == '4P7X6XaRLlNWUnsw6kaSp32nFtB2'">
        <h1 class="font-semibold text-lg">News</h1>
        <font-awesome-icon
          class="text-xl cursor-pointer text-teal-900"
          id="icon"
          icon="plus-circle"
          title="Add Post"
          @click="addPost = true"
        ></font-awesome-icon></div
    ></portal>
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
            v-model="text"
            class="font-mono p-4 "
            type="text"
            name="Create Post"
            placeholder="Write your post in Markdown..."
          />
<<<<<<< HEAD
          <button class="m-2 p-2 cursor-pointer bg-teal-600 rounded-lg" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div class="flex-col w-full">
        <div class="p-4 w-full " v-for="post in sortedPosts" :key="post.id">
          <markedPost :post="post"></markedPost>
        </div>
=======
          <div class="flex justify-center space-x-4 mt-6 ">
            <button class="button" @click="submitPost()" type="submit">Submit</button>
            <button class="button" @click="addPost = false">Cancel</button>
          </div>
        </form>
      </div>
      <div>
        <!-- Show Posts -->

        <markedPost
          class="mb-24"
          :post="post"
          v-for="post in sortedPosts"
          :key="post.id"
        ></markedPost>
>>>>>>> develop
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
      if (this.text == "" || this.title == "") {
        this.$store.dispatch("notify", {
          type: "error",
          text: "You gotta enter a title and some text!"
        });
        return;
      }
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
        this.$store.dispatch("notify", { type: "error", text: error });
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
