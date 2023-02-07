<template>
  <div class="post-detail">
    <div class="post-contents">
      <h3>{{ this.post.title }}</h3>
      <div>
        <strong class="w3-large">{{ this.post.creatorId }}</strong>
        <br>
        <span>{{ this.post.createdDatetime }}</span>
      </div>
    </div>
    <div class="post-contents">
      <span>{{ this.post.contents }}</span>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
  <PostList></PostList>
</template>

<script>
import {fetchPost} from "@/api/board";
import PostList from "@/components/PostList.vue"

export default {
  components: {
    PostList,
  },
  data() { //변수생성
    return {
      idx: this.$router.currentRoute._value.params.idx,
      post: [],
    }
  },
  mounted() {
    this.GetPost(this.idx);
  },
  methods: {
    async GetPost(postIndex) {
        this.isLoading = true;
        const {data:rawPost} = await fetchPost(postIndex);
        this.isLoading = false;
        console.log(rawPost);
        this.InitPost(rawPost);
      },
      InitPost(post) {
        this.post=post;
    },
    },
    List() {
    },
    Write() {
    },
    Delete() {
      if (!confirm("삭제하시겠습니까?")) return;
    }
}
</script>
<style scoped>
</style>