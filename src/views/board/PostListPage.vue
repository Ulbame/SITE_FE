<template>
  <PostList></PostList>
  <div class="common-buttons">
    <router-link to="/board/write">
      <button type="button" class="w3-button w3-round w3-blue-gray">        
          등록        
      </button>
    </router-link>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue';

export default {
      components: {
      PostList,
    },
}

</script>