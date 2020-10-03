<template>
  <div>
    <h1>Create Event</h1>
    <input
      v-model="event.title"
      type="text"
      placeholder="Event Title"
      required
    >
    <datepicker
      v-model="event.startDate"

      name="uniquename"
    />
    <v-select
      :options="times"
    />
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

      event: {
        title: 'Test Event Title',
        description: 'Test Event Description',
        startDate: new Date(),
        startTime: '',
        endDate: new Date(),
        endTime: '',
        location: {
          online: true,
          local: false,
          hybrid: false,
        },

      },

    };
  }, // data

  methods: {
    createTimes() {
      const res = [];
      for (let index = 0; index < 24; index + 1) {
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
  }, // methods

}; // Export

</script>

<style>

</style>
