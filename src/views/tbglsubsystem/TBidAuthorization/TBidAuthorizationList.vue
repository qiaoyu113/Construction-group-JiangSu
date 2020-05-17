<template>
  <div class="mod-role">
    <el-card shadow="never">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button class="demo-button" type="primary" icon="el-icon-upload2" @click="doSave()">保存</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="项目名称">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="工程类别">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="建设单位">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属分公司">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="useScenes" label="授权用途">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="经营方式">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="审查状态">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="经办人">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="经办日期">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.signTime"
                                     @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-download" @click="doReset()">
              <i class="el-icon-delete"></i>清空
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </t-form>
    <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
    </t-grid>
    </el-card>
  </div>
</template>
<script>
  import baseView from '@/base/baseView'

  export default {
    name: 'myTask',
    extends: baseView,
    data() {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tGrantAuthbidApproval.getPagedList,
            serviceInstanceInputParameters: {
              useScenes: null,
              proSubCompany: null,
              signTime: ''
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            fit: true, // 列的宽度是否自撑开
            columns: [
              /*{
                prop: 'bId',
                label: '流程业务id',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'actTaskKey',
                label: 'activiti执行任务key',
                sortable: false,
                minWidth: 120,
              },*/
              {
                prop: 'pcId',
                label: '项目名称',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: '工程类别',
                label: '授权人',
                sortable: false,
                minWidth: 120,
              },

              {
                prop: '建设单位',
                label: '备注',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: '投资金额',
                label: '备注',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: '合同模式',
                label: '备注',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: '分公司',
                label: '备注',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: '经营方式',
                label: '备注',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'useScenes',
                label: '授权用途',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'grantContent',
                label: '授权内容',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'approvalStatus',
                label: '审查状态',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: false,
                minWidth: 120,
              },
              {
                prop: 'signTime',
                label: '经办时间',
                sortable: false,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                }
              },
              /*{
                prop: 'propose',
                label: '审核意见',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'result',
                label: '审核结果',
                sortable: true,
                minWidth: 120,
              },

              {
                prop: 'createtime',
                label: '创建时间',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.createtime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'updatetime',
                label: '更新时间',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.updatetime, 'YYYY-MM-DD');
                }
              },
              {
                prop: 'createuser',
                label: '创建人',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'updateuser',
                label: '更新人',
                sortable: true,
                minWidth: 120,
              },
              {
                prop: 'datastatus',
                label: '数据有效性 1有效 0无效',
                sortable: true,
                minWidth: 120,
              },*/
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
    created() {
      this.loadCodeTableList();
    },
    methods: {
      // 获取码表值
      loadCodeTableList() {
        // 以下为示例
      },
      onStartDateRangeChanged(val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0];
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1];
      },
      handleSelectionChange(val) {
        this.checkededRows = val;
      },
      doReset() {
        this.$refs.search.resetFields();
      },
      doExportExcel() {
        this.$refs.searchReulstList.exportCSV('${comments}表');
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      }
    }
  }
</script>

