<template>
  <div class="handler-select">
    <t-input v-model="currentValue" :placeholder="placeholder" :disabled="true" :readOnly="readOnly">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="showDialog"></i>
    </t-input>
    <el-dialog center :visible.sync="dialogFormVisible" width='80%' @close="doReset()">
      <div class="dialog-title" slot="title">经办人选择</div>
      <el-row slot="footer">
        <el-button type="primary" @click="proChoose()">
          确定
        </el-button>
        <el-button type="info" @click="dialogFormVisible = false">
          取消
        </el-button>
      </el-row>
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="120px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名" prop="name" style="margin-bottom: 15px;">
              <t-input  v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" clearable></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="space-between" class="search-bottom-operate">
          <el-col :span="8">
            <el-form-item label="选择的用户" prop="selectedName" style="margin-bottom: 15px;">
              <t-input v-model="selectedUser.name" :readOnly="true" placeholder="还未选择用户"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 15px;">
              <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
              <el-button @click="doReset()" icon="el-icon-circle-close">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid ref="searchReulstList" :options="gridOptions" @cell-click="handleCellClick"></t-grid>
    </el-dialog>
  </div>
</template>

<script>
	import util from '@/util'
	import moment from 'moment'
	import baseView from '@/base/baseView'
  import emitter from 'element-ui/src/mixins/emitter';
	export default {
    extends: baseView,
    mixins: [emitter],
    props: {
      value: {
        type: String,
        default: '',
        required: false
      },
      placeholder: {
        type: String,
        default: '选择一个经办人',
        required: false
      },
      readOnly: {
        type: Boolean,
        default: false,
        required: false,
      }
    },
		data() {
			return {
				selectedUser: {
          name: ''
        },
        currentValue: '',
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.base_User.getRoleCategoryUsers,
            serviceInstanceInputParameters: {
              // roleCategoryId: '' // 此处需要放开并更换为经办人的值
            }
          },
          grid: {
            offsetHeight: 36, //36:查询部分高度
            mutiSelect: false,
            maxHeight: 350,
            columns: [
              // {
              //   prop: 'loginId',
              //   label: '登陆名',
              //   sortable: true,
              //   fixed: 'left',
              //   width: 100
              // },
              {
                prop: 'name',
                label: '姓名',
                sortable: true,
                fixed: 'left',
                width: 100
              },
              {
                prop: 'email',
                label: '邮箱',
                sortable: true,
                minWidth: 120
              },
              {
                prop: 'mobile',
                label: '电话',
                sortable: true,
                minWidth: 120
              },
              {
                prop: 'activited',
                columnKey: 'activited',
                label: '是否启用',
                width: 100,
                filters: [
                  { text: '是', value: 1 }, 
                  { text: '否', value: 0 }
                ],
                formatter: (row, column, cellValue) => {
                  return row.activited === 0 ? '否' : '是';
                },
                render: (h, params) => {
                  return h('el-tag', {
                    props: { type: params.row.activited === true ? 'success' : 'info' } // 组件的props
                  }, params.row.activited === true ? '是' : '否')
                }
              },
              {
                prop: 'lastLoginTime',
                label: '最后登陆时间',
                sortable: true,
                width: 170,
                formatter: (row, column, cellValue) => {
                  return this.$util.datetimeFormat(row.lastLoginTime);
                }
              },
              {
                prop: 'departmentNames',
                label: '所属门店',
                minWidth: 150,
                sortable: false,
              },

            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            },
          }
        },
				dialogFormVisible: false,
			}
		},
		components: {},
		created() {
      this.currentValue = this.value;
    },
    watch: {
      value(val) {
        this.currentValue = val
      }
    },
		methods: {
			clearValidate() {
				this.$nextTick((_) => {
					this.$refs.ruleForm.clearValidate()
				})
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      },
      doReset() {
        this.$refs.search.resetFields()
        this.selectedUser = { name: '' }
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh();
      },
      handleCellClick(row, value, cell, event) {
        this.selectedUser = row;
      },
			proChoose() {
        //传送到父组件
        this.currentValue = this.selectedUser.name;
        this.$emit('selectedUser', this.selectedUser);
        this.$emit('input', this.selectedUser.name);
        this.doReset();
        this.dialogFormVisible = false
      },
      showDialog() {
        if(this.readOnly) return;
        this.dialogFormVisible = true
      }
		}
	}
</script>

