<!-- PageHeader.vue -->
<template>
  <header>
    <div>
      <br />
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/post">Board</router-link> |
        <router-link to="/about">About</router-link> |
        <span v-if="!isLogin">
          <a href="#" onclick="return false;" @click="showModal('LoginModal')"
            >Login</a
          >
          /
          <a href="#" onclick="return false;" @click="showModal('SignupModal')"
            >SignUp</a
          >
        </span>
        <span v-else>
          <a>MyInfo</a> /
          <a href="#" onclick="return false;" @click="showModal('LogoutModal')"
            >Log Out</a
          >
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
  },
  methods: {
    showModal(modalComponent) {
      console.log(`${modalComponent} will be showed`);
      this.$store.commit('MODAL_COMPONENT', modalComponent);
      this.$store.commit('IS_MODAL_VIEWED', true);
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

#nav a:hover {
  color: #bbdefb;
}

#nav a.router-link-active {
  color: #64b5f6;
}
</style>
