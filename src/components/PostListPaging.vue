<template>
  <!-- <div class="text-center" id="pagination">
    <v-pagination
      v-model="currentPage"
      :length="paging.lastPagingNumber"
      :total-visible="5"
      class="rounded-pill"
      rounded="circle"
      density="compact"
      size="small"
      active-color="red"
    ></v-pagination>
  </div> -->
  <div class="pagination">
    <span>
      <a href="#" onclick="return false;" @click="changePage(1)">
        {{ '<<' }}
      </a>
      <a
        href="#"
        onclick="return false;"
        @click="changePage(paging.currentPage - 1)"
        disabled="true"
      >
        {{ '<' }}
      </a>
      <span v-for="(number, index) in pageNumbers" :key="index">
        <template v-if="paging.currentPage === number">
          <a href="#" onclick="return false;" class="active">{{ number }}</a>
        </template>
        <template v-else>
          <a href="#" onclick="return false;" @click="changePage(number)">
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
      <a
        href="#"
        onclick="return false;"
        @click="changePage(paging.lastPagingNumber)"
      >
        {{ '>>' }}
      </a>
    </span>
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
  /* float: right; */
  min-width: 500px;
  margin: 10px -140px 0px 0px;
}

.pagination a {
  display: inline-block;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  align-items: center;
}

.pagination a {
  border-radius: 5px;
}

.pagination a.active {
  background-color: #4caf50;
  /* border-radius: 5px; */
  color: white;
  transition: background-color 0.3s;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>
