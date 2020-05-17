<template>
  <div class="mod-role">
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="10" class="search-top-operate">
          <el-button type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="流程名称" prop="searchKey">
              <t-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" clearable></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称" prop="searchKey1">
              <t-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey1" clearable></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程状态" prop="searchKey2">
              <t-dic-dropdown-select dicType="approval_status" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey2"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
          <el-col :span="12">
            <el-form-item>
              <el-button  @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
              <el-button  @click="doReset()">
                <i class="el-icon-delete"></i>清空
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid ref="searchReulstList" :options="gridOptions"></t-grid>
    </el-card>
  </div>
</template>

<script>
import baseView from "@/base/baseView";
export default {
  extends: baseView,
  data() {
    return {
      gridOptions: {
        dataSource: {
          serviceInstance: tapp.services.wF_ProcessDef.getMyApplyPagedList,
          serviceInstanceInputParameters: {
            searchKey: null
          }
        },
        grid: {
          offsetHeight: 36, //36:查询部分高度
          mutiSelect: false,
          columns: [
            {
              prop: "id",
              label: "流程编号",
              minWidth: 100,
            },
            {
              prop: "name",
              label: "流程名称",
              minWidth: 150,
              render: (h, params) => {
                var self = this;
                return (
                  <div style="margin:0 auto; ">
                    <a href="#" onClick={() => this.doEdit(params.row)}>
                      {params.row.name}
                    </a>
                  </div>
                );
              }
            },
            {
              prop: "category",
              label: "项目名称",
              minWidth: 100,
            },
            {
              prop: "category",
              label: "发起部门",
              minWidth: 100,
            },
            {
              prop: "category",
              label: "发起人",
              minWidth: 100,
            },
            {
              prop: "category",
              label: "发起时间",
              minWidth: 100,
            },
            {
              prop: "category",
              label: "当前节点",
              minWidth: 100,
            },
            {
              prop: "category",
              label: "当前办理人",
              minWidth: 100,
            },
            {
              prop: "category",
              label: "流程状态",
              minWidth: 100,
              formatter: (row, column, cellValue) => {
                tapp.data.base_datadictionary['approval_status'].map((item => {
                  if(item.id == row.status) return item.name
                }))
              }
            },
            {
              prop: "category",
              label: "用印信息",
              minWidth: 100,
              // render: (h, params) => {
              //   var self = this;
              //   return (
              //     <div style="margin:0 auto; ">
              //       <a href="#" onClick={() => this.doEdit(params.row)}>
              //         {params.row.name}
              //       </a>
              //     </div>
              //   );
              // }
            },
          ], // 需要展示的列
          defaultSort: {
            prop: "id",
            order: "descending"
          }
        }
      }
    };
  },
  components: {},
  created() {},
  methods: {
    doEdit(row) {
      let path = row.procInstStartUrl;
      //查看详情
      this.$router.push({
        path
      });
      return;
    },
    doReset() {
      this.$refs.search.resetFields();
      this.doRefresh();
    },
    doExportExcel() {
      this.$refs.searchReulstList.exportCSV("申请列表");
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    }
  }
};
</script>
