<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="120px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
      <el-row :gutter="10" class="search-top-operate">
        <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20" class="page-title">
        <el-col>
          <div class="title">备案合同列表</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="备案合同编号：" prop="conCode">
                <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.conCode"
                           placeholder="备案合同编号" clearable></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="备案合同名称：" prop="conName">
              <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.conName"
                         placeholder="备案合同名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="备案合同形式：" prop="conModality">
            <t-dic-dropdown-select dicType="con_modality"  v-model="gridOptions.dataSource.serviceInstanceInputParameters.conModality"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="项目名称：" prop="proName">
              <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                         placeholder="项目名称" clearable></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="所属分公司：" prop="proSubCompany">
              <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                         placeholder="所属分公司" clearable></el-input>
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
  import util from '@/util'
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
            serviceInstance: tapp.services.tContBranchInfo.getPagedList,
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
                prop: 'conCode',
                label: '备案合同编号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conName',
                label: '备案合同名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conModality',
                label: '备案合同形式',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('con_modality', row.conModality) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'conTotal',
                label: '备案合同额(万元)',
                sortable: true,
                minWidth: 140,
              },
              {
                prop: 'conSigningDate',
                label: '备案合同期间',
                sortable: true,
                minWidth: 140,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.conStartDate, 'YYYY-MM-DD')+' ---- '+this.$util.dateFormat(row.conEndDate, 'YYYY-MM-DD');
                },
              },
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'proSubCompany',
                label: '所属分公司',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conSigningDate',
                label: '签订日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.conSigningDate, 'YYYY-MM-DD');
                },
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
        this.$refs.searchReulstList.exportCSV('备案合同列表数据');
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      }
    }
  }
</script>

