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
        <form @submit.prevent="submitPost(newPost)">
          <input v-model="newPost" type="text" name="Create Post" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <!-- Show Posts -->
        <div v-for="post in posts" :key="post.id">
          <markedPost :post="post"></markedPost>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import markedPost from "../components/Post";
export default {
  name: "Home",
  data() {
    return {
      myProfile: this.$store.getters.myProfile
    };
  },
  components: {
    markedPost: markedPost
  },
  data() {
    return {
      posts: [],
      newPost: {
        text: "",
        author: ``
      }
    };
  },
  methods: {
    submitPost(input) {
      this.posts.push(input);
    }
  }
};
</script>

<style scoped></style>
