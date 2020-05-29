<template>
  <div class="project-select">
    <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readonly="readOnly">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="showDialog"></i>
    </t-input>
    <el-dialog center :visible.sync="dialogFormVisible" width='80%' @close="doReset()">
      <div class="dialog-title" slot="title">项目选择</div>
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
          <el-col :span="8">
            <el-form-item label="建设单位" prop="proConstructCompany" style="margin-bottom: 15px;">
              <t-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany"
              placeholder="建设单位" clearable></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类别" prop="proType" style="margin-bottom: 15px;">
              <t-dic-dropdown-select dicType="engineering_type" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营方式" prop="proRunMode" style="margin-bottom: 15px;">
              <t-dic-dropdown-select dicType="business_type" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"></t-dic-dropdown-select>
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
      },
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
						serviceInstance: tapp.services.proInfo.getPagedList,
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
								prop: 'proSubCompany',
								label: '所属分公司',
								sortable: true
							},
							{
								prop: 'proBusDept',
								label: '所属事业部',
								sortable: true
							},
							{
                prop: 'proType',
                columnKey: 'proType', // 保持与prop一致（可以去掉）
                label: '工程类别',
                sortable: true,
                width: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('engineering_type', row.proType) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
							},
							{
								prop: 'proConstructCompany',
								label: '建设单位',
								sortable: true
							},
							{
								prop: 'proBuildArea',
								label: '项目地址',
								sortable: true
							},
              {
                prop: 'proRunMode',
                columnKey: 'proRunMode', // 保持与prop一致（可以去掉）
                label: '经营方式',
                sortable: true,
                width: 100,
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('business_type', row.proRunMode) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
							},
							{
								prop: 'proManager',
								label: '项目经理',
								sortable: true
							},
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
        this.$emit('input', this.selectProject.id);
        this.doReset();
        this.dialogFormVisible = false
      },
      showDialog() {
        if(this.readOnly) return;
        this.$childrendialogFormVisible = true
      }
		}
	}
</script>

