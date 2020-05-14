<template>
  <div class="mod-role">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button icon="el-icon-download" type="success" @click="doExportExcel()">
          <i class="fa fa-lg fa-level-down"></i>导出
        </el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName" placeholder="项目名称"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType" placeholder="工程类别"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类别子项">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubType" placeholder="类别子项"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany" placeholder="建设单位"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分公司">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany" placeholder="所属分公司"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode" placeholder="经营方式"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审批状态">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.approvalStatus" placeholder="审批状态"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办人">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.sign" placeholder="经营方式"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办日期">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                     @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-download" @click="doReset()">
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
    data () {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.proCompletedApproval.getPagedList,
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
                sortable: true
              },
              {
                prop: 'proType',
                label: '工程类别',
                sortable: true
              },
              {
                prop: 'proSubType',
                label: '类别子项',
                sortable: true
              },
              {
                prop: 'proConstructCompany',
                label: '建设单位',
                sortable: true
              },
              {
                prop: 'proBuildArea',
                label: '建筑面积',
                sortable: true
              },
              {
                prop: 'proTotalInvestment',
                label: '合同金额',
                sortable: true
              },
              {
                prop: 'proTotalInvestment',
                label: '所属分公司',
                sortable: true
              },
              {
                prop: 'proRunMode',
                label: '经营方式',
                sortable: true
              },
              {
                prop: 'proRealStartDate',
                label: '实际开工日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.proRealStartDate, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'completedTime',
                label: '申请竣工日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.completedTime, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'approvalStatus',
                label: '审批状态',
                sortable: true,
                minWidth: 120,
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
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD')
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
    created () {
      this.loadCodeTableList()
    },
    methods: {
      // 获取码表值
      loadCodeTableList () {
        // 以下为示例
      },
      onStartDateRangeChanged (val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1]
      },
      handleSelectionChange (val) {
        this.checkededRows = val
      },
      doReset () {
        this.$refs.search.resetFields()
      },
      doExportExcel () {
        this.$refs.searchReulstList.exportCSV('${comments}表')
      },
      doRefresh () {
        this.$refs.searchReulstList.refresh()
      }
    }
  }
</script>

