<template>
<div class="mod-role"> 
  <div style="float:left;">
    
      <el-button  icon="el-icon-plus" type="primary" @click="doNew()">新增</el-button>
      <el-button  icon="el-icon-delete" type="danger" @click="doBatchDelete()" :disabled="selectedRows.length <= 0">批量删除</el-button>
      <el-button  icon="el-icon-download" @click="doExportExcel()">导出</el-button>
  </div>
      <div style="float:right;">
      <el-form :inline="true" @submit.native.prevent @keyup.enter.native="doRefresh">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-search"
            v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey"
            placeholder="模型名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="doRefresh()" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div> 

  <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
  </t-grid>
  <!-- 弹窗, 新增 / 修改 -->
  <edit-form v-if="editFormVisible" ref="editForm" @change="doRefresh"></edit-form>
  <design-form v-if="designFormVisible" ref="designForm"></design-form>
  <code-view-form v-if="codeViewFormVisible" ref="codeViewForm"></code-view-form>
  <upload-form v-if="uploadFormVisible" ref="uploadForm"></upload-form>
</div>
</template>

<script>
import EditForm from './edit'
import DesignForm from './design'
import CodeViewForm from './codeView'
import UploadForm from  './upload'

import baseView from '@/base/baseView'
export default {
  extends:baseView,
  data() {
    return {
      category: this.$route.query.c,
      editFormVisible: false,
      designFormVisible: false,
      codeViewFormVisible: false,
      uploadFormVisible: false,
      selectedRows: [],
      gridOptions: {
        dataSource: {
          serviceInstance: tapp.services.wf_Model.list,
          serviceInstanceInputParameters: {
            searchKey: null,
            categoryId: this.$route.query.c
          }
        },
        grid: {   offsetHeight: 36, //36:查询部分高度
          operates: {
            width: 200,
            fixed: 'left',
            list: [{
                type: 'text',
                show: true,
                label: '查看',
                method: this.doEdit,
              },
              {
                type: 'text',
                show: true,
                label: '复制',
                method: this.doCopy,
              },
              {
                type: 'text',
                show: true,
                label: '设计',
                method: this.doDesign,
              },
              {
                type: 'text',
                show: true,
                label: '部署',
                method: this.doDeploy,
              },
              {
                type: 'text',
                show: true,
                label: '代码',
                method: this.doViewCode,
              },
              {
                type: 'text',
                show: true,
                label: '下载',
                method: this.doDownload,
              },
              {
                type: 'text',
                show: true,
                label: '上传',
                method: this.doUpload,
              },
            ]
          }, // 列操作按钮
          columns: [{
              prop: 'key',
              label: '模型标识',
              sortable: true,
                fixed: 'left',
              width: 250
            },
            {
              prop: 'name',
              label: '模型名称',
              sortable: true,
              fixed: 'left',
              minWidth:250,

            },
            {
              prop: 'createTime',
              label: '创建时间',
              sortable: true,
              width: 160,
              formatter: (row, column, cellValue) => {
                return this.$util.datetimeFormat(row.createTime);
              }
            },
            {
              prop: 'lastUpdateTime',
              label: '最后更新时间',
              sortable: true,
              width: 160,
              formatter: (row, column, cellValue) => {
                return this.$util.datetimeFormat(row.lastUpdateTime);
              }
            },
          ], // 需要展示的列
          defaultSort: {
            prop: 'lastUpdateTime',
            order: 'descending'
          },
        }
      }
    }
  },
  components: {
    EditForm,
    DesignForm,
    CodeViewForm,
    UploadForm
  },
  created() {

  },
  methods: {
    doNew() {
      this.editFormVisible = true
      this.$nextTick(() => {
        this.$refs.editForm.init(this.category,null)
      })
    },
    doEdit(key, row) {
      this.editFormVisible = true
      this.$nextTick(() => {
        this.$refs.editForm.init(this.category,row.id)
      })
    },
    doCopy(key, row) {
      let self = this;
      tapp.services.wf_Model.copy(row.id).then(function(result) {
        self.$notify.success({
          title: '操作成功',
          message: '模型已复制成功！'
        });
        self.$refs.searchReulstList.refresh();
      })
    },
    doDesign(key, row) {
      this.designFormVisible = true
      this.$nextTick(() => {
        this.$refs.designForm.init(row.id)
      })
    },
    doViewCode(key, row) {
      this.codeViewFormVisible = true
      this.$nextTick(() => {

        this.$refs.codeViewForm.init(row.key)
      })
    },
    doDownload(key, row) {
      this.$util.download(row.key + '.bpmn20.xml', '/authapi/wf_Model/downDeployFile?id=' + row.id, {});
    },
    doUpload(key, row) {
      this.uploadFormVisible = true
      this.$nextTick(() => {
        this.$refs.uploadForm.init(row.id)
      })
    },
    doDeploy(key, row) {
      let self = this;
      tapp.services.wf_Model.deploy(row.id).then(function(result) {
        self.$notify.success({
          title: '操作成功',
          message: '模型已部署成功！'
        });
      })
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },

    doBatchDelete() {
      let self = this;
      if (!self.selectedRows || self.selectedRows.length == 0) {
        self.$notify.info({
          title: '系统提示',
          message: '您没选择任何行，无法操作！'
        });
        return;
      }
      let ids = self.selectedRows.map(function(row) {
        return row.id;
      });
      self.$confirm('此操作将永久删除' + ids.length + '个模型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tapp.services.wf_Model.delete(ids).then(function(result) {
          self.$notify.success({
            title: '操作成功',
            message: '模型已删除成功！'
          });
          self.$refs.searchReulstList.refresh();
        })
      });
    },
    doExportExcel() {
      this.$refs.searchReulstList.exportCSV('模型列表');
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    }
  }
}
</script>
