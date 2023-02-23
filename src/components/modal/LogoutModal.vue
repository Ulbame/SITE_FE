<template>
  <div>
    <h1>Logout Modal</h1>
    <p>로그아웃 하시겠습니까?</p>
    <button class="button" @click="logout">확인</button>
    <button class="button" @click="closeModal">취소</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_id');
      this.$router.push('/');
      this.closeModal();
    },
    closeModal() {
      this.$store.commit('MODAL_COMPONENT', 'DefaultModal');
      this.$store.commit('IS_MODAL_VIEWED', false);
      this.$store.commit('IS_LOGIN', false);
    },
  },
};
</script>

<style></style>
