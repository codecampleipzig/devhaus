<template>
  <div>
    <div class="m-40 text-3xl">
      <h1 class="text-red-600">Hello DevHaus</h1>
      <p>logged in as: {{ $store.state.user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>

</style>
