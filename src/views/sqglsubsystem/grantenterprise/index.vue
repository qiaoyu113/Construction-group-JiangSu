<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"  :model="gridOptions.dataSource.serviceInstanceInputParameters">
      <el-row :gutter="10" class="search-top-operate">
        <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20" class="page-title">
        <el-col>
          <div class="title">已入甲方企业列表</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" class="search-date-picker" >
          <el-form-item label="信用代码：" prop="creditCode">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.creditCode"
                       placeholder="信用代码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="企业名称："   prop="companyName">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.companyName"
                       placeholder="企业名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="企业地址：" prop="companyAddress">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.companyAddress"
                       placeholder="企业地址" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="企业性质："  prop="companyAttr">
            <t-dic-dropdown-select dicType="unit_nature"  v-model="gridOptions.dataSource.serviceInstanceInputParameters.companyAttr"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办人："  prop="sign">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.sign"
                       placeholder="经办人" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item  label="审查状态：" prop="approvalStatus">
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
              serviceInstance: tapp.services.tGrantEnterpriseApproval.getPagedList,
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
                  prop: 'companyName',
                  label: '企业名称',
                  sortable: true,
                  minWidth: 120,
                },
                {
                  prop: 'creditCode',
                  label: '统一社会信用代码',
                  sortable: true,
                  minWidth: 150,
                },
                {
                  prop: 'companyAttr',
                  label: '企业性质',
                  sortable: true,
                  minWidth: 120,
                  formatter: (row, column, cellValue) => {
                    return util.dataDicFormat('unit_nature', row.companyAttr) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                  }
                },
                {
                  prop: 'companyAddress',
                  label: '企业地址',
                  sortable: true,
                  minWidth: 120,
                },
                {
                  prop: 'legalPerson',
                  label: '法人代表',
                  sortable: true,
                  minWidth: 120,
                },
                {
                  prop: 'intentionProject',
                  label: '意向项目',
                  sortable: true,
                  minWidth: 120,
                },
                {
                  prop: 'proBuildArea',
                  label: '项目规模',
                  sortable: true,
                  minWidth: 120,
                },
                {
                  prop: 'sign',
                  label: '经办人',
                  sortable: true,
                  minWidth: 120,
                },
                {
                  prop: 'approvalStatus',
                  label: '审批状态',
                  sortable: true,
                  minWidth: 120,
                  formatter: (row, column, cellValue) => {
                    return util.dataDicFormat('approval_status', row.approvalStatus) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                  }
                }
              ],
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

