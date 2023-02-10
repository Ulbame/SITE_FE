<template>
  <div class="board-detail">
    <div class="board-contents">
        <input
            type="text"
            class="w3-input w3-border"
            placeholder="제목을 입력해주세요."
            v-model="post.title"
        >
        <input
            type="text"
            class="w3-input w3-border"
            placeholder="작성자를 입력해주세요."
            v-model="post.creatorId"
        >
    </div>
    <div class="board-contents">
        <textarea
            id=""
            cols="30"
            rows="10"
            class="w3-input w3-border"
            style="resize: none;"
            v-model="post.contents"
        >
        </textarea>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="editPost" v-if="post.boardIdx">수정</button>
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="addPost" v-if="!post.boardIdx">등록</button>
      <button type="button" id="button" class="w3-button w3-round w3-gray"><router-link to="/board/list/">목록</router-link></button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {fetchPost, createPost, updatePost} from '@/api/post';

export default {
  data() {
    return {
      idx: this.$route.params.idx,
      post:{ },
    }
  },
  mounted() {
    this.idx= this.$route.params.idx;
    this.getPost(this.idx);
  },
  methods: {
    async getPost(postIndex) {
        if(_.isNil(postIndex)) return;
        const {data:post} = await fetchPost(postIndex);
        this.initPost(post);
    },
    async addPost() {
        await createPost(this.post);
        this.$router.push('/board/list');
    },
    async editPost() {
        await updatePost(this.post);
        this.$router.push('/board/post/'+this.idx);
    },
    initPost(post) {
        this.post=post;
    },    
  },
}
</script>
<style>

</style>