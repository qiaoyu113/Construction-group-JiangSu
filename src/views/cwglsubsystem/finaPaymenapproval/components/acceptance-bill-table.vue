<template>
  <div class="acceptance-bill-table-container">
    <el-row class="fina-function-button">
      <el-col :span="4">
        <el-button @click="openDialog" type="primary">到账：承兑汇票</el-button>
      </el-col>
      <el-col :span="6">
        <span>小计金额：{{ totalAmount }}万元</span>
      </el-col>
    </el-row>
    <el-table :data="dataInfo" border size="mini">
      <el-table-column align="center" label="票号" prop="lNum"></el-table-column>
      <el-table-column align="center" label="金额（万元）" prop="aoAmount"></el-table-column>
      <el-table-column align="center" label="管理费" prop="technicalTitle"></el-table-column>
      <el-table-column align="center" label="本次付款金额（万元）" prop="asAmount"></el-table-column>
    </el-table>
    <el-dialog title="项目到帐请款列表" :visible.sync="dialogVisible" width='80%' center @click="openDialog">
      <t-form ref="search" label-width="120px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="10" class="search-top-operate">
          <el-button type="primary" @click="choose">
            确定
          </el-button>
          <el-button type="info" @click="dialogVisible = false">
            取消
          </el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="到帐方式：" prop="rWay" style="margin-bottom: 15px;">
              <t-dic-dropdown-select dicType="account_way" @change="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.rWay" disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到帐类型：" prop="rType" style="margin-bottom: 15px;">
              <t-dic-dropdown-select dicType="account_type" @change="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.rType"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid ref="searchResultList" :options="gridOptions" @selection-change="handleSelectionChange"></t-grid>
    </el-dialog>
  </div>
</template>

<script>
  import baseView from '@/base/baseView'
  export default {
    extends: baseView,
    props: {
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
                prop: 'proCode',
                label: '项目编号',
                width: 150
              },
              {
                prop: 'proSubCompany',
                label: '到帐金额（万元）| 联营',
                width: 200
              },
              {
                prop: 'rWay',
                label: '到帐方式',
                formatter: (row, column, cellValue) => {
                  return this.$util.dataDicFormat('account_way', row.rWay) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'rType',
                label: '到帐类型',
                width: 100,
                formatter: (row, column, cellValue) => {
                  return this.$util.dataDicFormat('account_type', row.rType) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'proBuildArea',
                label: '到账时间'
              },
              {
                prop: 'proRunMode',
                columnKey: 'proRunMode', // 保持与prop一致（可以去掉）
                label: '经营模式',
                width: 100,
                formatter: (row, column, cellValue) => {
                  return this.$util.dataDicFormat('business_type', row.proRunMode) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'proManager',
                label: '本次付款金额（万元）| 联营',
                width: 200
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
    components: {
    },
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
      this.$nextTick(() => {
      })
    },
    computed: {},
    methods: {
      handleSelectionChange (val) {
        this.selectedRows = val
        console.log('selectedData 选中的数据', val)
      },
      doRefresh () {
        console.log('doRefresh 查询条件', this.gridOptions.dataSource.serviceInstanceInputParameters)
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
        this.dialogVisible = false
        // 给承兑汇票的table赋值
        this.dataInfo = this.selectedRows
        this.setTotalAmount(this.dataInfo)
        // 传送到父组件
        this.$emit('selectedData', this.dataInfo)
        this.doReset()
      },
      // 计算小计
      setTotalAmount (data) {
        let sum = 0
        data.map(v => {
          sum += Number(v.aoAmount)
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

