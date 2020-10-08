<template>
  <div class="flex flex-row justify-evenly mt-8">
    <div class="m-8 text-1xl ">
      <h1 class="m-6 justify-center text-3xl font-medium border-b border-black pb-2 ">
        New Event
      </h1>
      <form class="flex flex-col" @submit.prevent="submit">
        <input
          v-model="event.title"
          type="text"
          placeholder="Event Title"
          required
          class="mb-4 leading-8 border-black border-b p-2"
        />
        <input
          v-model="event.description"
          type="text"
          placeholder="Event Description"
          class="mb-4 leading-8 border-black border-b p-2"
        />
        <div class="flex gap-2">
          <div class="w-1/2 flex flex-col">
            <h2>Event start:</h2>
            <DateTimePicker v-model="event.start" @input="adjustEndTime" />
          </div>
          <div class="w-1/2 flex flex-col">
            <h2>Event end:</h2>
            <DateTimePicker v-model="event.end" />
          </div>
        </div>
        <v-select
          v-model="event.location"
          :options="location"
          :value="event.location"
          placeholder="Select location type:"
          @input="location => updateLocation(location)"
          class="my-4"
        />
        <div v-if="event.location == 'Online' || event.location == 'Hybrid'" class="mb-4">
          <h2>Link to your meeting</h2>
          <input
            v-model="event.link"
            type="text"
            placeholder="Add the event link e.g. Zoom"
            class="w-full"
          />
        </div>
        <div v-if="event.location == 'Local' || event.location == 'Hybrid'" class="mb-4">
          <h2>Address</h2>
          <input
            v-model="event.address"
            type="text"
            placeholder="Add the address of the event"
            class="w-full"
          />
        </div>
        <input type="submit" class="button mt-4" value="Create event" />
      </form>
      <router-link class="button mt-4" :to="{ name: 'AllEvents', params: { whose: 'all-events' } }">
        View All Events
      </router-link>
    </div>
  </div>
</template>

<script>
import DateTimePicker from "@/components/DateTimePicker.vue";
import { db } from "@/firebase";
import moment from "moment";

export default {
  components: {
    DateTimePicker
  },
  data() {
    return {
      times: this.createTimes(),
      location: ["online", "local", "hybrid"],
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
          }
          res.push(`${hours}:${min}`);
        }
      }
      return res;
    },
    updateLocation(location) {
      this.event.location = location;
    },
    async submit() {
      this.$nprogress.start();
      await db.collection("events").add({ ...this.event, creatorId: this.$store.state.user.uid });
      this.$nprogress.done();
      this.event = this.createEmptyEvent();
      this.$store.dispatch("notify", { type: "info", text: "Your event has been created" });
      await this.$router.push({ name: "Calendar" });
    },
    createEmptyEvent() {
      return {
        title: "",
        description: "",
        start: new Date(),
        end: new Date(),
        location: "",
        link: "",
        address: ""
      };
    },
    adjustEndTime() {
      if (this.event.start.getTime() > this.event.end.getTime()) {
        this.event.end = moment(this.event.start)
          .add(1, "hours")
          .toDate();
      }
      return;
    }
  }
};
</script>

<style></style>
