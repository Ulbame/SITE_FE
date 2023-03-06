<template>
  <div>
    <h1>로그인 필요</h1>
    <h3>현재 로그인 상태가 아닙니다.</h3>
    <h3>로그인 하시겠습니까?</h3>
    <button
      type="button"
      class="button"
      @click="$store.commit('MODAL_COMPONENT', 'LoginModal')"
    >
      확인
    </button>
    <button
      type="button"
      class="button"
      @click="$store.commit('IS_MODAL_VIEWED', false)"
    >
      닫기
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
