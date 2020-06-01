<template>
  <div class="mod-role">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
            :model="gridOptions.dataSource.serviceInstanceInputParameters">
      <el-row :gutter="10" class="search-top-operate">
        <el-button icon="el-icon-download" type="success" @click="doExportExcel()">
          <i class="fa fa-lg fa-level-down"></i>导出
        </el-button>
      </el-row>
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
          <el-form-item label="经营方式">
            <t-dic-dropdown-select dicType="promise_way"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.promiseWay"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保证方式">
            <t-dic-dropdown-select dicType="promise_way"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.promiseWay"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所处阶段">
            <t-dic-dropdown-select dicType="guarantee_stage"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.bondStage"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <t-dic-dropdown-select dicType="approval_status"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.approvalStatus"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办人">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.sign" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办时间" prop="expirationDate">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.expirationDate"
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
            serviceInstance: tapp.services.tBidPromiseApproval.getPagedList,
            serviceInstanceInputParameters: {
              bondStage: null,
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
                prop: 'proAddressProvince',
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
                prop: 'bidAmount',
                label: '投标金额',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'promiseWay',
                label: '保证方式',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicsFormat('promise_way', row.promiseWay)
                }
              },
              {
                prop: 'amount',
                label: '金额',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'bondStage',
                label: '所处阶段',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'approvalStatus',
                label: '状态',
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
                label: '经办时间',
                sortable: true,
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

