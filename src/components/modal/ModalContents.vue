<template>
  <div>
    <component :is="modalComponent"></component>
  </div>
</template>

<script>
import LoginModal from '@/components/modal/LoginModal.vue';
import SignupModal from '@/components/modal/SignupModal.vue';
import DefaultModal from '@/components/modal/DefaultModal.vue';
import NeedLoginModal from '@/components/modal/NeedLoginModal.vue';
import LogoutModal from '@/components/modal/LogoutModal.vue';

export default {
  components: {
    LoginModal,
    LogoutModal,
    SignupModal,
    DefaultModal,
    NeedLoginModal,
  },
  computed: {
    modalComponent() {
      return this.$store.state.modalComponent;
    },
  },
};
</script>
<style></style>
