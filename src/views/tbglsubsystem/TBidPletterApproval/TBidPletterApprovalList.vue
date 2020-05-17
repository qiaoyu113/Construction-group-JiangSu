<template>
  <div class="mod-role">
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
          <el-form-item prop="proSubCompany" label="工程类别">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="建设单位">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属分公司">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="useScenes" label="经营方式">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="保证方式">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所处阶段">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="状态">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item  label="">
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="经办人">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办日期">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.signTime"
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
            serviceInstance: tapp.services.tBidPletterApproval.getPagedList,
            serviceInstanceInputParameters: {
              proSubCompany: null,
              pcId: null,
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            fit: true, // 列的宽度是否自撑开
            columns: [
/*              {
                prop: 'bId',
                label: '流程业务id',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'actTaskKey',
                label: 'activiti执行任务key',
                sortable: true,
                minWidth: 120,
              },*/
              {
                prop: 'pcId',
                label: '项目名称',
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
                label: '合同模式',
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
                label: '保证方式',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '保证金额',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '所处阶段',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'sign',
                label: '经办人人',
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

