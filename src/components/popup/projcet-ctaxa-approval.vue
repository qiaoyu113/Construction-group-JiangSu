<template>
  <div class="project-select">
    <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readOnly="readOnly">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="showDialog"></i>
    </t-input>
    <el-dialog center :visible.sync="dialogFormVisible" width='80%' @close="doReset()">
      <div class="dialog-title" slot="title">项目合同选择</div>
      <el-row slot="footer">
        <el-button type="primary" @click="proChoose()">
          确定
        </el-button>
        <el-button type="info" @click="dialogFormVisible = false">
          取消
        </el-button>
      </el-row>
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="120px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                         placeholder="项目名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="计税方式">
              <t-dic-dropdown-select dicType="tax_method"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.taxMethod"
                                     :readOnly="false"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属公司">
              <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                         placeholder="所属公司" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="space-between" class="search-bottom-operate">
          <el-col :span="8">
            <el-form-item label="选择的项目" prop="selectedProname" style="margin-bottom: 15px;">
              <t-input v-model="selectData.proName" :readOnly="true" placeholder="选择的项目"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 15px;">
              <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
              <el-button @click="doReset()" icon="el-icon-circle-close">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid ref="searchReulstList" :options="gridOptions" @cell-click="handleCellClick"></t-grid>
    </el-dialog>
  </div>
</template>

<script>
  import util from '@/util'
  import moment from 'moment'
  import baseView from '@/base/baseView'

  export default {
    extends: baseView,
    props: {
      value: {
        type: String,
        default: '',
        required: false
      },
      placeholder: {
        type: String,
        default: '选择外经证号信息',
        required: false
      },
      readOnly: {
        type: Boolean,
        default: false,
        required: false,
      }
    },
    data() {
      return {
        dataForm: {

        },
        dataRules: {
          proName:  [
            {required: false}
          ],
          proType:  [
            {required: false}
          ],
          proRunMode:  [
            {required: false}
          ],
          proConstructCompany:  [
            {required: false}
          ],
          selectedProname:  [
            {required: false}
          ],
        },
        selectData: {
          proCode: ''
        },
        currentValue: '',
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.finaCtaxationApproval.getPagedList,
            serviceInstanceInputParameters: {
              proName: null,
              taxMethod: null,
              proSubCompany: null,
              flag: true
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            maxHeight: 350,
            columns: [
              {
                prop: 'licenceCode',
                label: '外经证号',
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
                prop: 'proPlanDate',
                label: '工程起止时间',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conName',
                label: '合同名称',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'conTotal',
                label: '合同金额（万元）',
                sortable: true,
                minWidth: 150,
              },
              {
                prop: 'applyAmount',
                label: '申请金额（万元）',
                sortable: true,
                minWidth: 150,
              },
              {
                prop: 'addressDetail',
                label: '外出经营地',
                sortable: true,
                minWidth: 130,
              },
              {
                prop: 'companyName',
                label: '合同对方企业名称',
                sortable: true,
                minWidth: 130,
              },
              {
                prop: 'taxMethod',
                columnKey: 'taxMethod',
                filters: util.getListDataDicFilters('tax_method'),
                label: '计税方式',
                sortable: true,
                width: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('tax_method', row.taxMethod)
                }
              },
              {
                prop: 'startDate',
                label: '使用期限',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return (row.startDate + '').substring(0,10) + '~' + (row.endDate + '').toString().substring(0,10)
                }
              },
              {
                prop: 'proSubCompany',
                label: '所属公司',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'ctaxationStatus',
                label: '状态',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'delayDate',
                label: '延期日期',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.delayDate, 'YYYY-MM-DD');
                }
              }
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            },
          }
        },
        dialogFormVisible: false,
      }
    },
    components: {},
    created() {
      this.currentValue = this.value
    },
    watch: {
      value(val) {
        this.currentValue = val
      }
    },
    activated() {
      this.$nextTick(() => {})
    },
    computed: {},
    methods: {
      clearValidate() {
        this.$nextTick((_) => {
          this.$refs.ruleForm.clearValidate()
        })
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      },
      doReset() {
        this.$refs.search.resetFields()
        this.selectData = { proName: '' }
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      handleCellClick(row, value, cell, event) {
        this.selectData = row;
      },
      proChoose() {
        //传送到父组件
        this.currentValue = this.selectData.licenceCode;
        this.$emit('selectedData', this.selectData);
        this.$emit('input', this.selectData.licenceCode);
        this.doReset();
        this.dialogFormVisible = false
      },
      showDialog() {
        if(this.readOnly) return;
        this.dialogFormVisible = true
      }
    }
  }
</script>

