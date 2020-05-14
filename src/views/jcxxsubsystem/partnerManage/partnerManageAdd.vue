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
      <t-sub-title :title="'合作方基本信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bId" label="合作方名称:" >
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="统一社会信用代码：" label-width="180px">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="companyName" label="合作方地址">
            <el-input v-model="dataForm.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="creditCode" label="法人">
            <el-input v-model="dataForm.creditCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="principal" label="负责人">
            <el-input v-model="dataForm.principal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="contactNum" label="联系电话">
            <el-input v-model="dataForm.contactNum"></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'合作方主要工程业绩'"></t-sub-title>
        <t-sub-title :title="'合作方资产情况'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="fixedAssets" label="固定资产">
            <el-input v-model="dataForm.fixedAssets"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="fluidCapital" label="流动资金">
            <el-input v-model="dataForm.fluidCapital"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="chargeAccount" label="应收账款">
            <el-input v-model="dataForm.chargeAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="liabilities" label="负债">
            <el-input v-model="dataForm.liabilities"></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'合作方市场与拟合作项目情况'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="marketSituation" label="市场情况">
            <el-input v-model="dataForm.marketSituation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="projectSituation" label="合作项目情况">
            <el-input v-model="dataForm.projectSituation"></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'合作方主要管理人员情况'"></t-sub-title>
        <t-sub-title :title="' 合作方银行信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="bankName" label="开户行名称">
            <el-input v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankAccountName" label="银行帐户名称">
            <el-input v-model="dataForm.bankAccountName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankAccount" label="银行帐号">
            <el-input v-model="dataForm.bankAccount"></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="' 登记信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="sign" label="登记人">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="登记时间">
            <el-input v-model="dataForm.signTime"></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'附件上传'"></t-sub-title>
        <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                   :businessDocId="docId"></sj-upload>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          companyName: '',
          creditCode: '',
          companyAddress: '',
          legalPerson: '',
          principal: '',
          contactNum: '',
          fixedAssets: '',
          fluidCapital: '',
          chargeAccount: '',
          liabilities: '',
          marketSituation: '',
          projectSituation: '',
          bankName: '',
          bankAccountName: '',
          bankAccount: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          approvalStatus: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          bId: [
            {required: true, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: true, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          companyName: [
            {required: true, message: '合作方名称不能为空', trigger: 'blur'}
          ],
          creditCode: [
            {required: true, message: '统一社会信用代码不能为空', trigger: 'blur'}
          ],
          companyAddress: [
            {required: true, message: '合作方地址不能为空', trigger: 'blur'}
          ],
          legalPerson: [
            {required: true, message: '法人不能为空', trigger: 'blur'}
          ],
          principal: [
            {required: true, message: '负责人不能为空', trigger: 'blur'}
          ],
          contactNum: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'}
          ],
          fixedAssets: [
            {required: true, message: '固定资产-元不能为空', trigger: 'blur'}
          ],
          fluidCapital: [
            {required: true, message: '流动资金-元不能为空', trigger: 'blur'}
          ],
          chargeAccount: [
            {required: true, message: '应收账款-元不能为空', trigger: 'blur'}
          ],
          liabilities: [
            {required: true, message: '负债-元不能为空', trigger: 'blur'}
          ],
          marketSituation: [
            {required: true, message: '市场情况不能为空', trigger: 'blur'}
          ],
          projectSituation: [
            {required: true, message: '合作项目情况不能为空', trigger: 'blur'}
          ],
          bankName: [
            {required: true, message: '开户行名称不能为空', trigger: 'blur'}
          ],
          bankAccountName: [
            {required: true, message: '银行帐户名称不能为空', trigger: 'blur'}
          ],
          bankAccount: [
            {required: true, message: '银行帐号不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: true, message: '执行时间不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: true, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: true, message: '审核结果不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: true, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          createtime: [
            {required: true, message: '创建时间不能为空', trigger: 'blur'}
          ],
          updatetime: [
            {required: true, message: '更新时间不能为空', trigger: 'blur'}
          ],
          createuser: [
            {required: true, message: '创建人不能为空', trigger: 'blur'}
          ],
          updateuser: [
            {required: true, message: '更新人不能为空', trigger: 'blur'}
          ],
          datastatus: [
            {required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      // this.init()
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tBaseinfoPartnerApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tBaseinfoPartnerApproval.bId
                this.dataForm.actTaskKey = result.tBaseinfoPartnerApproval.actTaskKey
                this.dataForm.companyName = result.tBaseinfoPartnerApproval.companyName
                this.dataForm.creditCode = result.tBaseinfoPartnerApproval.creditCode
                this.dataForm.companyAddress = result.tBaseinfoPartnerApproval.companyAddress
                this.dataForm.legalPerson = result.tBaseinfoPartnerApproval.legalPerson
                this.dataForm.principal = result.tBaseinfoPartnerApproval.principal
                this.dataForm.contactNum = result.tBaseinfoPartnerApproval.contactNum
                this.dataForm.fixedAssets = result.tBaseinfoPartnerApproval.fixedAssets
                this.dataForm.fluidCapital = result.tBaseinfoPartnerApproval.fluidCapital
                this.dataForm.chargeAccount = result.tBaseinfoPartnerApproval.chargeAccount
                this.dataForm.liabilities = result.tBaseinfoPartnerApproval.liabilities
                this.dataForm.marketSituation = result.tBaseinfoPartnerApproval.marketSituation
                this.dataForm.projectSituation = result.tBaseinfoPartnerApproval.projectSituation
                this.dataForm.bankName = result.tBaseinfoPartnerApproval.bankName
                this.dataForm.bankAccountName = result.tBaseinfoPartnerApproval.bankAccountName
                this.dataForm.bankAccount = result.tBaseinfoPartnerApproval.bankAccount
                this.dataForm.sign = result.tBaseinfoPartnerApproval.sign
                this.dataForm.signTime = result.tBaseinfoPartnerApproval.signTime
                this.dataForm.propose = result.tBaseinfoPartnerApproval.propose
                this.dataForm.result = result.tBaseinfoPartnerApproval.result
                this.dataForm.approvalStatus = result.tBaseinfoPartnerApproval.approvalStatus
                this.dataForm.createtime = result.tBaseinfoPartnerApproval.createtime
                this.dataForm.updatetime = result.tBaseinfoPartnerApproval.updatetime
                this.dataForm.createuser = result.tBaseinfoPartnerApproval.createuser
                this.dataForm.updateuser = result.tBaseinfoPartnerApproval.updateuser
                this.dataForm.datastatus = result.tBaseinfoPartnerApproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          })
        }
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tBaseinfoPartnerApproval.save(model).then(function (result) {
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
