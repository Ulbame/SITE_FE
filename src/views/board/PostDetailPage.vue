<template>
  <div class="post-detail">
    <div class="post-contents">
      <h3>{{ post.title }}</h3>
      <div>
        <strong class="w3-large">{{ post.creatorId }}</strong>
        <br>
        <span>{{ post.createdDatetime }}</span>
      </div>
    </div>
    <div class="post-contents">
      <span>{{ post.contents }}</span>
    </div>
  </div>
  <div class="common-buttons">
      <router-link to="/board/list/">
        <button type="button" id="button" class="w3-button w3-round w3-gray">목록</button>
      </router-link>
      <router-link to="/board/write">
        <button type="button" id="button" class="w3-button w3-round w3-blue">등록</button>
      </router-link>
      <router-link :to="`/board/edit/${idx}`">
        <button type="button" id="button" class="w3-button w3-round w3-blue-gray">수정</button>
      </router-link>
      <button type="button" id="button" class="w3-button w3-round w3-red" @click="removePost" >삭제</button>
      
  </div>
  <!-- <PostList></PostList> -->
</template>

<script>
import {fetchPost, deletePost } from "@/api/board";
// import PostList from "@/components/PostList.vue"

export default {
  components: {
    // PostList,
  },
  data() {
    return {
      idx: this.$route.params.idx,
      post: {},
    }
  },
  mounted() {
    this.idx= this.$route.params.idx;
    this.getPost(this.idx);
  },
  updated() {
    this.idx = this.$route.params.idx;
  },
  watch: {
    idx: function(value, oldValue) {
      console.log(`이전 게시물 번호 : ${oldValue}, 현재 게시물 번호 : ${value}`);
      this.getPost(value);
    }
  },
  methods: {
    async getPost(postIndex) {
      const {data:post} = await fetchPost(postIndex);
      this.initPost(post);
    },
    initPost(post) {
      this.post=post;
    },
    async removePost() {
      if (!confirm("삭제하시겠습니까?")) return;
      await deletePost(this.idx);
      alert('삭제되었습니다!'); 
      this.$router.push('/board/list');
    }
  },
}
</script>
<style scoped>
</style>