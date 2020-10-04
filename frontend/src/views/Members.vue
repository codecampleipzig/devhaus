<template>
  <div>
    <div class="m-40 text-3xl">
      <h1>Members</h1>
      <input
        v-model.trim="search"
        type="text"
        class="bg-gray-600"
      >
      <div
        v-for="(profile, i) in results"
        :key="i"
        class="profiles"
      >
        <div class="profile">
          <img
            class="image"
            :src="profile.item.photo"
          >
          <div
            class="infoContainer"
          >
            <h3>{{ profile.item.firstName }} {{ profile.item.lastName }}</h3>

            <div class="role">
              {{ profile.item.class }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Fuse from 'fuse.js';
import { mapState } from 'vuex';

export default {
  name: 'Members',
  data() {
    return {
      fuse: null,
      search: '',
    };
  },
  computed: {
    ...mapState(['profiles']),
    results() {
      if (!this.fuse || this.search == '') {
        return this.profiles.map((profile) => ({ item: profile }));
      }
      const collection = this.getSearchCollection();
      this.fuse.setCollection(collection);
      return this.fuse.search(this.search);
    },
  },
  created() {
    const options = {
      includeScore: true,
      includeMatches: true,
      threshold: 0.5,
      keys: ['name', 'firstName', 'lastName'],
    };
    this.fuse = new Fuse(this.profiles, options);
  },
  methods: {
    getSearchCollection() {
      return this.profiles.map((profile) => ({
        ...profile,
        name: `${profile.firstName} ${profile.lastName}`,
      }));
    },
  },
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
