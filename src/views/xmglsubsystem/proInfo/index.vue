<template>
  <div class="mod-role">
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目信息列表</div>
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
            <el-form-item label="项目编号：" prop="proCode">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proCode" placeholder="项目编号"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称：" prop="proName">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName" placeholder="项目名称"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建设单位：" prop="proConstructCompany">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany"
                        placeholder="建设单位"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分公司：" prop="proSubCompany">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                        placeholder="所属分公司"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属事业部：" prop="proBusDept">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proBusDept" placeholder="所属事业部"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营方式：" prop="proRunMode">
              <t-dic-dropdown-select dicType="business_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类别：" prop="proType">
              <t-dic-dropdown-select dicType="engineering_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类别子项：" prop="proSubType">
              <t-dic-dropdown-select dicType="category_child"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubType"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有无诉讼：" prop="isLitigation">
              <t-dic-dropdown-select dicType="have_or_not"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.isLitigation"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有无借款：" prop="isBorrowing">
              <t-dic-dropdown-select dicType="have_or_not"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.isBorrow"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="创建时间：" prop="dateRange">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                       @change="onStartDateRangeChanged">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目状态：" prop="proStatue">
              <t-dic-dropdown-select dicType="pro_status"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proStatue"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
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
            serviceInstance: tapp.services.proInfo.getPagedList,
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
                prop: 'proCode',
                label: '项目编号',
                minWidth: 150
              },
              {
                prop: 'proName',
                label: '项目名称'
              },
              {
                prop: 'proConstructCompany',
                label: '建设单位'
              },
              {
                prop: 'proBusDept',
                label: '事业部'
              },
              {
                prop: 'proSubCompany',
                label: '分公司'
              },
              {
                prop: 'proType',
                label: '工程类别',
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('engineering_type', row.proType) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'proSubType',
                label: '类别子项',
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('category_child', row.proSubType) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'proBuildArea',
                label: '建筑面积'
              },
              {
                prop: 'proTotalInvestment',
                label: '总投资'
              },
              {
                prop: 'proRunMode',
                label: '经营方式(注)',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('business_type', row.proRunMode) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'proRunMode',
                label: '合同总金额',
                minWidth: 100
              },
              {
                prop: 'proManager',
                label: '项目经理'
              },
              {
                prop: 'totalIncome',
                label: '累计到账金额',
                minWidth: 110,
                formatter: (row, column, cellValue) => {
                  if (!row.totalIncome) { return '0' }
                  return row.totalIncome
                }
              },
              {
                prop: 'totalSpending',
                label: '累计支出金额',
                minWidth: 110,
                formatter: (row, column, cellValue) => {
                  if (!row.totalSpending) { return '0' }
                  return row.totalSpending
                }
              },
              {
                prop: 'proManager',
                label: '累计已收管理费',
                minWidth: 120
              },
              {
                prop: 'isBorrow',
                label: '是否有借款',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('have_or_not', row.isBorrow) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'isLitigation',
                label: '是否有诉讼',
                minWidth: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('have_or_not', row.isLitigation) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'proStatue',
                label: '状态',
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('pro_status', row.proStatue) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
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
        this.$refs.searchReulstList.exportCSV('项目信息')
      },
      doRefresh () {
        this.$refs.searchReulstList.refresh()
      }
    }
  }
</script>

