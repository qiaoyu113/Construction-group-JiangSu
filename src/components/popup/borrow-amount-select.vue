<template>
  <div class="project-select">
    <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readOnly="readOnly">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="showDialog"></i>
    </t-input>
    <el-dialog center :visible.sync="dialogFormVisible" width='80%' @close="doReset()">
      <div class="dialog-title" slot="title">借款信息选择</div>
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
            <el-form-item label="项目名称" prop="proName" style="margin-bottom: 15px;">
              <t-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                       placeholder="项目名称" clearable></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="space-between" class="search-bottom-operate">
          <el-col :span="8">
            <el-form-item label="选择的项目" prop="selectedProname" style="margin-bottom: 15px;">
              <t-input v-model="selectProject.proName" :readOnly="true" placeholder="还未选择项目"></t-input>
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
        default: '选择借款信息',
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
        selectProject: {
          proCode: ''
        },
        currentValue: '',
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.finaBorrowAmounapproval.findBorrowAmountList,
            serviceInstanceInputParameters: {
              searchKey: null,
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            maxHeight: 350,
            columns: [{
              prop: 'proCode',
              label: '项目编号',
              sortable: true,
              width: 150,
            },
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true
              },
              {
                prop: 'applyAmount',
                label: '本次申请额度',
                sortable: true
              },
              {
                prop: 'tiimeLimit',
                label: '本次借款期限（月）',
                sortable: true
              },{
                prop: 'totalBorrowCount',
                label: '累计借款次数',
                sortable: true
              },{
                prop: 'totalBorrowAmount',
                label: '累计借款金额',
                sortable: true
              },{
                prop: 'realAmount',
                label: '确认借款额度',
                sortable: true
              },{
                prop: 'borrowDate',
                label: '借款日期',
                sortable: true,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.borrowDate, 'YYYY-MM-DD');
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
        this.selectProject = { proName: '' }
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      handleCellClick(row, value, cell, event) {
        this.selectProject = row;
      },
      proChoose() {
        //传送到父组件
        this.currentValue = this.selectProject.proName;
        this.$emit('selectedProject', this.selectProject);
        this.$emit('input', this.selectProject.proName);
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

