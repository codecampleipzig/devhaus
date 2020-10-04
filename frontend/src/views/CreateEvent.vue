<template>
  <div class="flex justify-center">
    <div class="flex-row justify-center m-8 text-1xl ">
      <h1>Create Event</h1>
      <form
        @submit.prevent="submit"
      >
        <input
          v-model="event.title"
          type="text"
          placeholder="add event title"
          required
          class="block"
        >
        <input
          v-model="event.description"
          type="text"
          placeholder="add event description"
          class="block"
        >
        <div
          name="dateAndTimePicker"
          class="flex justify-content items-center border-2 w-100"
        >
          <div
            name="start"
            class="border-2"
          >
            <h2>Start</h2>
            <div
              name="startDateTime"
              class="border-2"
            >
              <br>
              <datepicker
                v-model="event.startDate"

                name="start Date"
              />
              <br>
              <v-select
                v-model="event.startTime"
                :options="times"
                placeholder="enter start time"
              />
            </div><!--Closing startDateTime-->
          </div><!--Closing start-->
          <div
            name="end"
            class="border-2"
          >
            <h2>End</h2>
            <div
              name="endDateTime"
              class="border-2"
            >
              <br>
              <datepicker
                v-if="multipleDays"
                v-model="event.endDate"
                name="uniquename"
              />
              <br>
              <v-select
                v-model="event.endTime"
                :options="times"
                :autoscroll="true"
                placeholder="enter closing time"
              />
            </div><!--Closing endDateTime-->
          </div><!--Closing end-->
        </div><!--Closing dateAndTimePicker-->
        <span>Multiple Days: {{ checked }} </span>
        <input
          id="checkbox1"
          v-model="multipleDays"
          type="checkbox"
          value="Multiple Days"
        >

        <v-select
          v-model="event.location"
          :options="location"
          :value="event.location"
          placeholder="enter location type"
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
        <input type="submit">
      </form>
      <div>{{ successMsg }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
// Took over from select tutorial
import { db } from '@/firebase';

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

      multipleDays: false,

      successMsg: '',

      event: this.createEmptyEvent(),

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
    async submit() {
      await db.collection('events').add({
        ...this.event,
        userId: this.$store.state.user.uid,
      });
      this.event = this.createEmptyEvent();
      // await this.$router.push({ name: 'Calender' });
      this.successMsg = 'Your Event has been saved';
    },
    createEmptyEvent() {
      return {
        creator: null,
        title: '',
        description: '',
        startDate: new Date(),
        startTime: '',
        endDate: new Date(),
        endTime: '',
        location: '',
        link: '',
        address: '',
      };
      // this.successMsg = "",
    },
  },

}; // Export

</script>

<style>

</style>
