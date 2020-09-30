<template>
  <div>
    <div class="m-40 text-3xl">
      <h1>Community</h1>
      <div
        v-for="(profile, index) in profiles"
        :key="index"
        class="profiles"
      >
        <div class="profile">
          <img
            class="image"
            :src="profile.photo"
          >
          <div class="infoContainer">
            <h3>{{ profile.profileName }}</h3>
            <div class="role">
              {{ profile.role }}
            </div>
            <div class="role">
              {{ profile.userClass }}
            </div>
          </div><!--Closing info Container -->
        </div><!-- Closing profile -->
      </div><!-- Closing profiles -->
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

.imageHolder {
  max-width: 1024px;
  display: flex;
  flex-flow: wrap;
  text-align: center;
  margin: 0 auto;
  padding: 1rem;
  justify-content: center;
}

.profileDescription {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-around;
}

</style>
