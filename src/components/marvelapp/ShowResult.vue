<template>
  <div>
    <div v-for="character in characters" :key="character.id" class="characters">
      <img
        :src="character.thumbnail.path + '.' + character.thumbnail.extension"
        :alt="character.name"
        class="thumbnailList"
      />
      <h3>{{ character.name }}</h3>
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
  }
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
