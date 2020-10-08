<template>
  <div>
    <h4>Confirm your attendance:</h4>
    <form @submit.prevent="commitToDB">
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
      <input type="submit" />
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
import { db } from "@/firebase";

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
      if (this.attending) {
        await db
          .collection("events")
          .doc(this.id)
          .set(this.attendees, { merge: true });
      }
      if (this.maybe) {
        await db
          .collection("events")
          .doc(this.id)
          .set(this.maybes, { merge: true });
      }
      if (this.not) {
        await db
          .collection("events")
          .doc(this.id)
          .set(this.nots, { merge: true });
      }
      this.$store.dispatch("notify", {
        type: "info",
        text: "You have updated your attendance for this event"
      });
    }
  }
};
</script>

<style></style>
