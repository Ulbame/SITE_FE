<template>
  <div class="common-buttons">
    <span @click="forcedRefresh">
      <!-- <router-link :to="{ path: '/post/list', force: true, query: { _r: Date.now() } }"> -->
      <!-- <router-link to="/post/write"> -->
      <button
        type="button"
        class="button"
        id="list"
        v-if="buttonActivator.list"
      >
        목 록
      </button>
    </span>
    <router-link to="/post/write">
      <button
        type="button"
        class="button"
        id="add"
        v-if="buttonActivator.write"
      >
        등 록
      </button>
    </router-link>
    <router-link :to="`/post/${idx}/edit`">
      <button
        type="button"
        class="button"
        id="edit"
        v-if="buttonActivator.edit"
      >
        수 정
      </button>
    </router-link>
    <button
      type="button"
      class="button"
      id="delete"
      @click="removePost"
      v-if="buttonActivator.delete"
    >
      삭 제
    </button>
  </div>
</template>

<script>
import { deletePost } from '@/api/post';
import _ from 'lodash';

export default {
  props: {
    idx: undefined,
    buttonActivator: Object,
  },
  methods: {
    async removePost() {
      if (!confirm('삭제하시겠습니까?')) return;
      await deletePost(this.idx);
      alert('삭제되었습니다!');
      this.$router.push('/post/list');
    },
    forcedRefresh() {
      if (_.isNil(this.idx)) this.$router.go('/post/list');
      else this.$router.push('/post/list');
    },
  },
};
</script>

<style scoped>
.common-buttons {
  display: inline-block;
  float: right;
}
.button {
  display: inline-block;
  font-size: 10pt;
  margin: 5px;
  padding: 5px;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  color: rgb(100, 100, 100);
}
.button:hover {
  font-weight: bold;
  background-color: #e7e6f4;
  border: 1px solid #cfcee9;
  color: #524eab;
}
</style>
