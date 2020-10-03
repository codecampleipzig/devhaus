<template>
  <div>
    <h1>Create Event</h1>
    <input
      v-model="event.title"
      type="text"
      placeholder="add event title"
      required
    >
    <input
      v-model="event.description"
      type="text"
      placeholder="add event description"
    >
    <datepicker
      v-model="event.startDate"

      name="uniquename"
    />
    <datepicker
      v-model="event.endDate"

      name="uniquename"
    />
    <v-select
      :options="times"
    />
    <v-select
      :options="location"
      :value="event.location"
      @input="location => updateLocation(location)"
    />
    <div>{{ event.location }}</div>
    <div v-if="event.location == 'online'|| event.location == 'hybrid'">
      <h2>Link to your meeting</h2>
      <input
        v-model="event.link"
        type="text"
        placeholder="add event link e.g. Zoom"
      >
    </div>
    <div v-if="event.location == 'local'|| event.location == 'hybrid'">
      <h2>event address</h2>
      <input
        v-model="event.address"
        type="text"
        placeholder="add place and street of the event"
      >
    </div>
    <div>{{ $store.state.user.uid }}</div>
    <div>{{ event.creator }}</div>
  </div>
</template>

<script>
import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
// Took over from select tutorial

Vue.component('v-select', vSelect);
// Transfer to Main.js ask Gabe?

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      date: new Date(),

      times: this.createTimes(),

      location: ['online', 'local', 'hybrid'],

      event: {
        creator: null,
        title: 'Test Event Title',
        description: 'Test Event Description',
        startDate: new Date(),
        startTime: '',
        endDate: new Date(),
        endTime: '',
        location: '',
        link: '',
        address: '',

      },

    };
  },
  mounted() {
    this.event.creator = this.$store.state.user.uid;
  },

  methods: {
    createTimes() {
      const res = [];
      for (let index = 0; index < 24; index += 1) {
        let hours = index;
        if (hours.length < 2) {
          hours = `0${hours}`;
        }
        for (let i = 0; i < 46; i += 15) {
          let min = i;
          if (min == 0) {
            min = '00';
          } // if statement
          res.push(`${hours}:${min}`);
        } // For Loop minutes
      } // For Loop Hours
      return res;
    }, // createTimes
    updateLocation(location) {
      this.event.location = location;
    },

  },

}; // Export

</script>

<style>

</style>
