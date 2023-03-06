<template>
  <div>
    <div>
      <h1>Log In</h1>
      <div id="loginForm">
        <form>
          <p>
            <input
              class="w3-input"
              name="uid"
              placeholder="Enter your ID"
              v-model="user_id"
            /><br />
          </p>
          <p>
            <input
              name="password"
              class="w3-input"
              placeholder="Enter your password"
              v-model="user_pw"
              type="password"
            />
          </p>
          <p>
            <button
              type="button"
              class="w3-button w3-green w3-round w3-margin"
              @click="login"
            >
              Login
            </button>
          </p>
        </form>
        <a
          href="#;"
          onclick="return false;"
          @click="$store.commit('MODAL_COMPONENT', 'SignupModal')"
          >회원가입 창으로 전환</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { userLogin } from '@/api/user';

export default {
  data() {
    return {
      user_id: '',
      user_pw: '',
    };
  },
  methods: {
    async login() {
      try {
        if (!this.isInputEmpty()) {
          console.log('empty input');
          return;
        }
        const userData = await userLogin(this.user_id, this.user_pw);
        console.log(userData);
        if (userData === 'login failed') {
          console.log('login failure');
        } else {
          console.log('login success');
          this.$router.push('/');
          this.$store.commit('IS_MODAL_VIEWED', false);
          this.$store.commit('MODAL_COMPONENT', 'default');
          return;
        }
      } catch (err) {
        console.log(err);
        if (err.message.indexOf('Network Error') > -1) {
          alert('서버에 접속할 수 없습니다. 상태를 확인해주세요.');
        } else {
          alert('로그인 정보를 확인할 수 없습니다.');
        }
      }
    },
    isInputEmpty() {
      if (!this.user_id) {
        return alert('ID를 입력하세요.');
      }
      if (!this.user_pw) {
        return alert('비밀번호를 입력하세요.');
      }
      return true;
    },
  },
  computed: {
    ...mapGetters({
      errorState: 'getErrorState',
    }),
  },
};
</script>

<style></style>
