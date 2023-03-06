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
      <span v-for="(number, index) in pageNumbers" :key="index">
        <template v-if="paging.currentPage === number">
          <a href="#" onclick="" class="active">{{ number }}</a>
        </template>
        <template v-else>
          <a href="#" onclick="" @click="changePage(number)">
            {{ number }}
          </a>
        </template>
      </span>
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
  height: auto;
  margin: auto;
  background-color: #b39ddb;
  border-radius: 20px;
  padding: 5px 5px 5px 5px;
}
.pagination span {
  display: inline-block;
}
.pagination a {
  display: inline-block;
  height: auto;
  width: 30px;
  border-radius: 50px;
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
