<template>
  <div class="mod-role">
    <t-form ref="search"  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button  icon="el-icon-download" type="success" @click="doExportExcel()">
          <i class="fa fa-lg fa-level-down"></i>导出
        </el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="所属分公司：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
                       placeholder="所属分公司：" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="子合同名称：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
                       placeholder="子合同名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="付款方式">
            <t-dic-dropdown-select dicType="1260867076478865410"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button  @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
            <el-button  icon="el-icon-download" @click="doReset()">
              <i class="el-icon-delete"></i>清空
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </t-form>
    <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
    </t-grid>
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
            serviceInstance: tapp.services.finaPaymenapproval.getPagedList,
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
                prop: 'proName',
                label: '项目名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'proName',
                label: '所属分公司',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'proName',
                label: '子合同名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'unionCompany',
                label: '子合同额',
                sortable: true,
                width: 120,
              },
              {
                prop: 'unionCompany',
                minWidth: 120,
                columnKey: 'rWay',
                filters: util.getListDataDicFilters('1260865577187151874'),
                label: '付款方式',
                sortable: true,
                width: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('1260865577187151874', row.rWay)
                }
              },
              {
                prop: 'paymentType',
                columnKey: 'rWay',
                filters: util.getListDataDicFilters('1260907717166501889'),
                label: '付款类型',
                sortable: true,
                width: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('1260907717166501889', row.rWay)
                }
              },
              {
                prop: 'processBranch',
                label: '票号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'fundPurpose',
                label: '资金用途',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'paymentAmount',
                label: '付款金额',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'signTime',
                label: '付款时间',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'remark',
                label: '审核结果',
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

