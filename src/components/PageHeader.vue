<!-- PageHeader.vue -->
<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/post">Board</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!this.$store.state.isLogin"
        >Login</router-link
      >
      <router-link to="/signup" v-if="!this.$store.state.isLogin">
        / Sign Up</router-link
      >
      <a href="#" onclick="" v-else @click="logout">Logout</a>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      this.$router.go();
    },
  },
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: #42b983;
}
</style>
