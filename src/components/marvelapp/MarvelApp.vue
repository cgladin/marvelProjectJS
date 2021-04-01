<template>
  <div>
    <h1>Marvel Project - Clément Gladin et Cindy Houriez</h1>
    <Search
      :totalCharacters="totalCharacters"
      @updateCharacters="getCharacters"
      @updateTeamCharacters="getTeamCharacters"
    />
    <ShowResult :characters="characters" />
    <TeamBuilder :characters="teamCharacters" />
  </div>
</template>

<script>
import Search from "./Search";
import ShowResult from "./ShowResult";
import TeamBuilder from "@/components/marvelapp/TeamBuilder";
export default {
  name: "MarvelApp",
  data() {
    return {
      totalCharacters: 1493,
      characters: [],
      teamCharacters: []
    };
  },
  components: { TeamBuilder, ShowResult, Search },
  methods: {
    getCharacters(value) {
      this.characters = value;
    },
    getTeamCharacters(value) {
      this.teamCharacters = value;
    }
  }
};
</script>

<style scoped></style>
