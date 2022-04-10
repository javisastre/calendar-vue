<template>
  <div class="relative">
    <div v-if="newEvent">
      <NewEventModal
        class="absolute z-10"
        :date="newEvent"
        @killModal="newEvent = null"
        @submitEvent="createEvent"
      />
    </div>
    <div v-if="eventFeatured">
      <EventModal
        class="absolute z-10"
        :element="eventFeatured"
        @killModal="eventFeatured = null"
      />
    </div>
    <div class="container mx-auto h-screen pt-5">
      <div class="flex justify-end px-10">
        <button
          @click="setToday"
          class="text-neutral-600 border-2 flex gap-3 items-center hover:bg-neutral-600 hover:text-neutral-200 duration-200 border-neutral-600 px-4 py-1 rounded text-xs"
        >
          <div class="font-signika font-bold">Today</div>
          <i class="fa-solid fa-calendar text-lg"></i>
        </button>
      </div>
      <div
        class="flex justify-between px-10 items-end border mt-4 border-b-0 border-neutral-500 py-4 text-neutral-600"
      >
        <button
          @click="prevMonth"
          class="hover:scale-110 duration-100 hover:-translate-x-2"
        >
          <i class="text-2xl fa-solid fa-arrow-left"></i>
        </button>
        <h2
          class="w-1/2 text-center font-bold text-3xl font-swash text-rose-500"
        >
          {{ monthList[month] }} {{ year }}
        </h2>
        <button
          @click="nextMonth"
          class="hover:scale-110 duration-100 hover:translate-x-2"
        >
          <i class="text-2xl fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div
        class="text-neutral-600 grid grid-cols-7 px-10 border border-b-0 border-neutral-500 py-1"
      >
        <div
          class="self-center font-signika text-neutral-600 text-center"
          v-for="weekDay in weekDays"
          :key="weekDay"
        >
          {{ weekDay }}
        </div>
      </div>
      <main class="grid grid-cols-7 gap-1 border py-4 px-10 border-neutral-500">
        <div
          v-for="day in prevMonthDays"
          :key="day"
          @click="prevMonth"
          class="p-2 text-right h-20 flex flex-col items-end hover:cursor-pointer bg-neutral-200 border border-neutral-400 text-neutral-500"
        >
          <div class="text-center text-sm">
            {{ day.getDate() }}
          </div>
        </div>
        <div
          v-for="day in days"
          :key="day"
          :class="{ [todayClassBox]: isToday(day) }"
          class="p-2 text-right h-20 flex flex-col border border-neutral-400 bg-neutral-50 text-neutral-700"
          @click.self="newEvent = day"
        >
          <div
            class="self-end text-xs flex items-center justify-center"
            :class="{ [todayClassNumber]: isToday(day) }"
          >
            <p>{{ day.getDate() }}</p>
          </div>
          <ul v-if="events[dashDate(day)]" class="mt-2">
            <li
              v-for="(event, i) in events[dashDate(day)]"
              :key="i"
              :class="eventTitleClass"
              @click="openEvent(event, $event)"
            >
              {{ event.title }}
            </li>
          </ul>
        </div>
        <div
          v-for="day in nextMonthDays"
          :key="day"
          class="p-2 text-right h-20 flex flex-col items-end bg-neutral-200 border hover:cursor-pointer border-neutral-400 text-neutral-500"
          @click="nextMonth"
        >
          <div class="text-center text-sm">
            {{ day.getDate() }}
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import NewEventModal from "./NewEventModal.vue";
import EventModal from "./EventModal.vue";
export default {
  name: "Calendar",
  components: { NewEventModal, EventModal },
  data() {
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      monthList: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      weekDays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      newEvent: null,
      eventFeatured: null,
      events: {
        "2022-3-19": [
          {
            title: "CADT",
            description: "Primer dia de feina a CADT",
          },
          {
            title: "Berenar",
            description: "Agafar energies després d'aquell dia!",
          },
        ],
      },
      todayClassBox: "text-neutral-50 font-bold border border-rose-500",
      todayClassNumber: "h-5 w-5 rounded-full bg-rose-500 text-rose-50",
      eventTitleClass:
        "list-disc  marker:text-rose-600 text-rose-600 hover:cursor-pointer list-inside hover:bg-rose-600 hover:text-white pl-0 text-xs text-left",
    };
  },
  methods: {
    nextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year++;
      } else {
        this.month++;
      }
    },
    prevMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month--;
      }
    },
    isToday(d) {
      const now = new Date();
      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    },
    setToday() {
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
    },
    createEvent(e) {
      const newEvent = {
        title: e.title,
        description: e.description,
      };
      const currentDay = this.dashDate(e.date);
      this.events[currentDay]
        ? this.events[currentDay].push(newEvent)
        : (this.events[currentDay] = [newEvent]);
    },
    dashDate(d) {
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    },
    openEvent(event, eventInfo) {
      this.eventFeatured = { event, x: eventInfo.x, y: eventInfo.y };
    },
  },
  computed: {
    days() {
      return new Array(new Date(this.year, this.month + 1, 0).getDate())
        .fill(1)
        .map((e, i) => new Date(this.year, this.month, i + 1));
    },
    prevMonthDays() {
      const lastDayNum = new Date(this.year, this.month, 0).getDay();
      const lastDayDate = new Date(this.year, this.month, 0).getDate();
      const numberOfDays = lastDayNum === 0 ? 7 : lastDayNum;
      return new Array(numberOfDays)
        .fill(1)
        .map(
          (e, i) =>
            new Date(
              this.year,
              this.month - 1,
              lastDayDate - numberOfDays + 1 + i
            )
        );
    },
    nextMonthDays() {
      const startDayNum = new Date(this.year, this.month + 1, 1).getDay();
      const numberOfDays = startDayNum === 0 ? 1 : 7 - startDayNum + 1;
      return new Array(numberOfDays)
        .fill(1)
        .map((e, i) => new Date(this.year, this.month + 1, i + 1));
    },
  },
};
</script>
