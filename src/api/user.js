import { userAxios } from '@/api/index';
import store from '@/vuex/store';

const registerUser = userData => {
  return userAxios.post('/signup', userData);
};

function getUser(userId, userPw) {
  const userData = {
    user_id: userId,
    user_pw: userPw,
  };
  return userAxios.post('/login', userData);
}

async function userLogin(userId, userPw) {
  try {
    const { data: userData } = await getUser(userId, userPw);
    console.log(userData);
    if (!userData.user_token) {
      store.commit('ERROR_STATE', 'Wrong ID or Password');
      store.commit('IS_LOGIN', false);
      return 'login failed';
    } else {
      localStorage.setItem('user_token', userData.user_token);
      localStorage.setItem('user_role', userData.user_role);
      localStorage.setItem('user_id', userData.user_id);
      store.commit('USER_ID', userData.user_id);
      store.commit('ERROR_STATE', '');
      store.commit('IS_LOGIN', true);
      return userData;
    }
  } catch (err) {
    console.log('error catched');
    console.error(err);
    return 'login failed';
  }
}
export { registerUser, userLogin };
