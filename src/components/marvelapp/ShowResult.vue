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

    <!--modal-->
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
            />
            <h3>{{ displayedCharacter.name }}</h3>
          </div>
          <div class="character-item">
            <p>{{ displayedCharacter.description }}</p>
            <p>
              Le comic (titre, date, description) où est apparu le personnage
              pour première fois
            </p>
            <p>
              Le comic (titre, date, description) où est apparu le personnage
              pour dernière fois
            </p>
          </div>
        </div>

        <button @click="addToTeam">Ajouter à la team</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowResult",
  props: {
    characters: {
      type: Array,
      //verifier type des objets
    },
    teamCharacters: {
      type: Array,
    },
  },
  data() {
    return {
      toggleShowCharacter: false,
      displayedCharacter: null,
    };
  },
  methods: {
    //faire defiler des images lesquels ?
    showCharacter(character) {
      this.toggleShowCharacter = true;
      this.displayedCharacter = character;
    },
    setToggleShowCharacter() {
      this.toggleShowCharacter = false;
    },
    addToTeam() {
      this.teamCharacters.push(this.displayedCharacter);
      this.$emit("updateTeamCharacters", this.teamCharacters);
    },
  },
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
</style>
