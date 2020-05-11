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
          <el-form-item prop="bId" label="业务id用于和一个流程实例绑定">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="activiti执行任务key">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="项目id">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRunModeO" label="原经营方式（字典表）">
            <el-input v-model="dataForm.proRunModeO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proProfitRateO" label="原项目净利润承诺超-%">
            <el-input v-model="dataForm.proProfitRateO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompanyMerateO" label="原联营单位管理费-%">
            <el-input v-model="dataForm.proUnionCompanyMerateO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompanyO" label="原联营公司名称">
            <el-input v-model="dataForm.proUnionCompanyO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContacterO" label="原自营方联系人">
            <el-input v-model="dataForm.proContacterO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompanyContacterO" label="原联营公司负责人">
            <el-input v-model="dataForm.proUnionCompanyContacterO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContactwayO" label="原联营公司联系方式">
            <el-input v-model="dataForm.proContactwayO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conSelfRateO" label="原自营分配率">
            <el-input v-model="dataForm.conSelfRateO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conUnionCompanyRateO" label="原联营分配率">
            <el-input v-model="dataForm.conUnionCompanyRateO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conDepositO" label="原合同履约保证金">
            <el-input v-model="dataForm.conDepositO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conPorjectFund" label="待确认工程款">
            <el-input v-model="dataForm.conPorjectFund"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRunMode" label="经营方式（字典表）">
            <el-input v-model="dataForm.proRunMode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proProfitRate" label="项目净利润承诺超-%">
            <el-input v-model="dataForm.proProfitRate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompanyMerate" label="联营单位管理费-%">
            <el-input v-model="dataForm.proUnionCompanyMerate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompany" label="联营公司名称">
            <el-input v-model="dataForm.proUnionCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContacter" label="自营方联系人">
            <el-input v-model="dataForm.proContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompanyContacter" label="联营公司负责人">
            <el-input v-model="dataForm.proUnionCompanyContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContactway" label="联营公司联系方式">
            <el-input v-model="dataForm.proContactway"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conSelfRate" label="自营分配率">
            <el-input v-model="dataForm.conSelfRate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conUnionCompanyRate" label="联营分配率">
            <el-input v-model="dataForm.conUnionCompanyRate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conDeposit" label="合同履约保证金">
            <el-input v-model="dataForm.conDeposit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="审批状态（字典表）">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="reason" label="变更原因">
            <el-input v-model="dataForm.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="执行人">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="执行时间">
            <el-input v-model="dataForm.signTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="propose" label="审核意见">
            <el-input v-model="dataForm.propose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="result" label="审核结果">
            <el-input v-model="dataForm.result"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createtime" label="创建时间">
            <el-input v-model="dataForm.createtime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="updatetime" label="更新时间">
            <el-input v-model="dataForm.updatetime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createuser" label="创建人">
            <el-input v-model="dataForm.createuser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="updateuser" label="更新人">
            <el-input v-model="dataForm.updateuser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="datastatus" label="数据有效性 1有效 0无效">
            <el-input v-model="dataForm.datastatus"></el-input>
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
          proRunModeO: '',
          proProfitRateO: '',
          proUnionCompanyMerateO: '',
          proUnionCompanyO: '',
          proContacterO: '',
          proUnionCompanyContacterO: '',
          proContactwayO: '',
          conSelfRateO: '',
          conUnionCompanyRateO: '',
          conDepositO: '',
          conPorjectFund: '',
          proRunMode: '',
          proProfitRate: '',
          proUnionCompanyMerate: '',
          proUnionCompany: '',
          proContacter: '',
          proUnionCompanyContacter: '',
          proContactway: '',
          conSelfRate: '',
          conUnionCompanyRate: '',
          conDeposit: '',
          approvalStatus: '',
          reason: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          bId: [
            {required: true, message: '业务id用于和一个流程实例绑定不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: true, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          pId: [
            {required: true, message: '项目id不能为空', trigger: 'blur'}
          ],
          proRunModeO: [
            {required: true, message: '原经营方式（字典表）不能为空', trigger: 'blur'}
          ],
          proProfitRateO: [
            {required: true, message: '原项目净利润承诺超-%不能为空', trigger: 'blur'}
          ],
          proUnionCompanyMerateO: [
            {required: true, message: '原联营单位管理费-%不能为空', trigger: 'blur'}
          ],
          proUnionCompanyO: [
            {required: true, message: '原联营公司名称不能为空', trigger: 'blur'}
          ],
          proContacterO: [
            {required: true, message: '原自营方联系人不能为空', trigger: 'blur'}
          ],
          proUnionCompanyContacterO: [
            {required: true, message: '原联营公司负责人不能为空', trigger: 'blur'}
          ],
          proContactwayO: [
            {required: true, message: '原联营公司联系方式不能为空', trigger: 'blur'}
          ],
          conSelfRateO: [
            {required: true, message: '原自营分配率不能为空', trigger: 'blur'}
          ],
          conUnionCompanyRateO: [
            {required: true, message: '原联营分配率不能为空', trigger: 'blur'}
          ],
          conDepositO: [
            {required: true, message: '原合同履约保证金不能为空', trigger: 'blur'}
          ],
          conPorjectFund: [
            {required: true, message: '待确认工程款不能为空', trigger: 'blur'}
          ],
          proRunMode: [
            {required: true, message: '经营方式（字典表）不能为空', trigger: 'blur'}
          ],
          proProfitRate: [
            {required: true, message: '项目净利润承诺超-%不能为空', trigger: 'blur'}
          ],
          proUnionCompanyMerate: [
            {required: true, message: '联营单位管理费-%不能为空', trigger: 'blur'}
          ],
          proUnionCompany: [
            {required: true, message: '联营公司名称不能为空', trigger: 'blur'}
          ],
          proContacter: [
            {required: true, message: '自营方联系人不能为空', trigger: 'blur'}
          ],
          proUnionCompanyContacter: [
            {required: true, message: '联营公司负责人不能为空', trigger: 'blur'}
          ],
          proContactway: [
            {required: true, message: '联营公司联系方式不能为空', trigger: 'blur'}
          ],
          conSelfRate: [
            {required: true, message: '自营分配率不能为空', trigger: 'blur'}
          ],
          conUnionCompanyRate: [
            {required: true, message: '联营分配率不能为空', trigger: 'blur'}
          ],
          conDeposit: [
            {required: true, message: '合同履约保证金不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: true, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          reason: [
            {required: true, message: '变更原因不能为空', trigger: 'blur'}
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
              tapp.services.proRunmodeChageApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.proRunmodeChageApproval.bId
                this.dataForm.actTaskKey = result.proRunmodeChageApproval.actTaskKey
                this.dataForm.pId = result.proRunmodeChageApproval.pId
                this.dataForm.proRunModeO = result.proRunmodeChageApproval.proRunModeO
                this.dataForm.proProfitRateO = result.proRunmodeChageApproval.proProfitRateO
                this.dataForm.proUnionCompanyMerateO = result.proRunmodeChageApproval.proUnionCompanyMerateO
                this.dataForm.proUnionCompanyO = result.proRunmodeChageApproval.proUnionCompanyO
                this.dataForm.proContacterO = result.proRunmodeChageApproval.proContacterO
                this.dataForm.proUnionCompanyContacterO = result.proRunmodeChageApproval.proUnionCompanyContacterO
                this.dataForm.proContactwayO = result.proRunmodeChageApproval.proContactwayO
                this.dataForm.conSelfRateO = result.proRunmodeChageApproval.conSelfRateO
                this.dataForm.conUnionCompanyRateO = result.proRunmodeChageApproval.conUnionCompanyRateO
                this.dataForm.conDepositO = result.proRunmodeChageApproval.conDepositO
                this.dataForm.conPorjectFund = result.proRunmodeChageApproval.conPorjectFund
                this.dataForm.proRunMode = result.proRunmodeChageApproval.proRunMode
                this.dataForm.proProfitRate = result.proRunmodeChageApproval.proProfitRate
                this.dataForm.proUnionCompanyMerate = result.proRunmodeChageApproval.proUnionCompanyMerate
                this.dataForm.proUnionCompany = result.proRunmodeChageApproval.proUnionCompany
                this.dataForm.proContacter = result.proRunmodeChageApproval.proContacter
                this.dataForm.proUnionCompanyContacter = result.proRunmodeChageApproval.proUnionCompanyContacter
                this.dataForm.proContactway = result.proRunmodeChageApproval.proContactway
                this.dataForm.conSelfRate = result.proRunmodeChageApproval.conSelfRate
                this.dataForm.conUnionCompanyRate = result.proRunmodeChageApproval.conUnionCompanyRate
                this.dataForm.conDeposit = result.proRunmodeChageApproval.conDeposit
                this.dataForm.approvalStatus = result.proRunmodeChageApproval.approvalStatus
                this.dataForm.reason = result.proRunmodeChageApproval.reason
                this.dataForm.sign = result.proRunmodeChageApproval.sign
                this.dataForm.signTime = result.proRunmodeChageApproval.signTime
                this.dataForm.propose = result.proRunmodeChageApproval.propose
                this.dataForm.result = result.proRunmodeChageApproval.result
                this.dataForm.createtime = result.proRunmodeChageApproval.createtime
                this.dataForm.updatetime = result.proRunmodeChageApproval.updatetime
                this.dataForm.createuser = result.proRunmodeChageApproval.createuser
                this.dataForm.updateuser = result.proRunmodeChageApproval.updateuser
                this.dataForm.datastatus = result.proRunmodeChageApproval.datastatus
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
          tapp.services.proRunmodeChageApproval.save(model).then(function (result) {
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
