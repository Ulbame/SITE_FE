<template>
  <div>
    <h1 class="page-header">{{ pageHeader }}</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div id="post-info" v-if="!isWriting">
          번호 : {{ post.board_idx }} 조회수 : {{ post.hit_cnt }}
          <br />
          작성자 : {{ post.creator_id }} 작성일시 :
          {{ dateTreated(post.created_datetime) }}
          <div v-if="post.updater_id">
            수정자 : {{ post.updater_id }}
            수정일시 :
            {{ dateTreated(post.updated_datetime) }}
          </div>
        </div>
        <div id="contents-container">
          <label for="title">제목</label>
          <input
            type="text"
            id="title"
            v-model="post.title"
            :disabled="!(isWriting || isEditing)"
          />
        </div>
        <div id="contents-container">
          <label for="contents" id="label_contents">내용</label>
          <textarea
            type="text"
            id="contents"
            rows="5"
            v-model="post.contents"
            :disabled="!(isWriting || isEditing)"
          />
          <p v-if="!isContentsValid" class="validation-text warning">
            Contents length must be less than 250
          </p>
        </div>
        <button type="button" class="button" @click="sendPost(post)">
          전 송
        </button>
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
    <PostButtons :idx="postIndex" />
  </div>
</template>

<script>
import { fetchPost, createPost, updatePost } from '@/api/post';
import PostButtons from '@/components/posts/PostButtons.vue';
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
    isWriting() {
      return this.$route.fullPath.includes('write');
    },
    isEditing() {
      return this.$route.fullPath.includes('edit');
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
        console.log('포스트 번호 비어있음');
        const post = { contents: '' };
        this.initPost(post);
      } else {
        console.log(`${this.postIndex}번 포스트 가져옴`);
        const { data: post } = await fetchPost(postIndex);
        console.log(post);
        this.initPost(post);
      }
    },
    initPost(post) {
      this.post = post;
    },
    dateTreated(dateRaw) {
      const createdDate = new Date(dateRaw);
      const createdMs = new Date(dateRaw).getTime();
      const nowMs = Date.now();
      const secondDiff = Math.round((nowMs - createdMs) / 1000);
      if (secondDiff < 60) {
        return secondDiff + '초 전';
      } else if (secondDiff < 3600) {
        const minuteDiff = Math.round(secondDiff / 60);
        return minuteDiff + '분 전';
      } else if (secondDiff < 3600 * 24) {
        const hourDiff = Math.round(secondDiff / 60 / 60);
        return hourDiff + '시간 전';
      } else {
        const month = createdDate.getMonth() + 1;
        const day = createdDate.getDay();
        return month + '/' + day;
      }
    },
    async sendPost(post) {
      if (this.isWriting) {
        this.post.creator_id = localStorage.getItem('user_id');
        const response = await createPost(post);
        if (response.status === 200) {
          alert('등록 성공');
          //response에 새로 만들어진 게시물의 index 담아서 자동이동 시켜줄 것?
          this.$router.push('/post/list');
        } else {
          alert('등록 실패');
          console.log(response);
        }
      } else if (this.isEditing) {
        // 관리자 권한 추가
        if (localStorage.getItem('user_id') === post.creator_id) {
          this.post.updater_id = localStorage.getItem('user_id');
          const response = await updatePost(post);
          if (response.status === 200) {
            alert('수정 성공');
            this.$router.push('/post/' + this.postIndex);
          } else {
            alert('수정 실패');
          }
        } else {
          alert('수정 권한 없음');
        }
      }
    },
  },
};
</script>
<style scoped>
input {
  display: inline-block;
  width: 50px;
}
#title {
  width: 70%;
}
.input-id {
  width: 70px;
}
#contents-container {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
