<template>
  <div class="mod-role">
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">密钥领用列表</div>
      </el-col>
    </el-row>
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
            :model="gridOptions.dataSource.serviceInstanceInputParameters">
      <el-row :gutter="10" class="search-top-operate">
        <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出
        </el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：" prop="proName">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName" placeholder="项目名称"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：" prop="proType">
            <t-dic-dropdown-select dicType="engineering_type" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位：" prop="proConstructCompany">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany" placeholder="建设单位"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="领用单位：" prop="proSubCompany">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany" placeholder="领用单位"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密钥状态：" prop="approvalStatus">
            <t-dic-dropdown-select dicType="approval_status" v-model="gridOptions.dataSource.serviceInstanceInputParameters.approvalStatus" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经办人：" prop="sign">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.sign" placeholder="经办人"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办日期：" prop="dateRange">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"  @submit.native.prevent @keyup.enter.native="doRefresh()"
                                     @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button @click="doRefresh()" class="demo-button" type="primary" plain icon="el-icon-search">查询
            </el-button>
            <el-button class="demo-button" type="primary" icon="el-icon-circle-close" @click="doReset()">清空
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
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      },
    },
    data () {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.qsKeyApproval.getPagedList,
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
                minWidth: 100
              },
              {
                prop: 'proType',
                label: '工程类别',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('engineering_type', row.proType) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'proConstructCompany',
                label: '建设单位',
                minWidth: 100
              },
              {
                prop: 'proTotalInvestment',
                label: '投资金额',
                minWidth: 100
              },
              {
                prop: 'proContractAttr',
                label: '合同模式',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('contract_model', row.proContractAttr) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'proRunMode',
                label: '经营方式',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('business_type', row.proRunMode) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'keyName',
                label: '密钥名称',
                minWidth: 100,
              },
              {
                prop: 'keyName',
                label: '领用单位',
                minWidth: 100,
              },
              {
                prop: 'approvalStatus',
                label: '状态',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('approval_status', row.approvalStatus) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'getTime',
                label: '领用日期',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.getTime, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'getTime',
                label: '失效日期',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.getTime, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'sign',
                label: '经办人',
                minWidth: 100
              },
              {
                prop: 'signTime',
                label: '经办日期',
                minWidth: 100,
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
        this.$refs.searchReulstList.exportCSV('密钥领用')
      },
      doRefresh () {
        this.$refs.searchReulstList.refresh()
      }
    }
  }
</script>

