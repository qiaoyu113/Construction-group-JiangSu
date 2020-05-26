<template>
  <div class="project-select">
    <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readOnly="readOnly">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="dialogFormVisible = true"></i>
    </t-input>
    <el-dialog title="项目选择" :visible.sync="dialogFormVisible" width='80%' center @close="doReset()">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="120px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="10" class="search-top-operate">
          <el-button type="primary" @click="proChoose()">
            确定
          </el-button>
          <el-button type="info" @click="dialogFormVisible = false">
            取消
          </el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="子合同名称" prop="conName" style="margin-bottom: 15px;">
              <t-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.conName"
                       placeholder="子合同名称" clearable></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="space-between" class="search-bottom-operate">
          <el-col :span="8">
            <el-form-item label="选择的合同" prop="selectedProname" style="margin-bottom: 15px;">
              <t-input v-model="selectProject.conName" :readOnly="true" placeholder="还未选择合同"></t-input>
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
  import baseView from '@/base/baseView'

  export default {
    extends: baseView,
    pId: '-1',
    props: {
      value: {
        type: String,
        default: '-1'
      },
      placeholder: {
        type: String,
        default: '选择一个合同',
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
          scConName: ''
        },
        currentValue: '',
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.finaPaymenapproval.findContList,
            serviceInstanceInputParameters: {
              conName: null,
              pId: '1'
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            maxHeight: 350,
            columns: [{
              prop: 'conCode',
              label: '子合同编号',
              sortable: true,
              width: 150,
            },
              {
                prop: 'conName',
                label: '子合同名称',
                sortable: false
              },
              {
                prop: 'conTotal',
                label: '自合同金额',
              },
              {
                prop: 'signatorya',
                label: '甲方签订人',
              },
              {
                prop: 'conPartyb',
                label: '乙方',
              },
              {
                prop: 'signatoryb',
                label: '乙方签订人',
              },
              {
                prop: 'isExceedTotal',
                columnKey: 'isExceedTotal', // 保持与prop一致（可以去掉）
                label: '总价是否超预算',
                width: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('y_or_n', row.isExceedTotal) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'isExceed',
                columnKey: 'isExceed', // 保持与prop一致（可以去掉）
                label: '单价是否超预算',
                width: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('y_or_n', row.isExceed) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
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
        this.selectProject = { scConName: '' }
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      handleCellClick(row, value, cell, event) {
        this.selectProject = row;
      },
      proChoose() {
        //传送到父组件
        this.currentValue = this.selectProject.proName;
        this.$emit('selectedCon', this.selectProject);
        this.$emit('input', this.selectProject.id);
        this.doReset();
        this.dialogFormVisible = false
      }
    }
  }
</script>

