<template>
  <div>
    <h1>Default Modal</h1>
    <h3>기본 모달입니다.</h3>
    <h3>
      기본적으로 볼 수 없는 모달창이므로, 이 모달을 보시게 된 경로를 알려주시면
      감사하겠습니다.
    </h3>
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
