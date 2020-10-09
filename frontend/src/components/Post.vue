<template>
  <div>
    <div class="">
      <div class="flex">
        <h2 class="font-bold text-5xl mb-2 border-teal-900 border-b-4 pb-1">{{ post.title }}</h2>
      </div>
      <div v-if="!editTitle" class="pb-4">
        <font-awesome-icon
          v-if="author.id == $store.state.user.uid"
          id="icon"
          icon="edit"
          title="Edit Title"
          @click="editTitle = true"
        />
      </div>
      <div v-else>
        <input v-model="post.title" type="text" name="title" id="" />
        <button @click="savePost" class="bg-gray-700 w-1/12 rounded">Save</button>
      </div>
      <div v-if="!editText">
        <font-awesome-icon
          v-if="author.id == $store.state.user.uid"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editText = true"
        />
        <div class="md mb-4" v-html="markdown"></div>
        <div class="flex mb-4">
          <img
            :src="author.avatar"
            alt="profilePicture"
            class="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div class="flex-col">
            <div class="font-semibold">{{ author.firstName }} {{ author.lastName }}</div>
            <div class="text-sm font-medium">{{ formattedDate }}</div>
          </div>
          <font-awesome-icon
            v-if="author.id == $store.state.user.uid"
            id="icon"
            icon="trash"
            title="Delete Post"
            @click="deletePost"
          />
        </div>
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
      return marked(this.post.text);
    }
  },
  methods: {
    async savePost() {
      try {
        await db
          .collection("posts")
          .doc(this.post.id)
          .update({
            title: this.post.title,
            text: this.post.text
          });
      } catch (error) {
        console.log(error.message);
        error.message == "Missing or insufficient permissions."
          ? this.$store.dispatch("notify", { type: "error", text: "That ain't your Post dude!" })
          : this.$store.dispatch("notify", { type: "error", text: error });
      }

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
  @apply font-bold text-2xl mb-2;
}
.md h2 {
  @apply font-bold text-xl mb-2;
}

.md p {
  @apply font-serif leading-loose text-lg mb-4;
}

.md img {
  @apply my-6;
}
</style>
