<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search"  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button type="primary" class="demo-button" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="保函类型：">
            <t-dic-dropdown-select dicType="pl_type"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.plType"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="分公司：">
            <t-dic-dropdown-select dicType="1260863882851913730"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="工程类别：">
            <t-dic-dropdown-select dicType="engineering_type"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经营方式：">
            <t-dic-dropdown-select dicType="business_type"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="联营单位：">
            <t-dic-dropdown-select dicType="business_type"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开立银行：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.bankName"
                       placeholder="开立银行：" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="保函状态：">
            <t-dic-checkbox-select dicType="approval_status" v-model="gridOptions.dataSource.serviceInstanceInputParameters.generateStatus"
                                   @submit.native.prevent @keyup.enter.native="doRefresh()" :readOnly="readOnly"></t-dic-checkbox-select>
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
            serviceInstance: tapp.services.plGenerateApproval.getPagedList,
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
                prop: 'proType',
                columnKey: 'proType',
                filters: util.getListDataDicFilters('engineering_type'),
                label: '工程类别',
                sortable: true,
                width: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('engineering_type', row.rWay)
                }
              },
              {
                prop: 'proConstructCompany',
                label: '建设单位',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conTotal',
                label: '合同金额',
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
                prop: 'proRunMode',
                label: '经营方式',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'plType',
                columnKey: 'plType',
                filters: util.getListDataDicFilters('pl_type'),
                label: '保函类型',
                sortable: true,
                width: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('pl_type', row.rWay)
                }
              },
              {
                prop: 'generateStatus',
                label: '保函状态',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'plAmount',
                label: '保函金额',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'bankName',
                label: '开立银行',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'plCode',
                label: '保函编号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'expireTime',
                label: '到期时间',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.expireTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'returnDate',
                label: '退回时间',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.expireTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'signTime',
                label: '经办日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
              },
            ], // 需要展示的列
            defaultSort: {
              prop: 'proName',
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

