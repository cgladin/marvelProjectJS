<template>
  <div class="marvel">
    <h1 class="title">
      <img src="../../assets/MarvelLogo.svg" alt="logo marvel" />Project
    </h1>
    <div class="searchAndTeam">
      <div class="search">
        <Search
          :totalCharacters="totalCharacters"
          @updateCharacters="getCharacters"
        />
        <ShowResult
          class="showResult"
          :characters="characters"
          :teamCharacters="teamCharacters"
          @updateTeamCharacters="getTeamCharacters"
        />
      </div>
      <TeamBuilder
        class="team"
        :characters="teamCharacters"
        @updateTeamCharacters="getTeamCharacters"
      />
    </div>
    <footer>
      <h3>Clément Gladin et Cindy Houriez</h3>
    </footer>
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
.marvel {
  display: flex;
  flex-direction: column;
}
.searchAndTeam {
  display: flex;
  flex-direction: row;
  margin: 0 10em;
  height: 70vh;
}
.search {
  display: flex;
  flex-direction: column;
  width: 70%;
  border: solid 1px #f2f2f2;
  border-radius: 20px;
  padding: 15px;
  margin-right: 20px;
  background-color: rgba(253, 250, 250, 0.5);
}
.team {
  width: 30%;
  border: solid 1px #f2f2f2;
  border-radius: 20px;
  background-color: #ebebeb;
  padding: 15px;
  background-color: rgba(253, 250, 250, 0.5);
  display: flex;
  flex-direction: column;
}
.showResult {
  overflow-y: scroll;
}
.title {
  color: #ffff;
  font-weight: bold;
  text-shadow: 5px 5px 5px black;
  font-size: 3.2em;
  text-align: center;
}
.title img {
  height: 80px;
}
footer h3 {
  font-size: 2em;
  color: #ffff;
  text-shadow: 5px 5px 5px black;
  text-align: center;
}

@media screen and (max-width: 900px) {
  .searchAndTeam {
    display: block;
  }
  .searchAndTeam {
    height: auto;
    margin: 0;
  }
  .search {
    width: auto;
    max-height: 80vh;
    margin-right: 0;
    margin-bottom: 20px;
  }
  .team {
    width: auto;
    max-height: 80vh;
  }
  .title {
    font-size: 2em;
  }
}
</style>
