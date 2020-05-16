<template>
  <div class="mod-role">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
        <el-row :gutter="10" class="search-top-operate">
          <el-button type="success" @click="doSave()">
            确定
          </el-button>
          <el-button type="info" @click="">
            取消
          </el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName" placeholder="项目名称"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建设单位">
              <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                        v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany" placeholder="建设单位"
                        clearable></el-input>
            </el-form-item>
          </el-col>
    	  <el-col :span="8">
    	    <el-form-item label="工程类别">
    	      <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
    	                v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType" placeholder="工程类别"
    	                clearable></el-input>
    	    </el-form-item>
    	  </el-col>
    	  <el-col :span="8">
    	    <el-form-item label="经营方式">
    	      <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
    	                v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode" placeholder="经营方式"
    	                clearable></el-input>
    	    </el-form-item>
    	  </el-col>
    	  
        </el-row>
        <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
          <el-col :span="12">
            <el-form-item>
              <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
              <el-button icon="el-icon-download" @click="doReset()">
                <i class="fa fa-lg fa-level-down"></i>清空
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
      </t-grid>
    </el-dialog>
  </div>
</template>
<script>
  import baseView from '@/base/baseView'

  export default {
    name: 'myTask',
    extends: baseView,
    data () {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.proInfo.getPagedList,
            serviceInstanceInputParameters: {
              searchKey: null,
              processDefinationKey: null,
              dateRange: ''
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            columns: [
              {
                prop: 'proCode',
                label: '项目备案编号',
                sortable: true
              },
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true
              },
              {
                prop: 'proConstructCompany',
                label: '备案单位',
                sortable: true
              },
              {
                prop: 'proType',
                label: '工程类别',
                sortable: true
              },
        	  {
        	    prop: 'proTotalInvestment',
        	    label: '投资金额',
        	    sortable: true
        	  },
        	  
              {
                prop: 'proSubType',
                label: '类别子项',
                sortable: true
              },
        	  {
        	    prop: 'proBuildUnit',
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
                label: '经营方式',
                sortable: true
              },
              {
                prop: 'proManager',
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
      },
			formInfo:''
    },
    components: {},
    created () {
      this.loadCodeTableList()
    },
    methods: {
      // 获取码表值
      loadCodeTableList () {
        // 以下为示例
      },
      onStartDateRangeChanged (val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1]
      },
      handleSelectionChange (val) {
        this.checkededRows = val
      },
      doReset () {
        this.$refs.search.resetFields()
      },
      doExportExcel () {
        this.$refs.searchReulstList.exportCSV('${comments}表')
      },
      doRefresh () {
        this.$refs.searchReulstList.refresh()
      },
			//传送到父组件
			doSave () {
				this.formInfo=this.$refs.multipleTable.selection;
				// this.$emit('formInfo',this.formInfo);
				console.log(this.formInfo)
			}
    }
  }
</script>

