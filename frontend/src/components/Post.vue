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
        <font-awesome-icon id="icon" icon="trash" title="Delete Post" @click="deletePost" />
      </div>

      <div v-if="!editTitle" class="pb-4">
        {{ post.title }}
        <font-awesome-icon id="icon" icon="edit" title="Edit Title" @click="editTitle = true" />
      </div>
      <div v-else>
        <input v-model="post.title" type="text" name="title" id="" />
        <button @click="savePost" class="bg-gray-700 w-1/12 rounded">Save</button>
      </div>
      <div v-if="!editText">
        <font-awesome-icon id="icon" icon="edit" title="Edit section" @click="editText = true" />
        <div class="md" v-html="markdown"></div>
      </div>
      <div v-else>
        <textarea v-model="post.text" name="text" id="" cols="30" rows="10"></textarea>
        <button @click="savePost" class="bg-gray-700 w-1/12 rounded">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import DOMPurify from "dompurify";
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
  data() {
    return {
      editTitle: false,
      editText: false
    };
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
      const clean = DOMPurify.sanitize(this.post.text);
      return marked(clean);
    }
  },
  methods: {
    async savePost() {
      const clean = DOMPurify.sanitize(this.post.text);
      await db
        .collection("posts")
        .doc(this.post.id)
        .update({
          title: this.post.title,
          text: clean
        });

      this.editText = false;
      this.editTitle = false;
    },
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
