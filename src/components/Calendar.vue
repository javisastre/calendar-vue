<template>
  <div class="container mx-auto">
    <div class="flex justify-around items-center bg-rose-600 text-rose-50 h-10">
      <div></div>
      <h2 class="font-bold text-xl">{{ monthList[month] }} {{ year }}</h2>
      <div>next</div>
    </div>
    <main class="grid grid-cols-7"></main>
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
    };
  },
  methods: {},
};
</script>
