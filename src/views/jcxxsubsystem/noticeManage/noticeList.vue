<template>
  <div class="mod-role">
    <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
      <el-row :gutter="10" class="search-top-operate">
        <el-button icon="el-icon-download" type="success" @click="doExportExcel()">
          <i class="fa fa-lg fa-level-down"></i>导出
        </el-button>
      </el-row>
      <t-sub-title :title="'公告列表'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="公告类型">
            <el-select placeholder="请选择"
                       v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
              <el-option v-for="(item, index) in processDefinationlist" :key='item.key' :label="item.name"
                         :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-col :span="20">
            <el-form-item prop="noticeTitle" label="公告标题">
              <el-input v-model="gridOptions.dataSource.noticeTitle" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item prop="noticeContent" label="公告内容">
              <el-input v-model="gridOptions.dataSource.noticeContent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item prop="updateuser" label="发布人">
              <el-input v-model="gridOptions.dataSource.updateuser"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="有效期">
            <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
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
    data() {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            noticeTitle: '',
            noticeContent: '',
            updateuser: '',
            serviceInstance: tapp.services.tBaseinfoNotice.getPagedList,
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
                prop: 'noticeTitle',
                label: '公告标题',
                sortable: false
              },
              {
                prop: 'noticeContent',
                label: '公告内容',
                sortable: false
              },
              {
                prop: 'noticeType',
                label: '公告类型',
                sortable: false
              },
              {
                prop: 'fromDept',
                label: '发布部门',
                sortable: false
              },
              {
                prop: 'remark',
                label: '是否置顶',
                sortable: false
              },
              {
                prop: 'timeLimit',
                label: '有效期',
                sortable: false
              },

              {
                prop: 'updateuser',
                label: '发布人',
                sortable: false
              },
              {
                prop: 'createtime',
                label: '发布时间',
                sortable: false,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.createtime, 'YYYY-MM-DD');
                }
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

