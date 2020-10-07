<template>
  <div>
    <div class="p-8">
      <h1 class="text-5xl font-bold">
        Devhaus Leipzig
      </h1>
    </div>
    <div>
      <!-- Whole Blog -->
      <div>
        <!-- Create new post -->
        <form class="flex flex-col max-w-lg font-mono" @submit.prevent="">
          <input type="file" class="hidden" ref="addPicture" />

          <input v-model="title" type="text" name="Title" placeholder="Insert title here" />
          <textarea
            rows="10"
            class="font-mono border-solid border-2 border-gray-600"
            v-model="text"
            type="text"
            name="Create Post"
            placeholder="Write your post in Markdown..."
          />
          <button>Add Picture</button>
          <button @click="submitPost()" type="submit">Submit</button>
        </form>
      </div>
      <div>
        <!-- Show Posts -->
        <div v-for="post in sortedPosts" :key="post.id">
          <markedPost :post="post"></markedPost>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import markedPost from "../components/Post";
import { db } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      myProfile: undefined,
      title: "",
      text: ""
    };
  },
  computed: {
    ...mapState(["posts"]),
    sortedPosts() {
      return this.posts.slice().sort((a, b) => {
        return a.date.seconds - b.date.seconds;
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
      const post = {
        title: this.title,
        text: this.text,
        date: new Date(),
        author: this.myProfile.id
      };

      await db.collection("posts").add(post);

      this.$store.dispatch("notify", { type: "info", text: "Your post has been created" });
      this.text = "";
    }
  }
};
</script>

<style scoped></style>
