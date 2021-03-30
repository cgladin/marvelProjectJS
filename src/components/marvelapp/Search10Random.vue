<template>
  <div>
    {{ this.totalCharacters }}
    <div @click="get10random()">click</div>
  </div>
</template>

<script>
import { get } from "@/utils/Api";
export default {
  name: "Search10Random",
  props: {
    totalCharacters: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      characters: []
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

      get(options).then(res => {
        if (res.data.results.length > 0) {
          //get 10 random from result
          for (let i = 0; i < 10; i++) {
            self.characters.push(
              res.data.results[Math.floor(Math.random() * limit)]
            );
          }
        }
      });
    }
  }
};
</script>

<style></style>
