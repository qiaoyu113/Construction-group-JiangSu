<template>
  <div class="mod-role">
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">密钥领用归还申请</div>
      </el-col>
    </el-row>
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button class="demo-button" type="primary" icon="el-icon-upload2" @click="doSave()">保存</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="项目名称">
            <el-input></el-input>
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
          <el-form-item prop="proSubCompany" label="建设单位">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="keyType" label="密钥类别">
            <t-dic-dropdown-select dicType="key_type" v-model="gridOptions.dataSource.serviceInstanceInputParameters.keyType"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="领用单位">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="领用到期日" label-width="100px">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                     @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密钥状态">
            <t-dic-dropdown-select dicType="key_status"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.keyStatus"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="经办人">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办日期">
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
            <el-button icon="el-icon-download" @click="doReset()">
              <i class="fa fa-lg fa-level-down"></i>清空
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
            serviceInstance: tapp.services.tBidPckeyApproval.getPagedList,
            serviceInstanceInputParameters: {
              pcId: null,
              searchKey: null,
              proType: null,
              keyType: null,
              keyStatus: null,
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
                label: '项目名称',
                sortable: false
              },
              {
                prop: 'pcId',
                label: '工程类别',
                sortable: false
              },
              {
                prop: 'proSubCompany',
                label: '建设单位',
                sortable: false
              },
              {
                prop: 'pcId',
                label: '投资金额',
                sortable: false
              },
              {
                prop: 'pcId',
                label: '合同模式',
                sortable: false
              },
              {
                prop: 'pcId',
                label: '经营方式',
                sortable: false
              },
              {
                prop: 'keyId',
                label: '密钥类别',
                sortable: false
              },
              {
                prop: 'proSubCompany',
                label: '领用单位 ',
                sortable: false
              },
              {
                prop: 'useScenes',
                label: '用途',
                sortable: false
              },
              {
                prop: '密钥状态',
                label: '项目名称',
                sortable: false
              },

              {
                prop: 'getTime',
                label: '领用日期',
                sortable: false,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.getTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'returnTime',
                label: '归还日期',
                sortable: false,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.returnTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: false
              },
              {
                prop: 'signTime',
                label: '经办日期',
                sortable: false,
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

