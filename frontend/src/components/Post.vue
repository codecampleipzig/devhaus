<template>
  <div>
    <div class="flex flex-col p-4 bg-gray-400 rounded max-w-screen-lg">
      <div class="flex mb-4">
        <img
          :src="author.avatar"
          alt="profilePicture"
          class="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div class="flex-col">
          <div>{{ author.firstName }} {{ author.lastName }}</div>
          <div>{{ formattedDate }}</div>
        </div>
      </div>
      <div class="">
        <div class="pb-4">{{ post.title }}</div>
        <div class="md" v-html="markdown"></div>
      </div>
      <button @click="deletePost" class="bg-gray-700 w-1/12 rounded">Delete</button>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import moment from "moment";
import { mapState } from "vuex";
import { db } from "@/firebase";

export default {
  name: "markedPost",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["profiles"]),
    author() {
      return this.profiles.find(profile => profile.id == this.post.author);
    },
    formattedDate() {
      return moment(this.post.date.toDate()).format("MMMM Do YYYY, h:mm a");
    },
    markdown() {
      return marked(this.post.text);
    }
  },
  methods: {
    async deletePost() {
      await db
        .collection("posts")
        .doc(this.post.id)
        .delete();

      this.$store.dispatch("notify", { type: "info", text: "Your post has been deleted" });
    }
  }
};
</script>

<style>
.md h1 {
  font-weight: bold;
}
</style>
