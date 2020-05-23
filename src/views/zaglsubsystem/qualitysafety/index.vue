<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="工程类别：">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="审批状态：">
            <el-select placeholder="请选择"
                       v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
              <el-option v-for="(item, index) in processDefinationlist" :key='item.key' :label="item.name"
                         :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办人：">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办日期：">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="请选择 "
                      clearable></el-input>
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
             serviceInstance: tapp.services.tQsSdfileApproval.getPagedList,
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
                prop: 'bId',
                label: '项目名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'actTaskKey',
                label: '项目类型',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'pId',
                label: '建设单位',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'cId',
                label: '合同金额',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'grantStarttime',
                label: '所属分公司',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.grantStarttime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'grantEndtime',
                label: '经营方式',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.grantEndtime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'grantUser',
                label: '文件一览',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'grantContent',
                label: '审批状态',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'remark',
                label: '经办人',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'sign',
                label: '经办日期',
                sortable: true,
                minWidth: 120,
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

