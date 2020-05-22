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
            <el-input disabled v-model="dataForm.proSubCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBusDept" label="所属事业部：">
            <el-input disabled v-model="dataForm.proBusDept"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proConstructCompany" label="建设单位：">
            <el-input disabled v-model="dataForm.proConstructCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式：" prop="proContractAttr">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proTotalInvestment" label="投资金额：">
            <el-input disabled v-model="dataForm.proTotalInvestment"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：" prop="proType">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：" prop="proRunMode">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBuildArea" label="项目规模：">
            <el-input disabled v-model="dataForm.proBuildArea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人：">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办时间：">
              <span>{{dataForm.signTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="说明：" prop="remark">
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
          proSubCompany: '',
          proBusDept: '',
          proConstructCompany: '',
          proContractAttr: '',
          proTotalInvestment: '',
          proType: '',
          proRunMode: '',
          proBuildArea: '',
          sign: '',
          signTime: '',
          remark: ''
        },
        dataRule: {
          proName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,
      })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tQsSdfileApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tQsSdfileApproval.bId
                this.dataForm.actTaskKey = result.tQsSdfileApproval.actTaskKey
                this.dataForm.pId = result.tQsSdfileApproval.pId
                this.dataForm.remark = result.tQsSdfileApproval.remark
                this.dataForm.sign = result.tQsSdfileApproval.sign
                this.dataForm.signTime = result.tQsSdfileApproval.signTime
                this.dataForm.approvalStatus = result.tQsSdfileApproval.approvalStatus
                this.dataForm.propose = result.tQsSdfileApproval.propose
                this.dataForm.result = result.tQsSdfileApproval.result
                this.dataForm.createtime = result.tQsSdfileApproval.createtime
                this.dataForm.updatetime = result.tQsSdfileApproval.updatetime
                this.dataForm.createuser = result.tQsSdfileApproval.createuser
                this.dataForm.updateuser = result.tQsSdfileApproval.updateuser
                this.dataForm.datastatus = result.tQsSdfileApproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate()
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
        this.dataForm.proName = project.proName;
      },
      // 表单提交
      doSave() {
        let self = this;
        console.log(self.dataForm)
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tQsSdfileApproval.save(model).then(function (result) {
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
