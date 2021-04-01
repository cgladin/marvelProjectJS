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
      <h3>{{ character.name }}</h3>
    </div>

    <!--modal-->
    <div v-if="toggleShowCharacter" class="modal">
      <h3>{{ displayedCharacter.name }}</h3>
      <p>{{ displayedCharacter.description }}</p>
      <!--<div>
        diaporama image a faire
        <img
          v-for="image in displayedCharacter.images"
          :src="image.path + '.' + image.extension"
          :key="image.path"
          :alt="displayedCharacter.name + ' image'"
        />
      </div>-->
      <p>
        Le comic (titre, date, description) où est apparu le personnage pour la
        première fois
      </p>
      <p>
        Le comic (titre, date, description) où est apparu le personnage pour la
        dernière fois
      </p>
      <button @click="setToggleShowCharacter">Fermer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowResult",
  props: {
    characters: {
      type: Array
      //verifier type des objets
    }
  },
  data() {
    return {
      toggleShowCharacter: false,
      displayedCharacter: null
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
    }
  },
};
</script>

<style>
.characters {
  border-radius: 10px;
  border: solid 1px #f2f2f2;
  display: flex;
  flex-direction: row;
}
.thumbnailList {
  height: 100px;
  width: auto;
}
</style>
