<template>
  <div class="partner-select">
    <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readOnly="readOnly">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="dialogFormVisible = true"></i>
    </t-input>
    <el-dialog center :visible.sync="dialogFormVisible" width='80%' @close="doReset()">
      <div class="dialog-title" slot="title">联营公司选择</div>
      <el-row slot="footer">
        <el-button type="primary" @click="proChoose()">
          确定
        </el-button>
        <el-button type="info" @click="dialogFormVisible = false">
          取消
        </el-button>
      </el-row>
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="110px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="合作方名称" prop="companyName" style="margin-bottom: 15px;">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人" prop="legalPerson" style="margin-bottom: 15px;">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.legalPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="入库时间" prop="dateRange" style="margin-bottom: 15px;">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange" @change="onStartDateRangeChanged"></t-datetime-range-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有无诉讼" prop="litigation" style="margin-bottom: 15px;">
              <!--诉讼-->
              <t-dic-dropdown-select dicType="have_or_not" v-model="gridOptions.dataSource.serviceInstanceInputParameters.litigation"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="space-between" class="search-bottom-operate">
          <el-col :span="8">
            <el-form-item label="选择的联营公司" prop="selectedName" style="margin-bottom: 15px;">
              <t-input v-model="selectedPartner.companyName" :readOnly="true" placeholder="还未选择联营公司"></t-input>
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
	import baseView from '@/base/baseView'
  import emitter from 'element-ui/src/mixins/emitter';
	export default {
    extends: baseView,
    mixins: [emitter],
    props: {
      value: {
        type: String,
        default: '',
        required: false
      },
      placeholder: {
        type: String,
        default: '选择一个联营公司',
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
				selectedPartner: {
          companyName: ''
        },
        currentValue: '',
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
            maxHeight: 350,
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
        },
				dialogFormVisible: false,
			}
		},
		components: {},
		created() {
      this.currentValue = this.value;
    },
		methods: {
			clearValidate() {
				this.$nextTick((_) => {
					this.$refs.ruleForm.clearValidate()
				})
      },
      onStartDateRangeChanged(val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0];
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1];
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      },
      doReset() {
        this.$refs.search.resetFields()
        this.selectedPartner = { companyName: '' }
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      handleCellClick(row, value, cell, event) {
        this.selectedPartner = row;
      },
			proChoose() {
        //传送到父组件
        this.currentValue = this.selectedPartner.companyName;
        this.$emit('selectedPartner', this.selectedPartner);
        this.$emit('input', this.selectedPartner.id);
        this.doReset();
        this.dialogFormVisible = false
			}
		}
	}
</script>

