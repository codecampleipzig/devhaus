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
        hobbies: [
          {
            name: 'Hiking',
            value: false,
          },
          {
            name: 'Reading',
            value: false,
          },
          {
            name: 'Swimming',
            value: false,
          },
          {
            name: 'Rowing',
            value: false,
          },
          {
            name: 'Gaming',
            value: false,
          },
          {
            name: 'Music',
            value: false,
          },
          {
            name: 'Cooking',
            value: false,
          },
          {
            name: 'Knitting',
            value: false,
          },
          {
            name: 'Painting',
            value: false,
          },
          {
            name: 'Travelling',
            value: false,
          },
          {
            name: 'Movies',
            value: false,
          },
          {
            name: 'Writing',
            value: false,
          },
          {
            name: 'Bouldering',
            value: false,
          },
          {
            name: 'Complaining',
            value: false,
          },
          {
            name: 'Coding',
            value: false,
          },
          {
            name: 'Sports',
            value: false,
          }],
        languages:
        {
          natural: [
            {
              name: 'English',
              value: false,
            },
            {
              name: 'German',
              value: false,
            },
            {
              name: 'Spanish',
              value: false,
            },
            {
              name: 'Mandarin',
              value: false,
            },
            {
              name: 'Italian',
              value: false,
            },
            {
              name: 'French',
              value: false,
            },
            {
              name: 'Croatian',
              value: false,
            },
            {
              name: 'Polish',
              value: false,
            },
            {
              name: 'Russian',
              value: false,
            },
            {
              name: 'Portuguese',
              value: false,
            },
            {
              name: 'Hebrew',
              value: false,
            },
            {
              name: 'Japanese',
              value: false,
            },
            {
              name: 'Arabic',
              value: false,
            },
          ],
          technical:
           [
             {
               name: 'HTML',
               value: false,
             },
             {
               name: 'CSS',
               value: false,
             },
             {
               name: 'JavaScript',
               value: false,
             },
             {
               name: 'SQL',
               value: false,
             },
             {
               name: 'JSON',
               value: false,
             },
             {
               name: 'Markdown',
               value: false,
             },
             {
               name: 'Vue',
               value: false,
             },
             {
               name: 'Java',
               value: false,
             },
             {
               name: 'C',
               value: false,
             },
             {
               name: 'C++',
               value: false,
             },
             {
               name: 'TypeScript',
               value: false,
             },
             {
               name: 'Python',
               value: false,
             },
             {
               name: 'Rust',
               value: false,
             },
             {
               name: 'REST',
               value: false,
             },
             {
               name: 'Cypress',
               value: false,
             },
             {
               name: 'Express',
               value: false,
             },
           ],
        },
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
        ...this.userInfo,
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
