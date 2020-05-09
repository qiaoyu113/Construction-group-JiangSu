<template>
<el-dialog :title="'选择用户信息'" :close-on-click-modal="false" :visible.sync="visible" :modal="false">
  <div class="mod-role">
    <t-form :inline="true"  @submit.native.prevent @keyup.enter.native="doRefresh()">
      <el-form-item>
        <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="登陆名或者姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="doRefresh()">查询</el-button>
        <el-button  @click="doExportExcel()">导出</el-button>
      </el-form-item>
    </t-form>
    <t-grid ref="searchReulstList" :options="gridOptions">
    </t-grid>
  </div>
</el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      gridOptions: {
        dataSource: {
          autoLoadData: false,
          serviceInstance: tapp.services.base_User.getRoleCategoryUsers,
          serviceInstanceInputParameters: {
            searchKey: null,
            roleCategoryId: null,
            currDepartment: false,
            roleId: null,
          }
        },
        grid: {
          mutiSelect: false,
          operates: {
            width: 60,
            fixed: 'left',
            list: [{
              type: 'text',
              show: true,
              label: '选择',
              method: this.doSelect,
            }, ]
          }, // 列操作按钮
          columns: [{
              prop: 'loginId',
              label: '登陆名',
              sortable: true,
                fixed: 'left',
              width: 120
            },
            {
              prop: 'name',
              label: '姓名',
                fixed: 'left',
              sortable: true,
              width: 120
            },
            {
              prop: 'mobile',
              label: '电话',
              sortable: true,
              minWidth: 120
            },
          ], // 需要展示的列
          defaultSort: {
            prop: 'id',
            order: 'ascending'
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
    init(roleCategoryId, roleId) {
      this.visible = true;

      this.$nextTick(() => {
        this.gridOptions.dataSource.serviceInstanceInputParameters.roleCategoryId = roleCategoryId;
        this.gridOptions.dataSource.serviceInstanceInputParameters.roleId = roleId;
        this.$refs.searchReulstList.refresh();
      })
    },
    doSelect(key, row) {
      this.visible = false;
      this.$emit('select', row);
    },
    doExportExcel() {
      this.$refs.searchReulstList.exportCSV('用户列表');
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    }
  }
}
</script>
