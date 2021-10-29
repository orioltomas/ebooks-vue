<template>
  <div class="search">
    <h3
      class="title"
      :class="showSearch ? 'show' : ''"
      @click="showSearch = !showSearch"
    >
      <template v-if="!showSearch">
        Mostrar el cercador
      </template>
      <template v-else>
        Ocultar el cercador
      </template>
    </h3>
    <div class="form" v-if="showSearch">
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
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import store from './../store/store';
import categories from './../data/categories';

export default {
  name: 'Search',
  setup() {
    const searchStore = computed(() => {
      return store.state.search;
    });

    const showSearch = ref(false);
    const search = ref('');
    const category = ref('');
    let timer = null;

    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const changeSearch = (event) => {

      if (event.code == 'Enter') {
        clearTimer();
        setSearchStore();
      } else {
        clearTimer();
        timer = setTimeout(
          setSearchStore,
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
      showSearch,
      search,
      searchStore,
      changeSearch,
      categories,
      category,
      changeCategory
    }
  },
  watch: {
    searchStore (newValue) {
      this.search = newValue;
    }
  }
}
</script>

<style scoped>
.search {
  width: fit-content;
  margin: 25px auto 0;
}
.search .form {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  margin: 25px auto 0;
}
.search .title {
  width: fit-content;
  margin: 0 auto;
  margin-block: 0;
  padding: 6px 24px;
  border-radius: 20px;
  box-shadow: 0 0 10px #d4ec68;
  transition: all .5s linear;
}
.search .title:hover {
  cursor: pointer;
  color: black;
  background-color: #d4ec68;
}
.search .form > * {
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
  .search .form {
    flex-direction: row;
  }
}
</style>
