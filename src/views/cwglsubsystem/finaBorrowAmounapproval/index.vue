<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search"  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
      <el-row :gutter="10" class="search-top-operate">
        <el-button type="primary" class="demo-button" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="所属分公司：" prop="searchKey">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                       placeholder="所属分公司" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="项目名称：" prop="searchKey">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款日期：" prop="searchKey">
            <t-datetime-picker @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.borrowDate"
                               type="date" :readOnly="false">
            </t-datetime-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" plain icon="el-icon-search" @click="doRefresh()">查询</el-button>
            <el-button  icon="el-icon-download" @click="doReset()">
              <i class="el-icon-delete"></i>清空
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </t-form>
    <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
    </t-grid>
    </el-card>
  </div>
</template>
<script>
  import baseView from '@/base/baseView'

  export default {
    name: 'myTask',
    extends: baseView,
    data() {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.finaBorrowAmounapproval.getPagedList,
            serviceInstanceInputParameters: {
              proName: null,
              proSubCompany: null,
              borrowDate: ''
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            fit: true, // 列的宽度是否自撑开
            columns: [
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'proSubCompany',
                label: '所属分公司',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'realAmount',
                label: '确认借款额度（万元',
                sortable: true,
                minWidth: 150,
              },
              {
                prop: 'borrowDate',
                label: '借款日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.borrowDate, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'tiimeLimit',
                label: '借款额度期限',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'getCode',
                label: '借款合同编号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'getAmount',
                label: '放款金额（万元）',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'timeLimit',
                label: '放款期限',
                sortable: true,
                minWidth: 80,
              },
              {
                prop: 'gSignTime',
                label: '放款日期',
                sortable: true,
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.borrowDate, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'gTotalBorrowAmount',
                label: '累计放款款金额（万元）',
                sortable: true,
                minWidth: 200,
              },
              {
                prop: 'leftAmount',
                label: '剩余可用额度（万元）',
                sortable: true,
                minWidth: 150,
              },
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            },
          }
        }
      }
    },
    components: {},
    created() {
      this.loadCodeTableList();
    },
    methods: {
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
        this.$refs.searchReulstList.exportCSV('${comments}表');
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      }
    }
  }
</script>

