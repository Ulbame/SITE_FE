<template>
  <div class="common-buttons">
    <span @click="forcedRefresh">
      <button type="button" class="button" id="list">목 록</button>
    </span>
    <router-link to="/post/write">
      <button type="button" class="button" id="add">등 록</button>
    </router-link>
    <router-link :to="`/post/${idx}/edit`" v-if="idx">
      <button type="button" class="button" id="edit" v-if="idx" v-once>
        수 정
      </button>
    </router-link>
    <button
      type="button"
      class="button"
      id="delete"
      @click="removePost"
      v-if="idx"
    >
      삭 제
    </button>
  </div>
</template>

<script>
import { deletePost } from '@/api/post';

export default {
  props: {
    idx: undefined,
  },
  methods: {
    async removePost() {
      if (!confirm('삭제하시겠습니까?')) return;
      await deletePost(this.idx);
      alert('삭제되었습니다!');
      this.$router.push('/post/list');
    },
    forcedRefresh() {
      this.$router.push('/post/list');
    },
  },
};
</script>

<style scoped>
.common-buttons {
  display: inline-block;
  width: auto;
  margin: auto;
}
.button {
  display: inline-block;
  font-size: 0.85rem;
  margin: 5px;
  padding: 5px;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  background-color: #b39ddb;
}
.button:hover {
  font-weight: bold;
  background-color: #e7e6f4;
  color: #524eab;
}
</style>
