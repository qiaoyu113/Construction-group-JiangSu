<template>
<div class="mod-role">
  <el-card shadow="never">
  <div class="query_opr">
    <el-row style="float:left;">
      <el-button  type="primary" @click="doNew()" icon="el-icon-plus">新增</el-button>
      <el-button  icon="el-icon-download" @click="doExportExcel()">
        <i class="fa fa-lg fa-level-down"></i>导出
      </el-button>
      <el-button  @click="showQueryDialog()" icon="el-icon-tickets">
        <el-badge is-dot v-if="hasQuery">筛选</el-badge>
        <span v-else>筛选</span>
      </el-button>
    </el-row>
    <div style="float:right;">
      <el-form :inline="true" @submit.native.prevent @keyup.enter.native="doSearch">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-search"
            v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
            placeholder="编号、文本输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="doSearch()" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  <el-dialog title="筛选" :visible.sync="queryDialogVisible">
    <t-form ref="ruleForm" @submit.native.prevent @keyup.enter.native="doQuery()" label-width="140px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="客户编码">
            <el-input v-model="queryCondition.customerCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称">
            <el-input v-model="queryCondition.customerName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="身份证号">
            <el-input v-model="queryCondition.customerCardNO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="整形输入">
            <t-int-range-input v-model="queryCondition.loanTermCountRange" @change="onLoanTermCountRangeChanged"></t-int-range-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="数字输入">
            <t-number-range-input v-model="queryCondition.loanMoneyAmountRange" @change="onLoanMoneyAmountRangeChanged"></t-number-range-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额输入">
            <t-currency-range-input v-model="queryCondition.originalLoanMoneyAmountRange" @change="onOriginalLoanMoneyAmountRangeChanged"></t-currency-range-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="金额输入-万">
            <t-currency-range-input v-model="queryCondition.financeFamilyTotalAssetRange" @change="onFinanceFamilyTotalAssetRangeChanged">
            </t-currency-range-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="百分比输入">
            <t-percent-range-input v-model="queryCondition.financeReturnMoneyLoanRateRange" @change="onFinanceReturnMoneyLoanRateRangeChanged"></t-percent-range-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="日期输入">
            <t-datetime-range-picker v-model="queryCondition.loanApplyDateRange" type="date" @change="onLoanApplyDateRangeChanged"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="日期时间输入">
            <t-datetime-range-picker v-model="queryCondition.loanApplySumbitDateRange" type="date" @change="onLoanApplySumbitDateRangeChanged"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="人员弹出选择">
            <base-user-select role-category="base_rolecategory_trackingpersoninfomr" v-model="queryCondition.trackingPersonInfoMRId" :text="queryCondition.trackingPersonInfoMRName" placeholder="请选择">
            </base-user-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <t-dic-checkbox-select dicType="public_sex" v-model="queryCondition.sexIds"></t-dic-checkbox-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="职务-radio">
            <t-dic-checkbox-select dicType="pl_loanenter_job" v-model="queryCondition.jobIds"></t-dic-checkbox-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="树形单选">
            <t-dic-multi-tree-select dicType="base_region" v-model="queryCondition.socialSecurityIds"></t-dic-multi-tree-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否可用">
            <t-switch v-model="queryCondition.activited"></t-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </t-form>
    <span slot="footer" class="dialog-footer">
      <el-button  type="primary" @click="doQuery()">确定</el-button>
      <el-button  @click="doQueryReset()">重置</el-button>
      <el-button  @click="queryDialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
  </div>

  <t-grid ref="searchReulstList" :options="gridOptions"  @cell-click="handleCellClick">
  </t-grid>
  </el-card>
</div>
</template>

<script>
import util from '@/util'
import store from '@/store'

export default {
  data () {
    return {
      queryDialogVisible: false,
      hasQuery: false,
      queryCondition: {
        customerCode: null,
        customerName: null,
        loanTermCountRange: null,
        loanMoneyAmountRange: null,
        originalLoanMoneyAmountRange: null,
        financeFamilyTotalAssetRange: null,
        financeReturnMoneyLoanRateRange: null,
        loanApplyDateRange: null,
        loanApplySumbitDateRange: null,
        activited: true
      },
      gridOptions: {
        dataSource: {
          serviceInstance: tapp.services.pL_LoanEnter.getPagedList,
          serviceInstanceInputParameters: {
            searchKey: null
          }
        },
        grid: {
          offsetHeight: 36, // 36:查询部分高度
          mutiSelect: false,
          reduceMethod: this.getSummaries,
          operates: {
            width: 60,
            fixed: 'left',
            list: [{
              type: 'text',
              show: true,
              label: '查看',
              method: this.doEdit
            } ]
          }, // 列操作按钮
          columns: [{
            prop: 'customerCode',
            label: '编号',
            sortable: true,
            fixed: 'left',
            width: 120
          },
          {
            prop: 'customerName',
            label: '文本输入',
            sortable: true,
            fixed: 'left',
            width: 100
          },
          {
            prop: 'customerCardNO',
            label: '身份证号',
            sortable: true,
            width: 170,
            render: (h, params) => {
              // params对象包含 column 当前列信息，row 当前行的数据
              var self = this;
              return (
                <div style="margin:0 auto; ">
                  <a href="#" onClick={() => this.doSomething(params.row)}> 
                    {params.row.customerCardNO}
                  </a>
                </div>
              );
            }
          },
          {
            prop: 'loanMoneyAmount',
            label: '数字输入',
            sortable: true,
            width: 120,
            formatter: (row, column, cellValue) => {
              return util.numberFormat(row.loanMoneyAmount, 2)
            }
          },
          {
            prop: 'loanTermCount',
            label: '整形输入',
            sortable: true,
            width: 100,
            formatter: (row, column, cellValue) => {
              return util.intFormat(row.loanMoneyAmount)
            }
          },
          {
            prop: 'originalLoanMoneyAmount',
            label: '金额输入',
            sortable: true,
            width: 100,
            formatter: (row, column, cellValue) => {
              return util.moneyFormat(row.originalLoanMoneyAmount)
            }
          },
          {
            prop: 'financeFamilyTotalAsset',
            label: '金额输入-万',
            sortable: true,
            width: 120,
            render: (h, params) => {
              var self = this
              return h('t-highlight-view', {
                props: {
                  value: self.$util.moneyFormat(params.row.financeFamilyTotalAsset || 0)
                }
              })
            }
          },
          {
            prop: 'financeReturnMoneyLoanRate',
            label: '百分比输入',
            sortable: true,
            width: 120,
            formatter: (row, column, cellValue) => {
              return util.percentFormat(row.financeReturnMoneyLoanRate)
            }
          },
          {
            prop: 'loanApplyDate',
            label: '日期输入',
            sortable: true,
            width: 150,
            formatter: (row, column, cellValue) => {
              return util.dateFormat(row.loanApplyDate)
            }
          },
          {
            prop: 'loanApplySumbitDate',
            label: '日期时间输入',
            sortable: true,
            width: 160,
            formatter: (row, column, cellValue) => {
              return util.datetimeFormat(row.loanApplySumbitDate)
            }
          },
          // 显示单个字典值
          {
            prop: 'sexId',
            columnKey: 'sexId', // 保持与prop一致（可以去掉）
            label: '性别',
            sortable: true,
            width: 100,
            formatter: (row, column, cellValue) => {
              return util.dataDicFormat('public_sex', row.sexId) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
            }
          },
          // 显示多个字典值
          {
            prop: 'maritalStatusIdList',
            columnKey: 'maritalStatusIdList', // 保持与prop一致（可以去掉）
            label: '婚姻状况',
            sortable: true,
            width: 150,
            formatter: (row, column, cellValue) => {
               // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值，此处注意cell值需要为一个数组
              return util.dataDicsFormat('public_maritalstatus', row.maritalStatusIds)
            }
          },
          {
            prop: 'socialSecurityId',
            columnKey: 'socialSecurityId',
            label: '树形单选',
            sortable: true,
            width: 150,
            formatter: (row, column, cellValue) => {
              return util.dataDicFormat('base_region', row.socialSecurityId)
            }
          },
          {
            prop: 'companyWorkTermIdList',
            columnKey: 'companyWorkTermIdList',
            label: '树形多选',
            sortable: true,
            width: 150,
            formatter: (row, column, cellValue) => {
              return util.dataDicsFormat('base_region', row.companyWorkTermIds)
            }
          },
          {
            prop: 'activited',
            columnKey: 'activited',
            label: '是否可用',
            sortable: true,
            width: 110,
            formatter: (row, column, cellValue) => {
              return row.activited == null ? '' : (row.activited ? '是' : '否')
            }
          },
          {
            prop: 'trackingPersonInfoMRName',
            label: '人员',
            sortable: false,
            minWidth: 120
          }
          ], // 需要展示的列
          defaultSort: {
            prop: 'id',
            order: 'descending'
          }
        }
      }
    }
  },
  components: {},
  created () {

  },
  methods: {
    onLoanTermCountRangeChanged (val) {
      this.queryCondition.loanTermCountBegin = val[0]
      this.queryCondition.loanTermCountEnd = val[1]
    },
    onLoanMoneyAmountRangeChanged (val) {
      this.queryCondition.loanMoneyAmountBegin = val[0]
      this.queryCondition.loanMoneyAmountEnd = val[1]
    },
    onOriginalLoanMoneyAmountRangeChanged (val) {
      this.queryCondition.originalLoanMoneyAmountBegin = val[0]
      this.queryCondition.originalLoanMoneyAmountEnd = val[1]
    },
    onFinanceFamilyTotalAssetRangeChanged (val) {
      this.queryCondition.financeFamilyTotalAssetBegin = val[0]
      this.queryCondition.financeFamilyTotalAssetEnd = val[1]
    },
    onFinanceReturnMoneyLoanRateRangeChanged (val) {
      this.queryCondition.financeReturnMoneyLoanRateBegin = val[0]
      this.queryCondition.financeReturnMoneyLoanRateEnd = val[1]
    },
    onLoanApplyDateRangeChanged (val) {
      this.queryCondition.loanApplyDateBegin = val[0]
      this.queryCondition.loanApplyDateEnd = val[1]
    },
    onLoanApplySumbitDateRangeChanged (val) {
      this.queryCondition.loanApplySumbitDateBegin = val[0]
      this.queryCondition.loanApplySumbitDateEnd = val[1]
    },
    doNew () {
      this.$router.push({
        name: 'pl_loanapplyInput'
      })
    },
    doEdit (key, row) {
      let tpath = '/demo/demolist?id=' + row.id

      this.$router.push({
        path: tpath
      })
    },
    showQueryDialog () {
      this.queryDialogVisible = true
    },
    doSomething() {
      this.queryDialogVisible = true
    },
    // row行数据，column列信息，cell当前点击的单元格数据，event相关事件
    handleCellClick(row, column, cell, event) {
      // do something
      console.log('click info', row, column, cell, event)
      // 通过判断当前列，可以限制某几列或者某一列可点击
      // 不判断，就是整行可点击
      if(column.property == 'loanMoneyAmount' || column.property == 'loanTermCount') {
        this.queryDialogVisible = true
      }
    },
    doQuery () {
      this.hasQuery = true
      this.queryDialogVisible = false
      this.doSearch()
    },
    doQueryReset () {
      this.hasQuery = false
      // data恢复初始化数据
      this.queryCondition = util.deepObjectAssign({}, this.$options.data().queryCondition)
    },
    doExportExcel () {
      this.$refs.searchReulstList.exportCSV('进件列表')
    },
    doSearch () {
      this.gridOptions.dataSource.serviceInstanceInputParameters = util.deepObjectAssign({}, this.gridOptions.dataSource.serviceInstanceInputParameters, this.queryCondition)
      this.$refs.searchReulstList.refresh()
    },
    getSummaries (param) {
      const {
        columns,
        data,
        reduces
      } = param

      this.reduces = reduces || []

      if (reduces == null) {
        return []
      }
      const sums = []
      sums[1] = '合计'
      sums[7] = util.moneyFormat(reduces.sumOriginalLoanMoneyAmount) || '--'
      sums[8] = (util.moneyFormat(reduces.sumFinanceFamilyTotalAsset) || '--') + '万'
      console.log('sums111', sums)
      return sums
    }

  }
}
</script>
