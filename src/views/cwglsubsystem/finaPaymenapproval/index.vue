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
          <el-form-item label="选择关键字">
            <el-select placeholder="请选择" v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
              <el-option v-for="(item, index) in processDefinationlist" :key='item.key' :label="item.name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="创建时间">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange" @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关键字">
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="单据描述" clearable></el-input>
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
                prop: 'proRunMode',
                label: '经营方式（字典表）',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'unionCompany',
                label: '联营单位标识',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'paymentType',
                label: '本次付款类型（字典表）',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'fundPurpose',
                label: '资金用途（字典表）',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'processBranch',
                label: '流程审批',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'paymentWay',
                label: '付款方式（字典表）',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'rId',
                label: '到账标识id',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'totalReceived',
                label: '本项目累计已收款',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'totalReceivedRatio',
                label: '已收款比例',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'totalPayment',
                label: '本项目累计已付款',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'scTotalReceived',
                label: '当前子合同累计已付款',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'scTotalReceivedRatio',
                label: '当前子合同累计已付款比例',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'paymentAmount',
                label: '本次付款金额',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'afterThisRatio',
                label: '累计付款比例',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'leftoverAmount',
                label: '本项目余款',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'leftoverAmountRatio',
                label: '项目余款比例',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'receiveCompany',
                label: '收款单位',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'bankName',
                label: '开户行名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'bankAccountName',
                label: '银行帐户名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'bankAccount',
                label: '银行帐号',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'contacter',
                label: '联系人',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'contacterTel',
                label: '联系电话',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'approvalStatus',
                label: '审批状态（字典表）',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'sign',
                label: '执行人',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'signTime',
                label: '执行时间',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'propose',
                label: '审核意见',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'result',
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

