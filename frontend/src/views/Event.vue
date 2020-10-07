<template>
  <div class="flex justify-center">
    <div class="m-48 flex flex-col justify-center" v-if="event">
      <h1 class="border-b-4 border-teal-800 m-8 p-2 text-center font-bold m-2 text-3xl">
        {{ event.title }}
      </h1>
      <p>
        From {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} to
        {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
      </p>
      <p>{{ event.location }}</p>
      <p class="italic text-1xl">{{ event.description }}</p>
      <button class="button flex justify-center mt-6 hover:opacity-75">RSVP</button>
      <div class="flex flex-row m-4">
        <router-link
          class="button m-3"
          :to="{ name: 'AllEvents', params: { whose: 'all-events' } }"
        >
          View All
        </router-link>
        <router-link class="button m-3" :to="{ name: 'AllEvents', params: { whose: 'my-events' } }"
          >Your Events</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "@/store";

export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
    event() {
      return this.$store.state.events.find(event => event.id == this.id);
    }
  },
  async beforeRouteEnter(to, from, next) {
    const id = to.params.id;
    if (!store.state.events.find(event => event.id == id)) {
      await store.dispatch("bindEvents");
    }
    next();
  },
  methods: {
    moment(date) {
      return moment(date);
    }
  }
};
</script>

<style scoped></style>
