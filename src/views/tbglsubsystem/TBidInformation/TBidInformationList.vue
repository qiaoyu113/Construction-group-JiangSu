<template>
  <div class="mod-role">
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-upload2" @click="doSave()">导出</el-button>
    </el-row>
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称：" prop="proName">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类别：">
              <t-dic-dropdown-select dicType="engineering_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建设单位：">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分公司：">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="经营方式：">
              <t-dic-dropdown-select dicType="business_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目阶段：">
              <t-dic-dropdown-select dicType="pro_stage"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.approvalStatus"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投标结果：">
              <t-dic-dropdown-select dicType="bid_result"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.bidResult"
              ></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人：" prop="sign">
              <t-handler-select v-model="name" @selectedUser="getSelectedUser"></t-handler-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
          <el-col :span="12">
            <el-form-item>
              <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
              <el-button type="primary" icon="el-icon-circle-close" @click="doReset()">清空</el-button>
              <el-button type="info" @click="doEdit()">详情</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
    </el-card>
    <el-card shadow="never">
      <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
      </t-grid>
    </el-card>
  </div>
</template>
<script>
  import baseView from '@/base/baseView'
  import util from '@/util'

  export default {
    extends: baseView,
    data () {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        name: '',
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tBidProbidApproval.getPagedList,
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
            operates: {
              width: 60,
              fixed: 'left',
              list: [{
                type: 'text',
                show: true,
                label: '查看',
                method: this.doEdit
              }]
            }, // 列操作按钮
            columns: [
              {
                prop: 'proName',
                label: '项目名称',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'proSubCompany',
                label: '分公司',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'proType',
                label: '工程类别',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicsFormat('engineering_type', row.proType)
                }
              },
              {
                prop: 'proConstructCompany',
                label: '建设单位',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'proTotalInvestment',
                label: '投资金额',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'proAddressProvince',	/*city,detail*/
                label: '项目地址',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'proContractAttr',
                label: '合同模式',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicsFormat('contract_model', row.proContractAttr)
                }
              },
              {
                prop: 'proRunMode',
                label: '经营方式',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值，此处注意cell值需要为一个数组
                  return util.dataDicsFormat('business_type', row.proRunMode)
                }
              },
              {
                prop: 'bidAmount',
                label: '投标金额',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'bidCount',
                label: '投标次数',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'approvalStatus',
                label: '项目审批阶段',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值，此处注意cell值需要为一个数组
                  return util.dataDicsFormat('pro_stage', row.approvalStatus)
                }
              },
              {
                prop: 'bidResult',
                label: '投标结果',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值，此处注意cell值需要为一个数组
                  return util.dataDicsFormat('bid_result', row.bidResult)
                }
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pcId',
                label: '项目名称',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '分公司',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '工程类别',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '建设单位',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '投资金额',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'pId',
                label: '项目地址',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'pId',
                label: '合同模式',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'pId',
                label: '经营方式',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '投标金额',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'pId',
                label: '项目审批阶段',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '投标结果',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'sign',
                label: '经办人',
                sortable: false,
                minWidth: 120,
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
      getSelectedUser (user) {
        console.log('current user', user)
        this.gridOptions.dataSource.serviceInstanceInputParameters.signId = user.id
        // user为从弹窗框列表带出来的那一行的数据
        // 用户id 已从从组件里已经带出来，这里定义为 dataForm.userId，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的user的其他值，从这里的user获取
        // 例如 this.dataForm.id = user.id
      },
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
      },
      doEdit (key, row) {
        const id = row ? (row.id ? row.id : '') : ''
        let tpath = '/tbglsubsystem/TBidInformation/TBidInformationDetail?id=' + id

        this.$router.push({
          path: tpath
        })
      },
    }
  }
</script>

