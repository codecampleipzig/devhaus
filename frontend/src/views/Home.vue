<template>
  <div>
    <div class="p-4">
      <div class="flex" v-if="$store.state.user.uid == '4P7X6XaRLlNWUnsw6kaSp32nFtB2'">
        <form class="flex flex-col w-full font-mono" @submit.prevent="submitPost">
          <h1 class="mb-4">Hi Taylor! Create a new Blog Post:</h1>
          <input
            class="mb-4 border-black"
            v-model="title"
            type="text"
            name="Title"
            placeholder="Insert title here"
          />
          <textarea
            rows="10"
            class="font-mono border-solid border-2 border-black"
            v-model="text"
            type="text"
            name="Create Post"
            placeholder="Write your post in Markdown..."
          />
          <button class="m-2 p-2 cursor-pointer bg-teal-600 rounded-lg" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div class="flex-col w-full">
        <div class="p-4 w-full " v-for="post in sortedPosts" :key="post.id">
          <markedPost :post="post"></markedPost>
        </div>
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
