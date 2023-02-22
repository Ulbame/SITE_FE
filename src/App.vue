<template>
  <div class="root">
    <PageHeader />
    <router-view class="body" />
    <PageFooter />
    <LoadingBar></LoadingBar>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import LoadingBar from '@/components/LoadingBar';

export default {
  name: 'App',
  components: {
    PageFooter,
    PageHeader,
    LoadingBar,
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
  /* display: flex;
  flex-direction: column;
  align-items: center; */
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
