<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">密钥领用申请</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">提交审批</el-button>
      <el-button type="primary" plain @click="dialogVisible = true">
                    <span style="display: flex;align-items:center;">
                      <v-icon name="sitemap"></v-icon>
                      <span style="margin-left: 5px;">审批流程图</span>
                    </span>
      </el-button>
    </el-row>
    <!-- dialogVisible控制显示和隐藏的变量，需要在data函数中定义 -->
    <el-dialog title="密钥领用流程图" :visible.sync="dialogVisible" width="60%" center>
      <!-- businessKey为当前流程的key值 -->
      <t-workflow-map businessKey="t_qs_key_approval_process"></t-workflow-map>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
    </el-dialog>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：" prop="pId">
            <t-project-select  placeholder="选择一个项目" v-model="dataForm.pId" @selectedProject="getSelectedProject"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司：" prop="proSubCompany">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部：" prop="proBusDept">
            <el-input v-model="dataForm.proBusDept" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位：" prop="proConstructCompany">
            <el-input v-model="dataForm.proConstructCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式：" prop="proContractAttr">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额：" prop="proTotalInvestment">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：" prop="proType">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：" prop="proRunMode">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模：" prop="proBuildArea">
            <el-input v-model="dataForm.proBuildArea" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'密钥信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="keyName" label="密钥名称：">
            <el-input v-model="dataForm.keyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="keyAccount" label="密钥账户：">
            <el-input v-model="dataForm.keyAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="keyPwd" label="密码：">
            <el-input v-model="dataForm.keyPwd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="lyDept" label="领用单位：">
            <el-input v-model="dataForm.lyDept"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="领用时间：" prop="getTime" verify class="is-required">
            <t-datetime-picker v-model="dataForm.getTime" type="date" :readOnly="readOnly">
            </t-datetime-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经办人：" prop="sign">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办时间：" prop="signTime">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  import { mapState } from 'vuex'
  export default {
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      },
    },
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        dialogVisible: false,
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          keyName: '',
          keyAccount: '',
          keyPwd: '',
          getTime: '',
          sign: '',
          signTime: '',
          approvalStatus: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          flag: '1',
          pName: '',
          conTotal: '',
          conBcxyTotal: ''
        },
        dataRule: {
          pId: [
            {required: true, message: '项目不能为空', trigger: 'change'}
          ],
          keyName: [
            {required: true, message: '密钥名称不能为空', trigger: 'blur'}
          ],
          keyAccount: [
            {required: true, message: '密钥账户不能为空', trigger: 'blur'}
          ],
          keyPwd: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          proName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            if (this.dataForm.id) {
              tapp.services.qsKeyApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.qsKeyApproval.bId
                this.dataForm.actTaskKey = result.qsKeyApproval.actTaskKey
                this.dataForm.pId = result.qsKeyApproval.pId
                this.dataForm.keyName = result.qsKeyApproval.keyName
                this.dataForm.keyAccount = result.qsKeyApproval.keyAccount
                this.dataForm.keyPwd = result.qsKeyApproval.keyPwd
                this.dataForm.getTime = result.qsKeyApproval.getTime
                this.dataForm.sign = result.qsKeyApproval.sign
                this.dataForm.signTime = result.qsKeyApproval.signTime
                this.dataForm.approvalStatus = result.qsKeyApproval.approvalStatus
                this.dataForm.propose = result.qsKeyApproval.propose
                this.dataForm.result = result.qsKeyApproval.result
                this.dataForm.createtime = result.qsKeyApproval.createtime
                this.dataForm.updatetime = result.qsKeyApproval.updatetime
                this.dataForm.createuser = result.qsKeyApproval.createuser
                this.dataForm.updateuser = result.qsKeyApproval.updateuser
                this.dataForm.datastatus = result.qsKeyApproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate()
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
          })
        }
      },
      getSelectedProject(project) {
        console.log('current project', project);
        this.dataForm.proSubCompany = project.proSubCompany;
        this.dataForm.proBusDept = project.proBusDept;
        this.dataForm.proConstructCompany = project.proConstructCompany;
        this.dataForm.proContractAttr = project.proContractAttr;
        this.dataForm.proTotalInvestment = project.proTotalInvestment;
        this.dataForm.proType = project.proType;
        this.dataForm.proRunMode = project.proRunMode;
        this.dataForm.proBuildArea = project.proBuildArea;
        this.dataForm.pName = project.proName;
        this.dataForm.conTotal = project.conTotal;
        this.dataForm.conBcxyTotal = project.conBcxyTotal;
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.qsKeyApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！',
            })
          })
        }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '保存失败！'
          })
          return false
        })
      }
    }
  }
</script>
