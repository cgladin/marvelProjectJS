<template>
  <div>
    <h1>Marvel Project - Clément Gladin et Cindy Houriez</h1>
    <div class="searchAndTeam">
      <div class="search">
        <Search
          :totalCharacters="totalCharacters"
          @updateCharacters="getCharacters"
        />
        <ShowResult
          :characters="characters"
          :teamCharacters="teamCharacters"
          @updateTeamCharacters="getTeamCharacters"
        />
      </div>
      <TeamBuilder
        :characters="teamCharacters"
        @updateTeamCharacters="getTeamCharacters"
      />
    </div>
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

<style scoped>
.searchAndTeam {
  display: flex;
  flex-direction: row;
}
.search {
  display: flex;
  flex-direction: column;
  flex-grow: 3;
}
</style>
