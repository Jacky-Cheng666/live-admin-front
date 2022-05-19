<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-card>
      <el-row class="mb-20">
        <el-col>
          <router-link to="/manager/create">
            <el-button type="primary" icon="el-icon-plus" size="small ">新增管理员
            </el-button>
          </router-link>
        </el-col>
      </el-row>
      <el-table v-loading="loading" border :data="tableData"
        style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="username" label="管理员" width="180">
        </el-table-column>
        <el-table-column align="center" prop="created_time" label="创建时间">
          <template slot-scope="scope">{{
          scope.row.created_time | formatTime
        }}</template>
        </el-table-column>
        <el-table-column width="300" align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="flex justify-center mt-20">
        <el-pagination background @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="pagination.page"
          :page-sizes="[5, 10, 20, 50]" :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from "@/api/manager";
import { parseTime } from "@/utils/index";
export default {
  name: "ManagerIndex",
  data () {
    return {
      loading: false,
      // 表格数据
      tableData: [],
      // 分页
      pagination: {
        // 总记录数
        total: 0,
        // 当前页码
        page: 1,
        // 页大小
        size: 5,
      },
    };
  },
  created () {
    this.__init();
  },
  filters: {
    formatTime (val) {
      return parseTime(new Date(val).getTime());
    },
  },
  methods: {
    async __init () {
      this.loading = true;
      let { page, size } = this.pagination;
      let res = await getList({
        page,
        limit: size,
      });
      this.loading = false;
      console.log("res", res);
      this.tableData = res.data.rows;
      this.pagination.total = res.data.count;
    },
    handleEdit () { },
    handleDelete () { },
    handleSizeChange (val) {
      this.pagination.size = val;
      this.pagination.page = 1;
      this.__init();
    },
    handleCurrentChange (val) {
      this.pagination.page = val;
      this.__init();
    },
  },
};
</script>

<style>
</style>