<template>
  <div class="mod-role">
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
        <el-row :gutter="10" class="search-top-operate">
          <el-button class="demo-button" type="primary" icon="el-icon-upload2" @click="doSave()">保存</el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="proName">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类别">
              <t-dic-dropdown-select dicType="engineering_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建设单位">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分公司">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营方式">
              <t-dic-dropdown-select dicType="business_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目阶段">
              <t-dic-dropdown-select dicType="pro_stage"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.approvalStatus"></t-dic-dropdown-select>
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
            serviceInstance: tapp.services.tBidProbidApproval.getPagedList,
            serviceInstanceInputParameters: {
              pcId: null,
              proSubCompany: null,
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
                sortable: false,
                minWidth: 120,
              },

              {
                prop: 'proType',
                label: '工程类别',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicsFormat('engineering_type', row.proType)
                }
              },
              {
                prop: 'proContractAttr',
                label: '合同模式',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicsFormat('contract_model', row.proContractAttr)
                }
              },
              {
                prop: 'proConstructCompany',
                label: '建设单位',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'proAddressProvince',
                label: '分公司',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'proRunMode',
                label: '经营方式',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值，此处注意cell值需要为一个数组
                  return util.dataDicsFormat('business_type', row.proRunMode)
                }
              },
              {
                prop: 'bidAmount',
                label: '投资金额',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'approvalStatus',
                label: '项目审批阶段',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值，此处注意cell值需要为一个数组
                  return util.dataDicsFormat('pro_stage', row.approvalStatus)
                }
              },
              {
                prop: 'bidResult',
                label: '投标结果',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值，此处注意cell值需要为一个数组
                  return util.dataDicsFormat('bid_result', row.bidResult)
                }
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: false,
                minWidth: 120,
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

