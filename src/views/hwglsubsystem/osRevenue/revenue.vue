<template>
  <div class="mod-role">
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目收支明细表</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出
      </el-button>
    </el-row>
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="110px"
              :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称：" prop="name">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.name" placeholder="项目名称"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承包形式：" prop="expendStype">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.expendStype" placeholder="承包形式"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目类别：" prop="expendStype">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.expendStype" placeholder="项目类别"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型：" prop="expendStype">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.expendStype" placeholder="类型"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="收支统计日" prop="dateRange">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                       @change="onStartDateRangeChanged">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属公司：" prop="expendStype">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.expendStype" placeholder="类型"
                        clearable></el-input>
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
            serviceInstance: tapp.services.osExpendApproval.getPagedList,
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
            columns: [
              {
                prop: 'name',
                label: '项目名称',
                minWidth: 120
              },
              {
                prop: 'cId',
                label: '项目总投资',
                minWidth: 120
              },
              {
                prop: 'expendType',
                label: '所属公司',
                minWidth: 120
              },
              {
                prop: 'expendStype',
                label: '承包形式',
                minWidth: 120
              },
              {
                prop: 'expendStype',
                label: '总包单位',
                minWidth: 120
              },
              {
                prop: 'expendStype',
                label: '使用货币',
                minWidth: 120
              },
              {
                prop: 'expendStype',
                label: '项目类型',
                minWidth: 120
              },
              {
                prop: 'amount',
                label: '金额',
                minWidth: 120
              },
              {
                prop: 'remark',
                label: '类型',
                minWidth: 120,
              },
              {
                prop: 'expendDate',
                label: '收支日期',
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.expendDate, 'YYYY-MM-DD');
                }
              }
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
