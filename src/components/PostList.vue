<template>
  <div>
    <v-table
      class="post-table rounded-0"
      density="comfortable"
      fixed-header
      id="table"
    >
      <thead>
        <tr>
          <th
            class="text-center"
            id="table-header"
            v-for="(header, idx) in tableHeader"
            :key="idx"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in postList" :key="idx">
          <td v-for="(key, idx) in row" :key="idx" id="table-row">
            <div v-if="key == row.title">
              <router-link :to="`/post/${row.boardIdx}`">
                {{ key }}
              </router-link>
            </div>
            <div v-else>
              {{ key }}
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
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
#table {
  width: 100%;
  margin: 10px auto;
  border-bottom: solid 1px #cfcee9;
}
#table-header {
  color: #524eab;
  font-weight: bold;
  background-color: #e7e6f4;
}
#table-row {
  border-bottom: dotted 1px #cfcee9;
}
</style>
