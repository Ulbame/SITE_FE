<template>
  <div class="board-list">
    <table class="w3-table-all" summary="연습용 자유 게시판">
      <caption>
        자유 게시판
      </caption>
      <thead>
        <tr>
          <th v-for="header, idx in boardHeader" :key="idx" scope="col" v-bind:id="header" > {{header}} </th>
        </tr>
      </thead>
      <!-- <tfoot>
      </tfoot> -->
      <tbody>
      <tr v-for="(row, idx) in boardList" :key="idx" scope="row">
        <td v-for="(key, idx) in row" :key="idx">{{key}}</td>
      </tr>
      </tbody>      
    </table>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
    </div>
    <!-- <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.total_list_cnt > 0" />
    <div class="pagination w3-bar w3-padding-16 w3-small">
      <span class="pg">
      <a href="#;" @click="fnPage(1)" class="first w3-button w3-border">{{'<<'}}</a>
      <a href="#;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"
         class="prev w3-button w3-border">{{'<'}}</a>
      <template v-for=" (n,index) in paginavigation()">
          <template v-if="paging.page==n">
              <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
          </template>
          <template v-else>
              <a class="w3-button w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
          </template>
      </template>
      <a href="javascript:;" v-if="paging.total_page_cnt > paging.end_page"
         @click="fnPage(`${paging.end_page+1}`)" class="next w3-button w3-border">{{'>'}}</a>
      <a href="javascript:;" @click="fnPage(`${paging.total_page_cnt}`)" class="last w3-button w3-border">{{'>>'}}</a>
      </span>
    </div> -->
  </div>
</template>

<script>
import {fetchBoard} from '../../api/board';
import _ from 'lodash';

export default {
  data() {
    return {
      //boardHeader: ['No', 'Category', '제목', '작성자', '등록일시', '조회수', '추천수', '댓글수'],
      boardHeader: [],
      boardList: [],
    }
  },  
  mounted() {
    this.GetList()
  },
  methods: {
    async GetList() {
        this.isLoading = true;
        const {data:rawBoardList} = await fetchBoard();        
        this.isLoading = false;

        const filteredBoardList = rawBoardList.map(
          post => _.pickBy(post, (value) => { return !_.isNil(value) })
        );
        this.boardList = filteredBoardList;

        this.InitHeader(Object.keys(filteredBoardList[0]));
      },
      InitHeader(boardHeader) {
        this.boardHeader=boardHeader;
    },
  },
}

</script>