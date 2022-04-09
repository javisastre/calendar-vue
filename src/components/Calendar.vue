<template>
  <div class="container mx-auto h-screen bg-neutral-200 pt-5">
    <div class="flex justify-end px-14">
      <button
        @click="setToday"
        class="text-neutral-600 border-2 flex gap-3 items-center border-neutral-600 px-4 py-1 rounded text-xs"
      >
        <div class="font-signika font-bold">Today</div>
        <i class="fa-solid fa-calendar text-lg"></i>
      </button>
    </div>
    <div class="flex justify-around items-center text-neutral-600 h-16">
      <button @click="prevMonth">
        <i class="text-xl fa-solid fa-arrow-left"></i>
      </button>
      <h2 class="w-1/2 text-center font-bold text-3xl font-swash text-rose-500">
        {{ monthList[month] }} {{ year }}
      </h2>
      <button @click="nextMonth">
        <i class="text-xl fa-solid fa-arrow-right"></i>
      </button>
    </div>
    <div class="text-neutral-600 grid grid-cols-7 gap-5 h-10">
      <div
        class="self-center font-signika text-neutral-600 text-center"
        v-for="weekDay in weekDays"
        :key="weekDay"
      >
        {{ weekDay }}
      </div>
    </div>
    <main class="grid grid-cols-7 gap-1 border-0 p-3">
      <div
        v-for="day in days"
        :key="day"
        :class="{ [todayClassBox]: isToday(day) }"
        class="p-2 text-right h-20 flex flex-col items-end bg-neutral-50 text-neutral-700"
      >
        <div
          class="text-center text-sm"
          :class="{ [todayClassNumber]: isToday(day) }"
        >
          {{ day.getDate() }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Calendar",
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
      todayClassBox:
        "bg-neutral-700 text-neutral-50 font-bold border-2 border-rose-300",
      todayClassNumber: "h-5 w-5 rounded-full  bg-rose-500 text-rose-50",
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
  },
  computed: {
    days() {
      let d = new Date(this.year, this.month, 1);
      const days = [];
      while (d.getMonth() === this.month) {
        days.push(new Date(d));
        d.setDate(d.getDate() + 1);
      }
      return days;
    },
  },
};
</script>
