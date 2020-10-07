<template>
  <div>
    <div class="p-8">
      <h1 class="text-5xl font-bold">
        Devhaus Leipzig
      </h1>
      <div>
        <font-awesome-icon icon="circle" />
        <font-awesome-icon icon="spinner" />
        <font-awesome-icon icon="comment" />
        <font-awesome-icon icon="edit" />

        <font-awesome-icon :icon="['fab', 'github']" /><font-awesome-icon
          :icon="['fab', 'facebook-f']"
        /><font-awesome-icon :icon="['fab', 'linkedin']" /><font-awesome-icon
          :icon="['fab', 'instagram']"
        />
      </div>
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
