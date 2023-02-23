<template>
  <div class="post-list-page">
    <div>
      <PostBoard :table-header="tableHeader" :post-list="postList" />
      <div id="board-nav">
        <PagingBar
          :paging="paging"
          :page-numbers="pageNumbers"
          @change-current-page="changeCurrentPage"
        />
        <PostButtons />
      </div>
      <SearchBar @send-search-condition="initSearchCondition" />
    </div>
  </div>
</template>

<script>
import PostBoard from '@/components/posts/PostBoard.vue';
import PagingBar from '@/components/posts/PagingBar.vue';
import PostButtons from '@/components/posts/PostButtons.vue';
import SearchBar from '@/components/posts/SearchBar.vue';

import { fetchBoard, fetchBoardSize } from '@/api/post';

import _ from 'lodash';

export default {
  components: {
    PostBoard,
    PagingBar,
    PostButtons,
    SearchBar,
  },
  data() {
    return {
      pageNumbers: [],
      paging: {
        currentPage: 1,
        pagingSize: 5,
        listSize: 5,
        lastPagingNumber: null,
      },
      tableHeader: ['게시물 번호', '제목', '조회수', '글쓴이', '생성일시'],
      postList: {},
      postIndex: {
        firstPostIndex: Number,
        lastPostIndex: Number,
      },
      searchCondition: {
        selectedArea: [],
        value: { title: null, contents: null, creatorId: null },
      },
    };
  },
  watch: {
    paging: {
      deep: true,
      handler() {
        this.initPage();
      },
    },
  },
  mounted() {
    console.log('페이지 초기화');
    this.initPage();
  },
  updated() {
    console.log(this.postList);
  },
  methods: {
    //페이지 전체 초기화
    initPage() {
      this.initPageNumbers();
      this.initPostList();
    },
    //게시물 목록 초기화
    async initPostList() {
      this.initListRange();
      const { data: rawPostList } = await fetchBoard(
          this.postIndex,
          this.searchCondition,
        ),
        filteredPostList = rawPostList.map(post =>
          _.pickBy(post, value => !_.isNil(value)),
        );
      this.postList = filteredPostList;
    },
    //게시물 페이지 넘버 초기화
    async initPageNumbers() {
      const { data } = await fetchBoardSize(this.searchCondition),
        { boardSize } = data;
      this.paging.lastPagingNumber =
        parseInt(boardSize / this.paging.pagingSize) + 1;

      let startPageNumber =
        parseInt((this.paging.currentPage - 1) / this.paging.pagingSize) *
          this.paging.pagingSize +
        1;

      this.pageNumbers = Array(this.paging.pagingSize)
        .fill(0)
        .map((zero, index) => zero + index + startPageNumber)
        .filter(number => number <= this.paging.lastPagingNumber);
    },
    //현재 페이지 변경
    changeCurrentPage(number) {
      this.paging.currentPage = number;
    },
    //게시물 목록 표현 수 변경
    initListRange() {
      this.postIndex.firstPostIndex =
        (this.paging.currentPage - 1) * this.paging.pagingSize + 1;
      this.postIndex.lastPostIndex =
        this.postIndex.firstPostIndex + this.paging.listSize - 1;
    },
    initSearchCondition(searchCondition) {
      this.searchCondition = searchCondition;
      this.initPage();
    },
  },
};
</script>
<style scoped>
#board-nav {
  display: inline-block;
  width: 100%;
  height: 50px;
  margin: auto;
  margin-bottom: 10px;
}
</style>
