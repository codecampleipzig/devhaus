<template>
  <div class="flex flex-row justify-evenly mt-8">
    <div class="m-8 text-1xl ">
      <h1 class="m-6 justify-center text-3xl font-medium border-b border-black pb-2 ">
        Create Event
      </h1>
      <form @submit.prevent="submit">
        <input
          v-model="event.title"
          type="text"
          placeholder="Event Title"
          required
          class="m-6 leading-8 border-black border-b p-2"
        />
        <input
          v-model="event.description"
          type="text"
          placeholder="Event Description"
          class="m-6 leading-8 border-black border-b p-2"
        />
        <div class="flex justify-evenly items-center m-0">
          <div class="flex flex-col">
            <h2>Start</h2>
            <datepicker v-model="event.startDate" class="mb-4 border-black" />
            <v-select
              v-model="event.startTime"
              :options="times"
              placeholder="enter start time"
              class="border-black"
            />
          </div>
          <div class="flex flex-col">
            <h2>End</h2>
            <div>
              <datepicker v-model="event.endDate" class="mb-4 border-black" />
              <v-select
                class="border-black"
                v-model="event.endTime"
                :options="times"
                :autoscroll="true"
                placeholder="enter closing time"
              />
            </div>
          </div>
        </div>
        <v-select
          v-model="event.location"
          :options="location"
          :value="event.location"
          placeholder="enter location type"
          @input="location => updateLocation(location)"
          class="my-4 mx-8"
        />
        <div
          v-if="event.location == 'online' || event.location == 'hybrid'"
          class="m-6 leading-8 border-black"
        >
          <h2>Link to your meeting</h2>
          <input
            v-model="event.link"
            type="text"
            placeholder="add event link e.g. Zoom"
            class="w-10/12"
          />
        </div>
        <div v-if="event.location == 'local' || event.location == 'hybrid'" class="m-6 leading-8">
          <h2>event address</h2>
          <input
            v-model="event.address"
            type="text"
            placeholder="add place and street of the event"
            class="w-10/12"
          />
        </div>
        <input type="submit" />
      </form>
      <div>{{ successMsg }}</div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { db } from "@/firebase";
import moment from "moment";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      times: this.createTimes(),

      location: ["online", "local", "hybrid"],

      multipleDays: false,

      successMsg: "",

      event: this.createEmptyEvent()
    };
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
            min = "00";
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
      const {
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        location,
        link,
        address
      } = this.event;

      const [startHour, startMinutes] = startTime.split(":").map(Number);
      const [endHour, endMinutes] = endTime.split(":").map(Number);

      const start = moment(startDate)
        .hour(startHour)
        .minute(startMinutes)
        .toDate();
      const end = moment(endDate)
        .hour(endHour)
        .minute(endMinutes)
        .toDate();

      await db.collection("events").add({
        title,
        description,
        start,
        end,
        location,
        link,
        address,
        creatorId: this.$store.state.user.uid
      });
      this.event = this.createEmptyEvent();
      this.$store.dispatch("notify", { type: "info", text: "Your event has been created" });
      await this.$router.push({ name: "Calendar" });
    },
    createEmptyEvent() {
      return {
        title: "",
        description: "",
        startDate: new Date(),
        startTime: "",
        endDate: new Date(),
        endTime: "",
        location: "",
        link: "",
        address: ""
      };
      // this.successMsg = "",
    }
  }
}; // Export
</script>

<style></style>
