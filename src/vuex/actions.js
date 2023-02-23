// src/vuex/actions.js
import { USER_ID, IS_LOGIN, ERROR_STATE } from './mutation_types';
import { login } from '@/api/auth';

let setUserId = ({ commit }, data) => {
  commit(USER_ID, data);
};

let setErrorState = ({ commit }, data) => {
  commit(ERROR_STATE, data);
};

let setIsLogin = ({ commit }, data) => {
  commit(IS_LOGIN, data);
};

let processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'notFound':
      setErrorState(store, 'Wrong ID or Password');
      setIsLogin(store, false);
      break;
    default:
      setUserId(store, loginResponse.user_id);
      setErrorState(store, '');
      setIsLogin(store, true);
  }
};

export default {
  async login(store, { user_id, user_pw }) {
    let loginResponse = await login(user_id, user_pw);
    processResponse(store, loginResponse);
    return store.getters.getIsLogin;
  },
};
