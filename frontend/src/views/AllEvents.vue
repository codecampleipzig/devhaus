<template>
  <div>
    View All Events
    <div class="m-3" v-for="event in sortedEvents" :key="event.id">
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
  </div>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    sortedEvents() {
      const events = this.$store.state.events.slice();
      events.sort((a, b) => {
        return a.start.seconds - b.start.seconds;
      });
      return events;
    }
  },
  methods: {
    moment(date) {
      return moment(date);
    }
  }
};
</script>

<style scoped></style>
