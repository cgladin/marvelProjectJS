<template>
  <div id="app">
    <MarvelApp />
  </div>
</template>

<script>
import MarvelApp from "./components/marvelapp/MarvelApp";

export default {
  name: "App",
  components: {
    MarvelApp
  }
};
</script>
<style scoped>
@import "./assets/global.css";
</style>
