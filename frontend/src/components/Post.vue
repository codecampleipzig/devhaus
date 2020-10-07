<template>
  <div>
    <div class="md" v-html="markdown"></div>
  </div>
</template>

<script>
import marked from "marked";
export default {
  name: "markedPost",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    markdown() {
      return marked(this.post.text);
    }
  }
};
</script>

<style>
.md h1 {
  font-weight: bold;
}
</style>
