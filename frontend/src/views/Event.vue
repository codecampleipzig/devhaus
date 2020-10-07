<template>
  <div>
    <div v-if="eventFromDB">
      <h1>{{ eventFromDB.title }}</h1>
      <p>{{ eventFromDB.description }}</p>
      <p>
        From {{ moment(eventFromDB.start.toDate()).format("ddd D.MMM HH:mm") }} to
        {{ moment(eventFromDB.end.toDate()).format("ddd D.MMM HH:mm") }}
      </p>
      <p>{{ eventFromDB.location }}</p>
      <font-awesome-icon
        v-if="myEvent"
        id="icon"
        icon="edit"
        title="Edit Event"
        @click="editMyEvent"
      />
      <p>{{ eventFromDB }}</p>
    </div>
    <div v-if="myEvent">
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
            <h2>Start</h2>
            <DateTimePicker v-model="event.start" @input="adjustEndTime" />
            <!--Closing startDateTime-->
          </div>
          <div class="w-1/2 flex flex-col">
            <h2>End</h2>
            <DateTimePicker v-model="event.end" />
            <!--Closing endDateTime-->
          </div>
        </div>
        <v-select
          v-model="event.location"
          :options="location"
          :value="event.location"
          placeholder="enter location type"
          @input="location => updateLocation(location)"
          class="my-4"
        />
        <div v-if="event.location == 'online' || event.location == 'hybrid'" class="mb-4">
          <h2>Link to your meeting</h2>
          <input
            v-model="event.link"
            type="text"
            placeholder="add event link e.g. Zoom"
            class="w-full"
          />
        </div>
        <div v-if="event.location == 'local' || event.location == 'hybrid'" class="mb-4">
          <h2>event address</h2>
          <input
            v-model="event.address"
            type="text"
            placeholder="add place and street of the event"
            class="w-full"
          />
        </div>
        <input type="submit" class="button mt-4" value="Create event" />
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DateTimePicker from "@/components/DateTimePicker.vue";
import { db } from "@/firebase";

export default {
  data() {
    return {
      times: this.createTimes(),
      location: ["online", "local", "hybrid"],
      event: null,
      editEvent: false
    };
  },
  components: {
    DateTimePicker
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    eventFromDB() {
      return this.$store.state.events.find(event => event.id == this.id);
    },
    myEvent() {
      return this.eventFromDB && this.eventFromDB.creatorId == this.$store.state.user.uid
        ? true
        : false;
    }
  },
  methods: {
    editMyEvent() {
      if (!this.editEvent) {
        this.editEvent = true;
        this.event = this.eventFromDB;
      } else {
        this.editEvent = false;
      }
    },
    moment(date) {
      return moment(date);
    },
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
      await db.collection("events").add({ ...this.event, creatorId: this.$store.state.user.uid });
      this.$store.dispatch("notify", { type: "info", text: "Your event has been created" });
      await this.$router.push({ name: "Calendar" });
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

<style scoped></style>
