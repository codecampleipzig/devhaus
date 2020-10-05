<template>
  <div class="p-4">
    <input
      ref="imageInput"
      class="invisible"
      @change="uploadImage($event)"
      type="file"
      name="profilePicture"
      accept="image/*"
    />
    <!-- <button @click="uploadImage">Upload!</button> -->
    <section class="flex space-x-4 mb-4">
      <div class="w-64" @click="$refs.imageInput.click()">
        <img class="bg-gray-100 object-cover" style="padding-top: 100%;" :src="avatar" alt="" />
      </div>
      <div>
        <h1 class="font-bold text-2xl mb-2 mt-4">
          {{ profileInfo.firstName }} {{ profileInfo.lastName }}
        </h1>
        <p class="role">Class #{{ profileInfo.classNumber }} Alumni</p>
        <a href="https://github.com/mnapearson" class="github"
          ><font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon
        ></a>
      </div>
    </section>
    <section class="middle mb-4">
      <h2 class="font-bold text-lg">About</h2>
      <h3 class="font-semibold">Question?</h3>
      <p>Answer</p>
      <h3 class="font-semibold">Question?</h3>
      <p>Answer</p>
    </section>
    <section class="mb-4">
      <div class="project-info">
        <h2 class="font-bold text-lg">Projects</h2>
        <h3 class="font-semibold">Project Title</h3>
        <p>
          Project description
        </p>
        <div class="flex space-x-4 mt-4">
          <a class="button" href="celestial-weather.netlify.app">Website</a>
          <a class="button" href="https://github.com/mnapearson/celestial-weather"
            >View on Github</a
          >
        </div>
      </div>
    </section>
    <section class="contact">
      <div class="contact-form">
        <h2>Contact</h2>
        <textarea
          id="message"
          class="resize-none p-4 border border-black"
          name="message"
          cols="50"
          rows="8"
          placeholder="Your message..."
        />
        <button class="button">
          Send
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db, storage } from "@/firebase";

export default {
  name: "Profile",
  data() {
    return {
      imageFile: null
    };
  },
  computed: {
    ...mapState(["profiles", "user"]),
    avatar() {
      return this.profileImagesRef.getDownloadURL();
    },
    userId() {
      return this.$route.params.userId;
    },
    profileInfo() {
      const profileUID = this.userId;
      return this.profiles.find(profile => profile.userId == profileUID);
    }
  },
  methods: {
    async uploadImage(event) {
      this.imageFile = event.target.files[0];

      const imageName = `${this.profileInfo.userId}`;
      const storageRef = storage.ref();

      const profileImagesRef = storageRef.child(`avatar/${imageName}`);
      this.avatar = await profileImagesRef.getDownloadURL();
    }
  }
};
</script>

<style scoped></style>
