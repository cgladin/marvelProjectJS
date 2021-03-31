<template>
  <div>
    <h1>Marvel Project - Clément Gladin et Cindy Houriez</h1>
    <Search
      :totalCharacters="totalCharacters"
      @updateCharacters="getCharacters"
    />
    <ShowResult :characters="characters" />
  </div>
</template>

<script>
import Search from "./Search";
import ShowResult from "./ShowResult";
export default {
  name: "MarvelApp",
  data() {
    return {
      totalCharacters: 1493,
      characters: []
    };
  },
  components: { ShowResult, Search },
  methods: {
    getCharacters(value) {
      this.characters = value;
    }
  }
};
</script>

<style></style>
