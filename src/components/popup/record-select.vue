<template>
  <div class="record-select">
    <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readOnly="readOnly">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="dialogFormVisible = true"></i>
    </t-input>
    <el-dialog title="备案项目选择" :visible.sync="dialogFormVisible" width='80%' center @close="doReset()">
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
            <el-form-item label="选择的备案项目" prop="selectedProname" style="margin-bottom: 15px;">
              <t-input v-model="selectRecord.proName" :readOnly="true" placeholder="还未选择备案项目"></t-input>
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
        default: '选择一个备案项目',
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
				selectRecord: {
          proCode: ''
        },
        currentValue: '',
				gridOptions: {
					dataSource: {
						serviceInstance: tapp.services.tBidProcaseApproval.getPagedList,
						serviceInstanceInputParameters: {
							searchKey: null,
						}
					},
					grid: {
						offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            maxHeight: '350px',
						columns: [{
								prop: 'proCode',
								label: '项目备案编号',
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
								label: '备案单位',
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
								prop: 'proTotalInvestment',
								label: '投资金额',
								sortable: true
							},
							{
								prop: 'proConstructCompany',
								label: '建设单位',
								sortable: true
							},
							{
								prop: 'proAddressDetail',
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
								prop: 'proTracker',
								label: '项目跟踪人',
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
        this.selectRecord = { proName: '' }
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      handleCellClick(row, value, cell, event) {
        this.selectRecord = row;
      },
			proChoose() {
        //传送到父组件
        this.currentValue = this.selectRecord.proName;
        this.$emit('selectedRecord', this.selectRecord);
        this.$emit('input', this.selectRecord.id);
        this.doReset();
        this.dialogFormVisible = false
			}
		}
	}
</script>

