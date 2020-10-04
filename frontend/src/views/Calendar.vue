<template>
  <div class="p-4">
    <div class="flex space-x-2">
      <div
        v-for="year in years"
        :key="year"
        class="cursor-pointer"
        :class="{
          'font-bold': year == selection.year()
        }"
        @click="setYear(year)"
      >
        {{ year }}
      </div>
    </div>
    <div class="flex space-x-2">
      <div
        v-for="month in months"
        :key="`month-${month}`"
        class="cursor-pointer"
        :class="{
          'font-bold': month == selection.month()
        }"
        @click="setMonth(month)"
      >
        {{ formatMonth(month) }}
      </div>
    </div>
    <header class="flex items-center justify-between mb-2">
      <h2 class="font-bold text-xl">
        {{ selection.format("MMMM YYYY, D dddd") }}
      </h2>
      <router-link class="button mt-0" :to="{ name: 'CreateEvent' }">
        New Event
      </router-link>
    </header>
    <div class="flex space-x-8 w-screen overflow-x-scroll mb-2">
      <div v-for="week in weeksInMonth" :key="`weeks-${week[0].format()}`">
        <div class="flex space-x-2">
          <div
            v-for="day in week"
            :key="`week-day-${day.format()}`"
            class="cursor-pointer h-6 w-6 rounded-full flex justify-center items-center"
            :class="{
              'font-bold': day.date() == selection.date(),
              'bg-blue-100': eventsForDay(day).length
            }"
            @click="setMoment(day)"
          >
            {{ day.date() }}
          </div>
        </div>
      </div>
    </div>
    <div class="calendar-view">
      <div
        v-for="day in selectedDays"
        :key="day.format()"
        class="cursor-pointer"
        @click="setMoment(day)"
      >
        <h3
          class="text-sm"
          :class="{
            'font-bold': day.date() == selection.date()
          }"
        >
          {{ day.format("D dddd") }}
        </h3>
      </div>
    </div>
    <div
      ref="eventView"
      class="calendar-view overflow-y-scroll"
      style="max-height: calc(100vh - 16rem)"
    >
      <div
        v-for="day in selectedDays"
        :key="day.format()"
        class="cursor-pointer"
        @click="setMoment(day)"
      >
        <div class="relative">
          <router-link
            v-for="event in eventsForDay(day)"
            :key="event.id"
            :to="{ name: 'Event', params: { id: event.id } }"
          >
            <div class="absolute w-full pl-8" :style="styleForEvent(event, day)">
              <div
                class="bg-blue-100 border border-blue-200 border-opacity-50
              bg-opacity-50 p-2 h-full"
              >
                <h3 class="font-semibold">
                  {{ event.title }}
                </h3>
              </div>
            </div>
          </router-link>
          <div
            v-for="hour in range(0, 24)"
            :key="hour"
            class="border-b border-gray-400 text-gray-400 text-xs"
            :style="{ height: `${pixelPerHour}px` }"
            :data-hour="hour"
          >
            <div class="w-full border-gray-200 border-b" style="height: 50%;">{{ hour }}:00</div>
            <div class="w-full" style="height: 50%;">{{ hour }}:30</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  data() {
    return {
      viewportWidth: window.innerWidth,
      selection: moment(),
      months: this.range(0, 11),
      pixelPerHour: 100
    };
  },
  computed: {
    ...mapState(["events"]),
    sanitizedEvents() {
      return this.events.map(event => ({
        ...event,
        start: moment.unix(event.start.seconds),
        end: moment.unix(event.end.seconds),
        id: event.id
      }));
    },
    years() {
      const currentYear = moment().year();
      return this.range(2019, currentYear + 1);
    },
    weeksInMonth() {
      const momentInMonth = moment(this.selection);
      const datesInMonth = momentInMonth.daysInMonth();
      const res = [];
      let currentWeek = [];
      for (let i = 1; i <= datesInMonth; i += 1) {
        const momentInDate = moment(momentInMonth).date(i);
        currentWeek.push(momentInDate);
        if (momentInDate.isoWeekday() == 7) {
          res.push(currentWeek);
          currentWeek = [];
        }
      }
      if (currentWeek.length) {
        res.push(currentWeek);
      }
      return res;
    },
    selectedDays() {
      if (this.viewportWidth > 700) {
        const week = [];
        for (let day = 1; day <= 7; day += 1) {
          week.push(
            moment(this.selection)
              .isoWeekday(day)
              .startOf("day")
          );
        }
        return week;
      }

      return [moment(this.selection).startOf("day")];
    }
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  mounted() {
    this.$store.dispatch("bindEvents");
    this.scrollIntoView(12);
  },
  methods: {
    styleForEvent(event, day) {
      return {
        top: `${this.pixelForMs(event.start.diff(day))}px`,
        height: `${this.pixelForMs(event.end.diff(event.start))}px`
      };
    },
    range(first, last) {
      const res = [];
      for (let i = first; i <= last; i += 1) {
        res.push(i);
      }
      return res;
    },
    resize() {
      this.viewportWidth = window.innerWidth;
    },
    setYear(year) {
      this.selection = moment(this.selection).year(year);
    },
    setMonth(month) {
      this.selection = moment(this.selection).month(month);
    },
    setMoment(m) {
      this.selection = moment(m);
    },
    formatMonth(month) {
      return moment()
        .month(month)
        .format("MMM");
    },
    scrollIntoView(hour) {
      document.querySelector(`div[data-hour="${hour}"]`).scrollIntoView();
    },
    eventsForDay(day) {
      const start = moment(day).startOf("day");
      const end = moment(day).endOf("day");

      return this.sanitizedEvents.filter(
        event => end.diff(event.start) > 0 && start.diff(event.end) < 0
      );
    },
    pixelForMs(ms) {
      return moment.duration(ms).asMinutes() * (this.pixelPerHour / 60);
    }
  }
};
</script>

<style>
.calendar-view {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: 0.5rem;
}
</style>
