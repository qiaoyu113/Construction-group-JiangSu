<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="success" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName">
            <el-input v-model="dataForm.proName" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司" prop="proSubCompany">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部" prop="proBusDept">
            <el-input v-model="dataForm.proBusDept" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位" prop="proConstructCompany">
            <el-input v-model="dataForm.proConstructCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式" prop="proContractAttr">
            <el-input v-model="dataForm.proContractAttr" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额" prop="proTotalInvestment">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别" prop="proType">
            <el-input v-model="dataForm.proType" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式" prop="proRunMode">
            <el-input v-model="dataForm.proRunMode" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模" prop="proBuildArea">
            <el-input v-model="dataForm.proBuildArea" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目章内容" prop="sealContent">
            <el-input v-model="dataForm.sealContent" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保管人" prop="sealCustodian">
            <el-input v-model="dataForm.sealCustodian" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20" v-if="false">-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经办人" prop="sign">
            <el-input v-model="dataForm.sign" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办时间" prop="signTime">
            <el-input v-model="dataForm.signTime" readOnly="true"></el-input>
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
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
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
          ],
          remark: [
            {required: true, message: '说明不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    created () {
      // this.init()
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
          })
        }
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.proSealApproval.save(model).then(function (result) {
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
