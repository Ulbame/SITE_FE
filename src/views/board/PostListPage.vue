<template>
  <div class="post-list-page">
    <div>
      <PostList :table-header="tableHeader" :post-list="postList" />
      <PostButtons :button-activator="buttonActivator" />
      <PostListPaging
        :paging="paging"
        :page-numbers="pageNumbers"
        @change-current-page="changeCurrentPage"
      />
      <SearchBar @send-search-condition="initSearchCondition" />
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostListPaging from '@/components/PostListPaging.vue';
import PostButtons from '@/components/PostButtons.vue';
import SearchBar from '@/components/SearchBar.vue';

import { fetchBoard, fetchBoardSize } from '@/api/post';

import _ from 'lodash';

export default {
  components: {
    PostList,
    PostListPaging,
    PostButtons,
    SearchBar,
  },
  data() {
    return {
      pageNumbers: [],
      paging: {
        currentPage: 1,
        pagingSize: 5,
        listSize: 10,
        lastPagingNumber: null,
      },
      tableHeader: ['게시물 번호', '제목', '조회수', '글쓴이', '생성일시'],
      postList: {},
      postIndex: {
        firstPostIndex: Number,
        lastPostIndex: Number,
      },
      buttonActivator: {
        list: true,
        edit: false,
        write: true,
        delete: false,
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
    //게시물 목록 머리말 초기화
    // initHeader() {
    //   this.tableHeader = Object.keys(this.postList[0]);
    // },
  },
};
</script>
<style scoped>
.post-list-page {
  margin: auto;
  max-width: 960px;
  min-width: 768px;
  width: 70%;
}
</style>
