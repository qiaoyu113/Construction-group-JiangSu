<template>
<div class="mod-role">
  <el-card shadow="never">
    <t-form  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="120px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
      <el-row :gutter="10" class="search-top-operate">
        <el-button type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="流程名称" prop="searchKey">
            <t-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" clearable></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="searchKey1">
            <t-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey1" clearable></t-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="流程发起时间">
            <t-datetime-range-picker v-model="startDateRange" @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="流程类别" prop="processDefinationKey">
            <el-select placeholder="请选择流程类别" v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
              <el-option v-for="(item, index) in processDefinationlist" :key='item.id' :label="item.name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
        <el-col :span="12">
          <el-form-item>
            <el-button  @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
            <el-button  @click="doReset()">
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
  extends: baseView,
  name: 'myDone',
  data() {
    return {
      checkededRows: [],
      processDefinationlist: [],
      startDateRange: null,
      gridOptions: {
        dataSource: {
          serviceInstance: tapp.services.wF_ProcessInst.getMyDonePagedList,
          serviceInstanceInputParameters: {
            searchKey: null,
          }
        },
        grid: {   
          offsetHeight: 125, //125:查询部分高度
          mutiSelect: false,
          // operates: {
          //   width: 60,
          //   fixed: 'left',
          //   list: [{
          //     type: 'text',
          //     show: true,
          //     label: '详情',
          //     render: this.renderTaskBtnLabel,
          //     method: this.doView,
          //   }, ]
          // }, // 列操作按钮
          columns: [
            {
             fixed: 'left',
              prop: 'id',
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
              prop: 'proName',
              label: '项目名称',
              sortable: true,
              width: 110,
              formatter: (row, column, cellValue) => {
                return this.$util.dateFormat(row.startDate, 'YYYY-MM-DD');
              }
            },
              {
              prop: 'departmentName',
              label: '发起部门',
              sortable: true,
              width: 110,
              formatter: (row, column, cellValue) => {
                return this.$util.dateFormat(row.endDate, 'YYYY-MM-DD');
              }
            },
            {
              prop: 'origiatorName',
              label: '发起人',
              sortable: true,
              minWidth: 120,
            },
            {
              prop: 'startDate',
              label: '发起时间',
              sortable: true,
              minWidth: 120,
            },
            {
              prop: 'taskActName',
              label: '当前节点',
              sortable: true,
              minWidth: 120,
            },
            {
              prop: 'taskActUserName',
              label: '当前办理人',
              sortable: true,
              minWidth: 120,
            },
            {
              prop: 'status',
              columnKey: 'status',
              label: '流程状态',
              sortable: true,
              width: 90,
              filters: [{
                text: '审批中',
                value: 'Approving'
              }, {
                text: '驳回提单',
                value: 'ReRequest'
              }, {
                text: '审批完成',
                value: 'Finished'
              }, {
                text: '拒绝',
                value: 'Declined'
              }],
              formatter: (row, column, cellValue) => {
                switch (row.status) {
                  case 'Approving':
                    return '审批中';
                  case 'ReRequest':
                    return '驳回提单';
                  case 'Finished':
                    return '审批完成';
                  case 'Declined':
                    return '拒绝';
                  default:
                    return row.status;
                }
              },
            },
            // {
            //   prop: 'taskInfo',
            //   label: '任务信息',
            //   sortable: false,
            //   minWidth: 250,
            //   render: (h, params) => {
            //     let row = params.row;
            //     if (!row.tasklist) {
            //       return h('');
            //     }
            //     let wfTasks = row.tasklist;
            //     wfTasks.forEach(p=>{
            //       p.processInstStatus = row.status;
            //       p.processDefinationKey = row.processDefinationKey;
            //     })

            //     return h('wf-taskinfo', {
            //       props: {
            //         tasklist: wfTasks,
            //         disabled:true,
            //       }, // 组件的props
            //     })
            //   }
            // },
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
    doView(key, row) {
      let path = row.procInstViewUrl + '?id=' + row.businessId + '&procInstId=' + row.processInstId;
      //查看详情
      this.$router.push({
        path
      });
      return;
    },
    handleSelectionChange(val) {
      this.checkededRows = val;
    },
    doReset() {
      this.$refs.search.resetFields();
      this.doRefresh();
    },
    doExportExcel() {
      this.$refs.searchReulstList.exportCSV('已办列表');
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    }
  }
}
</script>
