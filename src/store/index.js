import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      paging: {
        currentPage: 1,
        pagingSize: 10,
        listSize: 10,
        lastPagingNumber: undefined,
      },
      searchCondition: {},
    };
  },
  getters() {
    return {};
  },
  mutations() {
    return {
      setPaging(paging) {
        this.state.paging = paging;
      },
      clearPaging() {
        this.state.pagign = {
          currentPage: 1,
          pagingSize: 10,
          listSize: 10,
          lastPagingNumber: undefined,
        };
      },
      setSearchCondition(searchCondition) {
        this.state.searchCondition = searchCondition;
      },
      clearSearchCondition() {
        this.state.searchConditon = {};
      },
    };
  },
  actions() {
    return {};
  },
});

export default store;

// actions: {
//   async LOGIN({ commit }, userData) {
//     const { data } = await loginUser(userData);
//     console.log(data.token);
//     commit('setToken', data.token);
//     commit('setUsername', data.user.username);
//     saveAuthToCookie(data.token);
//     saveUserToCookie(data.user.username);
//     return data;
//   },
// }
