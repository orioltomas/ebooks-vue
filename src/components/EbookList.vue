<template>
  <div class="search">
    <h3 class="title">Busca el teu ebook:</h3>
    <input v-model="search.value" placeholder="Nom o Autor" />
    <select v-model="category.value">
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

  <div class="ebook-list">
    <div class="headline">
      <h1>Ebooks disponibles</h1>
      <select v-model="order.value">
        <option value="creation">Novetats</option>
        <option value="publication">Any Publicació</option>
      </select>
    </div>
    <template v-if="!showEbooks.length">
      No hi ha ebooks disponibles encara.
    </template>
    <template v-for="(ebook, index) in showEbooks" :key="index">
      <Ebook :ebook="ebook"/>
    </template>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity';
import Ebook from './Ebook.vue';
import ebooks from './../data/ebooks';
import categories from './../data/categories';

export default {
  name: 'EbookList',
  components: {
    Ebook
  },
  setup() {
    const search = reactive({value: ''});
    const category = reactive({value: ''});
    const order = reactive({value: 'creation'});

    const showEbooks = computed(() => {

      const sortedEbooks = ebooks.sort((a, b) => {
        let date1, date2;
        if (order.value == 'creation') {
          date1 = new Date(a.creation);
          date2 = new Date(b.creation);
        } else {
          date1 = new Date(a.publication);
          date2 = new Date(b.publication);
        }

        if (date1 > date2) {
          return -1;
        } else {
          return 1;
        }
      });

      if (search.value == '' && category.value == '') return sortedEbooks;

      return sortedEbooks.filter(ebook => {
        const lowerSearch = search.value.toLowerCase();
        const lowerTitle = ebook.title.toLowerCase();
        const lowerAuthor = ebook.author.toLowerCase();

        return (
          (lowerTitle.includes(lowerSearch) ||
          lowerAuthor.includes(lowerSearch)) &&
          ebook.categories.includes(category.value)
        );
      });
    });

    return {
      search,
      categories,
      order,
      category,
      showEbooks
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

.ebook-list {
  margin-top: 50px;
  padding: 0 20px;
  text-align: left;
}
.ebook-list .headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ebook-list h1 {
  text-transform: uppercase;
  font-weight: 100;
  font-size: 24px;
}
@media (min-width: 576px) {
  .ebook-list {
    padding: 0 100px;
  }
  .ebook-list h1 {
    font-size: 32px;
  }
}
</style>
