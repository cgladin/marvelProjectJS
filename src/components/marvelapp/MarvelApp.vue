<template>
  <div>
    <h1>Marvel Project - Clément Gladin et Cindy Houriez</h1>
    <Search />
    <Search10Random :totalCharacters="totalCharacters" />
    <ShowResult />
  </div>
</template>

<script>
import Search from "./Search";
import ShowResult from "./ShowResult";
import Search10Random from "./Search10Random";
export default {
  name: "MarvelApp",
  data() {
    return {
      totalCharacters: 1493,
    };
  },
  components: { ShowResult, Search, Search10Random },
};
</script>

<style>
</style>