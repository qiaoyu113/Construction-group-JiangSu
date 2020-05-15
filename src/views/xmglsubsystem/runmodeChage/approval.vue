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
          <el-form-item label="项目规模" prop="proBuildArea">
            <el-input v-model="dataForm.proBuildArea" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目经理" prop="proRunMode">
            <el-input v-model="dataForm.proManager" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'变更前经营方式'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item prop="proRunMode" label="经营方式">
            <el-input v-model="dataForm.proRunMode" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="自营" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="联营" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="净利润承诺超" prop="proProfitRate" verify class="is-required">
            <t-int-input v-model="dataForm.proProfitRate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompanyContacterO" label="公司负责人">
            <el-input v-model="dataForm.proUnionCompanyContacterO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proContacter" label="有无借款">
            <el-input v-model="dataForm.proContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proContacter" label="借还款信息">
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联营单位名称" prop="proUnionCompany">
            <el-input v-model="dataForm.proUnionCompany" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContacter" label="联系人">
            <el-input v-model="dataForm.proContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContactway" label="联系方式">
            <el-input v-model="dataForm.proContactway"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conPorjectFund" label="待确认工程款">
            <el-input v-model="dataForm.conPorjectFund"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conDepositO" label="合同履约保证金">
            <el-input v-model="dataForm.conDepositO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="conDepositO" label="详细">
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="conDepositO" label="管理费">
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="最终结算工程款" prop="conPorjectFund">
            <el-input v-model="dataForm.conPorjectFund"></el-input>
          </el-form-item>
        </el-col>
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
          <el-form-item label="说明" prop="remark">
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
          prcId: '',
          pId: '',
          conPorjectFund: '',
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
          conPorjectFund: [
            {required: true, message: '最终结算工程款不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '说明不能为空', trigger: 'blur'}
          ],
          datastatus: [
            {required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur'}
          ]
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
              tapp.services.proFundClearApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.proFundClearApproval.bId
                this.dataForm.actTaskKey = result.proFundClearApproval.actTaskKey
                this.dataForm.prcId = result.proFundClearApproval.prcId
                this.dataForm.pId = result.proFundClearApproval.pId
                this.dataForm.conPorjectFund = result.proFundClearApproval.conPorjectFund
                this.dataForm.remark = result.proFundClearApproval.remark
                this.dataForm.sign = result.proFundClearApproval.sign
                this.dataForm.signTime = result.proFundClearApproval.signTime
                this.dataForm.approvalStatus = result.proFundClearApproval.approvalStatus
                this.dataForm.propose = result.proFundClearApproval.propose
                this.dataForm.result = result.proFundClearApproval.result
                this.dataForm.createtime = result.proFundClearApproval.createtime
                this.dataForm.updatetime = result.proFundClearApproval.updatetime
                this.dataForm.createuser = result.proFundClearApproval.createuser
                this.dataForm.updateuser = result.proFundClearApproval.updateuser
                this.dataForm.datastatus = result.proFundClearApproval.datastatus
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
          tapp.services.proFundClearApproval.save(model).then(function (result) {
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
