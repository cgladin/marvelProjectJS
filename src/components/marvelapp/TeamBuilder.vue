<template>
  <div>
    <h1>Marvelous Team</h1>
    <div
      v-for="(character, index) in characters"
      :key="character.id + '_Team'"
      class="characters"
    >
      <img
        :src="character.thumbnail.path + '.' + character.thumbnail.extension"
        :alt="character.name"
        class="thumbnailList"
      />
      <h3>{{ character.name }}</h3>
      <button @click="removeCharacter(index)">delete</button>
    </div>
    <button @click="removeCharacters">delete Team</button>
    <button @click="toggleEditTeamName">save Team</button>
    <button @click="load">load Team</button>
    <!--modal-->
    <div v-if="editTeamName">
      <div v-if="this.characters.length > 0">
        <label>
          Nom de la team :
          <input type="text" v-model="teamName" />
        </label>
        <button @click="addTeam">Valider</button>
      </div>
      <h3 v-else>Veuillez selectionner au moins 1 super héros</h3>
      <button @click="cancelAddTeam">Annuler</button>
    </div>
    <!--modal-->
    <div v-if="selectTeam">
      <div v-if="teamsName.length > 0">
        <h3
          v-for="(name) in teamsName"
          :key="name"
          @click="loadCharacters(name)"
        >
          {{ name }}
        </h3>
      </div>
      <h3 v-else>Aucune team à charger</h3>
      <button @click="toggleSelectTeam">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamBuilder",
  props: {
    characters: {
      type: Array
    }
  },
  data() {
    return {
      teams: [],
      teamsName: [],
      teamName: "",
      editTeamName: false,
      selectTeam: false
    };
  },
  methods: {
    toggleEditTeamName() {
      this.editTeamName = !this.editTeamName;
      this.selectTeam = false;
    },
    toggleSelectTeam() {
      this.selectTeam = !this.selectTeam;
      this.editTeamName = false;
    },
    removeCharacter(index) {
      this.characters.splice(index, 1);
      this.$emit("updateTeamCharacters", this.characters);
    },
    removeCharacters() {
      this.$emit("updateTeamCharacters", []);
    },
    loadCharacters(name) {
      if (localStorage.getItem("charactersTeams")) {
        this.teams = this.getTeams();
        this.$emit("updateTeamCharacters", this.teams[name]);
        this.toggleSelectTeam();
      }
    },
    load() {
      if (localStorage.getItem("charactersTeams")) {
        this.teamsName = Object.keys(this.getTeams());
        this.toggleSelectTeam();
      }
    },
    cancelAddTeam() {
      this.teamName = "";
      this.toggleEditTeamName();
    },
    addTeam() {
      let team;
      if (localStorage.getItem("charactersTeams")) {
        team = this.getTeams();
      } else {
        team = {};
      }
      team[this.teamName] = this.characters;
      localStorage.setItem("charactersTeams", JSON.stringify(team));
      this.toggleEditTeamName();
    },
    getTeams() {
      return JSON.parse(localStorage.getItem("charactersTeams"));
    }
  }
};
</script>

<style scoped></style>
