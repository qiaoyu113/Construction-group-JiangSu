<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="详细信息" name="first">
        <router-view></router-view>
        <el-card shadow="never" v-if="type === 'approval'">
          <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="200px">
            <t-sub-title :title="'办理意见'"></t-sub-title>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item prop="suggestion" label="办理意见">
                  <t-input type="textarea" :rows="3" v-model="dataForm.suggestion"  :readOnly="type === 'CC'"></t-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="userRole.length > 0">
              <el-form-item label="下一节点办理人" prop="maritalStatusIdList" class="is-required">
                <el-col :span="8">
                  <t-dic-dropdown-select :data="userRole" placeholder="请选择审批角色" v-model="dataForm.userRole" :readOnly="true"></t-dic-dropdown-select>
                </el-col>
                <el-col :span="8">
                  <t-dic-dropdown-select :data="userList" placeholder="请选择审批人" v-model="dataForm.taskAssignee"></t-dic-dropdown-select>
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
        <el-button type="info" @click="">转交</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import findIndex from 'lodash/findIndex'
  import isEmpty from 'lodash/isEmpty'
  export default {
    data () {
      return {
        activeName: 'first',
        assetCategoryClassifications: ['pl_loanapplyInput'], // 附件的分类标识 此处为示例
        docId: '',
        component: '',
        processDefinationlist: [],
        type: 'approval',
        userList: [],
        userRole: [],
        dataForm: {
          time: '',
          suggestion: '',
          userRole: '',
          taskAssignee: ''
        },
        dataRule: {
          
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
                prop: 'customerCode',
                label: '项目名称',
                sortable: true,
                fixed: 'left',
                width: 120
              },
              {
                prop: 'customerCode',
                label: '业务类型',
                sortable: true,
                width: 120,
              },
              {
                prop: 'customerCode',
                label: '发起人',
                sortable: true,
                width: 120
              },
              {
                prop: 'customerCode',
                label: '发起时间',
                sortable: true,
                width: 120
              },
              {
                prop: 'customerCode',
                label: '流程节点',
                sortable: true,
                width: 120
              },
              {
                prop: 'customerCode',
                label: '办理人',
                sortable: true,
                width: 120
              },
              {
                prop: 'customerCode',
                label: '办理结果',
                sortable: true,
                width: 120
              },
              {
                prop: 'customerCode',
                label: '办理意见',
                sortable: true,
                width: 120
              },
              {
                prop: 'customerCode',
                label: '办理信息',
                sortable: true,
                width: 120
              },
              {
                prop: 'startDate',
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
        const currentQuery = this.$route.query
        this.$refs['ruleForm'].validate((valid) => {
          if(valid) {
            let model = {
              action: 'approve',
              docId: currentQuery.id,
              result: '审批通过',
              taskId: currentQuery.taskId,
              taskRemark: self.dataForm.suggestion,
              taskAssignee: self.dataForm.taskAssignee
            }
            tapp.services.wf_TaskAction.approve(model).then(function(result) {
              self.$notify.success({
                title: "操作成功！",
                message: "保存成功！",
              })
            })
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
      }
    }
  }
</script>
