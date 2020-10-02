<template>
  <div>
    <h3>logged in as {{ $store.state.user.email }}</h3>
    <button @click="$store.dispatch('signOut')">
      Logout
    </button>
    <form @submit.prevent="submit">
      <input
        v-model="userInfo.userName"
        type="text"
        placeholder="User Name (optional)"
      ><input
        v-model="userInfo.githubUsername"
        type="text"
        placeholder="Github Username"
        required
      >
      <input
        v-model="userInfo.firstName"
        type="text"
        placeholder="First Name"
        required
      >
      <input
        v-model="userInfo.lastName"
        type="text"
        placeholder="Last Name"
        required
      >
      <input
        v-model="userInfo.class"
        type="number"
        placeholder="Class #"
      > <input
        v-model="userInfo.gender"
        type="text"
        placeholder="Gender (optional)"
      > <input
        v-model="userInfo.birthday"
        type="date"
        placeholder="Birthday (optional)"
      > <input
        v-model="userInfo.location"
        type="text"
        placeholder="Location (optional)"
      >
      <input type="submit">
      <button @click="enter">
        Enter
      </button>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userInfo: {
        userName: null,
        githubUsername: null,
        firstName: null,
        lastName: null,
        class: null,
        role: null,
        gender: null,
        birthday: null,
        location: null,
        jobTitle: null,
        company: null,
        hobbies: [],
        languages: [
          {
            natural: {},
          },
          {
            technical: {},
          },
        ],
        questions: [
          {
            id: 1,
            qA: {
              question: 'Why do you love coding?',
              answer: 'Because it\'s fun!',
            },

          },
          {
            id: 2,
            qA: {
              question: 'Why are you here?',
              answer: 'I don\'t quite know!',
            },

          },
        ],
        projects: [
          {
            title: 'My Project',
            URL: '',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(['user', 'profile']),
  },
  methods: {
    async submit() {
      await db.collection('profiles').add({
        userId: this.user.uid,
        userEmail: this.user.email,
        userName: this.userInfo.userName,
        githubUsername: this.userInfo.githubUsername,
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        classNumber: this.userInfo.class,
        gender: this.userInfo.gender,
        birthday: this.userInfo.birthday,
        location: this.userInfo.location,
        role: this.userInfo.role,
        languages: this.userInfo.languages,
        questions: this.userInfo.questions,
        hobbies: this.userInfo.hobbies,
        projects: this.userInfo.projects,
        jobTitle: this.userInfo.jobTitle,
        company: this.userInfo.company,
      });
      this.$router.push({ name: 'Home' });
      this.userInfo.userName = '';
      this.userInfo.githubUsername = '';
      this.userInfo.firstName = '';
      this.userInfo.lastName = '';
      this.userInfo.class = '';
      this.userInfo.gender = '';
      this.userInfo.birthday = '';
      this.userInfo.location = '';
    },
  },
};
</script>

<style scoped>

</style>
