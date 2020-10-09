<template>
  <div>
    <portal to="sidebar">
      <Profile v-if="selectedProfileId" :userId="selectedProfileId"></Profile>
    </portal>
    <div class="px-4 py-8 pb-16">
      <portal to="header">
        <input
          v-model.trim="search"
          type="text"
          name="search"
          class="search max-w-lg text-lg"
          placeholder="Search"
        />
      </portal>

      <main class="profile-grid md:p-4 gap-4 md:gap-8">
        <div v-for="(profile, i) in results" :key="i">
          <div
            class="w-full relative cursor-pointer"
            style="padding-top: 100%"
            @click="selectProfile(profile)"
          >
            <img
              class="absolute top-0 left-0 w-full h-full bg-gray-100 flex-shrink-0 object-cover"
              style=""
              :src="profile.item.avatar"
            />
          </div>
          <div class="mt-2">
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
            <div class="flex space-x-2 mt-4 text-xl">
              <a
                v-if="profile.item.githubUsername"
                :href="`https://github.com/${profile.item.githubUsername}`"
                ><font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon
              ></a>
              <a v-if="profile.item.facebook" :href="profile.item.facebook"
                ><font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon
              ></a>
              <a v-if="profile.item.linkedin" :href="profile.item.linkedin"
                ><font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon
              ></a>
              <a v-if="profile.item.instagram" :href="profile.item.instagram"
                ><font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon
              ></a>
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
import Profile from "@/views/Profile.vue";

export default {
  name: "Members",
  components: {
    Profile
  },
  data() {
    return {
      selectedProfileId: null,
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
    selectProfile(profile) {
      this.selectedProfileId = profile.item.id;
      this.$store.commit("SHOW_SIDEBAR");
    },
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
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}

.search {
  @apply border-0 bg-gray-100 w-screen max-w-md py-1;
}
</style>
