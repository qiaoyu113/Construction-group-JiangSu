<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                      placeholder="匹配项目名称、简介、备注查询"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目地址">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proAddressProvince"
                      clearable></el-input>
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
          <el-form-item label="工程类别">
            <t-dic-dropdown-select dicType="1260861756058767362"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式">
            <t-dic-dropdown-select dicType="1260863139436695554"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
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
    </el-card>
  </div>
</template>
<script>
  import baseView from '@/base/baseView'

  export default {
    name: 'myTask',
    extends: baseView,
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
              proRunMode: null,
              approvalStatus: null,
              sign: null,
              signTime: null,

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
                prop: 'proSubCompany',
                label: '备案单位',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'proType',
                label: '工程类别',
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
              },


              {
                prop: 'proRunMode',
                label: '经营方式',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'proTracker',
                label: '项目跟踪人',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'contactNum',
                label: '联系方式',
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
                label: '创建时间',
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

