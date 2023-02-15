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
        ></v-text-field>
      </div>
      <!-- <v-text-field
        @keydown="sendSearchCondition"
        v-model="searchCondition.value"
        label="검색할 내용"
        :rules="rules"
        hide-details="auto"
      ></v-text-field> -->
    </span>
    <svg-icon
      type="mdi"
      :path="path"
      @click="sendSearchCondition"
      disabled
    ></svg-icon>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
import _ from 'lodash';

export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiMagnify,
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
  margin: 10px auto;
  justify-content: flex-end;
}
.searchBar .searchOptions {
  display: inline-block;
  width: 300px;
  padding: 0px 10px;
}
.searchBar .searchParams {
  display: inline-block;
  min-width: 220px;
}
</style>
