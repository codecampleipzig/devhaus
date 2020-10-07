<template>
  <div class="flex justify-center w-screen max-w-screen-md mx-auto">
    <div class="m-8 text-1xl ">
      <h1>Create Event</h1>
      <form @submit.prevent="submit">
        <input v-model="event.title" type="text" placeholder="Event Title" required class="block" />
        <input
          v-model="event.description"
          type="text"
          placeholder="Event Description"
          class="block"
        />
        <div class="flex justify-content items-center border-2">
          <div name="start" class="">
            <h2>Start</h2>
            <DateTimePicker v-model="eventStart" />
            <!--Closing startDateTime-->
          </div>
          <!--Closing start-->
          <div name="end" class="">
            <h2>End</h2>
            <DateTimePicker v-model="eventEnd" />
            <!--Closing endDateTime-->
          </div>
          <!--Closing end-->
        </div>
        <!--Closing dateAndTimePicker-->
        <v-select
          v-model="event.location"
          :options="location"
          :value="event.location"
          placeholder="enter location type"
          @input="location => updateLocation(location)"
        />
        <div>{{ event.location }}</div>
        <div v-if="event.location == 'online' || event.location == 'hybrid'">
          <h2>Link to your meeting</h2>
          <input v-model="event.link" type="text" placeholder="add event link e.g. Zoom" />
        </div>
        <div v-if="event.location == 'local' || event.location == 'hybrid'">
          <h2>event address</h2>
          <input
            v-model="event.address"
            type="text"
            placeholder="add place and street of the event"
          />
        </div>
        <input type="submit" />
      </form>
      <div>{{ successMsg }}</div>
    </div>
  </div>
</template>

<script>
import DateTimePicker from "@/components/DateTimePicker.vue";
import { db } from "@/firebase";

export default {
  components: {
    DateTimePicker
  },
  data() {
    return {
      times: this.createTimes(),

      location: ["online", "local", "hybrid"],

      multipleDays: false,

      successMsg: "",
      eventStart: new Date(),
      eventEnd: new Date(),
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
        start = this.eventStart,
        end = this.eventEnd,
        location,
        link,
        address
      } = this.event;

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
    }
  }
};
</script>

<style></style>
