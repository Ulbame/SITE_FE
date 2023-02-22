<!-- PageHeader.vue -->
<template>
  <header>
    <div>
      <br />
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/post">Board</router-link> |
        <router-link to="/about">About</router-link> |
        <span v-if="!this.$store.state.isLogin">
          <router-link to="/login">Login</router-link>
          <router-link to="/signup"> / Sign Up</router-link>
        </span>
        <span v-else>
          <a>MyInfo</a> /
          <a href="#" onclick="" @click="logout">Logout</a>
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      this.$router.push('MainPage');
    },
  },
};
</script>

<style scoped>
#nav {
  margin: auto;
  max-width: 400px;
  padding: 15px;
  background-color: #673ab7;
  border-radius: 10px;
  margin-bottom: 20px;
}

#nav a {
  font-weight: bold;
  color: #ede7f6;
}

#nav a.router-link-active {
  color: #42b983;
}
</style>
