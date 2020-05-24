<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目刻章申请</div>
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
      <el-dialog title="确定提交本次审批" :visible.sync="submitDialogVisible">
        <!-- businessKey值请修改当前流程的key值 -->
        <el-form ref="dialogForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="pType" label="用印类型：" class="is-required">
                <!-- <t-dic-dropdown-select dict_type="" v-model=""></t-dic-dropdown-select> -->
                <t-input v-model="pType" :readOnly="readOnly"></t-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="sealCount" label="用印数量：" class="is-required">
                <t-input v-model="sealCount" :readOnly="readOnly"></t-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button type="info" @click="submitDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-row>
    <!-- dialogVisible控制显示和隐藏的变量，需要在data函数中定义 -->
    <el-dialog title="项目刻章流程图" :visible.sync="dialogVisible" width="60%" center>
      <!-- businessKey为当前流程的key值 -->
      <t-workflow-map businessKey="t_pro_seal_approval_process"></t-workflow-map>
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
          <el-form-item label="工程类别：">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：">
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
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目章内容：" prop="sealContent">
            <el-input v-model="dataForm.sealContent" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保管人：" prop="sealCustodian">
            <el-input v-model="dataForm.sealCustodian" readonly></el-input>
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
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :rows="2" v-model="dataForm.remark"></el-input>
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
  import {
    mapMutations,
    mapState,
  } from 'vuex'
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
        docId: '',
        dialogVisible: false,
        submitDialogVisible: false,
        pType: '',
        sealCount: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          sealContent: '',
          sealCustodian: '',
          remark: '',
          sign: '',
          signTime: '',
          approvalStatus: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          pId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          sealContent: [
            {required: true, message: '项目章内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.init()
    },
    computed: {
      navbarClasses() {
        let type = this.$store.state.ui.navbarLayoutType
        return [!/\S/.test(type) || type === 'default' ? '' : `site-navbar--${type}`]
      },
      ...mapState({
        path: state => state.route.path,
        user: state => state.app.user,
        notificationNum: state => state.ui.notificationNum,
        isLoading: state => state.ui.isLoading,
      }),
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            if (this.dataForm.id) {
              tapp.services.proSealApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.proSealApproval.bId
                this.dataForm.actTaskKey = result.proSealApproval.actTaskKey
                this.dataForm.pId = result.proSealApproval.pId
                this.dataForm.sealContent = result.proSealApproval.sealContent
                this.dataForm.sealCustodian = result.proSealApproval.sealCustodian
                this.dataForm.remark = result.proSealApproval.remark
                this.dataForm.sign = result.proSealApproval.sign
                this.dataForm.signTime = result.proSealApproval.signTime
                this.dataForm.approvalStatus = result.proSealApproval.approvalStatus
                this.dataForm.propose = result.proSealApproval.propose
                this.dataForm.result = result.proSealApproval.result
                this.dataForm.createtime = result.proSealApproval.createtime
                this.dataForm.updatetime = result.proSealApproval.updatetime
                this.dataForm.createuser = result.proSealApproval.createuser
                this.dataForm.updateuser = result.proSealApproval.updateuser
                this.dataForm.datastatus = result.proSealApproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate()
            this.dataForm.sign = this.user.userDisplayName;
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
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          this.submitDialogVisible = true;
          // let model = {...self.dataForm}
          // tapp.services.proSealApproval.save(model).then(function (result) {
          //   self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
          //   self.$notify.success({
          //     title: '操作成功！',
          //     message: '保存成功！',
          //   })
          // })
        }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '保存失败！'
          })
          return false
        })
      },
      submit()  {
        let self = this
        if(self.pType && self.sealCount) {
          let model = {...self.dataForm}
          tapp.services.proSealApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！',
            })
          })
          // 用印接口
          this.submitDialogVisible = false;
        } else {
          self.$notify.error({
            title: '错误',
            message: '请输入必填信息'
          })
        }
      },
    }
  }
</script>
