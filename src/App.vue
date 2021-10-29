<template>
  <img id="logo-img" alt="Ebooks" src="/ebooks-logo.png">
  <EbookList/>
</template>

<script>
import EbookList from './components/EbookList.vue';

export default {
  name: 'App',
  components: {
    EbookList
  }
}
</script>

<style>
body {
  min-height: 100vh;
  background-color: #0b0b0b;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  padding: 25px 0;
}
#logo-img {
  width: 125px;
  height: 125px;
}
</style>
