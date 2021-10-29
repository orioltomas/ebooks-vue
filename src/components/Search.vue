<template>
  <div class="search">
    <h3 class="title">Busca el teu ebook:</h3>
    <input
      v-model="search"
      @keyup="changeSearch($event)"
      placeholder="Nom o Autor"
    />
    <select
      v-model="category"
      @change="changeCategory()"
    >
      <option value="">
        All Categories
      </option>
      <template
        v-for="(category, index) in categories"
        :key="index"
      >
        <option :value="category.value">
          {{ category.name }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import store from './../store/store';
import categories from './../data/categories';

export default {
  name: 'Search',
  setup() {
    const search = ref('');
    const category = ref('');

    const changeSearch = (event) => {

      let timer = null;

      if (event.code == 'Enter') {
        setSearchStore()
      } else {
        clearTimeout(timer);
        timer = setTimeout(
          setSearchStore(),
          1500
        );
      }
    };

    const setSearchStore = () => {
      store.commit('changeSearch', search.value);
    };

    const changeCategory = () => {
      store.commit('changeCategory', category.value);
    };

    return {
      search,
      changeSearch,
      categories,
      category,
      changeCategory
    }
  }
}
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  margin: 25px auto 0;
}
.search .title {
  margin-block: 0;
}
.search > * {
  margin: 15px;
}
input {
  color: white;
  background-color: #0b0b0b;
  padding: 5px 10px;
  border-color: white;
  border-width: 0 0 1px 0;
  letter-spacing: 1px;
}
select {
  color: white;
  background-color: #0b0b0b;
  padding: 5px 0;
  border-color: white;
  border-width: 0 0 1px 0;
  letter-spacing: 1px;
}
input:focus-visible,
select:focus-visible {
  outline: none;
}
@media (min-width: 576px) {
  .search {
    flex-direction: row;
  }
}
</style>
