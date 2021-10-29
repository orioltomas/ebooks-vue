import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      search: '',
      category: ''
    }
  },
  mutations: {
    changeSearch (state, value) {
      state.search = value;
    },
    changeCategory (state, value) {
      state.category = value;
    }
  }
});

export default store;
