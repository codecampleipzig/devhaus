<template>
  <div>
    <div class="m-40 text-3xl">
      <h1>Community</h1>
      <div
        v-for="(profile, index) in profiles"
        :key="index"
      >
        <h3>{{ profile.profileName }}</h3>
        <div class="image">
          <img :src="profile.photo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import exampleProfiles from '@/example-profiles';

export default {
  name: 'Community',
  data() {
    return {
      profiles: exampleProfiles,

    };
  },
};
</script>

<style scoped>

</style>
