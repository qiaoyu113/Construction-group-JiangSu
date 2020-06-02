<template>
  <div class="mod-role">
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出
      </el-button>
    </el-row>
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
              :model="gridOptions.dataSource.serviceInstanceInputParameters">

        <el-row :gutter="10" class="search-top-operate">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName">
                <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                          v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工程类别">
                <t-dic-dropdown-select dicType="engineering_type"
                                       v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"
                                       :readOnly="readOnly"></t-dic-dropdown-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="建设单位">
                <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                          v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属分公司">
                <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                          v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同模式">
                <t-dic-dropdown-select dicType="contract_model"
                                       v-model="gridOptions.dataSource.serviceInstanceInputParameters.proContractAttr"
                ></t-dic-dropdown-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经营方式">
                <t-dic-dropdown-select dicType="business_type"
                                       v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"></t-dic-dropdown-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批状态">
                <t-dic-dropdown-select dicType="approval_status"
                                       v-model="gridOptions.dataSource.serviceInstanceInputParameters.approvalStatus"></t-dic-dropdown-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经办人" prop="signId">
                <t-handler-select label="经办人" placeholder="选择一个经办人"
                                  v-model="name"
                                  @selectedUser="getSelectedUser"></t-handler-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="search-date-picker">
              <el-form-item label="经办日期" prop="dateRange">
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
                <el-button icon="el-icon-download" @click="doReset()"><i class="fa fa-lg fa-level-down"></i>清空</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </t-form>
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
    data() {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        name: '',
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tBidFileApproval.getPagedList,
            serviceInstanceInputParameters: {
              dateRange:'',
              expirationDate: null,
              proContractAttr: null,
              proName: null,
              proAddressProvince: null,
              proConstructCompany: null,
              proType: null,
              proRunMode: null,
              approvalStatus: null,
              sign: '',
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            columns: [
              {
                prop: 'proName',
                label: '项目名称',
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
                prop: 'proContractAttr',
                label: '合同模式',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicsFormat('contract_model', row.proContractAttr)
                }
              },

              {
                prop: 'proSubCompany',
                label: '分公司',
                sortable: false,
                minWidth: 120,
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
                prop: 'bidFileType',
                label: '文件类型',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicsFormat('file_type', row.bidFileType)
                }
              },
              {
                prop: '',
                label: '文件一览',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'approvalStatus',
                label: '审批状态',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'signTime',
                label: '经办日期',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
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
    created() {
      this.loadCodeTableList();
    },
    methods: {
      getSelectedUser(user) {
        console.log('current user', user)
        this.gridOptions.dataSource.serviceInstanceInputParameters.signId = user.id

        // user为从弹窗框列表带出来的那一行的数据
        // 用户id 已从从组件里已经带出来，这里定义为 dataForm.userId，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的user的其他值，从这里的user获取
        // 例如 this.dataForm.id = user.id
      },
      // 获取码表值
      loadCodeTableList() {
        // 以下为示例
      },
      onStartDateRangeChanged(val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.signTimeStart = val[0];
        this.gridOptions.dataSource.serviceInstanceInputParameters.signTimeEnd = val[1];
      },
      handleSelectionChange(val) {
        this.checkededRows = val;
      },
      doReset() {
        this.$refs.search.resetFields();
        this.doRefresh()
        this.gridOptions.dataSource.serviceInstanceInputParameters = {
          proName: null,//工程名称
          proContractAttr: null,//合同模式
          proConstructCompany: null,//建设单位
          proType: null,//工程类别
          proRunMode: null,//经营方式
          approvalStatus: null,//审批状态
          proSubCompany: null,//分公司
          sign: null, //经办人
          signTime:null //经办日期
        }
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

