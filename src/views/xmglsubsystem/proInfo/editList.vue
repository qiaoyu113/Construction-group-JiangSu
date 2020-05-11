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
          <el-form-item label="选择关键字">
            <el-select placeholder="请选择"
                       v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
              <el-option v-for="(item, index) in processDefinationlist" :key='item.key' :label="item.name"
                         :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="创建时间">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                     @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关键字">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="单据描述"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-download" @click="doReset()">
              <i class="fa fa-lg fa-level-down"></i>清空
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
                prop: 'pcId',
                label: '备案项目id',
                sortable: true
              },
              {
                prop: 'proCode',
                label: '项目编号',
                sortable: true
              },
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true
              },
              {
                prop: 'proConstructCompany',
                label: '建设单位',
                sortable: true
              },
              {
                prop: 'proConstructCompanyAttr',
                label: '单位性质（字典表）',
                sortable: true
              },
              {
                prop: 'proAddressProvince',
                label: '项目地址-省（字典表）',
                sortable: true
              },
              {
                prop: 'proAddressCity',
                label: '项目地址-市（字典表）',
                sortable: true
              },
              {
                prop: 'proAddressDetail',
                label: '项目地址-详细',
                sortable: true
              },
              {
                prop: 'proTotalInvestment',
                label: '项目总投资',
                sortable: true
              },
              {
                prop: 'proSubCompany',
                label: '所属分公司',
                sortable: true
              },
              {
                prop: 'proBusDept',
                label: '所属事业部',
                sortable: true
              },
              {
                prop: 'proDriveSubject',
                label: '实施主体（字典表）',
                sortable: true
              },
              {
                prop: 'proContractAttr',
                label: '承包形式（字典表）',
                sortable: true
              },
              {
                prop: 'proType',
                label: '工程类别（字典表）',
                sortable: true
              },
              {
                prop: 'proSubType',
                label: '类别子项（字典表）',
                sortable: true
              },
              {
                prop: 'proFundSource',
                label: '资金来源（字典表）',
                sortable: true
              },
              {
                prop: 'proStructure',
                label: '结构形式（字典表）',
                sortable: true
              },
              {
                prop: 'proContractScope',
                label: '承包范围',
                sortable: true
              },
              {
                prop: 'proManager',
                label: '项目经理',
                sortable: true
              },
              {
                prop: 'proWinAmount',
                label: '中标金额-元',
                sortable: true
              },
              {
                prop: 'proWinAmountC',
                label: '金额大写',
                sortable: true
              },
              {
                prop: 'proPlanStartDate',
                label: '计划开工日期',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.proPlanStartDate, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'proPlanEndDate',
                label: '计划完工日期',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.proPlanEndDate, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'proRealStartDate',
                label: '实际开工日期',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.proRealStartDate, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'proRealEndDate',
                label: '实际完工日期',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.proRealEndDate, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'proLimitTime',
                label: '工程工期',
                sortable: true
              },
              {
                prop: 'proBuildArea',
                label: '建筑面积-平方米',
                sortable: true
              },
              {
                prop: 'proSpan',
                label: '高度/最大跨度-米',
                sortable: true
              },
              {
                prop: 'proLayer',
                label: '层数',
                sortable: true
              },
              {
                prop: 'proBlock',
                label: '栋数',
                sortable: true
              },
              {
                prop: 'proBasementArea',
                label: '地下室-平方米、层',
                sortable: true
              },
              {
                prop: 'proIsFitout',
                label: '是否为装配式（字典表）',
                sortable: true
              },
              {
                prop: 'proFitoutRate',
                label: '装配率-%',
                sortable: true
              },
              {
                prop: 'proIsBim',
                label: '是否应用BIM技术（字典表）',
                sortable: true
              },
              {
                prop: 'proRunMode',
                label: '经营方式（字典表）',
                sortable: true
              },
              {
                prop: 'proProfitRate',
                label: '项目净利润承诺超-%',
                sortable: true
              },
              {
                prop: 'proUnionCompanyMerate',
                label: '联营单位管理费-%',
                sortable: true
              },
              {
                prop: 'proUnionCompany',
                label: '联营公司id',
                sortable: true
              },
              {
                prop: 'proContacter',
                label: '联系人',
                sortable: true
              },
              {
                prop: 'proCompanyHeader',
                label: '负责人',
                sortable: true
              },
              {
                prop: 'proContactway',
                label: '联系方式',
                sortable: true
              },
              {
                prop: 'proRegister',
                label: '登记人',
                sortable: true
              },
              {
                prop: 'proRegisterTime',
                label: '登记时间',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.proRegisterTime, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'proStatue',
                label: '项目状态（字典表）',
                sortable: true
              },
              {
                prop: 'createtime',
                label: '创建时间',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.createtime, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'updatetime',
                label: '更新时间',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.updatetime, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'createuser',
                label: '创建人',
                sortable: true
              },
              {
                prop: 'updateuser',
                label: '更新人',
                sortable: true
              },
              {
                prop: 'datastatus',
                label: '数据有效性 1有效 0无效',
                sortable: true
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

