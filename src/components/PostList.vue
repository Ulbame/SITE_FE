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
  </div>
</template>

<script>
import {fetchBoard} from '@/api/board';
import _ from 'lodash';

export default {
  data() {
    return {
      tableHeader: [],
      postList: [],
    }
  },  
  mounted() {
    this.GetList()
  },
  methods: {
    async GetList() {
        this.isLoading = true;
        const {data:rawPostList} = await fetchBoard();        
        this.isLoading = false;

        const filteredPostList = rawPostList.map(
          post => _.pickBy(post, (value) => { return !_.isNil(value) })
        );
        this.postList = filteredPostList;

        this.InitHeader(Object.keys(filteredPostList[0]));
      },
      InitHeader(tableHeader) {
        this.tableHeader=tableHeader;
    },
  },
}

</script>