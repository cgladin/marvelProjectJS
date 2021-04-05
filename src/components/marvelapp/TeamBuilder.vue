<template>
  <div>
    <h1 class="titleTeam">Marvelous Team</h1>
    <div class="teamButtons">
      <button @click="removeCharacters">Supprimer</button>
      <button @click="toggleEditTeamName">Sauvegarder</button>
      <button @click="load">Charger</button>
    </div>
    <div class="teamCharacters">
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
        <img
          src="./../../assets/bin.svg"
          @click="removeCharacter(index)"
          alt="delete"
          class="bin"
        />
      </div>
    </div>
    <!--modal save-->
    <div class="modal" v-if="editTeamName">
      <div class="modal-content">
        <div v-if="this.characters.length > 0">
          <label>
            Nom de l'équipe :
            <input type="text" v-model="teamName" />
          </label>
          <button @click="saveTeam">Valider</button>
        </div>
        <h3 v-else>Veuillez selectionner au moins 1 super héro</h3>
        <button @click="cancelAddTeam">Annuler</button>
      </div>
    </div>
    <!--modal load-->
    <div class="modal" v-if="selectTeam">
      <div class="modal-content">
        <div v-if="teamsName.length > 0">
          <div class="teams">
            <div class="teamsName" v-for="name in teamsName" :key="name">
              <h3 @click="loadCharacters(name)">
                {{ name }}
              </h3>
              <img
                src="./../../assets/bin.svg"
                @click="removeTeams(name)"
                alt="delete"
                class="bin"
              />
            </div>
          </div>
        </div>
        <h3 v-else>Aucune équipe à charger</h3>
        <button @click="toggleSelectTeam">Annuler</button>
      </div>
    </div>
    <!--modal success-->
    <div v-if="successAdd" class="successAdd">
      <h2>{{ successText }}</h2>
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
      selectTeam: false,
      successAdd: false,
      successText: ""
    };
  },
  methods: {
    toggleEditTeamName() {
      //permet d'afficher la modal pour sauvegarder une équipe
      this.editTeamName = !this.editTeamName;
      this.selectTeam = false;
    },
    toggleSelectTeam() {
      //permet d'afficher la modal pour charger une équipe
      this.selectTeam = !this.selectTeam;
      this.editTeamName = false;
    },
    removeCharacter(index) {
      //supprime un personnages de la team
      this.characters.splice(index, 1);
      this.$emit("updateTeamCharacters", this.characters);
      this.showSuccess("personnage supprimé");
    },
    removeCharacters() {
      //supprime tous les personnages
      if (this.characters.length > 0) {
        this.$emit("updateTeamCharacters", []);
        this.showSuccess("équipe supprimé");
      }
    },
    removeTeams(name) {
      //supprime une team du local storage
      if (localStorage.getItem("charactersTeams")) {
        let team = this.getTeams();
        delete team[name];
        this.teamsName.splice(this.teamsName.indexOf(name), 1);
        localStorage.setItem("charactersTeams", JSON.stringify(team));
      }
    },
    loadCharacters(name) {
      //charge l'équipe selectionné
      if (localStorage.getItem("charactersTeams")) {
        this.teams = this.getTeams();
        this.$emit("updateTeamCharacters", this.teams[name]);
        this.showSuccess("équipe Chargé");
        this.toggleSelectTeam();
      }
    },
    load() {
      //charge le noms des équipe selectionnable
      if (localStorage.getItem("charactersTeams")) {
        this.teamsName = Object.keys(this.getTeams());
      }
      this.toggleSelectTeam();
    },
    cancelAddTeam() {
      //annule la sauvegarde d'une équipe
      this.teamName = "";
      this.toggleEditTeamName();
    },
    saveTeam() {
      //sauvegarde une équipe dans le local storage
      let team;
      if (localStorage.getItem("charactersTeams")) {
        team = this.getTeams();
      } else {
        team = {};
      }
      team[this.teamName] = this.characters;
      localStorage.setItem("charactersTeams", JSON.stringify(team));
      this.showSuccess("équipe sauvegarder");
      this.toggleEditTeamName();
    },
    showSuccess(message) {
      //affiche le succès d'ajout ou de suppression
      this.successText = message;
      if (this.successAdd === false) {
        this.successAdd = true;
        setTimeout(() => {
          this.successAdd = false;
          this.successText = "";
        }, 2000);
      }
    },
    getTeams() {
      return JSON.parse(localStorage.getItem("charactersTeams"));
    }
  }
};
</script>

<style scoped>
@import "../../assets/global.css";
.characters {
  justify-content: space-between;
}
.thumbnailList {
  height: 100px;
  border-radius: 10px 0 0 10px;
}
.teamButtons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.teamCharacters {
  overflow-y: scroll;
  height: 100%;
}
.bin {
  margin-right: 10px;
  height: 30px;
  cursor: pointer;
  align-self: center;
}
.teams {
  display: flex;
  flex-direction: column;
}
.teamsName {
  margin: 2px;
  padding: 5px;
  border: solid 1px #f2f2f2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.teamsName h3 {
  cursor: pointer;
}
.titleTeam {
  color: white;
}
@media screen and (max-width: 900px) {
  .thumbnailList {
    display: none;
  }
  .characters h3 {
    margin-left: 20px;
  }
}
</style>
