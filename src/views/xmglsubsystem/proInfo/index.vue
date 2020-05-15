<template>
  <div class="mod-role">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button icon="el-icon-download" type="success" @click="doExportExcel()">
          <i class="fa fa-lg fa-level-down"></i>导出
        </el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目编号">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proCode" placeholder="项目编号"
                      clearable></el-input>
          </el-form-item>
        </el-col>
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
          <el-form-item label="所属分公司">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany" placeholder="所属分公司"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部">
            <el-input @submit.native.prevent @keyup.enter.native="doRefresh()"
                      v-model="gridOptions.dataSource.serviceInstanceInputParameters.proBusDept" placeholder="所属事业部"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式">
            <t-dic-dropdown-select dicType="business_type" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别">
            <t-dic-dropdown-select dicType="engineering_type" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类别子项">
            <t-dic-dropdown-select dicType="category_child" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有无诉讼">
            <t-dic-dropdown-select dicType="have_or_not" v-model="gridOptions.dataSource.serviceInstanceInputParameters.isLitigation" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有无借款">
            <t-dic-dropdown-select dicType="have_or_not" v-model="gridOptions.dataSource.serviceInstanceInputParameters.isBorrowing" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="创建时间">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                     @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目状态">
            <t-dic-dropdown-select dicType="pro_status" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proStatue" :readOnly="readOnly"></t-dic-dropdown-select>
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
  </div>
</template>
<script>
  import baseView from '@/base/baseView'

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
                label: '项目编号',
                sortable: true
              },
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true
              },
              {
                prop: 'proConstructCompany',
                label: '建设单位',
                sortable: true
              },
              {
                prop: 'proBusDept',
                label: '事业部',
                sortable: true
              },
              {
                prop: 'proSubCompany',
                label: '分公司',
                sortable: true
              },
              {
                prop: 'proType',
                label: '工程类别',
                sortable: true
              },
              {
                prop: 'proSubType',
                label: '类别子项',
                sortable: true
              },
              {
                prop: 'proBuildArea',
                label: '建筑面积',
                sortable: true
              },
              {
                prop: 'proTotalInvestment',
                label: '总投资',
                sortable: true
              },
              {
                prop: 'proRunMode',
                label: '经营方式（注）',
                sortable: true
              },
              {
                prop: 'proRunMode',
                label: '合同总金额',
                sortable: true
              },
              {
                prop: 'proManager',
                label: '项目经理',
                sortable: true
              },
              {
                prop: 'proManager',
                label: '累计到账金额',
                sortable: true
              },
              {
                prop: 'proManager',
                label: '累计支出金额',
                sortable: true
              },
              {
                prop: 'proManager',
                label: '累计已收管理费',
                sortable: true
              },
              {
                prop: 'proManager',
                label: '是否有借款',
                sortable: true
              },
              {
                prop: 'proManager',
                label: '是否有诉讼',
                sortable: true
              },
              {
                prop: 'proStatue',
                label: '状态',
                sortable: true
              }
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            },
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
      }
    }
  }
</script>

