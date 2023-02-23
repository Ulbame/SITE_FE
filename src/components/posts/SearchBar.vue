<template>
  <div class="searchBar">
    <span class="searchOptions">
      <v-select
        v-model="searchCondition.selectedArea"
        :items="searchedArea"
        multiple
        label="검색 영역"
        persistent-hint
        chips
      ></v-select>
    </span>
    <span class="searchParams">
      <div v-for="(params, index) in searchCondition.selectedArea" :key="index">
        <v-text-field
          class="searchParam"
          v-model="searchCondition.value[params]"
          :label="params"
          :rules="rules"
          hide-details="auto"
          @keyup="sendSearchCondition"
        ></v-text-field>
      </div>
    </span>
    <a href="#">
      <i
        class="fa-solid fa-magnifying-glass fa-2xl"
        @click="sendSearchCondition"
      ></i>
    </a>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      searchedArea: ['title', 'contents', 'creatorId'],
      searchCondition: {
        selectedArea: ['title'],
        value: { title: '', contents: '', creatorId: '' },
      },
      rules: [
        value => !!value || '값을 입력해 주세요.',
        value => (value && value.length >= 2) || '2글자 이상 입력해 주세요.',
      ],
    };
  },
  methods: {
    sendSearchCondition(event) {
      if (event.key !== 'Enter' && event.type !== 'click') {
        return;
      }
      if (
        _.isEmpty(this.searchCondition.selectedArea) ||
        _.isEmpty(this.searchCondition.value)
      ) {
        alert('검색조건을 설정해 주세요.');
        return;
      }
      this.$emit('sendSearchCondition', this.searchCondition);
    },
  },
};
</script>

<style scoped>
.searchBar {
  display: table-cell;
  display: table;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  width: 600px;
  background-color: #ede7f6;
}
.searchBar .searchOptions {
  display: table-cell;
  width: 270px;
  vertical-align: baseline;
}
.searchBar .searchParams {
  display: inline-block;
  vertical-align: baseline;
  width: 200px;
}
a,
i {
  display: table-cell;
  vertical-align: middle;
}
</style>
