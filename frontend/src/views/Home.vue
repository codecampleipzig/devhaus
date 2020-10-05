<template>
  <div>
    <div class="p-8">
      <h1 class="text-5xl font-bold">
        Devhaus Leipzig
      </h1>

      <p>logged in as: {{ $store.state.user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped></style>
