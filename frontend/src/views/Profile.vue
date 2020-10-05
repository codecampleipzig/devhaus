<template>
  <div class="p-4">
    <div class="profile-picture">
      <input
        ref="imageInput"
        class="invisible"
        @change="uploadImage($event)"
        type="file"
        name="profilePicture"
        accept="image/*"
      />
    </div>
    <!-- <button @click="uploadImage">Upload!</button> -->
    <section class="flex space-x-4 mb-4">
      <div class="w-64" @click="$refs.imageInput.click()">
        <img
          class="bg-gray-100 object-cover"
          style="padding-top: 100%;"
          :src="profileInfoFromDB.avatar"
          alt=""
        />
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
      <div class="info">
        <div v-if="!editInfo">
          <h1>{{ profileInfoFromDB.firstName }} {{ profileInfoFromDB.lastName }}</h1>
          <p>{{ $store.state.user.email }}</p>
          <p class="role">Class #{{ profileInfoFromDB.class }}</p>
          <p>{{ profileInfoFromDB.githubUsername }}</p>
          <p>{{ profileInfoFromDB.gender }}</p>
          <p>{{ profileInfoFromDB.birthday }}</p>
          <p>{{ profileInfoFromDB.location }}</p>
          <p>{{ profileInfoFromDB.role }}</p>
          <p v-if="profileInfoFromDB.mentor">
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
            />
            <input
              v-model="profileInfos.lastName"
              type="text"
              name="last name"
              placeholder="Last Name"
            />
            <input
              v-model="profileInfos.location"
              type="text"
              name="location"
              placeholder="Location"
            />
            <input v-model="profileInfos.gender" type="text" name="gender" placeholder="Gender" />
            <input v-model="profileInfos.role" type="text" name="role" placeholder="Role" />
            <label for="mentor">Mentor</label>
            <input v-model="profileInfos.mentor" type="checkbox" name="mentor" />
            <input type="submit" />
          </form>
        </div>
      </div>
      <font-awesome-icon
        v-if="myProfile"
        id="icon"
        icon="edit"
        title="Edit profile"
        @click="editInformation"
      />
    </section>
    <section>
      <h2>About Me</h2>
      <div v-if="!editAbout">
        <p>{{ profileInfoFromDB.about }}</p>
      </div>
      <form v-if="editAbout" @submit.prevent="commitToDB({ about: profileAbout })">
        <textarea
          id="about"
          v-model="profileAbout"
          rows="4"
          columns="20"
          :placeholder="profileInfoFromDB.about"
        />
        <input type="submit" />
      </form>
      <font-awesome-icon
        v-if="myProfile"
        id="icon"
        icon="edit"
        title="Edit section"
        @click="editAboutMe"
      />
    </section>
    <section>
      <div id="social">
        <h2 class="mt-2">
          Social Links
        </h2>
        <a :href="profileInfoFromDB.facebook">
          <font-awesome-icon
            v-if="profileInfoFromDB.facebook"
            class="m-3"
            :icon="['fab', 'facebook-f']"
          />
        </a>
        <a :href="profileInfoFromDB.linkedin">
          <font-awesome-icon
            v-if="profileInfoFromDB.linkedin"
            class="m-3"
            :icon="['fab', 'linkedin']"
          />
        </a>
        <a :href="profileInfoFromDB.instagram">
          <font-awesome-icon
            v-if="profileInfoFromDB.instagram"
            class="m-3"
            :icon="['fab', 'instagram']"
          />
        </a>
        <font-awesome-icon
          v-if="myProfile"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editSocialLinks"
        />
        <form v-if="editSocial" @submit.prevent="commitToDB(profileSocial)">
          <input v-model="profileSocial.facebook" type="text" placeholder="Facebook" />
          <input v-model="profileSocial.linkedin" type="text" placeholder="LinkedIn" />
          <input v-model="profileSocial.instagram" type="text" placeholder="Instagram" />
          <input type="submit" />
          <form />
        </form>
      </div>
      <div id="languages">
        <h2 class="mt-2">
          Languages
        </h2>
        <p>Technical:</p>
        <div v-for="language in profileInfoFromDB.techLanguages" :key="language">
          <p>{{ language }},</p>
        </div>
        <font-awesome-icon
          v-if="myProfile"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editTechLang"
        />
        <form
          v-if="editTechLanguages"
          @submit.prevent="
            commitToDB({
              techLanguages: profileTechLanguages
                .filter(language => language.value)
                .map(language => language.name)
            })
          "
        >
          <div v-for="language in profileTechLanguages" :key="language.name">
            <input
              v-model="language.value"
              type="checkbox"
              :true-value="true"
              :false-value="false"
            />
            <label :for="language.name"> {{ language.name }}</label>
          </div>
          <input type="submit" />
        </form>
        <p>Natural:</p>
        <div v-for="language in profileInfoFromDB.natLanguages" :key="language">
          <p>{{ language }},</p>
        </div>
        <form
          v-if="editNatLanguages"
          @submit.prevent="
            commitToDB({
              natLanguages: profileNatLanguages
                .filter(language => language.value)
                .map(language => language.name)
            })
          "
        >
          <div v-for="language in profileNatLanguages" :key="language.name">
            <input
              v-model="language.value"
              type="checkbox"
              :true-value="true"
              :false-value="false"
            />
            <label :for="language.name"> {{ language.name }}</label>
          </div>
          <input type="submit" />
        </form>
        <font-awesome-icon
          v-if="myProfile"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editNatLang"
        />
      </div>
      <div id="hobbies">
        <h2 class="mt-2">
          Hobbies
        </h2>
        <div v-for="hobby in profileInfoFromDB.hobbies" :key="hobby">
          <p>
            {{ hobby }}
          </p>
        </div>
        <form
          v-if="editHobbies"
          @submit.prevent="
            commitToDB({
              hobbies: profileHobbies.filter(hobby => hobby.value).map(hobby => hobby.name)
            })
          "
        >
          <div v-for="hobby in profileHobbies" :key="hobby.name">
            <input v-model="hobby.value" type="checkbox" :true-value="true" :false-vale="false" />
            <label :for="hobby.name"> {{ hobby.name }} </label>
          </div>
          <input type="submit" />
        </form>
        <font-awesome-icon
          v-if="myProfile"
          id="icon"
          icon="edit"
          title="Edit section"
          @click="editHobby"
        />
      </div>
    </section>
    <section v-if="myProfile == false" class="contact">
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

const natLanguages = [
  "English",
  "German",
  "Spanish",
  "Mandarin",
  "Italian",
  "French",
  "Croatian",
  "Polish",
  "Arabic",
  "Portuguese",
  "Hebrew",
  "Japanese"
];
const techLanguages = [
  "HTML",
  "CSS",
  "JavaScript",
  "Vue",
  "React",
  "Angular",
  "Cypress",
  "Express",
  "SQL",
  "JSON",
  "Markdown",
  "Java",
  "C",
  "C++",
  "Rust",
  "TypeScript",
  "Python",
  "REST"
];
const hobbies = [
  "Hiking",
  "Running",
  "Swimming",
  "Writing",
  "Yoga",
  "Reading",
  "Coding",
  "Music",
  "Knitting",
  "Sleeping"
];
export default {
  name: "Profile",

  data() {
    return {
      imageFile: null,
      profileInfos: null,
      profileTechLanguages: null,
      profileNatLanguages: null,
      profileAbout: null,
      profileHobbies: null,
      profileSocial: {
        facebook: "",
        instagram: "",
        linkedin: ""
      },

      editInfo: false,
      editNatLanguages: false,
      editTechLanguages: false,
      editAbout: false,
      editSocial: false,
      editHobbies: false
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
    profileInfoFromDB() {
      const profileUID = this.userId;
      return this.profiles.find(profile => profile.id == profileUID);
    },
    myProfile() {
      return this.$route.params.userId == this.$store.state.user.uid;
    }
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
          mentor: this.profileInfoFromDB.mentor,
          role: this.profileInfoFromDB.role,
          gender: this.profileInfoFromDB.role,
          birthday: this.profileInfoFromDB.birthday,
          location: this.profileInfoFromDB.location,
          jobTitle: this.profileInfoFromDB.jobTitle,
          company: this.profileInfoFromDB.company
        };

        this.editInfo = true;
      } else {
        this.editInfo = false;
        this.profileInfos = null;
      }
    },
    editNatLang() {
      if (this.editNatLanguages == false) {
        this.profileNatLanguages = natLanguages.map(language => ({
          name: language,
          value: this.profileInfoFromDB.natLanguages.includes(language)
        }));
        this.editNatLanguages = true;
      } else {
        this.editNatLanguages = false;
        this.profileNatLanguages = null;
      }
    },
    editTechLang() {
      if (this.editTechLanguages == false) {
        this.profileTechLanguages = techLanguages.map(language => ({
          name: language,
          value: this.profileInfoFromDB.techLanguages.includes(language)
        }));
        this.editTechLanguages = true;
      } else {
        this.editTechLanguages = false;
        this.profileTechLanguages = null;
      }
    },
    editSocialLinks() {
      if (this.editSocial == false) {
        this.profileSocial = {
          facebook: this.profileInfoFromDB.facebook,
          linkedin: this.profileInfoFromDB.linkedin,
          instagram: this.profileInfoFromDB.instagram
        };
        this.editSocial = true;
      } else {
        this.editSocial = false;
      }
    },
    editHobby() {
      if (this.editHobbies == false) {
        this.profileHobbies = hobbies.map(hobby => ({
          name: hobby,
          value: this.profileInfoFromDB.hobbies.includes(hobby)
        }));
        this.editHobbies = true;
      } else {
        this.editHobbies = false;
        this.profileHobbies = null;
      }
    },
    editAboutMe() {
      if (this.editAbout == false) {
        this.profileAbout = this.profileInfoFromDB.about;
        this.editAbout = true;
      } else {
        this.editAbout = false;
        this.profileAbout = null;
      }
    },
    async commitToDB(updatedProperties) {
      await db
        .collection("profiles")
        .doc(this.profileInfoFromDB.id)
        .set(updatedProperties, { merge: true });
      this.editNatLanguages = false;
      this.editTechLanguages = false;
      this.editAbout = false;
      this.editInfo = false;
      this.editSocial = false;
      this.editHobbies = false;
      this.editProjects = false;
    },
    async uploadImage(event) {
      this.imageFile = event.target.files[0];

      const imageName = `${this.profileInfo.userId}`;
      const storageRef = storage.ref();

      const profileImageRef = storageRef.child(`avatar/${imageName}`);
      this.imageFile = profileImageRef.getDownloadURL();
    }
  }
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
