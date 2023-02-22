<template>
  <div>
    <div class="contents">
      <h1 class="page-header">{{ pageHeader }}</h1>
      <div class="form-wrapper">
        <form class="form" @submit.prevent="submitForm">
          <div>
            <label for="title">제목</label>
            <input
              type="text"
              id="title"
              v-model="post.title"
              :disabled="isReading"
            />
          </div>
          <div v-if="isReading">
            <label for="creator_id">작성자</label>
            <input
              type="text"
              id="creator_id"
              v-model="post.creator_id"
              disabled
            />
            <label for="created_datetime">작성일시</label>
            <input
              type="text"
              id="created_datetime"
              v-model="post.created_datetime"
              disabled
            />
          </div>
          <div v-if="updater_id">
            <label for="updater_id">수정자</label>
            <input
              type="text"
              id="updater_id"
              v-model="post.updater_id"
              disabled
            />
            <label for="updated_datetime">수정일시</label>
            <input
              type="text"
              id="updated_datetime"
              v-model="post.updated_datetime"
              disabled
            />
          </div>
          <div class="instant">
            <label for="contents" id="label_contents">내용</label>
            <textarea
              type="text"
              id="contents"
              rows="5"
              v-model="post.contents"
              :disabled="isReading"
            />
            <p v-if="!isContentsValid" class="validation-text warning">
              Contents length must be less than 250
            </p>
          </div>
        </form>
        <p class="log">
          {{ logMessage }}
        </p>
      </div>
    </div>
    <PostButtons :idx="postIndex" />
  </div>
</template>

<script>
import { fetchPost } from '@/api/post';
import PostButtons from '@/components/PostButtons.vue';
import _ from 'lodash';

export default {
  components: {
    PostButtons,
  },
  data() {
    return {
      post: { contents: '' },
      logMessage: '',
    };
  },
  computed: {
    isReading() {
      return !(
        this.$route.fullPath.includes('write') ||
        this.$route.fullPath.includes('edit')
      );
    },
    isContentsValid() {
      return this.post.contents.length < 250;
    },
    pageHeader() {
      if (this.$route.fullPath.includes('edit')) {
        return '게시물 수정';
      } else if (this.$route.fullPath.includes('write')) {
        return '게시물 작성';
      } else {
        return '게시물 조회';
      }
    },
    postIndex() {
      return this.$route.params.idx;
    },
  },
  mounted() {
    this.getPost(this.postIndex);
  },
  watch: {
    postIndex: function (value, oldValue) {
      console.log(
        `이전 게시물 번호 : ${oldValue}, 현재 게시물 번호 : ${value}`,
      );
      this.getPost(value);
    },
  },
  methods: {
    async getPost(postIndex) {
      if (_.isNil(postIndex)) {
        const post = { contents: '' };
        this.initPost(post);
      } else {
        const { data: post } = await fetchPost(postIndex);
        this.initPost(post);
      }
    },
    initPost(post) {
      this.post = post;
      console.log(this.post.contents.length);
    },
  },
};
</script>
<style scoped>
#label_contents {
}
</style>
