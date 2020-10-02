<template>
  <div class="mx-auto w-screen max-w-md mt-8">
    <section class="flex space-x-4 mb-4">
      <div class="profile-picture" />
      <div class="info">
        <h1>{{ profileInfo.firstName }} {{ profileInfo.lastName }}</h1>
        <p>{{ $store.state.user.email }}</p>
        <p class="role">
          Class #{{ profileInfo.classNumber }}
        </p>
        <p>{{ profileInfo.githubUsername }}</p>
        <p>{{ profileInfo.gender }}</p>
        <p>{{ profileInfo.birthday }}</p>
        <p>{{ profileInfo.location }}</p>
        <p>{{ profileInfo.role }}</p>
        <p v-if="profileInfo.mentor == true">
          Mentor
        </p>
      </div>
      <font-awesome-icon
        v-if="myProfile == true"
        id="icon"
        icon="edit"
        title="Edit profile"
      />
    </section>
    <section>
      <div id="social">
        <h2 class="mt-2">
          Social Links
        </h2><font-awesome-icon
          class="m-3"
          :icon="['fab',
                  'facebook-f']"
        /><font-awesome-icon
          class="m-3"
          :icon="['fab',
                  'linkedin']"
        /><font-awesome-icon
          class="m-3"
          :icon="['fab',
                  'instagram']"
        />
        <font-awesome-icon
          v-if="myProfile == true"
          id="icon"
          icon="edit"
          title="Edit section"
        />
      </div>
      <div id="languages">
        <h2 class="mt-2">
          Languages
        </h2><p>Technical:</p><p>Natural:</p>
        <font-awesome-icon
          v-if="myProfile == true"
          id="icon"
          icon="edit"
          title="Edit section"
        />
      </div>
      <div id="hobbies">
        <h2 class="mt-2">
          Hobbies
        </h2>
        <p />
        <input
          v-if="edit == true"
          type="text"
        >
        <font-awesome-icon
          v-if="myProfile == true"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editProfile"
        />
      </div>
    </section>
    <section class="middle mb-4 mt-3">
      <h2>About</h2>
      <font-awesome-icon
        v-if="myProfile == true"
        id="icon"
        icon="edit"
        title="Edit section"
      />
      <div
        v-for="question in profileInfo.questions"
        :key="question.id"
      >
        <h2>question.qA.question</h2>
        <p>question.qA.answer</p>
      </div>
    </section>
    <section
      class="
        mb-4"
    >
      <div class="project-info">
        <h2>Recent Projects</h2>
        <font-awesome-icon
          v-if="myProfile == true"
          id="icon"
          icon="edit"
          title="Edit section"
        />
        <h3>Project Title</h3>
        <p>
          Project description
        </p>
        <p>Tools used: </p>
        <div class="flex space-x-4 mt-4">
          <a
            class="button"
            href="celestial-weather.netlify.app"
          >Website</a>
          <a
            class="button"
            href="https://github.com/mnapearson/celestial-weather"
          >View on Github</a>
        </div>
      </div>
    </section>
    <section
      v-if="myProfile == false"
      class="contact"
    >
      <div class="contact-form">
        <h2>Contact</h2>
        <textarea
          id="message"
          class="resize-none contact-input"
          name="message"
          cols="50"
          rows="8"
          placeholder="Your message..."
        />
        <button
          class="button"
        >
          Send
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Profile',
  data() {
    return {
      edit: false,
      questions: null,
    };
  },
  computed: {
    ...mapState(['profiles', 'user']),
    userId() {
      return this.$route.params.userId;
    },
    profileInfo() {
      const profileUID = this.userId;
      return this.profiles.find((profile) => profile.userId == profileUID);
    },
    myProfile() {
      return this.$route.params.userId == this.$store.state.user.uid;
    },
  },
  methods: {
    editProfile() {
      if (this.edit == false) { this.edit = true; } else {
        this.edit = false;
      }
    },
  },
};
</script>

<style scoped>

.icon {

}
h1 {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #2e354f;
}

h2 {
  font-weight: bold;
  font-size: 16px;
}

h3 {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #2e354f;
}

p {
  color: #2e354f;
}

a {
  font-size: 16px;
  color: #2e354f;
}

input {
  border: 1px solid black;
}

#icon {
  cursor: pointer;
}

.profile-picture {
  width: 160px;
  height: 160px;
  border: 1px solid #000000;
}

.contact {
  display: flex;
  justify-content: center;
  padding: 1rem;
  align-content: center;
}

.contact-input {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  border: solid 1px black;
  padding: 1rem;
}

.button {
  @apply border border-black py-2 px-6 text-center font-bold cursor-pointer;
}
</style>
