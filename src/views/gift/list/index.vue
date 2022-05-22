<template>
  <div class="app-container">
    <el-card>
      <!-- header -->
      <el-row class="mb-20">
        <el-col>
          <router-link to="/gift/create">
            <el-button type="primary" icon="el-icon-plus">添加礼物
            </el-button>
          </router-link>
        </el-col>
      </el-row>
      <!-- table -->
      <el-table v-loading="loading" border :data="tableData"
        style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column align="center" prop="gift_icon" label="礼物图标"
          width="180">
        </el-table-column>
        <el-table-column align="center" prop="gift_name" label="礼物名称">
        </el-table-column>
        <el-table-column align="center" prop="coin" label="金币" width="180">
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
export default {
  name: 'GiftList',
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
    }
  },
  methods: {
    __init () { },
    handleEdit (index, row) { },
    handleDelete (index, row) { },
    handleSizeChange (val) {
      this.pagination.size = val;
      this.pagination.page = 1;
      this.__init();
    },
    handleCurrentChange (val) {
      this.pagination.page = val;
      this.__init();
    },
  }
}
</script>

<style>
</style>