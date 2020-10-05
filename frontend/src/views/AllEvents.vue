<template>
  <div>
    View All Events
    <div class="m-3" v-for="event in $store.state.events" :key="event.id">
      <h1 class="font-bold">{{ event.title }}</h1>
      <h2>Where: {{ event.location }}</h2>
      <p>
        From: {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} to
        {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
      </p>
      <p>About: {{ event.description }}</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
    event() {
      return this.$store.state.events.find(event => event.id == this.id);
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
