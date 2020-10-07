<template>
  <div>
    <datepicker :value="value" @input="setDate" class="mb-4 border-black w-full" />

    <v-select :options="timeSelector" :value="time" @input="setTime" class="w-full" />
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  name: "DateTimePicker",
  data() {
    return {
      timeSelector: this.createTimes()
    };
  },
  props: {
    value: Date
  },
  components: {
    Datepicker
  },
  computed: {
    time() {
      return moment(this.value).format("H:mm");
    }
  },
  created() {
    this.setValue(this.value);
  },
  methods: {
    setValue(value) {
      const date = moment(value)
        .seconds(0)
        .milliseconds(0);
      const minutes = date.minutes();
      if (minutes % 15 != 0) {
        date.minutes(Math.round(minutes / 15) * 15);
      }
      this.$emit("input", date.toDate());
    },
    setDate(date) {
      this.setValue(date);
    },
    setTime(time) {
      const [hour, minutes] = time.split(":").map(Number);

      const date = moment(this.value)
        .hour(hour)
        .minute(minutes)
        .toDate();
      this.setValue(date);
    },
    createTimes() {
      const res = [];
      for (let index = 0; index < 24; index += 1) {
        let hours = index;
        if (hours.length < 2) {
          hours = `0${hours}`;
        }
        for (let i = 0; i < 46; i += 15) {
          let min = i;
          if (min == 0) {
            min = "00";
          } // if statement
          res.push(`${hours}:${min}`);
        } // For Loop minutes
      } // For Loop Hours
      return res;
    }
  }
};
</script>

<style>
.vdp-datepicker input[type="text"] {
  width: 100%;
}
</style>
