<template>
  <div>
    {{this.totalCharacters}}
    <div @click="get10random()">click</div>
  </div>
</template>

<script>
import {get} from '../../utils/Api'
export default {
  name: "Search10Random",
  props: {
    totalCharacters: {
      type: Number,
      required: true
      },
  },
  data() {
    return {
      characters: []
    };
  },
  methods: {
    get10random(){
      let self = this;
     
      let options= {
        offset:Math.floor(Math.random() * ((self.totalCharacters-10) -  1)) + 1,
        limit:10,
        endpoint: "characters"
      }
      
      get(options).then(res=> console.log(res.data))
      console.log(self.characters);
    },
  },
};
</script>

<style>
</style>