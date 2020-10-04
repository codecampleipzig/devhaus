<template>
  <div>
    <div class="m-40 text-3xl">
      <h1>Members</h1>
      <button @click="highlight">
        Highlight
      </button>
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
            <div>
              <span
                v-for="(segment, index) in getHighlights(profile.item.firstName
                                                         , profile.matches && profile.matches.find
                                                           (match => match.key =='firstName'))"
                :key="segment.text + index + profile.item.userId"
                class="inline-block m-0"
                :class="{
                  'text-blue-500': segment.match
                }"
              >
                {{ segment.text }}
              </span>
            </div>
            <div ref="firstName" />
            <h3>{{ profile.item.lastName }}</h3>

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
      keys: ['firstName'],
    };
    this.fuse = new Fuse(this.profiles, options);
  },
  methods: {
    getHighlights(string, match) {
      if (!match) {
        return [{
          text: string,
          match: false,
        }];
      }
      const segments = [];
      let index = 0;
      let currentIndices = 0;
      const { indices } = match;
      while (index < string.length) {
        const nextMatch = indices[currentIndices];
        if (!nextMatch) {
          segments.push({
            text: string.slice(index),
            match: false,
          });
          break;
        }
        const [matchStart, matchEnd] = nextMatch;

        if (nextMatch[0] > index) {
          segments.push({
            text: string.slice(index, matchStart),
            match: false,
          });
          index = matchStart;
        } else {
          segments.push({
            text: string.slice(matchStart, matchEnd + 1),
            match: true,
          });
          currentIndices += 1;
          index = matchEnd + 1;
        }
      }

      return segments;
    },
    getSearchCollection() {
      return this.profiles.map((profile) => ({
        ...profile,
        name: `${profile.firstName} ${profile.lastName}`,
      }));
    },
    highlight() {
      const searchResults = this.results;
      const firstMatchedIndex = searchResults[0].matches[0].indices[0][0];
      const lastMatchedInedex = searchResults[0].matches[0].indices[0][1];

      // const splitFirstName = searchResults[0].item.firstName.split('');

      // for (let i = 0; i < splitFirstName.length; i += 1) {
      //   if (i >= firstMatchedIndex && i <= lastMatchedInedex) {
      //     const span = document.createElement('span');
      //     span.innerHTML = i;
      //     this.$refs.firstName.appendChild(span);
      //   }
      // }

      console.log(searchResults);
      console.log(firstMatchedIndex);
      console.log(lastMatchedInedex);
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
