<template>
  <div class="max-w-full overflow-hidden">
    <portal to="header">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div
            class="hidden sm:block button hover:opacity-75 button text-sm py-1 px-4"
            @click="setMoment()"
          >
            Today
          </div>
          <h2 class="font-semibold text-xl">
            {{ selection.format("dddd, D MMMM YYYY") }}
          </h2>
        </div>
        <div class="flex items-center space-x-4">
          <router-link
            class="hidden sm:block button hover:opacity-75 text-sm py-2 px-4"
            :to="{ name: 'AllEvents', params: { whose: 'all-events' } }"
          >
            View All
          </router-link>
          <router-link
            class="button hover:opacity-75 text-sm py-2 px-4"
            :to="{ name: 'CreateEvent' }"
          >
            New Event
          </router-link>
        </div>
      </div>
    </portal>
    <portal to="sidebar">
      <Event v-if="selectedEventId" :id="selectedEventId"></Event>
    </portal>
    <div class="px-4 py-2">
      <div class="flex space-x-2 mb-1">
        <div
          v-for="year in years"
          :key="year"
          class="cursor-pointer border-b-4 border-transparent"
          :class="{
            'font-bold': year == selection.year(),
            'border-teal-900': year == selection.year()
          }"
          @click="setYear(year)"
        >
          {{ year }}
        </div>
      </div>
      <div class="flex space-x-2 mb-1">
        <div
          v-for="month in months"
          :key="`month-${month}`"
          class="cursor-pointer border-b-4 border-transparent"
          :class="{
            'font-bold': month == selection.month(),
            'border-teal-900': month == selection.month()
          }"
          @click="setMonth(month)"
        >
          {{ formatMonth(month) }}
        </div>
      </div>

      <div class="flex space-x-8 w-screen overflow-x-scroll mb-4">
        <div v-for="week in weeksInMonth" :key="`weeks-${week[0].format()}`">
          <div class="flex space-x-2">
            <div
              v-for="day in week"
              :key="`week-day-${day.format()}`"
              class="cursor-pointer border-b-4 pb-1 border-transparent"
              :class="{
                'font-bold': day.date() == selection.date(),
                'border-teal-900': day.date() == selection.date()
              }"
              @click="setMoment(day)"
            >
              <div
                class="rounded-sm h-6 w-6 flex justify-center items-center bg-opacity-25"
                :class="{
                  'bg-teal-200': eventsForDay(day).length,
                  'bg-teal-900': isToday(day),
                  'bg-opacity-100': isToday(day),
                  'text-white': isToday(day),
                  'font-bold': isToday(day)
                }"
              >
                {{ day.date() }}
              </div>
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
            class="text-base border-gray-100 border-b-4 pb-1"
            :class="{
              'font-bold': day.date() == selection.date(),
              'border-teal-900': day.date() == selection.date()
            }"
          >
            <span
              class="rounded-sm h-6 w-6 inline-flex justify-center items-center"
              :class="isToday(day) ? 'text-white bg-teal-900 font-bold' : ''"
              >{{ day.format("D") }}</span
            >
            {{ day.format("dddd") }}
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
              class="absolute w-full"
              :style="styleForEvent(event, day)"
              @click="selectEvent(event)"
            >
              <div
                class="bg-teal-400 bg-opacity-25 border border-teal-500 border-opacity-50 p-2 h-full"
              >
                <h3 class="font-semibold">
                  {{ event.title }}
                </h3>
                <p>
                  {{ moment(event.start).format("H:mm") }} -
                  {{ moment(event.end).format("H:mm") }}
                </p>
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
import Event from "@/components/Event.vue";

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
      if (this.viewportWidth > 800) {
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
    moment(n) {
      return moment(n);
    },
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
