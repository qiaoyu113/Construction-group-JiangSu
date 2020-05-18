<template>
  <div class="mod-role">
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">合作方列表</div>
      </el-col>
    </el-row>
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
        <el-row :gutter="10" class="search-top-operate">
          <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出
          </el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="合作方名称">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.legalPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="入库时间">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                       @change="onStartDateRangeChanged">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有无诉讼">
              <!--诉讼-->
              <t-dic-dropdown-select dicType="have_or_not"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.litigation"/>
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
            serviceInstance: tapp.services.tBaseinfoPartnerApproval.getPagedList,
            serviceInstanceInputParameters: {
              companyName: null,
              legalPerson: null,
              litigation: null,
              dateRange: ''
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            columns: [

              {
                prop: 'companyName',
                label: '合作方名称',
                sortable: false
              },
              {
                prop: 'creditCode',
                label: '统一社会信用代码',
                sortable: false
              },
              {
                prop: 'companyAddress',
                label: '合作方地址',
                sortable: false
              },
              {
                prop: 'legalPerson',
                label: '法人',
                sortable: false
              },
              {
                prop: '',
                label: '入库时间',
                sortable: false
              },
              {
                prop: '',
                label: '合同履约保证金',
                sortable: false
              },

              {
                prop: '',
                label: '有无诉讼',
                sortable: false
              },
              {
                prop: '',
                label: '有无房产或其他抵押',
                sortable: false
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

