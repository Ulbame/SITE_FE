// src/service/loginAPI.js
import axios from 'axios';

function getUserInfo(userId, userPw) {
  const loginData = {
    user_id: userId,
    user_pw: userPw,
  };

  return axios.post('http://localhost:9091/user/login', loginData);
}

async function login(userId, userPw) {
  try {
    const getUserInfoPromise = getUserInfo(userId, userPw);
    const [userInfoResponse] = await Promise.all([getUserInfoPromise]);
    if (userInfoResponse.data.length === 0) {
      return 'notFound';
    } else {
      localStorage.setItem('user_token', userInfoResponse.data.user_token);
      localStorage.setItem('user_role', userInfoResponse.data.user_role);
      return userInfoResponse;
    }
  } catch (err) {
    console.error(err);
  }
}

const registerUser = userData => {
  return axios.post('http://localhost:9091/user/signup', userData);
};

export { registerUser, login };
