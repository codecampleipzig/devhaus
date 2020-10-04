<template>
  <div>
    <div class="m-40 text-3xl">
      <h1>Members</h1>
      <input v-model="search" type="text" class="bg-gray-600" />
      <div v-for="profile in results" :key="profile.id" class="profiles">
        <div class="profile">
          <img class="image" :src="profile.photo" />
          <div class="infoContainer">
            <h3>{{ profile.firstName }} {{ profile.lastName }}</h3>

            <div class="role">
              {{ profile.class }}
            </div>
          </div>
          <!--Closing info Container -->
        </div>
        <!-- Closing profile -->
      </div>
      <!-- Closing profiles -->
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import { mapState } from "vuex";

export default {
  name: "Members",
  data() {
    return {
      fuse: null,

      search: ""
    };
  },
  computed: {
    ...mapState(["profiles"]),
    results() {
      if (!this.fuse || this.search == "") {
        return this.profiles;
      }
      return this.fuse.search(this.search.trim()).map(result => result.item);
    }
  },
  created() {
    const options = {
      includeScore: true,
      keys: [
        "profileName",
        "firstName",
        "lastName",
        "email",
        "role",
        "userlanguages",
        "currentProjects.name"
      ]
    };
    this.fuse = new Fuse(this.profiles, options);
  }
};
</script>

<style scoped>
.profiles {
  display: flex;
  flex-flow: row;
  text-align: center;
  margin: 0 auto;
  padding: 1rem;
  justify-content: center;
}

.profile {
  width: 200px;
  font-size: 1rem;
  border-color: #159ed4;
  border-style: solid;
  border-width: 3px;
  background-color: #fefeff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image {
  width: 100px;
  height: 100px;
  border-style: solid;
  border-width: 0.1rem;
  border-color: black;
  margin: 0 auto;
  text-align: center;
}

.infoContainer {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-around;
}
</style>
