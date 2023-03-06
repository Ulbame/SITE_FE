import * as types from './mutation_types';

export default {
  [types.USER_ID](state, userId) {
    state.userId = userId;
  },
  [types.ERROR_STATE](state, errorState) {
    state.errorState = errorState;
  },
  [types.IS_LOGIN](state, isLogin) {
    state.isLogin = isLogin;
  },
  [types.LOADING_STATUS](state, loadingStatus) {
    state.loadingStatus = loadingStatus;
  },
  [types.IS_MODAL_VIEWED](state, isModalViewed) {
    state.isModalViewed = isModalViewed;
  },
  [types.MODAL_COMPONENT](state, modalComponent) {
    state.modalComponent = modalComponent;
  },
  [types.IS_MOBILE](state, isMobile) {
    state.isMobile = isMobile;
  },
};
