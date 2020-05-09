<template>
<el-dialog :title="title" :close-on-click-modal="false" :visible.sync="visible" :append-to-body="true">
  <div>
    <div style="float:right;">
      <el-input style="width:150px" prefix-icon="el-icon-search" @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="手机号码" clearable></el-input>
    </div>

    <t-grid ref="searchReulstList" :options="gridOptions">
    </t-grid>
    <el-row :gutter="20" style="margin-top:15px">
      <el-col :span="24">
         已选用户
          <el-tag :key="tag.id" v-for="tag in selectedRows" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag.name}}
          </el-tag>
      </el-col>
    </el-row>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="medium"  type="primary" @click="onOK()">确定</el-button>
    <el-button size="medium"  @click="visible = false">取消</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      selectedRows: [],
      visible: false,
      title: null,
      gridOptions: {
        dataSource: {
          autoLoadData: false,
          serviceInstance: tapp.services.base_User.getRoleCategoryUsers,
          serviceInstanceInputParameters: {
            searchKey: null,
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
            }]
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
            order: 'descending'
          },
        }
      }
    }
  },
  components: {},
  watch: {},
  created() {

  },
  methods: {
        // 初始化
    init(roleCategoryId, roleId,initValues) {
      this.visible = true;
      this.selectedRows = [...initValues];
      this.$nextTick(() => {
        this.gridOptions.dataSource.serviceInstanceInputParameters.roleCategoryId = roleCategoryId;
        this.gridOptions.dataSource.serviceInstanceInputParameters.roleId = roleId;
        this.$refs.searchReulstList.refresh();
      })
    },

    doRefresh() {
      this.$refs.searchReulstList.refresh();
    },
    doSelect(key, row) {
      if (this.selectedRows.findIndex(p => p.id == row.id) < 0) {
        this.selectedRows.push({
          'id': row.id,
          'name': row.name ,
        })
      }
    },
    handleClose(tag) {
      this.selectedRows.splice(this.selectedRows.findIndex(t => t.id == tag.id), 1);
    },
    onChange(rows) {
      this.selectedRows = rows;
    },
    onOK() { 
      this.visible = false;
      this.$emit('select', this.selectedRows);
    },
    onClose() {
      this.visible = false;
    },
  }
}
</script>
