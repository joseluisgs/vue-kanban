<template>
  <footer>
    <span>joseluisgs 💻 with ❤️ 2021 &amp; <a href="//vuejs.org">Vue.js</a></span>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',
});
</script>

<style lang="scss" scoped>
footer {
  box-sizing: border-box;
  background-color: #cfd8dc;
  bottom: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  z-index: 9999;
  a {
    text-decoration: none;
    color: #546e7a;
  }
}
</style>
