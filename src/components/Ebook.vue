<template>
  <div class="ebook">
    <div class="details">
      <div class="column-left">
        <div class="field">
          <label>Títol:</label>
          <span>{{ ebook.title }}</span>
        </div>
        <div class="field">
          <label>Autor:</label>
          <span class="author" @click="searchAuthor()">
            {{ ebook.author }}
          </span>
        </div>
        <div class="description">
          <div class="field">
            <a
              href="#"
              @click.prevent="showDescription = !showDescription"
            >
              <label
                class="description-link"
              >
                Descripció
                <img
                  class="description-icon"
                  :class="showDescription ? 'show' : ''"
                  src="./../assets/down-arrow.svg"
                />
              </label>
            </a>
            <div v-if="showDescription">
              {{ ebook.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="column-right">
        <div class="field year">
          <label>Publicat l'any:</label>
          <span>{{ ebook.publication }}</span>
        </div>
        <div class="field year">
          <label>Afegit:</label>
          <span>{{ dateFormat(ebook.creation) }}</span>
        </div>
        <div
          class="categories"
          v-for="(category, index) in ebook.categories"
          :key="index"
        >
            <div class="field" v-if="categoryName(category)">
              {{ categoryName(category) }}
            </div>
        </div>
      </div>
    </div>
    <div class="downloads" v-if="ebook.files">
      <template v-if="ebook.files.ca">
        <a
          class="download-btn"
          :href="`/ebooks/${ ebook.files.ca }`"
        >
          Català
        </a>
      </template>
      <template v-if="ebook.files.es">
        <a
          class="download-btn"
          :href="`/ebooks/${ ebook.files.es }`"
        >
          Castellà
        </a>
      </template>
      <template v-if="ebook.files.en">
        <a
          class="download-btn"
          :href="`/ebooks/${ ebook.files.en }`"
        >
          Anglès
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import store from './../store/store';
import categories from './../data/categories';

export default {
  name: 'Ebook',
  props: ['ebook'],
  data() {
    return {
      showDescription: false
    }
  },
  setup(props) {
    const dateFormat = (dateString) => {
      const date = new Date(dateString);
      let formattedDate = date.getDate().toString();
      formattedDate += '/' + (date.getMonth() + 1).toString();
      formattedDate += '/' + date.getFullYear().toString();
      return formattedDate;
    };

    const categoryName = (value) => {
      const category = categories.find(category => category.value == value);

      if (category) {
        return category.name;
      } else {
        return null;
      }
    };

    const searchAuthor = () => {
      console.log(props.ebook.author);
      store.commit('changeSearch', props.ebook.author);
    }

    return {
      categories,
      dateFormat,
      categoryName,
      searchAuthor
    }
  }
}
</script>

<style scoped>
.ebook:not(:last-of-type) {
  margin-bottom: 20px;
  border-bottom: 1px solid #d4ae68;
}
.ebook .details {
  display: block;
}
.ebook .details .column-right {
  min-width: 130px;
}
.ebook .field {
  margin-bottom: 5px;
}
.ebook .field.year {
  font-size: 12px;
  text-align: left;
}
.ebook label {
  margin-right: 5px;
  color: #d4ae68;
  text-transform: uppercase;
  font-weight: 500;
}
.ebook .author:hover {
  cursor: pointer;
  text-shadow: 0 0 5px #d4ae68;
}
.ebook .description a {
  color: #d4ae68;
  text-decoration: none;
}
.ebook .description-link:hover {
  cursor: pointer;
}
.ebook .description-icon {
  width: 13px;
  height: 13px;
  transition: all .5s linear;
}
.ebook .description-icon.show {
  transform: rotateX(180deg);
}
.ebook .categories {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.ebook .categories .field {
  text-transform: capitalize;
  font-size: 12px;
  padding: 2px 5px;
  color: black;
  background-color: #d4ae68;
}
.ebook .downloads {
  margin: 20px 0 30px;
}
.ebook .download-btn {
  text-decoration: none;
  color: white;
  border: 1px solid #d4ae68;
  padding: 5px 10px;
}
.ebook .download-btn:not(:first-of-type) {
  margin-left: 5px;
}
@media (min-width: 576px) {
  .ebook .details {
    display: flex;
    justify-content: space-between;
  }
  .ebook .field.year {
    text-align: right;
  }
}
</style>
