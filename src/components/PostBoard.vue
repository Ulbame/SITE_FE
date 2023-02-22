<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header, idx) in tableHeader" :key="idx">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in postList" :key="idx">
        <td v-for="(key, idx) in row" :key="idx">
          <div v-if="key == row.title">
            <router-link :to="`/post/${row.board_idx}`">
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
</template>

<script>
export default {
  props: {
    tableHeader: Object,
    postList: Object,
  },
};
</script>

<style scoped>
table {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-collapse: collapse;
  border-radius: 100px;
  width: 90%;
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
  border-radius: 10px;
  padding: 5px 10px;
  border-bottom: solid 1px #ede7f6;
}
tr:hover {
  background-color: #ede7f6;
}
td {
  padding: 10px;
  text-align: center;
}
</style>
