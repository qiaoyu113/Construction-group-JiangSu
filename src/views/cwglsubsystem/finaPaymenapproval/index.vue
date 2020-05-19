<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search"  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button type="primary" class="demo-button" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="所属分公司：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                       placeholder="所属分公司：" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="子合同名称：">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.conName"
                       placeholder="子合同名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="付款方式">
            <t-dic-dropdown-select dicType="payment_way"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.conPayWay"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="付款类型">
            <t-dic-dropdown-select dicType="1260907717166501889"
                                   v-model="gridOptions.dataSource.serviceInstanceInputParameters.paymentType"
                                   :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" plain icon="el-icon-search" @click="doRefresh()">查询</el-button>
            <el-button  icon="el-icon-download" @click="doReset()">
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
            serviceInstance: tapp.services.finaPaymenapproval.getPagedList,
            serviceInstanceInputParameters: {
              paymentType: null,
              conPayWay: null,
              conName: null,
              proName: null,
              proSubCompany: null
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
                prop: 'proSubCompany',
                label: '所属分公司',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conName',
                label: '子合同名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conTotal',
                label: '子合同额',
                sortable: true,
                width: 120,
              },
              {
                prop: 'paymentType',
                minWidth: 120,
                columnKey: 'rWay',
                filters: util.getListDataDicFilters('payment_way'),
                label: '付款方式',
                sortable: true,
                width: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('payment_way', row.rWay)
                }
              },
              {
                prop: 'conPayWay',
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
                prop: 'lNum',
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
                label: '备注',
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

