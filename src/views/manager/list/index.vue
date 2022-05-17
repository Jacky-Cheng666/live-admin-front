<template>
  <div class="app-container">
    <el-table v-loading="loading" border :data="tableData" style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="管理员"
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" prop="created_time" label="创建时间">
        <template slot-scope="scope">{{
          scope.row.created_time | formatTime
        }}</template>
      </el-table-column>
      <el-table-column align="center" prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/manager";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  created() {
    this.__init();
  },
  filters: {
    formatTime(val) {
      return parseTime(new Date(val).getTime());
    },
  },
  methods: {
    async __init() {
      this.loading = true;
      let res = await getList({
        page: 1,
        limit: 10,
      });
      this.loading = false;
      console.log("res", res);
      this.tableData = res.data;
    },
    handleEdit() {},
    handleDelete() {},
  },
};
</script>

<style>
</style>