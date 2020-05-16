<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="详细信息" name="first">
        <router-view></router-view>
        <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="200px">
          <t-sub-title :title="'办理后回填信息'"></t-sub-title>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="time" label="开户时间">
                <t-input v-model="dataForm.time"></t-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="time" label="开户名称">
                <t-input v-model="dataForm.time"></t-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="time" label="开户网点">
                <t-input v-model="dataForm.time"></t-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="time" label="银行账号">
                <t-input v-model="dataForm.time"></t-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="time" label="银行账号名称">
                <t-input v-model="dataForm.time"></t-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item prop="time" label="附件信息" class="upload-container">
                <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <t-sub-title :title="'办理意见'"></t-sub-title>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item prop="suggestion" label="办理意见">
                <t-input type="textarea" :rows="3" v-model="dataForm.suggestion"></t-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-form-item label="下一节点办理人" prop="maritalStatusIdList" class="is-required">
              <el-col :span="8">
                <t-dic-dropdown-select dicType="public_maritalstatus" :multiple="true" v-model="dataForm.maritalStatusIdList"></t-dic-dropdown-select>
              </el-col>
              <el-col :span="8">
                <t-dic-dropdown-select dicType="public_maritalstatus" :multiple="true" v-model="dataForm.maritalStatusIdList"></t-dic-dropdown-select>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="流程办理信息" name="second">
        <t-sub-title :title="'流程图'"></t-sub-title>
        <div style="width: 100%;height: 200px;">
          流程图
        </div>
        <t-sub-title :title="'流程办理信息'"></t-sub-title>
        <t-grid ref="searchReulstList" :options="gridOptions"></t-grid>
      </el-tab-pane>
    </el-tabs>
    <el-row :gutter="10" class="search-top-operate">
      <div class="t-form-footer">
        <el-button type="primary" @click="doApprove()">提交</el-button>
        <el-button type="danger" @click="doGoOriginator()">驳回</el-button>
        <el-button type="danger" @click="doDecline()">拒绝</el-button>
        <el-button type="info" @click="">转交</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import findIndex from 'lodash/findIndex'
  export default {
    data () {
      return {
        activeName: 'first',
        assetCategoryClassifications: ['pl_loanapplyInput'], // 附件的分类标识 此处为示例
        docId: '',
        component: '',
        processDefinationlist: [],
        dataForm: {
          time: '',
          suggestion: '',
          maritalStatusIdList: ''
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
                formatter: (row, column, cellValue) => {
                  return "<a target='_blank' href='" + window.SITE_CONFIG['serverUrl'] + '/pmtapi/base_AssetManagement/view?id=' + row.id + "'>" + row.name + '</a>'
                }
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
      console.log('this.$route111', this.$route)
      this.init('', this.$route.query.processDefinationKey, this.$route.query.taskActId);
    },
    activated() {
      console.log('this.$route111', this.$route)
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id, key, actId) {
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
        if(key) {
          this.$nextTick(() => {
            tapp.services.wf_Model.getProcessActivities(key).then(function(result) {
              console.log('result', result)
            })
          })
        }
        if(actId) {
          // this.$nextTick(() => {
          //   tapp.services.wf_Model.getProcessActivities(key).then(function(result) {
          //     console.log('result', result)
          //   })
          // })
        }
        this.loadProcessDefList();
      },
      loadProcessDefList() {
        let self = this;
        tapp.services.wf_Model.getMadelList().then(function(result) {
          console.log('processDefinationlist',result);
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
              taskRemark: '同意'
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
            taskRemark: '同意',
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
            result: '拒绝'
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
