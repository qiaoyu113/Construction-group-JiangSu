<template>
<el-dialog :title="title" :close-on-click-modal="false" :visible.sync="visible"  :append-to-body="true">
  <el-button  type="primary" icon="el-icon-download" @click="doBatchExport()" :disabled="selectedRows.length <= 0">批量导出</el-button>
  <div class="mod-role">
    <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
    </t-grid>
  </div>
</el-dialog>
</template>

<script>
export default {
  data() {
    return {
      selectedRows: [],
      visible: false,
      templateUrl: null,
      templateCategoryId: null,
      title: null,
      gridOptions: {
        dataSource: {
          autoLoadData: false,
          serviceInstance: tapp.services.base_ExportTemplate.getList,
          serviceInstanceInputParameters: null,
        },
        grid: {    
          pageable: false,
          // mutiSelect: false,
          operates: {}, // 列操作按钮
          columns: [{
              prop: 'id',
              label: '打印/导出',
              sortable: false,
              width: 120,
              formatter: (row, column, cellValue) => {
                return "<a target='_blank' href='" + this.templateUrl + "&templateId=" + row.id + "'>导出</a>";
              }
            },
            {
              prop: 'name',
              label: '名称',
              sortable: true,
              formatter: (row, column, cellValue) => {
                return "<a target='_blank' href='" + this.templateUrl + "&templateId=" + row.id + "'>"+row.name+"</a>";
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

  },
  methods: {
    // 初始化
    init(templateUrl, templateCategoryId, title) {
      this.visible = true;
      this.templateUrl = templateUrl;
      this.templateCategoryId = templateCategoryId;
      this.title = title;

      this.$nextTick(() => {
        this.gridOptions.dataSource.serviceInstanceInputParameters = templateCategoryId;
        this.$refs.searchReulstList.refresh();
      })
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    doBatchExport() {
      let ids = this.selectedRows.map(function(row) {
        return row.id;
      });
      let url = this.templateUrl+ '&templateId=' + ids;
      window.open(url,"_blank");
    }
  }
}
</script>
