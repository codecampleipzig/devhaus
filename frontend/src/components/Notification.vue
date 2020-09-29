<template>
  <div
    class="notification"
    :class="`notification-${type}`"
    @click="$emit('remove')"
  >
    <h1>This is a Notification</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    type: {
      type: String,
      default: 'info',
    },
    text: {
      type: String,
      required: true,
    },
  },

};
</script>

<style scoped>
.notification {
  padding: 1rem;
  text-align: center;
}

.notification-info {
  background-color: #44CB8F;
}

.notification-error {
  background-color: #FB9E9E;
}
</style>
