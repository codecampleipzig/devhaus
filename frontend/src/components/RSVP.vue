<template>
  <div>
    <h4>Confirm your attendance:</h4>
    <form @submit.prevent>
      <input
        type="checkbox"
        name="Yes"
        v-model="attending"
        :true-value="true"
        :false-value="false"
      />
      <label for="Yes">Attending</label>
      <input
        type="checkbox"
        name="Maybe"
        v-model="maybe"
        :true-value="true"
        :false-value="false"
        @click="rsvpToEvent"
      />
      <label for="Maybe">Maybe</label>
      <input type="checkbox" name="No" v-model="not" :true-value="true" :false-value="false" />
      <label for="No">Not attending</label>
    </form>
    <h4 class="cursor-pointer" @click="seeAttendees">Click to see all attendees:</h4>
    <div v-if="viewAttendees">
      <div v-for="attendee in attendeeProfiles" :key="attendee.id">
        <p>{{ attendee.firstName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RSVP",
  data() {
    return {
      attending: false,
      maybe: false,
      not: false,
      viewAttendees: false,
      attendees: [],
      maybes: [],
      nots: []
    };
  },
  computed: {
    ...mapState(["user"]),
    id() {
      return this.$route.params.id;
    },
    eventFromDB() {
      return this.$store.state.events.find(event => event.id == this.id);
    },
    attendeeProfiles() {
      return this.attendees.map(this.$store.getters.getProfileById);
    }
  },
  methods: {
    seeAttendees() {
      if (!this.viewAttendees) {
        this.viewAttendees = true;
      } else {
        this.viewAttendees = false;
      }
    },
    rsvpToEvent() {
      if (this.attending) {
        this.attendees.push(this.user.uid);
      }
      if (this.maybe) {
        this.maybes.push(this.user.uid);
      }
      if (this.not) {
        this.nots.push(this.user.uid);
      }
    },
    async commitToDB() {
      this.rsvpToEvent();
    }
  }
};
</script>

<style></style>
