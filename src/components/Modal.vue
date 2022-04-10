<template>
  <div
    class="w-screen h-screen bg-neutral-700/20 flex justify-center items-center"
    @click.self="killModal"
  >
    <div class="bg-neutral-50 text-center w-1/4 rounded-lg shadow-2xl p-2">
      <div @click="killModal" class="flex justify-end">
        <i class="fa-solid fa-xmark hover:cursor-pointer"></i>
      </div>
      <form class="flex flex-col gap-4 p-10" @submit.prevent="submitEvent">
        <h2 class="font-swash text-xl">Add a new event</h2>
        <p class="font-bold text-rose-600 font-signika">{{ formattedDate }}</p>
        <input
          placeholder="title"
          :class="inputClass"
          type="text"
          v-model="title"
        />
        <input
          placeholder="description"
          type="text"
          :class="inputClass"
          v-model="description"
        />
        <button
          type="submit"
          :class="buttonClass"
          :disabled="!description || !title"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: { date: { type: Date } },
  data() {
    return {
      title: "",
      description: "",
      inputClass:
        "border border-neutral-400 rounded  hover:border-neutral-600 px-4 py-1 placeholder-neutral-400 focus:outline-none focus:border-neutral-600  focus:placeholder-neutral-600",
      buttonClass:
        "border-2 border-neutral-600 self-center px-4 py-1 hover:bg-neutral-600 hover:text-neutral-100 rounded-md hover:cursor-pointer shadow-md disabled:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:border-neutral-300 disabled:text-neutral-400",
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
  computed: {
    formattedDate() {
      return `${this.date.getDate()} of ${
        this.monthList[this.date.getMonth()]
      } of ${this.date.getFullYear()}`;
    },
  },
  methods: {
    killModal() {
      this.$emit("killModal");
    },
    submitEvent() {
      this.$emit("submitEvent", {
        title: this.title,
        description: this.description,
        date: this.date,
      });
      this.title = "";
      this.description = "";
      this.killModal();
    },
  },
};
</script>
