<template>
  <div class="mod-role">
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
              :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proName" label="项目名称" placeholder="匹配项目名称、简介、备注查询">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"  placeholder="匹配项目名称、简介、备注查询"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proAddressProvince" label="项目地址">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.proAddressProvince"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany"></el-input>
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
            <el-form-item label="经营方式">
              <t-dic-dropdown-select dicType="business_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
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
    name: 'myTask',
    extends: baseView,
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      },
    },
    data() {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tBidProcaseApproval.getPagedList,
            serviceInstanceInputParameters: {
              proName: null,
              proAddressProvince: null,
              proConstructCompany: null,
              proType: null,
              proRunMode: null
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            fit: false, // 列的宽度是否自撑开
            columns: [

              {
                prop: 'proName',
                label: '项目名称',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: '',
                label: '备案单位',
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
                prop: 'proTotalInvestment',
                label: '投资金额',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'proConstructCompany',
                label: '建设单位',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'proIntroduce',
                label: '项目简介',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'proAddressProvince',
                label: '项目地址',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('base_region', row.proAddressProvince) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
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
                prop: 'proTracker',
                label: '项目跟踪人',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'sign',
                label: '备案人',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'signTime',
                label: '备案时间',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'approvalStatus',
                label: '审批状态',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'createtime',
                label: '最近更新时间',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.createtime, 'YYYY-MM-DD');
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
        this.gridOptions.dataSource.serviceInstanceInputParameters = {
          proName: null,/*项目名称*/
          proAddressProvince: null,/*项目地址*/
          proConstructCompany: null,/*建设单位*/
          proType: null,/*工程类别*/
          proRunMode: null,/*经营方式*/
          approvalStatus: null/*审批状态*/
        }
        this.doRefresh()
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

