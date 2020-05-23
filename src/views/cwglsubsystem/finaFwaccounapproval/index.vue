<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search"  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button type="primary" class="demo-button" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                       placeholder="请选择" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行名称">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.bankName"
                       placeholder="请选择" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" plain icon="el-icon-search" @click="doRefresh()">查询</el-button>
            <el-button type="primary" icon="el-icon-circle-close" @click="doReset()">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </t-form>
    <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
    </t-grid>
    </el-card>
    <el-dialog title="工资发放信息" :visible.sync="dialogTableVisible" width="50%">
      <approvalList :pId="pId" ref="approvalList"></approvalList>
    </el-dialog>
  </div>
</template>
<script>
  import approvalList from "./approvallist";
  import baseView from '@/base/baseView'
  export default {
    name: 'myTask',
    extends: baseView,
    data() {
      return {
        dialogTableVisible: false,
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.finaFwaccounapproval.getPagedList,
            serviceInstanceInputParameters: {
              bankName: null,
              proName: null,
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            columns: [
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true
              },
              {
                prop: 'proCode',
                label: '项目编码',
                sortable: true
              },
              {
                prop: 'bankName',
                label: '开户行名称',
                sortable: true
              },
              {
                prop: 'bankAddress',
                label: '开户网点',
                sortable: true
              },
              {
                prop: 'bankAccountName',
                label: '银行帐户名称',
                sortable: true
              },
              {
                prop: 'bankAccount',
                label: '银行帐号',
                sortable: true
              },
              {
                prop: 'openTime',
                label: '开户时间',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.openTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'cancelTime',
                label: '注销时间',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.openTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'payoffMoney',
                label: '累计发放金额（万元）',
                sortable: true,
                render: (h, params) => {
                  // params对象包含 column 当前列信息，row 当前行的数据
                  var self = this;
                  return (
                    <div style="margin:0 auto; ">
                    <a href="#" onClick={() => this.doSomething(params.row)}>
                  {params.row.payoffMoney}
                </a>
                  </div>
                );
                }
              }
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            },
          }
        }
      }
    },
    components: {
      approvalList
    },
    created() {
      this.loadCodeTableList();
    },
    methods: {
      doSomething(row){
        debugger
        this.dialogTableVisible=true;//默认页面不显示为false,点击按钮将这个属性变成true
        if (row.pId) {
          this.$refs.approvalList.pId = row.pId;
          console.log(row.pId)
          console.log(this.$refs.approvalList)
          console.log(this.$refs.approvalList.pId)
        }
      },
      // 获取码表值
      loadCodeTableList() {
        // 以下为示例
      },
      onStartDateRangeChanged(val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0];
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1];
      },
      handleSelectionChange(val) {
        this.checkededRows = val;
      },
      doReset() {
        this.$refs.search.resetFields();
      },
      doExportExcel() {
        this.$refs.searchReulstList.exportCSV('工资列表');
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      }
    }
  }
</script>

