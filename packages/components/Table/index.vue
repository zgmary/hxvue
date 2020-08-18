<template>
  <div :class="bemCss()">
    <el-table
      :data="
        tableData.slice(
          (currentPage - 1) * pagination.pageSize,
          currentPage * pagination.pageSize
        )
      "
      :stripe="options.stripe"
      style="width: 100%"
      border
      v-loading="options.isLoading"
      element-loading-text="加载中"
      @selection-change="handleSelectionChange"
    >
      <!--增加索引-->
      <el-table-column type="index" min-width="1" align="center">
      </el-table-column>
      <!--选择框-->
      <el-table-column type="selection" min-width="1" align="center">
      </el-table-column>
      <!--数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          min-width="3"
        >
        </el-table-column>
      </template>
      <!-- 操作组 -->
      <el-table-column label="操作" align="center" min-width="6">
        <template slot-scope="scope">
          <template v-for="(btn, index) in operates.list">
            <el-button
              :type="btn.type"
              size="mini"
              :icon="btn.icon"
              :disabled="btn.disabled"
              @click="btn.method(scope.$index, scope.row)"
              >{{ btn.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div style="height:12px"></div>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :total="tableData.length"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import create from "../../core/create";
export default create({
  name: "table",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    operates: {
      type: Object,
      default() {
        return {};
      }
    },
    options: {
      type: Object,
      default() {
        return {
          stripe: false,
          highlightCurrentRow: false,
          isLoading: false
        };
      }
    },
    pagination: {
      type: Object,
      default() {
        return {
          pageSize: 20,
          pageSizes: [20, 30, 50, 100]
        };
      }
    }
  },
  data() {
    return {
      multipleSelection: [],
      currentPage: 1
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("handleSelectionChange", val);
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("changeIsLoading", true);
      this.currentPage = 1;
      setTimeout(() => {
        this.$emit("changePageSize", val);
        this.$emit("changeIsLoading", false);
      }, 400);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("changeIsLoading", true);
      setTimeout(() => {
        this.currentPage = val;
        this.$emit("changeIsLoading", false);
      }, 400);
    }
  }
});
</script>

<style>
.el-table th.gutter {
  /* 解决element-ui 表格篡位的问题 */
  display: table-cell !important;
}
</style>
