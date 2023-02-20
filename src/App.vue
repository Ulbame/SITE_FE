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
}
.root {
  height: 100%;
  width: 80%;
  min-width: 640px;
  min-height: 480px;
  max-width: 1024px;
  max-height: 640px;
  justify-content: center;
  margin: auto;
}
.body {
  min-width: 425px;
  min-height: 640px;
}
</style>
