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
          <el-form-item label="项目名称：" prop="proName">
            <el-input v-model="dataForm.proName" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </el-input>
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
          <el-form-item label="项目规模：" prop="proBuildArea">
            <el-input v-model="dataForm.proBuildArea" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目经理：" prop="proRunMode">
            <el-input v-model="dataForm.proManager" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'变更前经营方式'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营方式：" prop="proRunMode">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="自营：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="联营：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="净利润承诺超：" prop="proProfitRate" verify class="is-required">
            <t-int-input v-model="dataForm.proProfitRate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompanyContacterO" label="公司负责人：">
            <el-input v-model="dataForm.proUnionCompanyContacterO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有无借款：">
            <t-dic-dropdown-select dicType="have_or_not" v-model="dataForm.isBorrowing" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proContacter" label="">
            <a>借还款信息</a>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联营单位名称：" prop="proUnionCompany">
            <el-input v-model="dataForm.proUnionCompany" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContacter" label="联系人：">
            <el-input v-model="dataForm.proContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContactway" label="联系方式：">
            <el-input v-model="dataForm.proContactway"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conPorjectFund" label="待确认工程款：">
            <el-input v-model="dataForm.conPorjectFund"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conDepositO" label="合同履约保证金：">
            <el-input v-model="dataForm.conDepositO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="conDepositO" label="">
            <a>详细</a>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="管理费" prop="conDepositO" verify class="is-required">
            <t-int-input v-model="dataForm.conDepositO" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'变更后经营方式'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营方式：" prop="proRunMode">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="自营：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="联营：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="净利润承诺超：" prop="proProfitRate" verify class="is-required">
            <t-int-input v-model="dataForm.proProfitRate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompanyContacterO" label="公司负责人：">
            <el-input v-model="dataForm.proUnionCompanyContacterO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联营单位名称：" prop="proUnionCompany">
            <el-input v-model="dataForm.proUnionCompany" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conDepositO" label="总保证金额：">
            <el-input v-model="dataForm.conDepositO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="管理费：" prop="conDepositO" verify class="is-required">
            <t-int-input v-model="dataForm.conDepositO" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conDepositO" label="本合同履约保证金：">
            <el-input v-model="dataForm.conDepositO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContacter" label="联系人：">
            <el-input v-model="dataForm.proContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContactway" label="联系方式：">
            <el-input v-model="dataForm.proContactway"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
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
          <el-form-item label="变更原因：" prop="reason">
            <el-input type="textarea" :rows="2" v-model="dataForm.reason"></el-input>
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
          proRunModeO: [
            {required: true, message: '原经营方式不能为空', trigger: 'blur'}
          ],
          proProfitRateO: [
            {required: true, message: '原项目净利润承诺超不能为空', trigger: 'blur'}
          ],
          proUnionCompanyMerateO: [
            {required: true, message: '原联营单位管理费不能为空', trigger: 'blur'}
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
            {required: true, message: '经营方式不能为空', trigger: 'blur'}
          ],
          proProfitRate: [
            {required: true, message: '项目净利润承诺超不能为空', trigger: 'blur'}
          ],
          proUnionCompanyMerate: [
            {required: true, message: '联营单位管理费不能为空', trigger: 'blur'}
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
            {required: true, message: '审批状态不能为空', trigger: 'blur'}
          ],
          reason: [
            {required: true, message: '变更原因不能为空', trigger: 'blur'}
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
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
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
