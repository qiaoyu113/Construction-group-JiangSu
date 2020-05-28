<template>
  <div class="task-detail">
    <el-tabs v-model="activeName">
      <el-tab-pane label="详细信息" name="first">
        <router-view></router-view>
        <el-card shadow="never" v-if="type === 'approval'">
          <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="150px">
            <t-sub-title :title="'办理意见'"></t-sub-title>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item prop="suggestion" label="办理意见">
                  <t-input type="textarea" :rows="3" v-model="dataForm.suggestion"  :readOnly="type === 'CC'"></t-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="userRole.length > 0">
              <el-form-item label="下一节点办理人" prop="maritalStatusIdList" class="is-required" :rules="dataRule.taskAssignee">
                <el-col :span="8">
                  <t-dic-dropdown-select :data="userRole" placeholder="请选择审批角色" v-model="dataForm.userRole" :readOnly="true"></t-dic-dropdown-select>
                </el-col>
                <el-col :span="8">
                  <t-dic-dropdown-select :data="userList" placeholder="请选择审批人" :multiple="true" v-model="dataForm.taskAssignee"></t-dic-dropdown-select>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="流程办理信息" name="second">
        <el-card shadow="never">
          <t-sub-title :title="'流程图'"></t-sub-title>
          <t-workflow-map :businessKey="$route.query.processDefinationKey"></t-workflow-map>
          <t-sub-title :title="'流程办理信息'"></t-sub-title>
          <t-grid ref="searchReulstList" :options="gridOptions"></t-grid>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-row v-if="type === 'approval'" :gutter="10" class="search-top-operate">
      <div class="t-form-footer">
        <el-button type="primary" @click="doApprove()">同意</el-button>
        <el-button type="danger" @click="doGoOriginator()">退回</el-button>
        <el-button type="danger" @click="doDecline()">拒绝</el-button>
        <el-button type="info" @click="dialogFormVisible = true">转交</el-button>
      </div>
    </el-row>
    <el-dialog title="转交人选择" :visible.sync="dialogFormVisible" width='80%' center @close="doReset()">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="120px" :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="10" class="search-top-operate">
          <el-button type="primary" @click="doRedirect()">
            确定
          </el-button>
          <el-button type="info" @click="dialogFormVisible = false">
            取消
          </el-button>
        </el-row>
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
      <t-grid ref="searchReulstList" :options="usersOptions" @cell-click="handleCellClick"></t-grid>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import findIndex from 'lodash/findIndex'
  import isEmpty from 'lodash/isEmpty'
  export default {
    data () {
      var checkTaskAssignee = (rule, value, callback) => {
        if (!this.dataForm.taskAssignee || this.dataForm.taskAssignee.length == 0 || this.dataForm.taskAssignee == '') callback(new Error('请选择下一节点审批人'));
        else callback();
      };
      return {
        activeName: 'first',
        assetCategoryClassifications: ['pl_loanapplyInput'], // 附件的分类标识 此处为示例
        docId: '',
        component: '',
        processDefinationlist: [],
        type: 'approval',
        userList: [],
        userRole: [],
        dialogFormVisible: false,
        dataForm: {
          time: '',
          suggestion: '',
          userRole: '',
          taskAssignee: ''
        },
        dataRule: {
          taskAssignee: [{validator: checkTaskAssignee, trigger: 'blur'}]
        },
        selectedUser: {
          name: ''
        },
        usersOptions: {
          dataSource: {
            serviceInstance: tapp.services.base_User.getAllUsers,
            serviceInstanceInputParameters: {
              searchKey: null, 
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
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.wF_ProcessInst.getTrackingList,
            serviceInstanceInputParameters: {
              searchKey: null
            }
          },
          grid: {
            offsetHeight: 36, // 36:查询部分高度
            mutiSelect: false,
            columns: [
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true,
                fixed: 'left',
                width: 120
              },
              {
                prop: 'processDefinationName',
                label: '业务类型',
                sortable: true,
                width: 120,
              },
              {
                prop: 'origiatorName',
                label: '发起人',
                sortable: true,
                width: 120
              },
              {
                prop: 'startDate',
                label: '发起时间',
                sortable: true,
                width: 120
              },
              {
                prop: 'taskActName',
                label: '流程节点',
                sortable: true,
                width: 120
              },
              {
                prop: 'taskActUserName',
                label: '办理人',
                sortable: true,
                width: 120
              },
              {
                prop: 'taskResult',
                label: '办理结果',
                sortable: true,
                width: 120
              },
              {
                prop: 'taskRemark',
                label: '办理意见',
                sortable: true,
                width: 120
              },
              {
                prop: 'taskEndDate',
                label: '办理信息',
                sortable: true,
                width: 120
              },
              {
                prop: 'taskEndDate',
                label: '办理时间',
                sortable: true,
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.startDate, 'YYYY-MM-DD HH:mm:ss');
                }
              },
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            }
          }
        }
      }
    },
    created() {
      // this.init()
    },
    mounted() {
      // console.log('this.$route111', this.$route)
      const currentQuery = this.$route.query
      this.type = currentQuery.type ? currentQuery.type : this.type;
      this.init('', currentQuery.processDefinationKey, currentQuery.taskActId, currentQuery.taskId);
    },
    activated() {
      // console.log('this.$route222', this.$route)
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id, key, actId, taskId) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              // tapp.services.tBaseinfoKeyApproval.get(id).then(function(result) {
              //   self.$util.deepObjectAssign({}, self.dataForm, result)
              // })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          })
        }
        if(taskId) {
          this.$nextTick(() => {
            let self = this;
            tapp.services.wf_TaskAction.getTaskAssignee(taskId).then(function(result) {
              if(!result || (result && result.length === 0)) return;
              else {
                let userList = result[0].userList
                let userRole = result[0].userRole
                userList.map(item => {
                  self.userList.push({value: item.key, label: item.value})
                })
                if(!isEmpty(userRole)) {
                  self.userRole.push({value: userRole.key, label: userRole.value})
                  self.dataForm.userRole = userRole.key;
                } else {
                  self.userRole = []
                }
              }
            })
          })
        }
        // this.loadProcessDefList();
      },
      loadProcessDefList() {
        let self = this;
        tapp.services.wf_Model.getMadelList().then(function(result) {
          self.processDefinationlist = result;
        })
      },
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
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [];
        Promise.all(validPromises).then(resultList => {
          tapp.services.tBaseinfoKeyApproval.save(model).then(function(result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: "操作成功！",
              message: "保存成功！",
            });
          });
        }).catch(function(e) {
          self.$notify.error({
            title: "错误",
            message: "保存失败！"
          });
          return false;
        });
      },

      doApprove() {
        let self = this;
        let validPromises = [];
        const currentQuery = self.$route.query
        self.$refs['ruleForm'].validate((valid) => {
          if(valid) {
            if(self.$route.query.status && (self.$route.query.status == 1 || self.$route.query.status == 2)) {
              self.$confirm('是否已填写完回填信息且保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let model = {
                  action: 'approve',
                  docId: currentQuery.id,
                  result: '审批通过',
                  taskId: currentQuery.taskId,
                  taskRemark: self.dataForm.suggestion,
                  multiTaskAssignee: self.dataForm.taskAssignee
                }
                if(self.dataForm.taskAssignee || self.dataForm.taskAssignee.length == 0) delete model.multiTaskAssignee;
                tapp.services.wf_TaskAction.approve(model).then(function(result) {
                  self.$notify.success({
                    title: "操作成功！",
                    message: "保存成功！",
                  })
                })
              })
            } else {
              let model = {
                action: 'approve',
                docId: currentQuery.id,
                result: '审批通过',
                taskId: currentQuery.taskId,
                taskRemark: self.dataForm.suggestion,
                multiTaskAssignee: self.dataForm.taskAssignee
              }
              if(self.dataForm.taskAssignee || self.dataForm.taskAssignee.length == 0) delete model.multiTaskAssignee;
              tapp.services.wf_TaskAction.approve(model).then(function(result) {
                self.$notify.success({
                  title: "操作成功！",
                  message: "保存成功！",
                })
              })
            }
          } else {
            self.$notify.error({
              title: "错误",
              message: "保存失败！"
            });
          }
        });
      },

      doGoOriginator() {
        let self = this;
        const currentQuery = this.$route.query
        self.$confirm('确认要驳回提单人?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let model = {
            taskId: currentQuery.taskId,
            action: 'request',
            taskRemark: self.dataForm.suggestion,
            docId: currentQuery.id,
            result: '驳回提单人'
          };
          tapp.services.wf_TaskAction.gotoOriginator(model).then(function(result) {
            self.formResult = 1;
            self.$notify.success({
              title: '系统驳回提单人成功',
              message: '驳回提单人成功！'
            });
          })
        });
      },
      doDecline() {
        let self = this;
        const currentQuery = this.$route.query
        self.$confirm('此操作将拒绝该审批, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let model = {
            taskId: currentQuery.taskId,
            action: 'decline',
            docId: currentQuery.id,
            result: '拒绝',
            taskRemark: self.dataForm.suggestion,
          };
          tapp.services.wf_TaskAction.decline(model).then(function(result) {
            self.formResult = 1;
            self.$notify.success({
              title: '系统拒绝成功',
              message: '拒绝成功！'
            });
          })
        });
      },
      doRedirect() {
        let self = this;
        const currentQuery = this.$route.query
        self.$confirm('此操作将转交该审批, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let model = {
            taskId: currentQuery.taskId,
            taskRemark: self.dataForm.suggestion,
            taskAssignee: this.selectedUser.id
          };
          tapp.services.wf_TaskAction.redirect(model).then(function(result) {
            self.formResult = 1;
            self.$notify.success({
              title: '系统转交成功',
              message: '转交成功！'
            });
          })
        });
        
      }
    }
  }
</script>
