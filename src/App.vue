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
  },
  setup() {
    const handleScroll = () => {
      const logoImg = document.getElementById('logo-img');
      
      if (window.scrollY > 25) {
        logoImg.style.width = '100px';
        logoImg.style.height = '100px';
      } else {
        logoImg.style.width = '150px';
        logoImg.style.height = '150px';
      }
    };

    return {
      handleScroll
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
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
  padding: 30px 0;
}
#logo-img {
  width: 150px;
  height: 150px;
  transition: all 1s linear;
}
@media (min-width: 576px) {
  #app {
    padding: 50px 0;
  }
}
</style>
