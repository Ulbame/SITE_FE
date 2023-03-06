<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header, idx) in tableHeader" :key="idx" :id="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(post, idx) in postList" :key="idx">
        <td v-for="(value, key, idx) in post" :key="idx" :id="key">
          <div v-if="key == 'board_idx' && !this.$store.state.isMobile">
            {{ value }}
          </div>
          <div v-if="key === 'title'">
            <router-link :to="`/post/${post.board_idx}`">
              {{ value }}
            </router-link>
          </div>
          <div v-else-if="key === 'created_datetime'">
            {{ dateTreated(value) }}
          </div>
          <div v-else-if="key !== 'board_idx'">{{ value }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    postList: Object,
  },
  data() {
    return {
      tableHeader: ['num', 'title', 'hits', 'writer', 'date'],
    };
  },
  created() {
    if (this.$store.state.isMobile) {
      this.tableHeader.splice(0, 1);
    }
  },
  methods: {
    dateTreated(dateRaw) {
      const createdDate = new Date(dateRaw);
      const createdMs = createdDate.getTime();
      const nowDate = Date.now();
      console.log(`now : ${nowDate}, created : ${createdMs}`);
      const secondDiff = Math.round((nowDate - createdMs) / 1000);
      console.log(secondDiff);
      if (secondDiff < 60) {
        return secondDiff + '초 전';
      } else if (secondDiff < 3600) {
        const minuteDiff = Math.round(secondDiff / 60);
        return minuteDiff + '분 전';
      } else if (secondDiff < 3600 * 24) {
        const hourDiff = Math.round(secondDiff / 3600);
        return hourDiff + '시간 전';
      } else {
        const month = createdDate.getMonth() + 1;
        const day = createdDate.getDay();
        return month + '/' + day;
      }
    },
  },
};
</script>

<style scoped>
table {
  margin: auto;
  margin-bottom: 10px;
  border-collapse: collapse;
  width: 100%;
  /* table-layout: fixed; */
}
th {
  color: #524eab;
  font-weight: bold;
  background-color: #e7e6f4;
  padding: 10px;
  border-bottom: 1px solid #444444;
  text-align: center;
}
tr {
  background-color: white;
  border-bottom: solid 1px #ede7f6;
}
td {
  padding: 5px;
}
#creator_id {
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
#title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
tr:hover {
  background-color: #ede7f6;
}
@media (max-width: 800px) {
  #board_idx {
    display: none;
  }
}
</style>
