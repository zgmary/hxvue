<template>
  <div :class="bemCss()">
    <!-- 顶部按钮 -->
    <div>
      <el-button
        type="success"
        icon="el-icon-circle-plus-outline"
        @click="handleAdd"
      >
        增加
      </el-button>
      <el-button type="warning" icon="el-icon-edit" @click="handleEdit">
        编辑
      </el-button>
      <el-button type="danger" icon="el-icon-delete" @click="handleDel">
        删除
      </el-button>
      <div style="float: right;">
        <el-input
          v-model="searchKey"
          placeholder="请输入性别"
          style="width: 200px;"
        />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">
          查询
        </el-button>
      </div>
    </div>

    <div style="height:12px"></div>

    <!-- 表格部分 -->
    <el-table
      :data="data"
      style="width: 100%"
      border
      v-loading="isLoading"
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
    </el-table>

    <div style="height:20px"></div>

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

    <!-- 表单部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="员工账号" prop="id">
          <el-input v-model="temp.id" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="temp.age" />
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDate">
          <el-date-picker
            v-model="temp.birthDate"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="temp.sex" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="temp.city" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
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
          pageSize: 10,
          pageSizes: [10, 30, 50, 100]
        };
      }
    }
  },
  data() {
    return {
      multipleSelection: [],
      currentPage: 1,
      isLoading: false,
      temp: {
        id: "",
        name: "",
        age: "",
        birthDate: "",
        sex: "",
        city: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      searchKey: "",
      textMap: {
        update: "修改",
        create: "添加"
      },
      rules: {
        id: [
          {
            required: true,
            message: "id is required",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "name is required",
            trigger: "blur"
          }
        ],
        birthDate: [
          {
            required: true,
            message: "birthDate is required",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    data() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagination.pageSize,
        this.currentPage * this.pagination.pageSize
      );
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("val:", val);
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.isLoading = true;
      this.currentPage = 1;
      setTimeout(() => {
        this.$emit("changePageSize", val);
        this.isLoading = false;
      }, 400);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.isLoading = true;
      setTimeout(() => {
        this.currentPage = val;
        this.isLoading = false;
      }, 400);
    },

    resetTemp() {
      this.temp = {
        id: "",
        name: "",
        age: "",
        birthDate: "",
        sex: "",
        city: ""
      };
    },
    handleAdd() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.tableData.push(this.temp);
          this.currentPage = Math.ceil(
            this.tableData.length / this.pagination.pageSize
          );
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "添加成功",
            type: "success",
            duration: 2000
          });
        }
      });
    },
    handleEdit() {
      if (this.multipleSelection.length == 1) {
        this.temp = this.multipleSelection[0];
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs["dataForm"].clearValidate();
        });
      }
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let index = this.tableData.findIndex(
            item => item.id === this.temp.id
          );
          this.tableData.splice(index, 1, this.temp);
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000
          });
        }
      });
    },
    handleDel() {
      let dataLen = this.multipleSelection.length;
      if (dataLen) {
        for (let i = 0; i < dataLen; i++) {
          let index = this.tableData.findIndex(
            item => item.id === this.multipleSelection[i].id
          );
          this.tableData.splice(index, 1);
        }
        if (this.tableData.length % this.pagination.pageSize == 0) {
          this.currentPage = this.tableData.length / this.pagination.pageSize;
        }
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
      }
    },
    handleSearch() {
      let tempArr = this.tableData.filter(item => item.sex == this.searchKey);
      this.isLoading = true;
      setTimeout(() => {
        this.$emit("handleSearch", tempArr);
        this.currentPage = 1;
        this.isLoading = false;
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
