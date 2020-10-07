<template>
  <div class="flex flex-col">
    <transition name="slide"
      ><div
        @click="selectEvent(null)"
        v-if="selectedEvent"
        class="fixed h-full right-0 top-0 bg-white w-full max-w-lg border-l"
      >
        <button class="button">x</button>
        <div class="flex flex-col justify-center m-6">
          <h1 class="border-b-4 border-teal-800 m-8 p-2 text-center font-bold text-3xl">
            {{ selectedEvent.title }}
          </h1>
          <div class="leading-10">
            <p class="font-medium text-2xl">
              <font-awesome-icon class="mr-2" :icon="['fa', 'calendar-day']"></font-awesome-icon>
              {{ moment(selectedEvent.start.toDate()).format("ddd D.MMM HH:mm") }} -
              {{ moment(selectedEvent.end.toDate()).format("ddd D.MMM HH:mm") }}
            </p>
            <p class="text-2xl">
              <font-awesome-icon class="mr-2" :icon="['fa', 'compass']"></font-awesome-icon
              >{{ selectedEvent.location }}
            </p>
            <p class="m-6 italic text-2xl">{{ selectedEvent.description }}</p>
          </div>
        </div>
      </div></transition
    >
    <div class="flex flex-row justify-between text-center">
      <h1
        v-if="eventsMode == 'all-events'"
        class="m-10 text-3xl font-medium border-b-4 border-teal-800"
      >
        Upcoming Events
      </h1>
      <h1
        v-if="eventsMode == 'my-events'"
        class="m-10 text-3xl font-medium border-b-4 border-teal-800"
      >
        Your Events
      </h1>
      <div class="m-10 flex flex-col text-center">
        <router-link class="button mb-4 hover:opacity-75" :to="{ name: 'CreateEvent' }">
          Create New Event
        </router-link>
        <router-link
          class="button hover:opacity-75"
          v-if="eventsMode == 'all-events'"
          :to="{ name: 'AllEvents', params: { whose: 'my-events' } }"
          >Your Events</router-link
        >
        <router-link
          class="button hover:opacity-75"
          v-if="eventsMode == 'my-events'"
          :to="{ name: 'AllEvents', params: { whose: 'all-events' } }"
          >All Events</router-link
        >
      </div>
    </div>
    <section
      class="flex flex-grid justify-evenly flex-wrap max-h-screen m-5"
      v-if="eventsMode == 'all-events'"
    >
      <div
        @click="selectEvent(event)"
        class="leading-8 border-b-4 border-teal-800 m-8 p-2"
        v-for="event in sortedAllEvents"
        :key="event.id"
      >
        <h1 class="font-bold m-2 text-2xl">{{ event.title }}</h1>

        <h2>
          <font-awesome-icon :icon="['fa', 'compass']"></font-awesome-icon> {{ event.location }}
        </h2>
        <p>
          <font-awesome-icon :icon="['fa', 'calendar-day']"></font-awesome-icon>
          {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} -
          {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
        </p>
      </div>
    </section>

    <section
      v-if="eventsMode == 'my-events'"
      class="flex flex-grid justify-evenly flex-wrap max-h-screen m-5"
    >
      <div
        @click="selectEvent(event)"
        class="leading-8 border-b-4 border-teal-800 m-8 p-2"
        v-for="event in sortedMyEvents"
        :key="event.id"
      >
        <h1 class="font-bold m-2 text-2xl">{{ event.title }}</h1>

        <h2>
          <font-awesome-icon :icon="['fa', 'compass']"></font-awesome-icon> {{ event.location }}
        </h2>
        <p>
          <font-awesome-icon :icon="['fa', 'calendar-day']"></font-awesome-icon>
          {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} -
          {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      sidebarShown: true,
      selectedEvent: null
    };
  },
  created() {
    this.$store.dispatch("bindEvents");
  },
  computed: {
    eventsMode() {
      return this.$route.params.whose;
    },
    eventFilter() {
      return this.eventsMode == "all-events" ? "all-events" : "my-events";
    },
    allEventsFilter() {
      return this.allEvents;
    },
    sortedAllEvents() {
      const events = this.$store.state.events.slice();
      events.sort((a, b) => {
        return a.start.seconds - b.start.seconds;
      });
      return events.filter(this.allEventsFilter);
    },
    myEventsFilter() {
      return this.myEvents;
    },
    sortedMyEvents() {
      const events = this.$store.state.events.slice();
      events.sort((a, b) => {
        return a.start.seconds - b.start.seconds;
      });
      return events.filter(this.myEventsFilter);
    }
  },
  methods: {
    selectEvent(event) {
      this.selectedEvent = event;
    },
    allEvents() {
      return true;
    },
    myEvents(event) {
      return event.creatorId == this.$store.state.user.uid;
    },
    eventId(event) {
      return event.id == this.$store.state.event.id;
    },
    moment(date) {
      return moment(date);
    }
  }
};
</script>

<style scoped>
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 1s ease-in-out;
}
</style>
