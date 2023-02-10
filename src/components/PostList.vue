<template>
  <div class="board-list">
    <table class="w3-table-all" summary="연습용 자유 게시판">
      <thead>
        <tr>
          <th v-for="header, idx in tableHeader" :key="idx" scope="col" v-bind:id="header" > {{header}} </th>
        </tr>
      </thead>
      <!-- <tfoot>
      </tfoot> -->
      <tbody>
      <tr v-for="(row, idx) in postList" :key="idx" scope="row">
          <td v-for="(key, idx) in row" :key="idx">
            <div v-if="key==row.title">
              <router-link :to="`/board/post/${row.boardIdx}`">
                {{ key }}
              </router-link>
            </div>
            <div v-else>
              {{ key }}
            </div>
          </td>
      </tr>
      </tbody>
    </table>
    <div 
      class="pagination w3-bar w3-padding-16 w3-small"
    >
      <span class="pg">
        <p class="first w3-button w3-border" @click="changePage(1)">{{'<<'}}</p>
        <p
          class="prev w3-button w3-border"
          @click="changePage(paging.currentPage-1)"
          disabled=true
        >{{'<'}}</p>
        <template v-for="(number, index) in pageNumbers" :key="index" >
            <template v-if="paging.currentPage===number">
                <strong class="w3-button w3-border w3-green">{{ number }}</strong>
            </template>
            <template v-else>
                <p class="w3-button w3-border" @click="changePage(number)">{{ number }}</p>
            </template>
        </template>
        <p class="next w3-button w3-border" @click="changePage(paging.currentPage+1)">{{'>'}}</p>
        <p class="last w3-button w3-border" @click="changePage(paging.lastPagingNumber)">{{'>>'}}</p>
      </span>
    </div>
  </div>
</template>

<script>
import {fetchBoard, fetchBoardSize } from '@/api/post';
import _ from 'lodash';

export default {
  data() {
    return {
      tableHeader: {},
      postList: {},
      paging: {
        currentPage: 1,
        pagingSize: 10,
        listSize: 10,
        lastPagingNumber: undefined,
      },
      pageNumbers: [],
    }
  },
  mounted() {
    this.GetList();
    this.initPaging();
  },
  methods: {
    async GetList() {
        const {data:rawPostList} = await fetchBoard(this.paging);

        const filteredPostList = rawPostList.map(
          post => _.pickBy(post, (value) => { return !_.isNil(value) })
        );
        this.postList = filteredPostList;

        this.initHeader(Object.keys(filteredPostList[0]));
      },
      changePage(number){
        if(number<1) return;
        if(number>this.paging.lastPagingNumber) number = this.paging.lastPagingNumber;
        this.paging.currentPage=number;
        this.GetList();
        this.initPaging();
      },
      initHeader(tableHeader) {
        this.tableHeader=tableHeader;
      },
      async initPaging(){
        const {data} = await fetchBoardSize();

        let boardSize = data.boardSize;
        this.paging.lastPagingNumber = parseInt(boardSize/this.paging.pagingSize)+1;

        let startPageNumber = parseInt(((this.paging.currentPage-1)/this.paging.pagingSize))*this.paging.pagingSize+1;
        
        this.pageNumbers = Array(this.paging.pagingSize).fill(0).map(
          (zero, index) => zero+index+startPageNumber
        ).filter(number => number <= this.paging.lastPagingNumber);
      }
  },
}

</script>