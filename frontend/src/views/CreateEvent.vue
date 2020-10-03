<template>
  <div>
    <h1>Create Event</h1>
    <datepicker
      :value="date"
      name="uniquename"
    />
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>

<style>

</style>
