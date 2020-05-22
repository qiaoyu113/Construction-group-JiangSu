<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">投标授权申请</div>
      </el-col>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称：" prop="proName">
              <t-project-select placeholder="选择一个项目" v-model="dataForm.projectId" @selectedProject="getSelectedProject"></t-project-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属分公司：">
              <el-input readonly v-model="dataForm.proSubCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="所属事业部：">
              <el-input readonly v-model="dataForm.proBusDept"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位：">
              <el-input readonly v-model="dataForm.proConstructCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同模式：" prop="proContractAttr">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="投资金额：">
              <el-input readonly v-model="dataForm.proTotalInvestment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类别：" prop="proType">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营方式：" prop="proRunMode">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildArea" label="计划项目规模：">
              <el-input readonly v-model="dataForm.proBuildArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="24">
          <el-col :span="16">
            <el-form-item prop="useScenes" label="授权用途：">
              <t-dic-radio-select dicType="grant_use_type" v-model="dataForm.useScenes" class="el-radio-group-vertical"></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授权人:" prop="grantUser">
              <el-input readonly v-model="dataForm.grantUser"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="授权内容：" prop="grantContent">
              <el-input type="textarea" :rows="2" v-model="dataForm.grantContent"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="登记人">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="sign" label="登记时间">
              <span>{{dataForm.signTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
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
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          proName: '',
          useScenes: '',
          grantContent: ''
        },
        dataRule: {
          proName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          useScenes: [
            {required: true, message: '授权用途不能为空', trigger: 'blur'}
          ],
          grantContent: [
            {required: true, message: '授权内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
       this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tGrantAuthbidApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tGrantAuthbidApproval.bId
                this.dataForm.actTaskKey = result.tGrantAuthbidApproval.actTaskKey
                this.dataForm.pcId = result.tGrantAuthbidApproval.pcId
                this.dataForm.useScenes = result.tGrantAuthbidApproval.useScenes
                this.dataForm.grantUser = result.tGrantAuthbidApproval.grantUser
                this.dataForm.grantContent = result.tGrantAuthbidApproval.grantContent
                this.dataForm.remark = result.tGrantAuthbidApproval.remark
                this.dataForm.sign = result.tGrantAuthbidApproval.sign
                this.dataForm.signTime = result.tGrantAuthbidApproval.signTime
                this.dataForm.propose = result.tGrantAuthbidApproval.propose
                this.dataForm.result = result.tGrantAuthbidApproval.result
                this.dataForm.approvalStatus = result.tGrantAuthbidApproval.approvalStatus
                this.dataForm.createtime = result.tGrantAuthbidApproval.createtime
                this.dataForm.updatetime = result.tGrantAuthbidApproval.updatetime
                this.dataForm.createuser = result.tGrantAuthbidApproval.createuser
                this.dataForm.updateuser = result.tGrantAuthbidApproval.updateuser
                this.dataForm.datastatus = result.tGrantAuthbidApproval.datastatus
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
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tGrantAuthbidApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: "操作成功！",
              message: "保存成功！",
            });
          });
        }).catch(function (e) {
          self.$notify.error({
            title: "错误",
            message: "保存失败！"
          });
          return false;
        });
      }
    }
  }
</script>
