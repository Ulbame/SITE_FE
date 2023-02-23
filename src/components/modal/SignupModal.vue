<template>
  <div>
    <div>
      <h1>Please Sign Up</h1>
      <div id="signupForm">
        <form @submit.prevent="signup">
          <p>
            ID :
            <input
              class="w3-input"
              name="uid"
              placeholder="Enter your ID"
              v-model="user_id"
            />
          </p>
          <p>
            PASSWORD :
            <input
              name="password"
              class="w3-input"
              placeholder="Enter your password"
              v-model="user_pw"
              type="password"
            />
          </p>
          <p>
            NICKNAME :
            <input
              name="nickname"
              class="w3-input"
              placeholder="Enter your nickname"
              v-model="user_name"
            />
          </p>
          <button type="submit" class="w3-button w3-green w3-round w3-margin">
            Submit
          </button>
        </form>
        <a
          href="#"
          onclick="return false;"
          @click="$store.commit('MODAL_COMPONENT', 'LoginModal')"
          >로그인 창으로 전환</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/user';

export default {
  data() {
    return {
      // form values
      user_id: '',
      user_pw: '',
      user_name: '',
      // log
      logMessage: '',
    };
  },
  methods: {
    async signup() {
      const userData = {
        user_id: this.user_id,
        user_pw: this.user_pw,
        user_name: this.user_name,
      };
      try {
        const { data } = await registerUser(userData);
        this.logMessage = `${data.userId} 님이 가입되었습니다`;
        this.clearData();
      } catch (error) {
        console.log('사용자 등록 실패');
        console.log(error);
        return;
      }
    },
    clearData() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style scoped>
p {
  margin-top: 25px;
  text-align: right;
  width: 350px;
  margin: auto;
  margin-top: 25px;
}
input {
  display: inline-block;
  width: 250px;
}
</style>
