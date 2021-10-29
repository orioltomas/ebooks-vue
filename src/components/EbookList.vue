<template>
  <Search/>
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
import store from './../store/store';
import Search from './Search.vue';
import Ebook from './Ebook.vue';
import ebooks from './../data/ebooks';
import categories from './../data/categories';

export default {
  name: 'EbookList',
  components: {
    Search,
    Ebook
  },
  setup() {
    const search = computed(() => {
      return store.state.search;
    });
    const category = computed(() => {
      return store.state.category;
    });
    const order = reactive({value: 'creation'});

    const sortEbooks = (ebooks) => {
      return ebooks.sort((a, b) => {
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
    };

    const filterEbooks = (ebooks) => {
      return ebooks.filter(ebook => {
        const lowerSearch = search.value.toLowerCase();
        const lowerTitle = ebook.title.toLowerCase();
        const lowerAuthor = ebook.author.toLowerCase();
        
        const foundSearch = (
          lowerSearch == '' ||
          lowerTitle.includes(lowerSearch) ||
          lowerAuthor.includes(lowerSearch)
        );

        const foundCategory = (
          category.value == '' ||
          ebook.categories.includes(category.value)
        );

        return (foundSearch && foundCategory);
      });
    }

    const showEbooks = computed(() => {
      const sortedEbooks = sortEbooks(ebooks);
      if (search.value == '' && category.value == '') return sortedEbooks;
      return filterEbooks(sortedEbooks);
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
select {
  color: white;
  background-color: #0b0b0b;
  padding: 5px 0;
  border-color: white;
  border-width: 0 0 1px 0;
  letter-spacing: 1px;
}
select:focus-visible {
  outline: none;
}

.ebook-list {
  margin-top: 25px;
  padding: 0 20px;
  text-align: left;
}
.ebook-list .headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
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
