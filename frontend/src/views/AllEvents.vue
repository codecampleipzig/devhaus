<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-col items-center">
      <h1
        v-if="eventsMode == 'all-events'"
        class="m-6 text-3xl font-medium border-b-4 border-teal-800 pb-2 "
      >
        Upcoming Events
      </h1>
      <section
        class="flex justify-center flex-grid flex-wrap max-h-screen m-5"
        v-if="eventsMode == 'all-events'"
      >
        <div
          class="leading-8 border-b-4 border-teal-800 m-6 p-2"
          v-for="event in sortedAllEvents"
          :key="event.id"
        >
          <router-link :to="{ name: 'Event' }">
            <h1 class="hover:font-bold m-2 text-2xl">{{ event.title }}</h1>
          </router-link>
          <h2>
            <font-awesome-icon :icon="['fa', 'compass']"></font-awesome-icon> {{ event.location }}
          </h2>
          <p>
            <font-awesome-icon :icon="['fa', 'calendar-day']"></font-awesome-icon>
            {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} -
            {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
          </p>
          <p class="m-1 italic">{{ event.description }}</p>
        </div>
      </section>
      <h1
        v-if="eventsMode == 'my-events'"
        class="m-6 text-3xl font-medium border-b-4 border-teal-800 pb-2 "
      >
        Your Events
      </h1>
      <section
        v-if="eventsMode == 'my-events'"
        class="flex justify-center flex-grid flex-wrap max-h-screen m-5"
      >
        <div
          class="leading-8 border-b-4 border-teal-800 m-6 p-2"
          v-for="event in sortedMyEvents"
          :key="event.id"
        >
          <h1 class="hover:font-bold m-2 text-2xl">{{ event.title }}</h1>
          <h2>
            <font-awesome-icon :icon="['fa', 'compass']"></font-awesome-icon> {{ event.location }}
          </h2>
          <p>
            <font-awesome-icon :icon="['fa', 'calendar-day']"></font-awesome-icon>
            {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} -
            {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
          </p>
          <p class="m-1 italic">{{ event.description }}</p>
        </div>
      </section>
    </div>
    <div class="m-8 flex flex-col text-center">
      <router-link
        class="button"
        v-if="eventsMode == 'all-events'"
        :to="{ name: 'AllEvents', params: { whose: 'my-events' } }"
        >Your Events</router-link
      >
      <router-link
        class="button"
        v-if="eventsMode == 'my-events'"
        :to="{ name: 'AllEvents', params: { whose: 'all-events' } }"
        >All Events</router-link
      >
      <router-link class="button mt-4 " :to="{ name: 'CreateEvent' }">
        New Event
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
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
    allEvents() {
      return true;
    },
    myEvents(event) {
      return event.creatorId == this.$store.state.user.uid;
    },
    moment(date) {
      return moment(date);
    }
  }
};
</script>

<style scoped></style>
