import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default createStore({
  state: {
    userId: null,
    isLogin: false,
    lodingStatus: false,
    isModalViewed: false,
    isMobile: false,
    modalComponent: 'DefaultModal',
  },
  mutations,
  getters,
  actions,
});
