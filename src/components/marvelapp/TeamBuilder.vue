<template>
  <div>
    <h1>Marvelous Team</h1>
    <div
      v-for="(character, index) in characters"
      :key="character.id+'_Team'"
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
  methods: {
    removeCharacter(index) {
      this.characters.splice(index, 1);
      this.$emit("updateTeamCharacters", this.characters);
    }
  }
};
</script>

<style scoped></style>
