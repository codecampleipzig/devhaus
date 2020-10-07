<template>
  <div class="devhaus-theme flex flex-row justify-evenly mt-8">
    <div class="m-8 text-1xl ">
      <h1 class="m-6 justify-center text-3xl font-medium border-b border-black pb-2 ">
        Create Event
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
            <h2>Start Date</h2>

            <datepicker v-model="event.startDate" class="mb-4 border-black" />

            <v-select
              v-model="event.startTime"
              :options="times"
              placeholder="Select Start Time"
              @input="adjustEndTime(event.startTime)"
            />

            <!--Closing startDateTime-->
          </div>
          <div class="w-1/2 flex flex-col">
            <h2>End Date</h2>
            <div>
              <datepicker v-model="event.endDate" class="mb-4 border-black" />
              <v-select
                v-model="event.endTime"
                :options="times"
                :autoscroll="true"
                placeholder="Select End Time"
              />
            </div>
          </div>
        </div>
        <v-select
          v-model="event.location"
          :options="location"
          :value="event.location"
          placeholder="Select Location Type"
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
      location: ["Online", "Local", "Hybrid"],
      multipleDays: false,
      successMsg: "",
      event: this.createEmptyEvent(),
      //Test Data for adjustEndTime()
      passedStartTime: "",
      newHours: "Before Function",
      newMinutes: ""
    };
  },
  computed: {
    start() {
      const [startHour, startMinutes] = this.event.startTime.split(":").map(Number);

      return moment(this.event.startDate)
        .hour(startHour)
        .minute(startMinutes)
        .seconds(0);
    },
    end() {
      const [endHour, endMinutes] = this.event.endTime.split(":").map(Number);

      return moment(this.event.endDate)
        .hour(endHour)
        .minute(endMinutes)
        .seconds(0);
    }
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
    },
    setEnd(time) {
      this.event.endDate = time.toDate();
      this.event.endTime = time.format("H:mm");
    },

    adjustEndTime() {
      if (this.event.endTime) {
        return;
      }
      this.setEnd(this.start.add(1, "hours"));
    }
  }
}; // Export
</script>

<style>
.devhaus-theme .vs__dropdown-toggle {
  @apply rounded-none border border-black py-2 px-2 font-medium;
}

.devhaus-theme .vs__selected-option {
  @apply text-black font-medium;
}

.devhaus-theme .vs__open-indicator {
  @apply cursor-pointer;
}
</style>
