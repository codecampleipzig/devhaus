<template>
  <div>
    <div class="px-4">
      <header class="flex flex-col mb-2 sticky top-0 w-full bg-white py-4">
        <input
          v-model.trim="search"
          type="text"
          name="search"
          class="max-w-lg text-lg"
          placeholder="Search"
        />
      </header>
      <main class="profile-grid">
        <div v-for="(profile, i) in results" :key="i" class="py-4">
          <router-link
            class="w-full"
            :to="{ name: 'Profile', params: { userId: profile.item.id } }"
          >
            <div class="w-48 h-48">
              <img
                class="w-full h-full bg-gray-100 flex-shrink-0 object-cover"
                style=""
                :src="profile.item.avatar"
              />
            </div>
          </router-link>
          <div class="m-2">
            <h2 class="font-bold text-xl mt-2 pb-1 border-b-4 border-teal-800 mb-2">
              <span
                class="inline-block m-0"
                v-for="(segment, index) in getHighlights(
                  profile.item.name,
                  profile.matches && profile.matches.find(match => match.key == 'name')
                )"
                :key="segment.text + index + profile.item.id"
                :class="{
                  'text-teal-500': segment.match
                }"
              >
                {{
                  segment.text
                    .split("")
                    .map(l => (l == " " ? "\xa0" : l))
                    .join("")
                }}
              </span>
            </h2>
            <div class="flex space-x-2 mt-4">
              <a href="https://github.com"
                ><font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon
              ></a>
              <a href=""><font-awesome-icon :icon="['fa', 'envelope']"></font-awesome-icon></a>
            </div>
          </div>
        </div>
      </main>
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
    newProfiles() {
      return this.profiles.map(profile => ({
        ...profile,
        name: `${profile.firstName} ${profile.lastName}`,
        id: profile.id
      }));
    },
    results() {
      if (!this.fuse || this.search == "") {
        return this.newProfiles.map(profile => ({ item: profile }));
      }
      const collection = this.newProfiles;
      this.fuse.setCollection(collection);
      return this.fuse.search(this.search);
    }
  },
  created() {
    const options = {
      includeScore: true,
      includeMatches: true,
      threshold: 0.5,
      keys: ["name"]
    };
    this.fuse = new Fuse(this.newProfiles, options);
  },
  methods: {
    getHighlights(string, match) {
      if (!match) {
        return [
          {
            text: string,
            match: false
          }
        ];
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
            match: false
          });
          break;
        }
        const [matchStart, matchEnd] = nextMatch;

        if (nextMatch[0] > index) {
          segments.push({
            text: string.slice(index, matchStart),
            match: false
          });
          index = matchStart;
        } else {
          segments.push({
            text: string.slice(matchStart, matchEnd + 1),
            match: true
          });
          currentIndices += 1;
          index = matchEnd + 1;
        }
      }

      return segments;
    }
  }
};
</script>

<style scoped>
.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
