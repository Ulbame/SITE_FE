<template>
  <div>
    <div class="post-detail">
      <div class="post-contents">
        <h3>{{ post.title }}</h3>
        <div>
          <strong class="w3-large">{{ post.creatorId }}</strong>
          <br />
          <span>{{ post.createdDatetime }}</span>
        </div>
      </div>
      <div class="post-contents">
        <span>{{ post.contents }}</span>
      </div>
      <PostButtons :idx="idx" :buttonActivator="buttonActivator" />
    </div>
  </div>
</template>

<script>
import { fetchPost } from '@/api/post';
import PostButtons from '@/components/PostButtons.vue';

export default {
  components: {
    PostButtons,
  },
  data() {
    return {
      idx: this.$route.params.idx,
      post: {},
      buttonActivator: {
        list: true,
        edit: true,
        write: true,
        delete: true,
      },
    };
  },
  mounted() {
    this.idx = this.$route.params.idx;
    this.getPost(this.idx);
  },
  updated() {
    this.idx = this.$route.params.idx;
  },
  watch: {
    idx: function (value, oldValue) {
      console.log(
        `이전 게시물 번호 : ${oldValue}, 현재 게시물 번호 : ${value}`,
      );
      this.getPost(value);
    },
  },
  methods: {
    async getPost(postIndex) {
      const { data: post } = await fetchPost(postIndex);
      this.initPost(post);
    },
    initPost(post) {
      this.post = post;
    },
  },
};
</script>
<style scoped></style>
