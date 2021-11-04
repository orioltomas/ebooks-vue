<template>
  <img id="logo-img" alt="Ebooks" src="/ebooks-logo.png">
  <EbookList/>
</template>

<script>
import EbookList from './../components/EbookList.vue';

export default {
  name: 'Ebooks',
  components: {
    EbookList
  }
}
</script>

<style>
#logo-img {
  width: 125px;
  height: 125px;
}
</style>
