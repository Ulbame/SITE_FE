<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$store.commit('IS_MODAL_VIEWED', false);
      this.$store.commit('MODAL_COMPONENT', 'DefaultModal');
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  margin: auto;
  margin-top: 30px;
  padding: 40px;
  background-color: white;
  /* min-height: 500px; */
  z-index: 10;
  opacity: 1;
  border-radius: 20px;
}
</style>
