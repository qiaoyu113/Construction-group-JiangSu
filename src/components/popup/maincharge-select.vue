<template>
  <div class="maincharge-select">
    <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readOnly="readOnly">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="showDialog"></i>
    </t-input>
    <el-dialog center :visible.sync="dialogFormVisible" width='80%' @close="doReset()">
      <div class="dialog-title" slot="title">主要负责人选择</div>
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
            <el-form-item label="用户名" prop="name" style="margin-bottom: 15px;">
              <t-input  v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" clearable></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="space-between" class="search-bottom-operate">
          <el-col :span="8">
            <el-form-item label="选择的用户" prop="selectedName" style="margin-bottom: 15px;">
              <t-input v-model="selectedMainCharge.name" :readOnly="true" placeholder="还未选择用户"></t-input>
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
    props: {
      value: {
        type: String,
        default: '',
        required: false
      },
      placeholder: {
        type: String,
        default: '选择一个主要负责人',
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
				selectedMainCharge: {
          name: ''
        },
        currentValue: '',
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.base_User.getAllUsers,
            serviceInstanceInputParameters: {
              searchKey: null, 
            }
          },
          grid: {
            offsetHeight: 36, //36:查询部分高度
            mutiSelect: false,
            maxHeight: 350,
            columns: [
              {
                prop: 'name',
                label: '姓名',
                sortable: true,
                fixed: 'left',
                minWidth: 100
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
		created() {
      this.currentValue = this.value;
    },
    watch: {
      value(val) {
        this.currentValue = val
      }
    },
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
        this.selectedMainCharge = { name: '' }
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      handleCellClick(row, value, cell, event) {
        this.selectedMainCharge = row;
      },
			proChoose() {
        //传送到父组件
        this.currentValue = this.selectedMainCharge.name;
        this.$emit('selectedMainCharge', this.selectedMainCharge);
        this.$emit('input', this.selectedMainCharge.id);
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

