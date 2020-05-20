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
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                       placeholder="所属分公司" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票类型">
            <t-dic-dropdown-select dicType="invoice_type"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.invoiceType"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="发票税率">
            <t-dic-dropdown-select dicType="1261639167251714050"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.levyRate"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外经证号">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.lId"
                       placeholder="外经证号" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经办人">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.sign"
                       placeholder="经办人" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办日期">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.signTime" @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-bottom-operate">
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
  import util from '@/util'
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
            serviceInstance: tapp.services.finaBinvoiceApproval.getPagedList,
            serviceInstanceInputParameters: {
              sign: null,
              lId: null,
              levyRate: null,
              invoiceType: null,
              proSubCompany: null,
              proName: null,
              signTime: null
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
                prop: 'proSubCompany',
                label: '分公司',
                sortable: true
              },
              {
                prop: 'invoiceAmount',
                label: '开票金额（元）',
                sortable: true
              },
              {
                prop: 'levyRate',
                label: '开票税率',
                sortable: true
              },
              {
                prop: 'levyRate',
                label: '开票税额（元）',
                sortable: true
              },
              {
                prop: 'isLevyTax',
                label: '已扣除的分包款(元)',
                sortable: true
              },
              {
                prop: 'invoiceType',
                columnKey: 'invoiceType',
                filters: util.getListDataDicFilters('invoice_type'),
                label: '发票类别',
                sortable: true,
                width: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('invoice_type', row.taxMethod)
                }
              },
              {
                prop: 'invoiceNum',
                label: '发票号码',
                sortable: true
              },
              {
                prop: 'deductAmount',
                label: '外经证号',
                sortable: true
              },
              {
                prop: 'taxBureau',
                label: '审查状态',
                sortable: true
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: true
              },
              {
                prop: 'taxStartTime',
                label: '经办日期',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
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

