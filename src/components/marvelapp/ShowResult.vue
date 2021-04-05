<template>
  <div>
    <div
      v-for="character in characters"
      :key="character.id"
      class="characters"
      @click="showCharacter(character)"
    >
      <img
        :src="character.thumbnail.path + '.' + character.thumbnail.extension"
        :alt="character.name"
        class="thumbnailList"
      />
      <h3 class="characters-name">{{ character.name }}</h3>
    </div>

    <!--modal affichage détaillé d'un personnage-->
    <div v-if="toggleShowCharacter" class="modal">
      <div class="modal-content modal-div">
        <button class="close" @click="setToggleShowCharacter">Fermer</button>
        <div class="character-content">
          <div class="character-item">
            <img
              :src="
                displayedCharacter.thumbnail.path +
                  '.' +
                  displayedCharacter.thumbnail.extension
              "
              class="character-img"
              alt="character img"
            />
            <h3>{{ displayedCharacter.name }}</h3>
          </div>
          <div class="character-item">
            <p v-if="displayedCharacter.description">
              Description : {{ displayedCharacter.description }}
            </p>
            <div v-if="displayedCharacter.firstComics">
              <h4>Premier comics</h4>
              <p>{{ displayedCharacter.firstComics.title }}</p>
              <p>{{ firstComicsDate }}</p>
              <p v-if="displayedCharacter.firstComics.description">
                {{ displayedCharacter.firstComics.description }}
              </p>
            </div>
            <div v-if="displayedCharacter.lastComics">
              <h4>Dernier comics</h4>
              <p>Titre : {{ displayedCharacter.lastComics.title }}</p>
              <p>Date : {{ lastComicsDate }}</p>
              <p v-if="displayedCharacter.lastComics.description">
                {{ displayedCharacter.lastComics.description }}
              </p>
            </div>
          </div>
        </div>

        <button @click="addToTeam">Ajouter à la team</button>
      </div>
    </div>
    <!--modal-->
    <div v-if="popUp" :class="popupState ? 'successAdd' : 'errorAdd'">
      <h2>{{ infoText }}</h2>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils/Api";
export default {
  name: "ShowResult",
  props: {
    characters: {
      type: Array
    },
    teamCharacters: {
      type: Array
    }
  },
  data() {
    return {
      toggleShowCharacter: false,
      displayedCharacter: null,
      popUp: false,
      infoText: "",
      popupState: true
    };
  },
  computed: {
    firstComicsDate() {
      //affiche la date d'un comics sous la forme jour day mois année
      return new Date(
        this.displayedCharacter.firstComics.dates.find(
          o => o.type === "onsaleDate"
        ).date
      ).toLocaleDateString("fr-FR", {
        weekday: "long",
        month: "long",
        day: "numeric"
      });
    },
    lastComicsDate() {
      //affiche la date d'un comics sous la forme jour day mois année
      return new Date(
        this.displayedCharacter.lastComics.dates.find(
          o => o.type === "onsaleDate"
        ).date
      ).toLocaleDateString("fr-FR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    }
  },
  methods: {
    async showCharacter(character) {
      //affiche le character selectionné
      this.toggleShowCharacter = true;
      this.displayedCharacter = character;
      //on récupère le dernier comics du personnage
      const options = {
        orderBy: "-onsaleDate",
        endpoint: character.id + "/comics"
      };
      await get(options).then(res => {
        if (res.data.results.length > 0) {
          this.displayedCharacter.lastComics = res.data.results[0];
        }
      });
      //on récupère le premier comics du personnage
      const options2 = {
        orderBy: "onsaleDate",
        endpoint: character.id + "/comics"
      };
      await get(options2).then(res => {
        if (res.data.results.length > 0) {
          this.displayedCharacter.firstComics = res.data.results[0];
        }
      });
      //on update la view
      this.$forceUpdate();
    },
    setToggleShowCharacter() {
      this.toggleShowCharacter = false;
    },
    addToTeam() {
      //on ajoute le personnage si il n'y est pas déjà à la team puis on fais remonté l'information
      if (!this.teamCharacters.some(c => c.id === this.displayedCharacter.id)) {
        this.teamCharacters.push(this.displayedCharacter);
        this.showPopUp("Personnage ajouté", true);
        this.$emit("updateTeamCharacters", this.teamCharacters);
      } else {
        this.showPopUp("Personnage déjà ajouté", false);
      }
    },
    showPopUp(message, state) {
      //permet d'afficher une popup pendant 2 secondes en bas avec un message
      this.infoText = message;
      this.popUp = true;
      this.popupState = state; //pour savoir si c'est une erreur ou un success
      setTimeout(() => {
        this.infoText = "";
        this.popUp = false;
      }, 2000);
    }
  }
};
</script>

<style scoped>
@import "../../assets/global.css";
.close {
  position: absolute;
  top: 15px;
  right: 15px;
}
.modal-div {
  position: relative;
}
.characters {
  padding: 1em;
}
.thumbnailList {
  height: 100px;
  width: auto;
}
.characters-name {
  padding-left: 1em;
}
.character-content {
  display: flex;
  flex-direction: row;
  margin: 3em;
}
.character-item {
  display: flex;
  flex-direction: column;
  margin: 1em;
}
.character-item h3 {
  font-size: 2em;
  font-weight: bold;
}
.character-img {
  height: 300px;
}
.character-content button {
  position: absolute;
  bottom: 0;
  left: 0;
}
.errorAdd {
  position: absolute;
  bottom: 20px;
  right: 50%;
  background-color: #bb0b0b;
  border-radius: 10px;
  color: white;
  padding: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.errorAdd h2 {
  margin: 0;
}
</style>
