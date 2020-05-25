<template>
  <div class="mod-role">
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">密钥领用归还列表</div>
      </el-col>
    </el-row>
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
            :model="gridOptions.dataSource.serviceInstanceInputParameters">
      <el-row :gutter="10" class="search-top-operate">
        <el-button icon="el-icon-download" type="success" @click="doExportExcel()">
          <i class="fa fa-lg fa-level-down"></i>导出
        </el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proName" label="项目名称">
            <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别">
            <t-dic-dropdown-select dicType="engineering_type"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"
            ></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proConstructCompany" label="建设单位">
            <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密钥类别">
            <t-dic-dropdown-select dicType="key_type"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.keyType"
            ></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="领用单位">
            <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="领用到期日" prop="dateRange">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                     @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密钥状态">
            <t-dic-dropdown-select dicType="approval_status"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.keyStatus"
            ></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办人" prop="sign">
            <t-handler-select label="经办人" placeholder="选择一个经办人"
                              v-model="gridOptions.dataSource.serviceInstanceInputParameters.sign"
                              @selectedUser="getSelectedUser"></t-handler-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="领用到期日" prop="dateRange1">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange1"
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
  import util from '@/util'

  export default {
    name: 'myTask',
    extends: baseView,
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data() {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tBidPckeyApproval.getPagedList,
            serviceInstanceInputParameters: {
              /*searchKey: null,
              processDefinationKey: null,*/
              dateRange: '',
              dateRange1: ''
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            fit: true, // 列的宽度是否自撑开
            columns: [
              /*{
                prop: 'bId',
                label: '流程业务id',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'actTaskKey',
                label: 'activiti执行任务key',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pcId',
                label: '项目备案id',
                sortable: false,
                minWidth: 120,
              },*/
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
                prop: 'keyId',
                label: '密钥类别',
                sortable: false,
                width: '100px',
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('key_type', row.keyId) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },

              {
                prop: 'proSubCompany',
                label: '领用单位',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'useScenes',
                label: '用途',
                sortable: false,
                minWidth: 120,
              },
              /* {
                 prop: 'limitStarttime',
                 label: '领用期限-开始时间',
                 sortable: false,
                 minWidth: 120,
                 formatter: (row, column, cellValue) => {
                   return this.$util.dateFormat(row.limitStarttime, 'YYYY-MM-DD');
                 }
               },
               {
                 prop: 'limitEnditme',
                 label: '领用期限-结束时间',
                 sortable: false,
                 minWidth: 120,
                 formatter: (row, column, cellValue) => {
                   return this.$util.dateFormat(row.limitEnditme, 'YYYY-MM-DD');
                 }
               },*/
              {
                prop: 'getTime',
                label: '领用日期',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.getTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'returnTime',
                label: '归还日期',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.returnTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'signTime',
                label: '经办时间',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
              },
              /*{
                prop: 'approvalStatus',
                label: '审批状态（字典表）',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'propose',
                label: '审核意见',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'result',
                label: '审核结果',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'createtime',
                label: '创建时间',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.createtime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'updatetime',
                label: '更新时间',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.updatetime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'createuser',
                label: '创建人',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'updateuser',
                label: '更新人',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'datastatus',
                label: '数据有效性 1有效 0无效',
                sortable: false,
                minWidth: 120,
              },*/
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
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0];
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1];
      },
      handleSelectionChange(val) {
        this.checkededRows = val;
      },
      doReset() {
        this.$refs.search.resetFields();
        this.gridOptions.dataSource.serviceInstanceInputParameters = {
          proName: null,
          proType: null,
          proConstructCompany: null,
          keyId: null,
          proSubCompany: null,
          dateRange: '',
          /*keyStatus: null,*/
          sign: null,
          dateRange1: ''
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

