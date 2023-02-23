<template>
  <div class="root">
    <LoadingBar></LoadingBar>
    <ModalTemplate v-if="isModalViewed">
      <ModalContents />
    </ModalTemplate>
    <PageHeader />
    <router-view class="body" />
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import LoadingBar from '@/components/common/LoadingBar';
import ModalTemplate from '@/components/modal/ModalTemplate';
import ModalContents from '@/components/modal/ModalContents';

export default {
  name: 'App',
  computed: {
    isModalViewed() {
      return this.$store.state.isModalViewed;
    },
  },
  methods: {
    openModal() {
      this.$store.commit('IS_MODAL_VIEWED', true);
    },
  },
  components: {
    PageFooter,
    PageHeader,
    LoadingBar,
    ModalTemplate,
    ModalContents,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #d1c4e9;
}
.root {
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.body {
  min-width: 640px;
  max-width: 800px;
  height: 70%;
  border-radius: 10px;
  margin: auto;
  background-color: #ede7f6;
  text-align: middle;
  padding: 10px;
}
</style>
