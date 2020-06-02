<template>
  <div class="mod-role">
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出
      </el-button>
    </el-row>
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
              :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="合作方名称" prop="companyName">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人" prop="legalPerson">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.legalPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="入库时间" prop="createtime">
              <t-datetime-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.createtime" type="date"
                                 :readOnly="readOnly">
              </t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有无诉讼" prop="litigation">
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
              <el-button @click="doReset" type="primary" icon="el-icon-circle-close">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
    </el-card>
    <el-card shadow="never">
      <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange"
              @cell-clik="handleCellClick">
      </t-grid>
    </el-card>
    <el-dialog title="合作项目列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="index" label="序号" width="150"></el-table-column>
        <el-table-column property="" label="项目编号" width="200"></el-table-column>
        <el-table-column property="name" label="项目名称" width="200"></el-table-column>
        <el-table-column property="" label="合同额"></el-table-column>
        <el-table-column property="" label="合同开始日期"></el-table-column>
        <el-table-column property="" label="合同结束日期"></el-table-column>
        <el-table-column property="amountMoney" label="合同履约保证金"></el-table-column>
        <el-table-column property="litigation" label="有无诉讼"></el-table-column>
        <el-table-column property="depositType" label="有无房产或其他抵押"></el-table-column>
      </el-table>
    </el-dialog>

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
        dialogTableVisible: false,
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tBaseinfoPartnerApproval.getPagedList,
            serviceInstanceInputParameters: {
              companyName: null,
              legalPerson: null,
              isLitigation: null,
              createtime: ''
            }
          },
          grid: {
            offsetHeight: 125, // 125:查询部分高度
            mutiSelect: false,
            operates: {
              width: 60,
              fixed: 'left',
              list: [{
                type: 'text',
                show: true,
                label: '合作方项目查看',
                method: this.openPartnerProjects
              }]
            }, // 列操作按钮
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
                prop: 'createtime',
                label: '入库时间',
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.createtime, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'amountMoney',
                label: '合同履约保证金',
                sortable: false
              },

              {
                prop: 'isLitigation',
                label: '有无诉讼',
                sortable: false
              },
              {
                prop: 'depositType',
                label: '有无房产或其他抵押',
                sortable: false
              }

            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            }
          }
        }
      }
    },
    components: {},
    created() {
      this.loadCodeTableList()
    },
    methods: {
      // 获取码表值
      loadCodeTableList() {
        // 以下为示例
      },
      onStartDateRangeChanged(val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1]
      },
      handleSelectionChange(val) {
        this.checkededRows = val
      },
      handleCellClick(row, column, cell, event) {
        console.log('click-info', row, column, cell, event)
      },
      doReset() {
        this.$refs.search.resetFields()
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      doExportExcel() {
        this.$refs.searchReulstList.exportCSV('合作方表')
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh()
      },
      openPartnerProjects(row) {
        this.dialogTableVisible = true
        // 查询对应的项目信息
      }
    }
  }
</script>

