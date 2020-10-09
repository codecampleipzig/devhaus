<template>
  <div class="m-8 mt-16">
    <section class="flex space-x-4">
      <div @click="$refs.imageInput.click()" class="w-48 h-48">
        <img
          class="bg-gray-100 object-cover rounded-sm h-full w-full"
          :src="profileInfoFromDB.avatar"
          alt=""
        />
      </div>
      <div class="info border-b leading-8">
        <div v-if="!editInfo">
          <h1 class="text-3xl font-bold ">
            {{ profileInfoFromDB.firstName }} {{ profileInfoFromDB.lastName }}
          </h1>
          <a
            v-if="profileInfoFromDB.githubUsername"
            :href="`https://github.com/${profileInfoFromDB.githubUsername}`"
            ><p>
              <font-awesome-icon class="mr-1" :icon="['fab', 'github']" />{{
                profileInfoFromDB.githubUsername
              }}
            </p></a
          >
          <p class="role" v-if="profileInfoFromDB.class != 99">
            <font-awesome-icon class="mr-1" :icon="['fa', 'graduation-cap']"></font-awesome-icon>
            Class #{{ profileInfoFromDB.class }} {{ profileInfoFromDB.role }}
          </p>
          <p v-if="profileInfoFromDB.class == 99">{{ profileInfoFromDB.role }}</p>
          <p>
            <font-awesome-icon class="mr-1" :icon="['fa', 'briefcase']"></font-awesome-icon>
            {{ profileInfoFromDB.jobTitle }}
            <span v-if="profileInfoFromDB.company">at {{ profileInfoFromDB.company }}</span>
          </p>
          <p>
            <font-awesome-icon class="mr-1" :icon="['fa', 'compass']"></font-awesome-icon
            >{{ profileInfoFromDB.location }}
          </p>
          <p>{{ profileInfoFromDB.gender }}</p>
          <p>{{ profileInfoFromDB.birthday }}</p>
          <p v-if="profileInfoFromDB.mentor">
            Mentor
          </p>
        </div>
        <div v-else>
          <div class="hidden">
            <input
              ref="imageInput"
              @change="uploadImage($event)"
              type="file"
              name="profilePicture"
              accept="image/*"
            />
          </div>
          <form class="flex flex-col space-y-2" @submit.prevent="commitToDB(profileInfos)">
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
              v-model="profileInfos.githubUsername"
              type="text"
              name="github username"
              placeholder="GitHub Username"
            />
            <input v-model="profileInfos.role" type="text" name="role" placeholder="Role" />
            <input
              v-model="profileInfos.jobTitle"
              type="text"
              name="jobTitle"
              placeholder="Job Title"
            />
            <input
              v-model="profileInfos.company"
              type="text"
              name="company"
              placeholder="Company"
            />
            <input
              v-model="profileInfos.location"
              type="text"
              name="location"
              placeholder="Location"
            />
            <input v-model="profileInfos.gender" type="text" name="gender" placeholder="Gender" />

            <div class="flex flex-col space-x-2">
              <label for="mentor">Mentor</label>
              <input v-model="profileInfos.mentor" type="checkbox" name="mentor" />
            </div>
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
    <div class="flex flex-grid flex-wrap">
      <section class="flex flex-col mt-8 w-64">
        <h2 class="text-2xl font-medium border-b border-teal-800">
          About Me
          <font-awesome-icon
            class="text-sm"
            v-if="myProfile"
            id="icon"
            icon="edit"
            title="Edit section"
            @click="editAboutMe"
          />
        </h2>
        <div v-if="!editAbout">
          <p class="leading-normal mt-3">{{ profileInfoFromDB.about }}</p>
        </div>
        <form
          class="flex flex-col justify-center"
          v-if="editAbout"
          @submit.prevent="commitToDB({ about: profileAbout })"
        >
          <textarea
            class="border border-black m-4"
            id="about"
            v-model="profileAbout"
            rows="6"
            columns="30"
            :placeholder="profileInfoFromDB.about"
          />
          <input class="p-1" type="submit" />
        </form>
      </section>

      <section class="flex mt-8 flex-col w-64">
        <div id="social">
          <h2 class="text-2xl font-medium border-b border-teal-800">
            Social Links
            <font-awesome-icon
              class="text-sm"
              v-if="myProfile"
              id="icon"
              icon="edit"
              title="Edit section"
              @click="editSocialLinks"
            />
          </h2>
          <div class="flex justify-evenly mt-4">
            <a :href="profileInfoFromDB.facebook">
              <font-awesome-icon
                v-if="profileInfoFromDB.facebook != ''"
                class="m-3 text-3xl"
                :icon="['fab', 'facebook-f']"
              />
            </a>
            <a :href="profileInfoFromDB.linkedin">
              <font-awesome-icon
                v-if="profileInfoFromDB.linkedin != ''"
                class="m-3 text-3xl"
                :icon="['fab', 'linkedin']"
              />
            </a>
            <a :href="profileInfoFromDB.instagram">
              <font-awesome-icon
                v-if="profileInfoFromDB.instagram != ''"
                class="m-3 text-3xl"
                :icon="['fab', 'instagram']"
              />
            </a>
          </div>
          <form
            class="mt-4 flex flex-col justify-center space-y-3"
            v-if="editSocial"
            @submit.prevent="validateLinks({ facebook, linkedin, instagram })"
          >
            <input
              class="border border-black p-1"
              v-model.trim="facebook"
              type="url"
              placeholder="Facebook"
              @blur="$v.facebook.$touch()"
            />
            <input
              class="border border-black p-1"
              v-model.trim="linkedin"
              type="url"
              placeholder="LinkedIn"
              @blur="$v.linkedin.$touch()"
            />
            <input
              class="border border-black p-1"
              v-model.trim="instagram"
              type="url"
              placeholder="Instagram"
              @blur="$v.instagram.$touch()"
            />
            <input class="p-1" type="submit" />
          </form>
        </div>
      </section>
    </div>
    <div class="md:flex flex-grid">
      <section class="flex mt-8 flex-col w-64">
        <div id="languages">
          <h2 class="text-2xl font-medium border-b border-teal-800">
            Languages
          </h2>

          <div class="flex flex-col">
            <div>
              <p class="font-bold mt-3 border-b w-1/3 border-black ">
                Technical
                <font-awesome-icon
                  class="text-sm"
                  v-if="myProfile"
                  id="icon"
                  icon="edit"
                  title="Edit section"
                  @click="editTechLang"
                />
              </p>
              <div class="mt-3 flex flex-row flex-wrap space-x-2">
                <div v-for="language in profileInfoFromDB.techLanguages" :key="language">
                  <p>{{ language }},</p>
                </div>
              </div>

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
                <div
                  class="mt-2 space-x-1"
                  v-for="language in profileTechLanguages"
                  :key="language.name"
                >
                  <input
                    v-model="language.value"
                    type="checkbox"
                    :true-value="true"
                    :false-value="false"
                  />
                  <label :for="language.name"> {{ language.name }}</label>
                </div>
                <input class="w-full p-1 mt-3" type="submit" />
              </form>
            </div>

            <div>
              <p class="font-bold border-b w-1/3 border-black mt-3">
                Natural
                <font-awesome-icon
                  v-if="myProfile"
                  id="icon"
                  icon="edit"
                  title="Edit section"
                  @click="editNatLang"
                />
              </p>

              <div class="mt-3 flex flex-row flex-wrap space-x-2">
                <div v-for="language in profileInfoFromDB.natLanguages" :key="language">
                  <p>{{ language }},</p>
                </div>
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
                <div
                  class="mt-2 space-x-1"
                  v-for="language in profileNatLanguages"
                  :key="language.name"
                >
                  <input
                    v-model="language.value"
                    type="checkbox"
                    :true-value="true"
                    :false-value="false"
                  />
                  <label :for="language.name"> {{ language.name }}</label>
                </div>
                <input class="w-full p-1 mt-3" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </section>
      <section class="flex mt-8 flex-col w-64">
        <div id="hobbies">
          <h2 class="text-2xl font-medium border-b border-teal-800">
            Hobbies
            <font-awesome-icon
              class="text-sm"
              v-if="myProfile"
              id="icon"
              icon="edit"
              title="Edit section"
              @click="editHobby"
            />
          </h2>
          <div class="mt-3 flex flex-row flex-wrap space-x-2">
            <div v-for="hobby in profileInfoFromDB.hobbies" :key="hobby">
              <p>{{ hobby }},</p>
            </div>
          </div>
          <form
            v-if="editHobbies"
            @submit.prevent="
              commitToDB({
                hobbies: profileHobbies.filter(hobby => hobby.value).map(hobby => hobby.name)
              })
            "
          >
            <div class="mt-2 space-x-1" v-for="hobby in profileHobbies" :key="hobby.name">
              <input v-model="hobby.value" type="checkbox" :true-value="true" :false-vale="false" />
              <label :for="hobby.name"> {{ hobby.name }} </label>
            </div>
            <input type="submit" />
          </form>
        </div>
      </section>
    </div>
    <section v-if="!myProfile" class="contact flex mt-8 flex-col md:justify-left">
      <div class="contact-form">
        <h2 class="text-2xl font-medium ">Contact</h2>
        <textarea
          id="message"
          class="resize-none p-4 mt-2 border border-black"
          name="message"
          cols="30"
          rows="8"
          placeholder="Your message..."
        />
        <button class="button mt-4">
          Send
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db, storage } from "@/firebase";
import { url } from "vuelidate/lib/validators";

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
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imageFile: null,
      profileInfos: null,
      profileTechLanguages: null,
      profileNatLanguages: null,
      profileAbout: null,
      profileHobbies: null,
      facebook: "",
      instagram: "",
      linkedin: "",
      editInfo: false,
      editNatLanguages: false,
      editTechLanguages: false,
      editAbout: false,
      editSocial: false,
      editHobbies: false
    };
  },
  validations: {
    facebook: { url },
    linkedin: { url },
    instagram: { url }
  },
  computed: {
    ...mapState(["profiles", "user"]),
    avatar() {
      return this.profileImagesRef.getDownloadURL();
    },
    profileInfoFromDB() {
      const profileUID = this.userId;
      return this.profiles.find(profile => profile.id == profileUID);
    },
    myProfile() {
      return this.userId == this.$store.state.user.uid;
    }
  },

  methods: {
    editInformation() {
      if (this.editInfo == false) {
        this.profileInfos = {
          userName: this.profileInfoFromDB.userName,
          githubUsername: this.profileInfoFromDB.githubUsername,
          firstName: this.profileInfoFromDB.firstName,
          lastName: this.profileInfoFromDB.lastName,
          class: this.profileInfoFromDB.class,
          mentor: this.profileInfoFromDB.mentor,
          role: this.profileInfoFromDB.role,
          gender: this.profileInfoFromDB.gender,
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
        this.facebook = this.profileInfoFromDB.facebook;
        this.linkedin = this.profileInfoFromDB.linkedin;
        this.instagram = this.profileInfoFromDB.instagram;
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
    validateLinks(updatedProperties) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$store.dispatch("notify", { type: "error", text: "Please enter a valid URL." });
      } else {
        this.commitToDB(updatedProperties);
      }
    },
    async commitToDB(updatedProperties) {
      await db
        .collection("profiles")
        .doc(this.profileInfoFromDB.id)
        .set(updatedProperties, { merge: true });
      this.$store.dispatch("notify", { type: "info", text: "Your profile has been updated." });
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

      const imageName = `${this.profileInfoFromDB.id}`;
      const storageRef = storage.ref();

      const profileImageRef = storageRef.child(`avatar/${imageName}`);
      try {
        await profileImageRef.put(this.imageFile);
        console.log("Successful upload");
      } catch (error) {
        console.log(error);
      }
      let imageURL = await profileImageRef.getDownloadURL();
      console.log(imageURL);
      try {
        await db
          .collection("profiles")
          .doc(this.profileInfoFromDB.id)
          .update({ avatar: imageURL });
        console.log("Set image in profile");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.button {
  @apply border border-black py-2 px-6 text-center font-bold cursor-pointer;
}
</style>
