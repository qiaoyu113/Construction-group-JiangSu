<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">待确认工程款结算登记</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-bell" @click="doSave()">保存并通知</el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-operation" @click="">通知流程图</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="140px" label-position="right">
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
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'变更前经营方式'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="经营方式：" prop="proRunModeO">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunModeO" :readOnly="readOnly" disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item label="自营：" prop="conSelfRateO">
              <t-int-input v-model="dataForm.conSelfRateO" :readOnly="readOnly" disabled>
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item label="联营：" prop="conUnionCompanyRateO">
              <t-int-input v-model="dataForm.conUnionCompanyRateO" :readOnly="readOnly" disabled>
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" v-if="dataForm.proRunModeO === 'proprietary' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item label="净利润承诺超：" prop="proProfitRateO">
              <t-int-input v-model="dataForm.proProfitRateO" :readOnly="readOnly" disabled>
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'proprietary' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="proUnionCompanyContacterO" label="公司负责人：">
              <el-input v-model="dataForm.proUnionCompanyContacterO" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"  v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item label="管理费" prop="proUnionCompanyMerateO">
              <t-int-input v-model="dataForm.proUnionCompanyMerateO" :readOnly="readOnly" disabled>
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="dataForm.proRunModeO === 'proprietary'">
            <el-form-item label="有无借款：" prop="isBorrow">
              <t-dic-dropdown-select dicType="have_or_not" v-model="dataForm.isBorrow" :readOnly="readOnly" disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="dataForm.proRunModeO === 'proprietary' && dataForm.isBorrow === 'have'">
            <el-form-item prop="proContacter" label="">
              <a>借还款信息</a>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联营单位名称：" prop="proUnionCompanyO" v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
              <el-input v-model="dataForm.proUnionCompanyO" disabled>
                <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true" disabled></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="proContacterO" label="联系人：">
              <el-input v-model="dataForm.proContacterO" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="proContactwayO" label="联系方式：">
              <el-input v-model="dataForm.proContactwayO" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="conDepositO" label="合同履约保证金：">
              <el-input v-model="dataForm.conDepositO" disabled>
                <span slot="append"><a>详细</a></span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'pool'|| dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="conPorjectFund" label="待确认工程款：">
              <el-input v-model="dataForm.conPorjectFund" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="最终结算工程款：" prop="conPorjectFund">
            <el-input v-model="dataForm.conPorjectFund"></el-input>
          </el-form-item>
        </el-col>
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
          datastatus: '',
          conPorjectFundO:'',
          proRunModeO:  'proprietary', // 默认自营
          conDepositInfoList:[], //合同履约保证金
          cashDepositTotal:'',
          otherConTotal:'',
          otherHzTotal:'',
          propertyTotal:'',
          getAmountTotal:'',
          returnAmountTotal:''
        },
        dataRule: {
          pId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
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
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
          })
        }
      },
      getSelectedProject(project) {
        console.log('current project', project);
        this.dataForm.proSubCompany = project.proSubCompany;
        this.dataForm.proCode = project.proCode;
        this.dataForm.proAddressProvince = project.proAddressProvince;
        this.dataForm.proAddressDetail = project.proAddressDetail;
        this.dataForm.proManager = project.proManager;
        this.dataForm.proFundSource = project.proFundSource;
        this.dataForm.proBusDept = project.proBusDept;
        this.dataForm.proSubType = project.proSubType;
        this.dataForm.proConstructCompany = project.proConstructCompany;
        this.dataForm.proContractAttr = project.proContractAttr;
        this.dataForm.proTotalInvestment = project.proTotalInvestment;
        this.dataForm.proType = project.proType;
        this.dataForm.proRunModeO = project.proRunMode;
        this.dataForm.proBuildArea = project.proBuildArea;
        this.dataForm.proRealStartDate = project.proRealStartDate;
        this.dataForm.proPlanEndDate = project.proPlanEndDate;
        this.dataForm.proUnionCompanyMerateO = project.proUnionCompanyMerate;
        this.dataForm.proProfitRateO = project.proProfitRate;
        this.dataForm.proContacterO = project.proContacter;
        this.dataForm.proContactwayO = project.proContactway;
        this.dataForm.proSpan = project.proSpan;
        this.dataForm.proLayer = project.proLayer;
        this.dataForm.proBlock = project.proBlock;
        this.dataForm.proBasementArea = project.proBasementArea;
        this.dataForm.proIsFitout = project.proIsFitout;
        this.dataForm.proFitoutRate = project.proFitoutRate;
        this.dataForm.proUnionCompanyO = project.proUnionCompany;
        this.dataForm.proIsBim = project.proIsBim;
        this.dataForm.isBorrow = project.isBorrow;
        this.dataForm.proUnionCompanyContacterO = project.proCompanyHeader;
        this.dataForm.conSelfRateO = project.conSelfProportion;
        this.dataForm.conUnionCompanyRateO = project.conOtherProportion;
        this.dataForm.conDepositO = project.conDeposit;
        this.dataForm.conDepositInfoList = project.conDepositInfoList;
        this.dataForm.cashDepositTotal = project.cashDepositTotal;
        this.dataForm.otherConTotal = project.otherConTotal;
        this.dataForm.otherHzTotal = project.otherHzTotal;
        this.dataForm.propertyTotal = project.propertyTotal;
        this.dataForm.getAmountTotal = project.getAmountTotal;
        this.dataForm.returnAmountTotal = project.returnAmountTotal;
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
