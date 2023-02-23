<template>
  <div>
    <div>
      <h1>Please Log In</h1>
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
              @click="callLogin"
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
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      user_id: '',
      user_pw: '',
    };
  },
  methods: {
    ...mapActions(['login']),

    async callLogin() {
      if (this.user_id === '') {
        alert('ID를 입력하세요.');
        return;
      }

      if (this.user_pw === '') {
        alert('비밀번호를 입력하세요.');
        return;
      }

      try {
        let loginResult = await this.login({
          user_id: this.user_id,
          user_pw: this.user_pw,
        });
        if (loginResult) {
          console.log('login success');
          this.$router.push('/home');
          this.$store.commit('IS_MODAL_VIEWED', false);
          this.$store.commit('MODAL_COMPONENT', 'default');
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
  },
  computed: {
    ...mapGetters({
      errorState: 'getErrorState',
    }),
  },
};
</script>

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>
