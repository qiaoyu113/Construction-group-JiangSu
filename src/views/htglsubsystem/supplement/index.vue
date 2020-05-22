<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="140px">
        <el-row :gutter="10" class="search-top-operate">
          <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
        </el-row>
        <el-row :gutter="20" class="page-title">
          <el-col>
            <div class="title">主合同补充协议列表</div>
          </el-col>
        </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="补充协议编号：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.saCode"
                       placeholder="补充协议编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="补充协议名称：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.saName"
                       placeholder="补充协议名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="补充协议形式：">
            <t-dic-dropdown-select dicType="con_modality"  v-model="gridOptions.dataSource.serviceInstanceInputParameters.conModality"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司：">
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
            serviceInstance: tapp.services.tContSideAgreementInfo.getPagedList,
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
                prop: 'saCode',
                label: '补充协议编号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'saName',
                label: '补充协议名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conModality',
                label: '补充协议形式',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('con_modality', row.conModality) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'conTotal',
                label: '调整金额(万元)',
                sortable: true,
                minWidth: 120,
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
                }
              },
              {
                prop: 'conStatus',
                label: '补充协议状态',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('main_con_status', row.conStatus) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
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

