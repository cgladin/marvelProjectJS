<template>
  <div>
      <h1>Marvel Project - Clément Gladin et Cindy Houriez</h1>
      <Search/>
      <Search10Random/>
      <ShowResult/>
  </div>
</template>

<script>
import Search from './marvelapp/Search.vue'
import ShowResult from './marvelapp/ShowResult.vue'
import Search10Random from './marvelapp/Search10Random'
export default {
  components: { ShowResult, Search , Search10Random},
   

}
</script>

<style>

</style>