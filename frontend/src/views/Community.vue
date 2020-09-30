<template>
  <div>
    <div class="m-40 text-3xl">
      <h1>Community</h1>
      <input
        v-model="search"
        type="text"
        class="bg-gray-400"
      >
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js';
import Profiles from '../example-profiles';

export default {
  name: 'Community',
  data() {
    return {
      fuse: null,
      profiles: Profiles,
      result: [],
      search: '',
    };
  },
  watch: {
    search() {
      if (this.search.trim() === '') {
        this.result = this.profiles;
      } else {
        this.result = this.fuse.search(this.search.trim());
      }
    },
  },
  mounted() {
    const options = {
      includeScore: true,
      keys: ['profileName', 'firstName', 'lastName', 'email', 'role', 'userlanguages', 'currentProjects.name'],
    };
    this.fuse = new Fuse(this.profiles, options);
    this.result = this.profiles;
  },
};
</script>

<style scoped>

</style>
