<template>
  <div>
    <portal to="sidebar">
      <Event v-if="selectedEventId" :id="selectedEventId"></Event>
    </portal>
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
        <div class="flex flex-col w-full md:flex-row items-start justify-between">
          <div class="flex flex-col mb-4 w-screen max-w-screen-sm items-start">
            <h2 class="font-bold text-xl">
              {{ selection.format("dddd, D MMMM YYYY") }}
            </h2>
            <div class="button text-sm py-1" @click="setMoment()">
              Today
            </div>
          </div>
          <div class="space-x-2 flex">
            <router-link class="button mt-0 mr-4" :to="{ name: 'CreateEvent' }">
              New Event
            </router-link>

            <router-link
              class="button mt-0"
              :to="{ name: 'AllEvents', params: { whose: 'all-events' } }"
            >
              View All
            </router-link>
          </div>
        </div>
      </header>

      <div class="flex space-x-8 w-screen overflow-x-scroll mb-2">
        <div v-for="week in weeksInMonth" :key="`weeks-${week[0].format()}`">
          <div class="flex space-x-2">
            <div
              v-for="day in week"
              :key="`week-day-${day.format()}`"
              class="cursor-pointer border-2 border-transparent h-6 w-6 rounded-full flex justify-center items-center"
              :class="{
                'font-bold': day.date() == selection.date(),
                'bg-blue-100': eventsForDay(day).length,
                'border-red-800': isToday(day)
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
            <div
              v-for="event in eventsForDay(day)"
              :key="event.id"
              class="absolute w-full pl-8"
              :style="styleForEvent(event, day)"
              @click="selectEvent(event)"
            >
              <div
                class="bg-blue-100 border border-blue-200 border-opacity-50
              bg-opacity-50 p-2 h-full"
              >
                <h3 class="font-semibold">
                  {{ event.title }}
                </h3>
              </div>
            </div>
            <div
              v-for="hour in range(0, 24)"
              :key="hour"
              class=" text-gray-400 text-xs"
              :style="{ height: `${pixelPerHour}px` }"
              :data-hour="hour"
            >
              <div class="w-full border-gray-200 border-b" style="height: 50%;">{{ hour }}:00</div>
              <div class="w-full  border-gray-400 border-b" style="height: 50%;">{{ hour }}:30</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import Event from "@/views/Event.vue";

export default {
  components: {
    Event
  },
  data() {
    return {
      selectedEventId: null,
      viewportWidth: window.innerWidth,
      selection: moment(),
      months: this.range(0, 11),
      pixelPerHour: 90
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
    todaysDay() {
      const currentDay = moment().day();
      return currentDay;
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
    isToday(date) {
      return (
        moment()
          .startOf("day")
          .diff(date.startOf("day")) == 0
      );
    },

    selectEvent(event) {
      this.selectedEventId = event.id;
      this.$store.commit("SHOW_SIDEBAR");
    },
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
      return moment.duration(ms).asMinutes() * (this.pixelPerHour / 60) - 1;
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
