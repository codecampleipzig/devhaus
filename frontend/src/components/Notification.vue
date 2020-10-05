<template>
  <div class="p-4 text-center" :class="`notification-${type}`" @click="$emit('remove')">
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
  background-color: #44cb8f;
}

.notification-error {
  background-color: #fb9e9e;
}
</style>
