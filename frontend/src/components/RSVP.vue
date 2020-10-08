<template>
  <div>
    <div v-if="!alreadyGoing && !alreadyMaybe && !alreadyNotGoing">
      <h4>Confirm your attendance:</h4>
      <form @submit.prevent="commitToDB">
        <input type="radio" name="attendance" v-model="attendance" value="yes" />
        <label for="Yes">Attending</label>
        <input type="radio" name="attendance" v-model="attendance" value="maybe" />
        <label for="Maybe">Maybe</label>
        <input type="radio" name="attendance" v-model="attendance" value="no" />
        <label for="No">Not attending</label>
        <input type="submit" v-if="attendance != ''" />
      </form>
    </div>
    <div v-if="alreadyMaybe">
      <h4>You responded "maybe" to this event.</h4>
      <p>Change your attendance</p>
      <form @submit.prevent="commitToDB">
        <input type="radio" name="attendance" v-model="attendance" value="yes" />
        <label for="Yes">Attending</label>
        <input type="radio" name="attendance" v-model="attendance" value="no" />
        <label for="No">Not attending</label>
        <input type="submit" />
      </form>
    </div>
    <div v-if="alreadyGoing">
      <h4>You are attending this event.</h4>
      <p>Change your attendance</p>
      <form @submit.prevent="commitToDB">
        <input type="radio" name="attendance" v-model="attendance" value="maybe" />
        <label for="Yes">Maybe</label>
        <input type="radio" name="attendance" v-model="attendance" value="no" />
        <label for="No">Not attending</label>
        <input type="submit" />
      </form>
    </div>
    <div v-if="alreadyNotGoing">
      <h4>You are not attending this event.</h4>
      <p>Change your attendance</p>
      <form @submit.prevent="commitToDB">
        <input type="radio" name="attendance" v-model="attendance" value="yes" />
        <label for="Yes">Attending</label>
        <input type="radio" name="attendance" v-model="attendance" value="maybe" />
        <label for="No">Maybe</label>
        <input type="submit" v-if="attendance != ''" />
      </form>
    </div>
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
      viewAttendees: false,
      attendance: ""
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState(["user"]),
    eventFromDB() {
      return this.$store.state.events.find(event => event.id == this.id);
    },
    attendeeProfiles() {
      return this.eventFromDB && this.eventFromDB.attendees.map(this.$store.getters.getProfileById);
    },
    alreadyGoing() {
      return (
        this.eventFromDB && this.eventFromDB.attendees.find(attendee => attendee == this.user.uid)
      );
    },
    alreadyMaybe() {
      return this.eventFromDB && this.eventFromDB.maybes.find(maybe => maybe == this.user.uid);
    },
    alreadyNotGoing() {
      return this.eventFromDB && this.eventFromDB.nots.find(not => not == this.user.uid);
    }
  },
  methods: {
    seeAttendees() {
      if (!this.viewAttendees) {
        this.viewAttendees = true;
        console.log(this.alreadyGoing);
        console.log(this.eventFromDB);
      } else {
        this.viewAttendees = false;
      }
    },
    async commitToDB() {
      const attendees = this.eventFromDB.attendees.filter(userId => userId != this.user.uid);
      const maybes = this.eventFromDB.maybes.filter(userId => userId != this.user.uid);
      const nots = this.eventFromDB.nots.filter(userId => userId != this.user.uid);

      if (this.attendance == "yes") {
        if (this.alreadyGoing) {
          return this.$store.dispatch("notify", {
            type: "error",
            text: "You have already confirmed your attendance for this event."
          });
        }
        attendees.push(this.user.uid);
      } else if (this.attendance == "maybe") {
        if (this.alreadyMaybe) {
          return this.$store.dispatch("notify", {
            type: "error",
            text: `You have already responded "maybe" for this event.`
          });
        }

        maybes.push(this.user.uid);
      } else if (this.attendance == "no") {
        if (this.alreadyNotGoing) {
          return this.$store.dispatch("notify", {
            type: "error",
            text: `You have already responded "no" for this event`
          });
        }
        nots.push(this.user.uid);
      }

      await db
        .collection("events")
        .doc(this.id)
        .set(
          {
            attendees,
            maybes,
            nots
          },
          { merge: true }
        );
      this.$store.dispatch("notify", {
        type: "info",
        text: `You have set your attendance for this event`
      });
    }
  }
};
</script>

<style></style>
