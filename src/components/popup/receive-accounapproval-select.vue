<template>
  <div class="receive-accounapproval-select">
    <!-- <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readOnly="readOnly">
    </t-input> -->
    <i slot="suffix" class="el-input__icon el-icon-search" @click="showDialog"></i>
    <el-dialog center :visible.sync="dialogFormVisible" width='80%' @close="doReset()">
      <div class="dialog-title" slot="title">到账信息选择</div>
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
        default: '选择一个项目',
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
            serviceInstance: tapp.services.finaReceiveAccounapproval.findReceiveAccountList,
            serviceInstanceInputParameters: {
              proName: null,
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            maxHeight: 350,
            columns: [
              {
                prop: 'proName',
                label: '项目名称',
                minWidth: 120,
                sortable: true
              },
              {
                prop: 'rDatetime',
                label: '到账时间',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'rAmount',
                label: '到帐金额（万元）',
                minWidth: 120,
                sortable: true
              },
              {
                prop: 'rWay',
                columnKey: 'rWay', // 保持与prop一致（可以去掉）
                label: '到帐方式',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('account_way', row.rWay) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'rType',
                columnKey: 'rType', // 保持与prop一致（可以去掉）
                label: '到帐类型',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('account_type', row.rType) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
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
      currentValue(newValue, oldValue) {

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
        this.currentValue = this.selectProject.id;
        this.$emit('selectedProject', this.selectProject);
        this.$emit('input', this.selectProject.id);
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

