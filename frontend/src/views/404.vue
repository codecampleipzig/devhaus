<template>
  <div class="justify-center m-16 text-5xl font-bold">
    <h1>404 Page Not Found</h1>
    <img
      width="100"
      src="https://codecampleipzig.de/images/code-camp-leipzig-logo.svg"
      alt=""
    >
    <p class="justify-center m-16 text-3xl">
      unfortuntely the page you're looking doesn't exist (anymore)
    </p>
    <p class="justify-center m-16 text-3xl">
      or
    </p>
    <p class="justify-center m-16 text-3xl">
      there was an error in the link you followed or typed.
    </p>
    <router-link :to="{ name: 'Home'}">
      go to home page
    </router-link>
  </div>
</template>

<script>
export default {};
</script>
