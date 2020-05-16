<template>
  <div class="mod-role">
    <t-form ref="search"  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button  icon="el-icon-download" type="success" @click="doExportExcel()">
          <i class="fa fa-lg fa-level-down"></i>导出
        </el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="所属分公司：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
                       placeholder="所属分公司" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="项目名称：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款日期：">
            <t-datetime-picker @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
                               type="date" :readOnly="false">
            </t-datetime-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button  @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
            <el-button  icon="el-icon-download" @click="doReset()">
              <i class="el-icon-delete"></i>清空
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </t-form>
    <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
    </t-grid>
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
              searchKey: null,
              processDefinationKey: null,
              dateRange: ''
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
                prop: 'proName',
                label: '所属分公司',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'totalBorrowCount',
                label: '确认借款额度（万元',
                sortable: true,
                minWidth: 150,
              },
              {
                prop: 'totalBorrowAmount',
                label: '借款日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.borrowDate, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'realAmount',
                label: '借款额度期限',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'realAmount',
                label: '借款合同编号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'realAmount',
                label: '放款金额（万元）',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'realAmount',
                label: '放款期限',
                sortable: true,
                minWidth: 80,
              },
              {
                prop: 'borrowDate',
                label: '放款日期',
                sortable: true,
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.borrowDate, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'realAmount',
                label: '累计放款款金额（万元）',
                sortable: true,
                minWidth: 200,
              },
              {
                prop: 'realAmount',
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

