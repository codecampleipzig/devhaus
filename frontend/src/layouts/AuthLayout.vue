<template>
  <div class="flex items-center md:justify-evenly justify-center min-h-screen bg-gray-100">
    <section class="text-5xl font-semibold leading-none md:uppercase flex md:flex-col">
      <div
        class="md:bg-teal-900 md:h-64 md:w-64 text-white items-end
      p-2 md:flex hidden opacity-50"
      >
        <h1>
          <h2>Dev<br />haus</h2>
          <h2>Leipzig</h2>
        </h1>
      </div>
      <div
        class="md:bg-teal-900 md:h-64 md:w-64 text-white items-end
      p-2 md:flex hidden opacity-75"
      >
        <h1>
          <h2>Dev<br />haus</h2>
          <h2>Leipzig</h2>
        </h1>
      </div>
      <div
        class="md:bg-teal-900 md:h-64 md:w-64 text-white items-end
      p-2 md:flex hidden"
      >
        <h1>
          <h2>Dev<br />haus</h2>
          <h2>Leipzig</h2>
        </h1>
      </div>
    </section>
    <div class="overflow-y-auto max-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout"
};
</script>

<style scoped></style>
