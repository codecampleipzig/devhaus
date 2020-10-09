<template>
  <div>
    <portal to="header"
      ><div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <router-link
            class="button text-sm py-2 px-4"
            :to="{ name: 'AllEvents', params: { whose: 'all-events' } }"
            :class="{
              'button-inverse': eventsMode != 'all-events'
            }"
            >All Events</router-link
          >
          <router-link
            class="button text-sm py-2 px-4"
            :to="{ name: 'AllEvents', params: { whose: 'my-events' } }"
            :class="{
              'button-inverse': eventsMode != 'my-events'
            }"
            >My Events</router-link
          >
        </div>
        <div class="flex space-x-4 items-center">
          <router-link
            class="button hover:opacity-75 text-sm py-2 px-4"
            :to="{ name: 'CreateEvent' }"
          >
            New Event
          </router-link>
        </div>
      </div>
    </portal>
    <portal to="sidebar">
      <Event v-if="selectedEventId" :id="selectedEventId"></Event>
    </portal>
    <div>
      <section class="m-8">
        <div
          @click="selectEvent(event)"
          class="max-w-screen-sm leading-8 border-b pb-8 border-opacity-25 border-teal-800 mb-12 cursor-pointer"
          v-for="event in sortedEvents"
          :key="event.id"
        >
          <div class="flex">
            <h1 class="font-bold mb-2 border-b-4 border-teal-900 pb-1 text-2xl">
              {{ event.title }}
            </h1>
          </div>
          <p>
            <font-awesome-icon :icon="['fa', 'calendar-day']"></font-awesome-icon>
            {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} -
            {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
          </p>
          <h2>
            <font-awesome-icon :icon="['fa', 'compass']"></font-awesome-icon> {{ event.address }}
          </h2>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Event from "@/components/Event.vue";

export default {
  name: "all Events",
  components: {
    Event
  },
  data() {
    return {
      selectedEventId: null
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
    sortedEvents() {
      const events = this.$store.state.events.slice();
      events.sort((a, b) => {
        return a.start.seconds - b.start.seconds;
      });
      return events.filter(this.eventsMode == "all-events" ? this.allEvents : this.myEvents);
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
      this.selectedEventId = event.id;
      this.$store.commit("SHOW_SIDEBAR");
    },
    allEvents(event) {
      return moment.unix(event.start.seconds).diff(moment()) > 0;
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

<style scoped></style>
