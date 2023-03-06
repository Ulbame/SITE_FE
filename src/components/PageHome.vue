<template>
  <div id="home">
    <div id="home-text">
      <h3 @click="show[0] = !show[0]">Vue.js 연습용 웹사이트</h3>
      <Transition name="slide-fade">
        <div v-show="!show[0]"></div>
      </Transition>
      <Transition name="slide-fade">
        <div v-show="show[0]">
          <p>
            이 곳은 Vue.js의 연습을 위해 만들어졌습니다.
            <br />
            상세 내용은 하단 링크를 참고해 주시면 되겠습니다.
          </p>
        </div>
      </Transition>
      <h3 @click="show[1] = !show[1]">일시별 개발내용</h3>
      <Transition name="slide-fade">
        <div v-show="show[1]">
          <p>23/02/21 백엔드 서버와의 통신에서의 예외처리</p>
          <p>23/02/23 Login 등의 화면 모달로 처리</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: [true, false],
    };
  },
};
</script>

<style scoped>
#home {
  margin: auto;
  background-color: #ede7f6;
  border-radius: 10px;
  padding: 10px;
  height: 100%;
  width: 100%;
  vertical-align: middle;
}
#home-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  vertical-align: middle;
}
p {
  text-align: left;
  margin: 1rem;
  vertical-align: middle;
}

.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(30%);
  opacity: 0;
}
</style>
