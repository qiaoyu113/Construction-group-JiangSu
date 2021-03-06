<template>
  <div class="acceptance-bill-table-container">
    <el-row class="fina-function-button">
      <el-col :span="4">
        <el-button @click="openDialog" type="primary">项目借款</el-button>
      </el-col>
      <el-col :span="6">
        <span>小计金额：{{ $util.moneyFormat(totalAmount) }}万元</span>
      </el-col>
    </el-row>
    <el-table :data="dataInfo" border size="mini">
      <el-table-column align="center" label="借款额度（万元）" prop="realAmount">
        <template slot-scope="scope">
          <span>{{ $util.moneyFormat(scope.row.realAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="可使用借款额度（万元）" prop="liveAmount">
        <template slot-scope="scope">
          <span>{{ $util.moneyFormat($util.bigDSubtract(scope.row.rAmount, scope.row.realAmount, 2)) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本次付款金额（万元）" prop="payment">
        <template slot-scope="scope">
          <span>{{ $util.moneyFormat(scope.row.payment) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本次借款期限" prop="timeLimit"></el-table-column>
      <el-table-column align="center" label="借款合同编号" prop="getCode">
        <template slot-scope="row">
          <t-input v-model="row.asAmount" placeholder="审批完成后回填" :readOnly="readOnly"></t-input>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="项目到帐请款列表"
      :visible.sync="dialogVisible"
      width="80%"
      center
      @click="openDialog"
    >
      <t-form
        ref="search"
        label-width="120px"
        :model="gridOptions.dataSource.serviceInstanceInputParameters"
      >
        <el-row :gutter="10" class="search-top-operate">
          <el-button type="primary" @click="choose">确定</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="借款日期：" prop="rType" style="margin-bottom: 15px;">
              <t-datetime-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.rType" type="date"></t-datetime-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid
        ref="searchResultList"
        :options="gridOptions"
        @selection-change="handleSelectionChange"
      >
      </t-grid>
    </el-dialog>
  </div>
</template>

<script>
  import baseView from '@/base/baseView'
  import isEmpty from 'lodash/isEmpty'
  export default {
    extends: baseView,
    props: {
      readOnly: {
        type: Boolean,
        default: true
      },
      searchData: {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        dataInfo: [],
        totalAmount: 0, // 小计
        dialogVisible: false,
        gridOptions: {
          mutiSelect: true,
          dataSource: {
            serviceInstance: tapp.services.finaTakebackApproval.getPagedList,
            serviceInstanceInputParameters: {
              rWay: '', // 默认承兑汇票 promise_draft
              rType: ''
            }
          },
          grid: {
            offsetHeight: 125, // 125:查询部分高度
            mutiSelect: true,
            maxHeight: 350,
            columns: [
              {
                prop: 'proName',
                label: '项目名称'
              },

              {
                prop: 'bRealAmount',
                label: '项目借款额度（万元）',
                width: 180,
                formatter: (row, column, cellValue) => {
                  return this.$util.moneyFormat(row.bRealAmount)
                }
              },
              {
                prop: 'borrowDate',
                label: '借款日期',
                width: 120
              },
              {
                prop: 'borrowDate',
                label: '借款额度期限',
                width: 120
              },
              // 到账金额 rAmount- 累计借款款 totalBorrowAmount - realAmount
              {
                prop: 'liveAmount',
                label: '剩余可用额度（万元）',
                width: 180,
                formatter: (row, column, cellValue) => {
                  return this.$util.moneyFormat(this.$util.bigDSubtract(row.rAmount, row.realAmount, 2))
                }
              },
              {
                prop: 'payment',
                label: '本次付款金额（万元）',
                width: 180,
                render: (h, params) => {
                  return h('t-currency-input', {
                    props: {
                      value: params.row.payment,
                      unitValue: 10000
                    },
                    on: {
                      input: function (event) {
                        console.log('event', event)
                        params.row.payment = event
                      }
                    }
                  })
                }
              },
              {
                prop: 'timeLimit',
                label: '本次借款期限',
                width: 120,
                render: (h, params) => {
                  console.log(h, params)
                  return h('t-int-input', {
                    props: {
                      value: params.row.timeLimit
                    },
                    on: {
                      input: function (event) {
                        console.log('event', event)
                        params.row.timeLimit = event
                      }
                    }
                  })
                }
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
      this.currentValue = this.value
    },
    watch: {
      searchData: {
        handler (newValue, oldValue) {
          this.gridOptions.dataSource.serviceInstanceInputParameters = newValue
          this.doRefresh()
        },
        deep: true
      }
    },
    activated () {
      this.$nextTick(() => {})
    },
    computed: {},
    methods: {
      handleSelectionChange (val) {
        this.selectedRows = val
        console.log('selectedData 选中的数据', val)
      },
      doRefresh () {
        console.log(
          'doRefresh 查询条件',
          this.gridOptions.dataSource.serviceInstanceInputParameters
        )
        this.$refs.searchResultList.refresh()
      },
      // 打开承兑汇票弹框
      openDialog () {
        // 给弹出的框赋值查询条件
        this.dialogVisible = true
      },
      // 打开承兑汇票弹框
      closeDialog () {
        this.dialogVisible = false
      },
      doReset () {
        this.$refs.search.resetFields()
        this.selectedRows = []
        this.doRefresh()
      },
      // 点击确定
      choose () {
        if (this.validatorSelectedData()) {
          this.dialogVisible = false
          // 给承兑汇票的table赋值
          this.dataInfo = this.selectedRows
          this.setTotalAmount(this.dataInfo)
          // 传送到父组件
          this.$emit('selectedData', this.dataInfo)
          this.doReset()
        }
      },
      // 点击取消
      cancel () {
        this.dialogVisible = false
        this.doReset()
      },
      // 校验选中的数据是否填写了本次付款金额（万元）和本次付款期限
      validatorSelectedData () {
        console.log('validatorSelectedData this.selectedRows',this.selectedRows)
        let isPass = true
        for (let v of this.selectedRows) {
          console.log('vvvv',v,v.payment,v.timeLimit,isEmpty(v.payment),isEmpty(v.timeLimit))
          if (!v.payment || !v.timeLimit) {
            isPass = false
            this.$notify.error({
              title: '错误',
              message: '选中的数据的【本次付款金额（万元）】和【本次付款期限】不能为空'
            })
            break
          }
        }
        return isPass
      },
      // 计算小计
      setTotalAmount (data) {
        let sum = 0
        data.map(v => {
          if (v.payment) {
            sum += Number(v.payment)
          }
        })
        this.totalAmount = sum
      }
    }
  }
</script>
<style scoped type="text/css">
  .acceptance-bill-table-container {
    margin: 10px 0;
  }

  .fina-function-button {
    display: flex;
    align-items: center;
    margin: 0 0 10px 0;
  }
</style>

