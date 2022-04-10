<template>
  <div class="h-20 w-20 bg-rose-600 top-[{{element.y}}px]">
    <h2>Event</h2>
    <p>{{ element.event.title }}</p>
  </div>
</template>

<script>
export default {
  name: "EventModal",
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
};
</script>
