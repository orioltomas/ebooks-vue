<template>
  <div class="ebook">
    <div class="details">
      <div>
        <div class="field">
          <label>Títol:</label>
          {{ ebook.title }}
        </div>
        <div class="field">
          <label>Autor:</label>
          {{ebook.author}}
        </div>
      </div>
      <div>
        <div class="field year">
          <label>Publicat l'any:</label>
          {{ ebook.publication }}
        </div>
        <div class="field year">
          <label>Afegit:</label>
          {{ dateFormat(ebook.creation) }}
        </div>
      </div>
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
    <div
      class="categories"
      v-for="(category, index) in ebook.categories"
      :key="index"
    >
        <div class="field" v-if="categoryName(category)">
          {{ categoryName(category) }}
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
import categories from './../data/categories';

export default {
  name: 'Ebook',
  props: ['ebook'],
  data() {
    return {
      showDescription: false
    }
  },
  setup() {
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

    return {
      categories,
      dateFormat,
      categoryName
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
.ebook .field {
  margin-bottom: 5px;
}
.ebook .field.year {
  font-size: 12px;
  text-align: left;
}
.ebook label {
  color: #d4ae68;
  text-transform: uppercase;
  font-weight: 500;
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
