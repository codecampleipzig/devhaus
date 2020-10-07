<template>
  <div>
    <div v-if="event">
      <h1>{{ event.title }}</h1>
      <p>{{ event.description }}</p>
      <p>
        From {{ moment(event.start.toDate()).format("ddd D.MMM HH:mm") }} to
        {{ moment(event.end.toDate()).format("ddd D.MMM HH:mm") }}
      </p>
      <p>{{ event.location }}</p>
    </div>

    <DateTimePicker v-model="date" />
    <p>{{ date }}</p>
  </div>
</template>

<script>
import moment from "moment";
import DateTimePicker from "@/components/DateTimePicker.vue";

export default {
  data() {
    return {
      date: new Date()
    };
  },
  components: {
    DateTimePicker
  },
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
