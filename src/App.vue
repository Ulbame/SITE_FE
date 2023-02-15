<template>
  <div class="root">
    <PageHeader />
    <router-view />
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

export default {
  name: 'App',
  components: {
    PageFooter,
    PageHeader,
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
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  height: 1080px;
  width: 1920px;
  justify-content: center;
}
</style>
