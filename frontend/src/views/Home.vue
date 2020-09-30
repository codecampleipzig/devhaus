<template>
  <div>
    <div class="m-40 text-3xl">
      <h1 class="text-red-600">
        Hello DevHaus
      </h1>
      <p>logged in as: {{ $store.state.user.email }}</p>
    </div>
    <button
      id="popcorn"
      aria-describedby="tooltip"
    >
      I'm a dropdown button
    </button>
    <div
      id="tooltip"
      role="tooltip"
    >
      I'm a tooltip
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  name: 'Home',
  mounted() {
    const popcorn = document.querySelector('#popcorn');
    const tooltip = document.querySelector('#tooltip');

    createPopper(popcorn, tooltip, {
      placement: 'bottom',
    });

    popcorn.addEventListener('click', () => tooltip.setAttribute('data-show', ''));
    popcorn.addEventListener('blur', () => tooltip.removeAttribute('data-show'));
  },
};
</script>

<style scoped>
#tooltip {
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 13px;
    display: none;
}

#tooltip[data-show] {
  display: block;
}

</style>
