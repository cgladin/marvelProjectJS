<template>
  <div>
    <button @click="get10random()" class="button">Recherche aléatoire</button>
    <label class="label">
      Recherche :
      <input class="input" type="text" v-model="searchInput" />
    </label>
    <button @click="handleSubmit" class="button">Rechercher</button>
  </div>
</template>

<script>
import { get } from "@/utils/Api";
export default {
  name: "Search",
  props: {
    totalCharacters: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      characters: [],
      searchInput: ""
    };
  },
  methods: {
    get10random() {
      const self = this;
      const limit = 50;
      const options = {
        offset:
          Math.floor(Math.random() * (self.totalCharacters - limit - 1)) + 1,
        limit: limit,
        endpoint: "characters"
      };
      this.characters = [];

      get(options).then(res => {
        if (res.data.results.length > 0) {
          //get 10 random from result
          const indexSelected = [];
          for (let i = 0; i < 10; i++) {
            let randomIndex = Math.floor(Math.random() * (limit - 1));
            let exist = indexSelected.some(index => index === randomIndex);
            while (exist) {
              randomIndex = Math.floor(Math.random() * (limit - 1));
              exist = indexSelected.some(index => index === randomIndex);
            }
            indexSelected.push(randomIndex);
            self.characters.push(res.data.results[randomIndex]);
          }
          this.$emit("updateCharacters", this.characters);
        }
      });
    },
    handleSubmit() {
      if (this.searchInput !== "") {
        const options = {
          nameStartsWith: this.searchInput,
          endpoint: "characters"
        };
        get(options).then(res => {
          this.characters = res.data.results;
          this.$emit("updateCharacters", this.characters);
        });
      }
    }
  }
};
</script>

<style scoped>
.input {
  border-radius: 22px;
  padding: 10px 0;
  font-size: 1.1em;
  color: black;
  padding-left: 15px;
}
.label {
  font-size:1.2em;
  font-weight: bold;
}
</style>
