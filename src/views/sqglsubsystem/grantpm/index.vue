<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"  :model="gridOptions.dataSource.serviceInstanceInputParameters">
      <el-row :gutter="10" class="search-top-operate">
        <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20" class="page-title">
        <el-col>
          <div class="title">项目经理授权列表</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="姓名："  prop="proManager">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proManager"
                       placeholder="姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="建造师等级："   prop="constructorLevel">
            <t-dic-dropdown-select dicType="constructor_level"  v-model="gridOptions.dataSource.serviceInstanceInputParameters.constructorLevel"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="分公司："  prop="proSubCompany">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                       placeholder="分公司" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="项目名称："  prop="proName">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="项目编号："  prop="proCode">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proCode"
                       placeholder="项目编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="审批状态："  prop="approvalStatus">
            <t-dic-dropdown-select dicType="approval_status"  v-model="gridOptions.dataSource.serviceInstanceInputParameters.approvalStatus"></t-dic-dropdown-select>
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
            serviceInstance: tapp.services.tGrantPmApproval.getPagedList,
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
                prop: 'proManager',
                label: '姓名',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'proSubCompany',
                label: '分公司',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'proContactway',
                label: '联系方式',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'constructorLevel',
                label: '建造师等级',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'constructorCode',
                label: '建造师证书编号',
                sortable: true,
                minWidth: 150,
              },
              {
                prop: 'safeB',
                label: '安全B证',
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
                prop: 'proCode',
                label: '项目编号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'grantContent',
                label: '授权内容',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'approvalStatus',
                label: '授权状态',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('approval_status', row.approvalStatus) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'updatetime',
                label: '经办日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.updatetime, 'YYYY-MM-DD')
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
        this.$refs.searchReulstList.exportCSV('项目经理授权列表数据');
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      }
    }
  }
</script>

