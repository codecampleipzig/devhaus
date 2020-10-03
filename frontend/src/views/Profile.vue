<template>
  <div class="mx-auto w-screen max-w-md mt-8">
    <section class="flex space-x-4 mb-4">
      <div class="profile-picture" />
      <div class="info">
        <div v-if="editInfo == false">
          <h1>{{ profileInfoFromDB.firstName }} {{ profileInfoFromDB.lastName }}</h1>
          <p>{{ $store.state.user.email }}</p>
          <p class="role">
            Class #{{ profileInfo.class }}
          </p>
          <p>{{ profileInfoFromDB.githubUsername }}</p>
          <p>{{ profileInfoFromDB.gender }}</p>
          <p>{{ profileInfoFromDB.birthday }}</p>
          <p>{{ profileInfoFromDB.location }}</p>
          <p>{{ profileInfoFromDB.role }}</p>
          <p v-if="profileInfoFromDB.mentor == true">
            Mentor
          </p>
        </div>
        <div v-else>
          <form @submit.prevent="commitToDB(profileInfos)">
            <input
              v-model="profileInfos.firstName"
              type="text"
              name="first name"
              placeholder="First Name"
            >
            <input
              v-model="profileInfos.lastName"
              type="text"
              name="last name"
              placeholder="Last Name"
            >
            <input
              v-model="profileInfos.location"
              type="text"
              name="location"
              placeholder="Location"
            >
            <input
              v-model="profileInfos.gender"
              type="text"
              name="gender"
              placeholder="Gender"
            >
            <input
              v-model="profileInfos.role"
              type="text"
              name="role"
              placeholder="Role"
            >
            <label for="mentor">Mentor</label>
            <input
              v-model="profileInfos.mentor"
              type="checkbox"
              name="mentor"
            >
            <input
              type="submit"
            >
          </form>
        </div>
      </div>
      <font-awesome-icon
        v-if="myProfile == true"
        id="icon"
        icon="edit"
        title="Edit profile"
        @click="editInformation"
      />
    </section>
    <section>
      <div id="social">
        <h2 class="mt-2">
          Social Links
        </h2><font-awesome-icon
          v-if="profileInfoFromDB.facebook != null"
          class="m-3"
          :icon="['fab',
                  'facebook-f']"
        /><font-awesome-icon
          v-if="profileInfoFromDB.linkedin != null"
          class="m-3"
          :icon="['fab',
                  'linkedin']"
        /><font-awesome-icon
          v-if="profileInfoFromDB.instagram != null"
          class="m-3"
          :icon="['fab',
                  'instagram']"
        />
        <font-awesome-icon
          v-if="myProfile == true"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editSocialLinks"
        />
        <form
          v-if="editSocial == true"
          @submit.prevent="commitToDB(profileSocial)"
        >
          <input
            type="text"
            placeholder="Facebook"
            :v-model="profileSocial.facebook"
          >
          <input
            type="text"
            placeholder="LinkedIn"
            :v-model="profileSocial.linkedin"
          >
          <input
            type="text"
            placeholder="Instagram"
            :v-model="profileSocial.instagram"
          >
          <input
            type="submit"
          >
          <form />
        </form>
      </div>
      <div id="languages">
        <h2 class="mt-2">
          Languages
        </h2>
        <p>Technical:</p>
        <div
          v-for="language in profileInfoFromDB.languages.technical"
          :key="language.name"
        >
          <p
            v-if="language.value == true"
          >
            {{ language.name }}
          </p>
        </div>
        <form
          v-if="editLanguages == true"
          @submit.prevent="commitToDB(profileLanguages)"
        >
          <div
            v-for="language in profileInfo.languages.technical"
            :key="language.name"
          >
            <input
              v-model="language.value"
              type="checkbox"
              :true-value="true"
              :false-value="false"
            >
            <label
              :for="language.name"
            > {{ language.name }}</label>
          </div>
          <input
            type="submit"
          >
        </form>
        <p>Natural:</p>
        <font-awesome-icon
          v-if="myProfile == true"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editLang"
        />
      </div>
      <div id="hobbies">
        <h2 class="mt-2">
          Hobbies
        </h2>
        <p
          v-for="hobby in profileInfoFromDB.hobbies"
          :key="hobby.name"
        />
        <form v-if="editHobbies == true">
          <div
            v-for="hobby in hobbies"
            :key="hobby.name"
          >
            <input
              v-model="hobby.value"
              type="checkbox"
              true-value="true"
              false-vale="false"
            >
            <label
              :for="hobby.name"
            > {{ hobby.name }} </label>
          </div>
          <input type="submit">
        </form>
        <font-awesome-icon
          v-if="myProfile == true"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editHobby"
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
        @click="editQuestions"
      />
      <div
        v-for="question in profileInfoFromDB.questions"
        :key="question.id"
      >
        <h2>{{ question.qA.question }}</h2>
        <p>{{ question.qA.answer }}</p>
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
import { db } from '@/firebase';

export default {
  name: 'Profile',

  data() {
    return {
      profileInfos: null,
      profileLanguages: null,
      profileAbout: null,
      profileProjects: null,
      profileSocial: null,
      profileHobbies: null,

      editInfo: false,
      editLanguages: false,
      editAbout: false,
      editProjects: false,
      editSocial: false,
      editHobbies: false,
      profileInfo: {
        id: null,
        userName: null,
        githubUsername: null,
        firstName: null,
        lastName: null,
        class: null,
        mentor: false,
        role: null,
        gender: null,
        birthday: null,
        location: null,
        jobTitle: null,
        company: null,
        instagram: null,
        facebook: null,
        linkedin: null,
        hobbies: [
          {
            name: 'Hiking',
            value: false,
          },
          {
            name: 'Reading',
            value: false,
          },
          {
            name: 'Swimming',
            value: false,
          },
          {
            name: 'Rowing',
            value: false,
          },
          {
            name: 'Gaming',
            value: false,
          },
          {
            name: 'Music',
            value: false,
          },
          {
            name: 'Cooking',
            value: false,
          },
          {
            name: 'Knitting',
            value: false,
          },
          {
            name: 'Painting',
            value: false,
          },
          {
            name: 'Travelling',
            value: false,
          },
          {
            name: 'Movies',
            value: false,
          },
          {
            name: 'Writing',
            value: false,
          },
          {
            name: 'Bouldering',
            value: false,
          },
          {
            name: 'Complaining',
            value: false,
          },
          {
            name: 'Coding',
            value: false,
          },
          {
            name: 'Sports',
            value: false,
          }],
        languages:
        {
          natural: [
            {
              name: 'English',
              value: false,
            },
            {
              name: 'German',
              value: false,
            },
            {
              name: 'Spanish',
              value: false,
            },
            {
              name: 'Mandarin',
              value: false,
            },
            {
              name: 'Italian',
              value: false,
            },
            {
              name: 'French',
              value: false,
            },
            {
              name: 'Croatian',
              value: false,
            },
            {
              name: 'Polish',
              value: false,
            },
            {
              name: 'Russian',
              value: false,
            },
            {
              name: 'Portuguese',
              value: false,
            },
            {
              name: 'Hebrew',
              value: false,
            },
            {
              name: 'Japanese',
              value: false,
            },
            {
              name: 'Arabic',
              value: false,
            },
          ],
          technical:
           [
             {
               name: 'HTML',
               value: false,
             },
             {
               name: 'CSS',
               value: false,
             },
             {
               name: 'JavaScript',
               value: false,
             },
             {
               name: 'SQL',
               value: false,
             },
             {
               name: 'JSON',
               value: false,
             },
             {
               name: 'Markdown',
               value: false,
             },
             {
               name: 'Vue',
               value: false,
             },
             {
               name: 'Java',
               value: false,
             },
             {
               name: 'C',
               value: false,
             },
             {
               name: 'C++',
               value: false,
             },
             {
               name: 'TypeScript',
               value: false,
             },
             {
               name: 'Python',
               value: false,
             },
             {
               name: 'Rust',
               value: false,
             },
             {
               name: 'REST',
               value: false,
             },
             {
               name: 'Cypress',
               value: false,
             },
             {
               name: 'Express',
               value: false,
             },
           ],
        },
        questions: [
          {
            id: 1,
            qA: {
              question: 'Why do you love coding?',
              answer: 'Because it\'s fun!',
            },

          },
          {
            id: 2,
            qA: {
              question: 'Why are you here?',
              answer: 'I don\'t quite know!',
            },

          },
        ],
        projects: [
          {
            title: 'My Project',
            URL: '',
          },
        ],
      },
    };
  },

  computed: {
    ...mapState(['profiles', 'user']),
    userId() {
      return this.$route.params.userId;
    },
    profileInfoFromDB() {
      const profileUID = this.userId;
      return this.profiles.find((profile) => profile.userId == profileUID);
    },
    myProfile() {
      return this.$route.params.userId == this.$store.state.user.uid;
    },
    myHobbies() {
      return this.profileInfoFromDB.hobbies
        .find((hobby) => hobby.value == true);
    },
    myNatLanguages() {
      return this.profileInfoFromDB.languages.natural
        .find((language) => language.natural.value == true);
    },
  },

  methods: {
    editInformation() {
      if (this.editInfo == false) {
        this.profileInfos = {
          userName: this.profileInfoFromDB.userName,
          githubUsername: null,
          firstName: this.profileInfoFromDB.firstName,
          lastName: this.profileInfoFromDB.lastName,
          class: this.profileInfoFromDB.class,
          mentor: false,
          role: this.profileInfoFromDB.role,
          gender: this.profileInfoFromDB.role,
          birthday: null,
          location: this.profileInfoFromDB.location,
          jobTitle: this.profileInfoFromDB.jobTitle,
          company: this.profileInfoFromDB.company,
        };

        this.editInfo = true;
      } else {
        this.editInfo = false;
        this.profileInfos = null;
      }
    },
    editLang() {
      if (this.editLanguages == false) {
        this.profileLanguages = {
          languages:
        {
          natural: [
            {
              name: 'English',
              value: false,
            },
            {
              name: 'German',
              value: false,
            },
            {
              name: 'Spanish',
              value: false,
            },
            {
              name: 'Mandarin',
              value: false,
            },
            {
              name: 'Italian',
              value: false,
            },
            {
              name: 'French',
              value: false,
            },
            {
              name: 'Croatian',
              value: false,
            },
            {
              name: 'Polish',
              value: false,
            },
            {
              name: 'Russian',
              value: false,
            },
            {
              name: 'Portuguese',
              value: false,
            },
            {
              name: 'Hebrew',
              value: false,
            },
            {
              name: 'Japanese',
              value: false,
            },
            {
              name: 'Arabic',
              value: false,
            },
          ],
          technical:
           [
             {
               name: 'HTML',
               value: false,
             },
             {
               name: 'CSS',
               value: false,
             },
             {
               name: 'JavaScript',
               value: false,
             },
             {
               name: 'SQL',
               value: false,
             },
             {
               name: 'JSON',
               value: false,
             },
             {
               name: 'Markdown',
               value: false,
             },
             {
               name: 'Vue',
               value: false,
             },
             {
               name: 'Java',
               value: false,
             },
             {
               name: 'C',
               value: false,
             },
             {
               name: 'C++',
               value: false,
             },
             {
               name: 'TypeScript',
               value: false,
             },
             {
               name: 'Python',
               value: false,
             },
             {
               name: 'Rust',
               value: false,
             },
             {
               name: 'REST',
               value: false,
             },
             {
               name: 'Cypress',
               value: false,
             },
             {
               name: 'Express',
               value: false,
             },
           ],
        },
        };
        this.editLanguages = true;
      } else {
        this.editLanguages = false;
        this.profileLanguages = null;
      }
    },
    editQuestions() {
      if (this.editAbout == false) {
        this.editAbout = true;
      } else {
        this.editAbout = false;
      }
    },
    editBasic() {
      if (this.editInfo == false) { this.ediInfo = true; } else {
        this.editInfo = false;
      }
    },
    editSocialLinks() {
      if (this.editSocial == false) {
        this.profileSocial = {
          facebook: this.profileInfoFromDB.facebook,
          linkedin: this.profileInfoFromDB.linkedin,
          instagram: this.profileInfoFromDB.instagram,
        };
        this.editSocial = true;
      } else {
        this.editSocial = false;
      }
    },
    editHobby() {
      if (this.editHobbies == false) { this.editHobbies = true; } else {
        this.editHobbies = false;
      }
    },
    editProject() {
      if (this.editProjects == false) { this.editProjects = true; } else {
        this.editProjects = false;
      }
    },
    async commitToDB(updatedProperties) {
      console.log(this.profileInfoFromDB.id);
      await db.collection('profiles').doc(this.profileInfoFromDB.id).update(updatedProperties);
      this.editLanguages = false;
      this.editAbout = false;
      this.editInfo = false;
      this.editSocial = false;
      this.editHobbies = false;
      this.editProjects = false;
    },
  },
};
</script>

<style scoped>

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
