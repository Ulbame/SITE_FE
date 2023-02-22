// src/service/loginAPI.js
import axios from 'axios';

function getUserInfo(userId, userPw) {
  const reqData = {
    user_id: userId,
    user_pw: userPw,
  };

  let serverUrl = 'https://localhost:9091';

  return axios.post(serverUrl + '/user/login', reqData, {
    headers: {
      'Content-type': 'application/json',
    },
  });
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
  console.log('유저등록');
  return axios.post('https://localhost:9091/user/signup', userData);
};

export { registerUser, login };
