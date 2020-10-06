<template>
  <div class="flex flex-row justify-evenly">
    <router-link :to="{ name: 'AllEvents', params: { whose: 'my-events' } }">Yours</router-link>
    <section class="view-all-events">
      <h1 class="m-6 justify-center text-center text-3xl font-medium border-b border-black pb-2 ">
        Upcoming Events
      </h1>
      <div
        class="m-6 leading-8 border-black border-b p-2"
        v-for="event in sortedAllEvents"
        :key="event.id"
      >
        <h1 class="font-bold">{{ event.title }}</h1>
        <h2>
          <font-awesome-icon :icon="['fa', 'compass']"></font-awesome-icon> {{ event.location }}
        </h2>
        <p>
          From {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} to
          {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
        </p>
        <p class="m-1 italic">{{ event.description }}</p>
      </div>
    </section>
    <section v-if="eventsMode == 'my-events'" class="view-your-events">
      <h1>Your Events</h1>
      <div class="m-3" v-for="event in sortedMyEvents" :key="event.id">
        <h1 class="font-bold">{{ event.title }}</h1>
        <h2>
          <font-awesome-icon :icon="['fa', 'compass']"></font-awesome-icon> {{ event.location }}
        </h2>
        <p>
          From {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} to
          {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
        </p>
        <p class="m-1 italic">{{ event.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    eventsMode() {
      this.$route.params.whose;
    },
    eventFilter() {
      this.eventsMode = "all" ? "all" : "my-events";
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
