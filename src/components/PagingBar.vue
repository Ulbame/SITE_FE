<template>
  <div class="pagination">
    <div>
      <a href="#" onclick="" @click="changePage(1)">
        {{ '<<' }}
      </a>
      <a
        href="#"
        onclick=""
        @click="changePage(paging.currentPage - 1)"
        disabled="true"
      >
        {{ '<' }}
      </a>
      <div v-for="(number, index) in pageNumbers" :key="index">
        <template v-if="paging.currentPage === number">
          <a href="#" onclick="" class="active">{{ number }}</a>
        </template>
        <template v-else>
          <a href="#" onclick="" @click="changePage(number)">
            {{ number }}
          </a>
        </template>
      </div>
      <a
        href="#"
        onclick="return false;"
        @click="changePage(paging.currentPage + 1)"
      >
        {{ '>' }}
      </a>
      <a href="#" onclick="" @click="changePage(paging.lastPagingNumber)">
        {{ '>>' }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paging: Object,
    pageNumbers: Array,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  watch: {
    currentPage: {
      handler() {
        this.changePage(this.currentPage);
      },
    },
  },
  methods: {
    changePage(number) {
      if (number < 1) {
        return;
      }
      if (number > this.paging.lastPagingNumber) {
        number = this.paging.lastPagingNumber;
      }
      this.$emit('changeCurrentPage', number);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: inline-block;
  vertical-align: middle;
  height: 50px;
  width: auto;
  margin: auto;
  background-color: #b39ddb;
  border-radius: 20px;
  margin-right: 20px;
}
.pagination div {
  display: table-cell;
  padding: 4px;
}
.pagination a {
  display: table-cell;
  justify-content: center;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  transition: background-color 0.5s;
  font-weight: bold;
  color: #673ab7;
}

.pagination a.active {
  background-color: #b39ddb;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>
