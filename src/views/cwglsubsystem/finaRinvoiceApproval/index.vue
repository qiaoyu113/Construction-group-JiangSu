<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search"  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button type="primary" class="demo-button" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="选择关键字">
            <el-select placeholder="请选择" v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
              <el-option v-for="(item, index) in processDefinationlist" :key='item.key' :label="item.name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="创建时间">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange" @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关键字">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="单据描述" clearable></el-input>
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
            serviceInstance: tapp.services.finaRinvoiceApproval.getPagedList,
            serviceInstanceInputParameters: {
              searchKey: null,
              processDefinationKey: null,
              dateRange: ''
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            columns: [
              {
                prop: 'invoiceAmount',
                label: '申请开票金额',
                sortable: true
              },
              {
                prop: 'reason',
                label: '红字申请理由',
                sortable: true
              },
              {
                prop: 'invoiceDate',
                label: '开票日期',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.invoiceDate, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'invoiceCode',
                label: '发票代码',
                sortable: true
              },
              {
                prop: 'invoiceNum',
                label: '发票号码',
                sortable: true
              },
              {
                prop: 'approvalStatus',
                label: '审批状态（字典表）',
                sortable: true
              },
              {
                prop: 'sign',
                label: '执行人',
                sortable: true
              },
              {
                prop: 'signTime',
                label: '执行时间',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'propose',
                label: '审核意见',
                sortable: true
              },
              {
                prop: 'result',
                label: '审核结果',
                sortable: true
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

