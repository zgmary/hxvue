<template>
  <div :class="bemCss()">
    <!-- 表格部分 -->
    <el-table
      :data="pageData"
      :size="controlSize"
      :style="tableStyle"
      :stripe="option.stripe"
      :fit="option.fit"
      :height="option.tableHeight"
      border
      v-loading="dataLoading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      @selection-change="handleSelectionChange"
    >
      <!--增加索引-->
      <el-table-column
        label="序号"
        type="index"
        fixed="left"
        min-width="20"
        align="center"
      >
      </el-table-column>
      <!--选择框-->
      <el-table-column
        type="selection"
        fixed="left"
        min-width="20"
        align="center"
      >
      </el-table-column>
      <!--数据列-->
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :sortable="column.sortable"
        :prop="column.prop"
        :label="column.label"
        :align="column.align || 'center'"
        :width="column.width"
        :formatter="column.formatter"
        min-width="50"
      >
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :total="tableData.length"
      background
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
    pagination: {
      type: Object,
      default() {
        return {
          pageSize: 20,
          pageSizes: [20, 40, 60, 80, 100],
          currentPage: 1
        };
      }
    },
    option: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    pageData() {
      return this.tableData.slice(
        (this.pagination.currentPage - 1) * this.pagination.pageSize,
        this.pagination.currentPage * this.pagination.pageSize
      );
    },
    controlSize() {
      return this.option.controlSize || "small";
    },
    tableStyle() {
      return this.option.tableStyle || "width: 100%";
    },
    dataLoading() {
      return this.option.dataLoading || false;
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagination.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
    }
  }
});
</script>

<style scoped lang="scss">
>>> .el-table th.gutter {
  /* 解决element-ui 表格篡位的问题 */
  display: table-cell !important;
}
</style>
