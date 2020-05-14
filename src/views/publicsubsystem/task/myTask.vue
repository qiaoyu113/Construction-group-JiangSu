<template>
<div class="mod-role">
  <t-form  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="120px">
    <el-row :gutter="10" class="search-top-operate">
      <el-button  icon="el-icon-download" type="success" @click="doExportExcel()">
        <i class="fa fa-lg fa-level-down"></i>导出
      </el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="流程名称">
          <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="单据描述" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="项目名称">
          <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="单据描述" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="流程类别">
          <el-select placeholder="请选择流程类别" v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
            <el-option v-for="(item, index) in processDefinationlist" :key='item.key' :label="item.name" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
      <el-col :span="14">
        <el-form-item>
          <el-button  @click="doRefresh()" icon="el-icon-search">查询</el-button>
          <el-button  icon="el-icon-download" @click="doReset()">
            <i class="el-icon-delete"></i>清空
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
          operates: {
            width: 60,
            fixed: 'left',
            list: [{
              type: 'text',
              show: true,
              label: '办理',
              render: this.renderTaskBtnLabel,
              method: this.doTask,
            }, ]
          }, // 列操作按钮
          columns: [
            {
              fixed: 'left',
              prop: 'processDefinationName',
              label: '流程编号',
              sortable: true,
              width: 200,
            },
            {
              prop: 'processDefinationName',
              label: '流程名称',
              sortable: true,
              width: 200,
            },
            {
              prop: 'origiatorName',
              label: '项目名称',
              sortable: true,
              width: 100,
            },
            {
              prop: 'startDate',
              label: '发起部门',
              sortable: true,
              width: 110,
            },
            {
              prop: 'folio',
              label: '发起人',
              sortable: true,
              minWidth: 120,
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
              prop: 'taskAssigneeName',
              label: '当前节点',
              sortable: true,
              width: 100,
            },
            {
              prop: 'taskCreateDate',
              label: '超期时间',
              sortable: true,
              width: 150,
              formatter: (row, column, cellValue) => {
                return this.$util.datetimeFormat(row.taskCreateDate, 'YYYY-MM-DD');
              }
            },
            {
              prop: 'taskAssigneeName',
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
    renderTaskBtnLabel(key, row) {
      if (row.taskAssignee != null && row.taskAssignee.length > 0) {
        return "办理";
      } else if (row.taskCandidate != null && row.taskCandidate.length > 0) {
        return "签收";
      }
      return "未知";
    },
    doTask(key, row) {
      if (row.taskAssignee != null && row.taskAssignee.length > 0) {
        //办理
        this.$router.push({
          path: row.taskFormUrl,
        });
        return;
      } else if (row.taskCandidate != null && row.taskCandidate.length > 0) {
		let self = this;
        // "签收";
        tapp.services.wF_Workflow.handleTask({
          taskId: row.taskId,
          claim: true,
          action: 'claim',
          taskRemark: '签收',
          docId: row.businessId
        }).then(function(result) {
          self.doRefresh();
          self.$notify.success({
            title: '操作成功！',
            message: '签收任务成功！',
          });
        });
      } else {
        alert('do what?')
      }
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
    }
  }
}
</script>
