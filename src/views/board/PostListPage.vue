<template>
  <PostList></PostList>
  <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
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