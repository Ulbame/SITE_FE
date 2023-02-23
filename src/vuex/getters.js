export default {
  getUserId: state => state.userId,
  getErrorState: state => state.errorState,
  getIsLogin: state => state.isLogin,
  getLoadingStatus: state => state.loadingStatus,
  loggedIn(state) {
    return !!state.user;
  },
};
