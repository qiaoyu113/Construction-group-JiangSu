<template>
  <div class="mod-role">
    <div style="float:left;">
      <el-button
       
        icon="el-icon-delete"
        type="danger"
        @click="doBatchDelete()"
        :disabled="selectedRows.length <= 0"
      >批量删除</el-button>
      <el-button icon="el-icon-download" @click="doExportExcel()">导出</el-button>
    </div>
    <div style="float:right;">
      <el-form :inline="true" @submit.native.prevent @keyup.enter.native="doRefresh">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-search"
            v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
            placeholder="用户名／用户操作"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="doRefresh()" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div> 
    <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange"></t-grid>
    <view-form v-if="viewFormVisible" ref="viewForm"></view-form>
  </div>
</template>
<script>
import baseView from "@/base/baseView";
import ViewForm from "./view";
export default {
  extends: baseView,
  data() {
    return {
      viewFormVisible: false,
      selectedRows: [],
      gridOptions: {
        dataSource: {
          serviceInstance: tapp.services.base_Log.getList,
          serviceInstanceInputParameters: {
            searchKey: null
          }
        },
        grid: {
          offsetHeight: 36, //36:查询部分高度

          operates: {
            width: 60,
            fixed: "left",
            list: [
              {
                type: "text",
                show: true,
                label: "详细",
                method: this.doView
              }
            ]
          }, // 列操作按钮
          columns: [
            {
              fixed: "left",
              prop: "userName",
              label: "用户",
              sortable: true,
              width: 150
            },
            {
              fixed: "left",
              prop: "executeTime",
              label: "执行时间",
              sortable: true,
              width: 180,
              formatter: (row, column, cellValue) => {
                return this.$util.datetimeFormat(row.executeTime);
              }
            },
            {
              fixed: "left",
              prop: "operation",
              label: "操作",
              sortable: true,
              width: 200
            },

            {
              prop: "duration",
              label: "执行时长(毫秒)",
              sortable: true,
              width: 150
            },
            {
              prop: "ip",
              label: "IP地址",
              sortable: true,
              width: 150
            },
            {
              prop: "result",
              columnKey: "result",
              label: "执行结果",
              width: 150,
              filters: [
                {
                  text: "失败",
                  value: "error"
                },
                {
                  text: "成功",
                  value: "success"
                }
              ],
              formatter: (row, column, cellValue) => {
                return row.result === "error" ? "失败" : "成功";
              },
              render: (h, params) => {
                return h(
                  "el-tag",
                  {
                    props: {
                      type: params.row.result === "error" ? "danger" : "success"
                    } // 组件的props
                  },
                  params.row.result === "error" ? "失败" : "成功"
                );
              }
            }
          ], // 需要展示的列
          defaultSort: {
            prop: "id",
            order: "descending"
          }
        }
      }
    };
  },
  components: {
    ViewForm
  },
  created() {},
  methods: {
    doView(key, row) {
      this.viewFormVisible = true;
      this.$nextTick(() => {
        this.$refs.viewForm.init(row.id);
      });
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    doBatchDelete() {
      let self = this;
      if (!self.selectedRows || self.selectedRows.length == 0) {
        self.$notify.info({
          title: "系统提示",
          message: "您没选择任何行，无法操作！"
        });
        return;
      }
      let ids = self.selectedRows.map(function(row) {
        return row.id;
      });
      self
        .$confirm(
          "此操作将永久删除" + ids.length + "条日志, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
        .then(() => {
          tapp.services.base_Log.batchDelete(ids).then(function(result) {
            self.$notify.success({
              title: "操作成功",
              message: "日志已删除成功！"
            });
            self.$refs.searchReulstList.refresh();
          });
        });
    },
    doExportExcel() {
      this.$refs.searchReulstList.exportCSV("日志列表");
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    }
  }
};
</script>
