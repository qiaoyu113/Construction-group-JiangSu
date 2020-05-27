<template>
<div class="mod-role">
  <el-card shadow="never">
  <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="120px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="流程名称" prop="searchKey">
          <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="项目名称" prop="searchKey">
          <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="流程类别" prop="processDefinationKey">
          <el-select placeholder="请选择流程类别" v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
            <el-option v-for="(item, index) in processDefinationlist" :key='item.id' :label="item.name" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="流程开始时间" prop="startDateBegin">
          <t-datetime-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin" type="datetime">
          </t-datetime-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="流程结束时间" prop="endDateBegin">
          <t-datetime-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.endDateBegin" type="datetime">
          </t-datetime-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
      <el-col :span="14" style="text-align: right;">
        <el-form-item>
          <el-button type="primary" plain @click="doRefresh()" icon="el-icon-search">查询</el-button>
          <el-button  type="primary" icon="el-icon-delete" @click="doReset()">清空</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </t-form>
  <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange" @cell-click="handleCellClick">
  </t-grid>
  </el-card>
</div>
</template>
<script>
import baseView from '@/base/baseView'
// import lo
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
          serviceInstance: tapp.services.wF_ProcessInst.getMyTaskPagedList,
          serviceInstanceInputParameters: {
            searchKey: null,
          }
        },
        grid: {
          offsetHeight: 125, //125:查询部分高度
          mutiSelect: false,
          columns: [
            {
              fixed: 'left',
              prop: 'processInstId',
              label: '流程编号',
              sortable: true,
              width: 100,
            },
            {
              prop: 'processDefinationName',
              label: '流程名称',
              sortable: true,
              width: 200,
            },
            {
              prop: 'projectName',
              label: '项目名称',
              sortable: true,
              minWidth: 100,
            },
            {
              prop: 'departmentName',
              label: '发起部门',
              sortable: true,
              width: 110,
            },
            {
              prop: 'origiatorName',
              label: '发起人',
              sortable: true,
              width: 120,
            },
            {
              prop: 'startDate',
              label: '发起时间',
              sortable: true,
              width: 120,
              formatter: (row, column, cellValue) => {
                return this.$util.dateFormat(row.startDate, 'YYYY-MM-DD HH:mm:ss');
              }
            },
            {
              prop: 'taskActName',
              label: '当前节点',
              sortable: true,
              width: 120,
            },
            {
              prop: 'endDate',
              label: '超期时间',
              sortable: true,
              width: 160,
              formatter: (row, column, cellValue) => {
                return this.$util.datetimeFormat(row.taskCreateDate, 'YYYY-MM-DD');
              }
            },
            {
              prop: 'status',
              label: '流程状态',
              sortable: true,
              width: 100,
            },
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
    this.loadProcessDefList();
  },
  methods: {
    loadProcessDefList() {
      let self = this;
      tapp.services.wf_Model.getMadelList().then(function(result) {
        self.processDefinationlist = result;
      })
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
      this.$refs.searchReulstList.exportCSV('流程实例列表');
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    },
    handleCellClick(row, column, cell, event) {
      // console.log('row', row)
      if(row.taskFormKey) {
        const taskFormKey = row.taskFormKey.substr(1)
        if(column.property == 'processDefinationName') {
          let tpath = '/publicsubsystem/task/taskDetail/_'+taskFormKey+'?taskFromUrl='+row.taskFormUrl+'&readonly=true&taskId='+row.taskId+'&processDefinationKey='+row.processDefinationKey+'&taskActId='+row.taskActId+'&status='+row.status
          this.$router.push({
            path: tpath,
          })
        }
      }
    },
  }
}
</script>
