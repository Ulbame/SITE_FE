export default {
  getUserId: state => state.userId,
  getErrorState: state => state.errorState,
  getIsAuth: state => state.isAuth,
  getLoadingStatus: state => state.loadingStatus,
  loggedIn(state) {
    return !!state.user;
  },
};
