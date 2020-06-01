<template>
  <div class="mod-role">
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出
      </el-button>
    </el-row>
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
              :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名">
              <t-manager-select placeholder="选择一个项目经理" v-model="gridOptions.dataSource.serviceInstanceInputParameters.pcId"
                                @selectedManager="getSelectedManager"></t-manager-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建造师等级">
              <t-dic-dropdown-select dicType="constructor_level" v-model="gridOptions.dataSource.serviceInstanceInputParameters.constructorLevel"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="分公司">
              <t-partner-select v-model="gridOptions.dataSource.serviceInstanceInputParameters.companyId"
                                @selectedPartner="getSelectedPartner"></t-partner-select>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
          <el-col :span="12">
            <el-form-item>
              <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
              <el-button @click="doReset" type="primary" icon="el-icon-circle-close">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange" @cell-clik="handleCellClick">
      </t-grid>
    </el-card>
  </div>
</template>
<script>
  import baseView from '@/base/baseView'
  import util from '@/util'

  export default {
    name: 'myTask',
    extends: baseView,
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      },
    },
    data () {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tBaseinfoPmQualification.getPagedList,
            serviceInstanceInputParameters: {
              pcId: null,
              constructorLevel: null,
              proSubCompany: null
            }
          },
          grid: {
            offsetHeight: 125, // 125:查询部分高度
            mutiSelect: false,
            columns: [
              {
                prop: 'pmId',
                label: '姓名',
                sortable: false
              },
              {
                prop: 'proSubCompany',
                label: '所在公司',
                sortable: false
              },
              {
                prop: 'proContactway',
                label: '联系方式',
                sortable: false
              },
              {
                prop: 'constructorLevel',
                label: '建造师等级',
                sortable: false,
                width: 100
              },
              {
                prop: 'constructorCode',
                label: '建造师证书编号',
                sortable: false,
                width: 140
              },
              {
                prop: 'safeB',
                label: '安全B证',
                sortable: false
              },
              {
                prop: 'proStatue',
                label: '是否在建',
                sortable: false
              },
              {
                prop: '',
                label: '在建项目个数',
                sortable: false,
                width: 120
              },
              {
                prop: '',
                label: '累计竣工项目个数',
                sortable: false,
                width: 150
              },
              {
                prop: '',
                label: '证书附件',
                sortable: false
              }
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            }
          }
        }
      }
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
      getSelectedPartner(company) {
        console.log('current company', company)
        // company为从弹窗框列表带出来的那一行的数据
        // 公司id 已从从组件里已经带出来，这里定义为 dataForm.companyId，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的company的其他值，从这里的company获取
        // 例如 this.dataForm.creditCode = company.creditCode
      },
      onStartDateRangeChanged (val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1]
      },
      handleSelectionChange (val) {
        this.checkededRows = val
      },
      handleCellClick(row,column,cell,event){
        console .log('click-info',row,column,cell,event)
      },
      doReset () {
        this.$refs.search.resetFields()
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      doExportExcel () {
        this.$refs.searchReulstList.exportCSV('项目经理状态表')
      },
      doRefresh () {
        this.$refs.searchReulstList.refresh()
      },
      getSelectedManager (manager) {
        console.log('current charge', manager)
      }
    }
  }
</script>

