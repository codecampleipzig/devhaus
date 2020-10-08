<template>
  <div>
    <div class="p-4">
      <!-- Whole Blog -->
      <div class="flex justify-center" v-if="!addPost">
        <font-awesome-icon
          class="text-6xl cursor-pointer text-teal-900"
          id="icon"
          icon="plus-circle"
          title="Add Post"
          @click="addPost = true"
        ></font-awesome-icon>
      </div>
      <div v-else>
        <!-- Create new post -->
        <form class="flex flex-col max-w-lg font-mono" @submit.prevent="">
          <input v-model="title" type="text" name="Title" placeholder="Insert title here" />
          <textarea
            rows="10"
            class="font-mono border-solid border-2 border-black"
            v-model="text"
            type="text"
            name="Create Post"
            placeholder="Write your post in Markdown..."
          />
          <button @click="submitPost()" type="submit">Submit</button>
          <button @click="addPost = false">Cancel</button>
        </form>
      </div>
      <div class="flex-col w-full">
        <!-- Show Posts -->
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
