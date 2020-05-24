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
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="计税方式">
            <t-dic-dropdown-select dicType="tax_method"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.taxMethod"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属公司">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany" placeholder="所属公司" clearable></el-input>
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
            serviceInstance: tapp.services.finaCtaxationApproval.getPagedList,
            serviceInstanceInputParameters: {
              proName: null,
              taxMethod: null,
              proSubCompany: null
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            fit: true, // 列的宽度是否自撑开
            columns: [
              {
                prop: 'licenceCode',
                label: '外经证号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'proPlanDate',
                label: '工程起止时间',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conName',
                label: '合同名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conTotal',
                label: '合同金额（万元）',
                sortable: true,
                minWidth: 150,
              },
              {
                prop: 'applyAmount',
                label: '申请金额（万元）',
                sortable: true,
                minWidth: 150,
              },
              {
                prop: 'addressDetail',
                label: '外出经营地',
                sortable: true,
                minWidth: 130,
              },
              {
                prop: 'companyName',
                label: '合同对方企业名称',
                sortable: true,
                minWidth: 130,
              },
              {
                prop: 'taxMethod',
                columnKey: 'taxMethod',
                filters: util.getListDataDicFilters('tax_method'),
                label: '计税方式',
                sortable: true,
                width: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('tax_method', row.taxMethod)
                }
              },
              {
                prop: 'startDate',
                label: '使用期限',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return row.startDate.substring(0,10) + '~' + row.endDate.substring(0,10)
                }
              },
              {
                prop: 'proSubCompany',
                label: '所属公司',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'sign',
                label: '申请人',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'ctaxationStatus',
                label: '状态',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'delayDate',
                label: '延期日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.delayDate, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'logoffDate',
                label: '注销日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.logoffDate, 'YYYY-MM-DD');
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

