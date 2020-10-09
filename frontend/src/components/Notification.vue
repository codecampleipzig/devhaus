<template>
  <div
    class="p-4 text-lg font-medium w-screen max-w-lg border-2 border-black
  bg-white m-2 cursor-pointer"
    :class="`notification-${type}`"
    @click="$emit('remove')"
  >
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    type: {
      type: String,
      default: "info"
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.notification-info {
  @apply border-teal-900;
}
.notification-error {
  @apply border-red-700 bg-red-100 text-red-700;
}
</style>
