<template>
  <div class="flex justify-center flex-col">
    <div>
      <RSVP :id="id" />
    </div>
    <div class="flex justify-end text-2xl mt-4 mr-16">
      <font-awesome-icon
        v-if="myEvent"
        id="icon"
        icon="edit"
        title="Edit Event"
        @click="editMyEvent"
      />
    </div>
    <div class="m-10 flex flex-col justify-center" v-if="eventFromDB">
      <h1 class="border-b-4 border-teal-800 m-8 p-2 text-center font-bold m-2 text-3xl">
        {{ eventFromDB.title }}
      </h1>
      <div class="space-y-4">
        <p class="italic text-2xl">{{ eventFromDB.description }}</p>
        <p>
          <font-awesome-icon :icon="['fa', 'calendar-day']"></font-awesome-icon>
          {{ moment(eventFromDB.start.toDate()).format("ddd D.MMM HH:mm") }} -
          {{ moment(eventFromDB.end.toDate()).format("ddd D.MMM HH:mm") }}.
        </p>

        <p>
          <font-awesome-icon :icon="['fa', 'compass']"></font-awesome-icon>
          {{ eventFromDB.address }}
        </p>
      </div>

      <div class="flex flex-col w-1/2">
        <button @click="$store.commit('HIDE_SIDEBAR')" class="button mt-12 ">
          <router-link :to="{ name: 'AllEvents', params: { whose: 'all-events' } }">
            View All Events
          </router-link>
        </button>
        <button @click="$store.commit('HIDE_SIDEBAR')" class="button mt-3">
          <router-link :to="{ name: 'Calendar' }">Calendar</router-link>
        </button>
      </div>
    </div>
    <div v-if="editEvent" class="flex flex-row justify-evenly m-4">
      <div class="mb-8 text-1xl ">
        <h1 class="m-6 justify-center text-3xl font-medium border-b border-black pb-2 ">
          Update Event
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
              <h2>Start</h2>
              <DateTimePicker v-model="event.start" @input="adjustEndTime" />
            </div>
            <div class="w-1/2 flex flex-col">
              <h2>End</h2>
              <DateTimePicker v-model="event.end" />
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
          <input type="submit" class="button mt-4" value="Update event" />
        </form>
        <div>
          <button class="button mt-4 w-full" @click="deleteEventPrompt">Delete event</button>
          <template v-if="eventRemove">
            <h2 class="m-4 text-center text-1xl font-medium">
              Are you sure you would like to delete this event?
            </h2>
            <div>
              <button class="button mt-4 w-full" @click="deleteEvent">
                Yes, delete this event.
              </button>
              <button class="button mt-4 w-full" @click="deleteEventPrompt">
                No, I do not want to delete it.
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RSVP from "@/components/RSVP.vue";
import moment from "moment";
import DateTimePicker from "@/components/DateTimePicker.vue";
import { db } from "@/firebase";
import store from "@/store";

export default {
  name: "Event",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      times: this.createTimes(),
      location: ["online", "local", "hybrid"],
      event: null,
      editEvent: false,
      eventRemove: false
    };
  },
  components: {
    DateTimePicker,
    RSVP
  },
  computed: {
    eventFromDB() {
      return this.$store.state.events.find(event => event.id == this.id);
    },
    myEvent() {
      return this.eventFromDB && this.eventFromDB.creatorId == this.$store.state.user.uid
        ? true
        : false;
    }
  },
  async created() {
    if (!store.state.events.find(event => event.id == this.id)) {
      await store.dispatch("bindEvents");
    }
  },
  methods: {
    editMyEvent() {
      if (!this.editEvent) {
        this.editEvent = true;
        const start = this.eventFromDB.start.toDate();
        const end = this.eventFromDB.end.toDate();
        this.event = { ...this.eventFromDB, start, end };
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
      await db
        .collection("events")
        .doc(this.eventFromDB.id)
        .set({ ...this.event }, { merge: true });
      this.editEvent = false;
      this.$store.dispatch("notify", { type: "info", text: "Your event has been updated" });
    },
    adjustEndTime() {
      if (this.event.start.getTime() > this.event.end.getTime()) {
        this.event.end = moment(this.event.start)
          .add(1, "hours")
          .toDate();
      }
      return;
    },
    deleteEventPrompt() {
      if (!this.eventRemove) {
        this.eventRemove = true;
      } else {
        this.eventRemove = false;
      }
    },
    async deleteEvent() {
      await db
        .collection("events")
        .doc(this.eventFromDB.id)
        .delete();
      this.$store.commit("HIDE_SIDEBAR");
      this.$store.dispatch("notify", {
        type: "info",
        text: "Your event has been successfully deleted."
      });
    }
  }
};
</script>

<style></style>
