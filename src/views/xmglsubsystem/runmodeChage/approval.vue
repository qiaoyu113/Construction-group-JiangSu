<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">待确认工程款结算登记</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-bell" @click="doSave()">保存并通知</el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-operation" @click="dialogVisible = true">通知流程图</el-button>
    </el-row>
    <el-dialog title="经营方式变更后工程款确认流程" :visible.sync="dialogVisible" width="60%" center>
      <!-- businessKey为当前流程的key值 -->
      <t-workflow-map businessKey="t_pro_fund_clear_approval_process"></t-workflow-map>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
    </el-dialog>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="140px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：" prop="pName">
            <t-project-select  placeholder="选择一个项目" v-model="dataForm.pName" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司：" prop="proSubCompany">
            <t-input v-model="dataForm.proSubCompany" readOnly></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部：" prop="proBusDept">
            <t-input v-model="dataForm.proBusDept" readOnly></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位：" prop="proConstructCompany">
            <t-input v-model="dataForm.proConstructCompany" readOnly></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式：" prop="proContractAttr">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额：" prop="proTotalInvestment">
            <t-input v-model="dataForm.proTotalInvestment" readOnly></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：" prop="proType">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模：" prop="proBuildArea">
            <t-input v-model="dataForm.proBuildArea" readOnly></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目经理：" prop="proManager">
            <t-input v-model="dataForm.proManager" readOnly></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'变更前经营方式'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="经营方式：" prop="proRunModeO">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunModeO" disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item label="自营：" prop="conSelfRateO">
              <t-int-input v-model="dataForm.conSelfRateO" readOnly>
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item label="联营：" prop="conUnionCompanyRateO">
              <t-int-input v-model="dataForm.conUnionCompanyRateO" readOnly>
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" v-if="dataForm.proRunModeO === 'proprietary' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item label="净利润承诺超：" prop="proProfitRateO">
              <t-int-input v-model="dataForm.proProfitRateO" readOnly>
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'proprietary' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="proUnionCompanyContacterO" label="公司负责人：">
              <t-input v-model="dataForm.proUnionCompanyContacterO" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"  v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item label="管理费" prop="proUnionCompanyMerateO">
              <t-int-input v-model="dataForm.proUnionCompanyMerateO" readOnly>
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="dataForm.proRunModeO === 'proprietary'">
            <el-form-item label="有无借款：" prop="isBorrow">
              <t-dic-dropdown-select dicType="have_or_not" v-model="dataForm.isBorrow" disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" v-if="dataForm.proRunModeO === 'proprietary' && dataForm.isBorrow === 'have'">
            <a style="line-height: 36px;">借还款信息</a>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联营单位名称：" prop="proUnionCompanyO" v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
              <t-input v-model="dataForm.proUnionCompanyO" readOnly>
                <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true" disabled></el-button>
              </t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="proContacterO" label="联系人：">
              <t-input v-model="dataForm.proContacterO" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="proContactwayO" label="联系方式：">
              <t-input v-model="dataForm.proContactwayO" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'pool' || dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="conDepositO" label="合同履约保证金：">
              <t-input v-model="dataForm.conDepositO" readOnly>
                <span slot="append"><a>详细</a></span>
              </t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="dataForm.proRunModeO === 'pool'|| dataForm.proRunModeO === 'proprietary_pool'">
            <el-form-item prop="conPorjectFund" label="待确认工程款：">
              <t-input v-model="dataForm.conPorjectFund" readOnly></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="最终结算工程款：" prop="conPorjectFund">
            <t-input v-model="dataForm.conPorjectFund" :readOnly="readOnly"></t-input>
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
            <t-input type="textarea" :rows="2" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
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
  import find from 'lodash/find'
  export default {
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        showButton:true,
        readOnly: false,
        dialogVisible: false,
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
          returnAmountTotal:'',
          flag: '1',
          pName: '',
          conTotal: '',
          conBcxyTotal: ''
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
      const currentQuery = this.$route.query;
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly;
      this.showButton = !(currentQuery.readonly == 'true');
      this.init(currentQuery.businessId)
    },
    activated() {
      const currentQuery = this.$route.query;
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly;
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
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
            this.$refs['ruleForm'].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.proFundClearApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                let params = {}
                if(/^[0-9]*$/.test(result.pId)) {
                  params = {
                    filters: {}, maxResultCount: 200, skipCount: 1, sorting: "id descending",
                    id: result.pId
                  } 
                } else {
                  params = {
                    filters: {}, maxResultCount: 200, skipCount: 1, sorting: "id descending",
                    proName: result.pId
                  } 
                }
                tapp.services.proInfo.getPagedList(params).then(_result => {
                  console.log('_result', _result)
                  if(_result && _result.items && _result.items.length > 0) {
                    let item;
                    item = find(_result.items, {id: result.pId})
                    if(!item) item = find(_result.items, {proName: result.pId})
                    self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, item)
                    self.dataForm.pName = item.proName
                    self.dataForm.pId = item.id
                    self.dataForm.proRunMode = result.proRunMode
                    self.dataForm.proUnionCompanyMerateO = self.dataForm.proUnionCompanyMerate
                    self.dataForm.proProfitRateO = self.dataForm.proProfitRate
                    self.dataForm.proContacterO = self.dataForm.proContacter
                    self.dataForm.proContactwayO = self.dataForm.proContactway
                    self.dataForm.proUnionCompanyO = self.dataForm.proUnionCompany
                    self.dataForm.proUnionCompanyContacterO = self.dataForm.proCompanyHeader
                    self.dataForm.conSelfRateO = self.dataForm.conSelfProportion
                    self.dataForm.conUnionCompanyRateO = self.dataForm.conOtherProportion
                    self.dataForm.conDepositO = self.dataForm.conDeposit
                  }
                })
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
        this.dataForm.proUnionCompanyMerateO = project.proUnionCompanyMerate;
        this.dataForm.proProfitRateO = project.proProfitRate;
        this.dataForm.proContacterO = project.proContacter;
        this.dataForm.proContactwayO = project.proContactway;
        this.dataForm.proUnionCompanyO = project.proUnionCompany;
        this.dataForm.proUnionCompanyContacterO = project.proCompanyHeader;
        this.dataForm.conSelfRateO = project.conSelfProportion;
        this.dataForm.conUnionCompanyRateO = project.conOtherProportion;
        this.dataForm.conDepositO = project.conDeposit;
        this.dataForm.proBuildArea = project.proBuildArea;
        this.dataForm.proRealStartDate = project.proRealStartDate;
        this.dataForm.proPlanEndDate = project.proPlanEndDate;
        this.dataForm.proSpan = project.proSpan;
        this.dataForm.proLayer = project.proLayer;
        this.dataForm.proBlock = project.proBlock;
        this.dataForm.proBasementArea = project.proBasementArea;
        this.dataForm.proIsFitout = project.proIsFitout;
        this.dataForm.proFitoutRate = project.proFitoutRate;
        this.dataForm.proIsBim = project.proIsBim;
        this.dataForm.isBorrow = project.isBorrow;
        this.dataForm.conDepositInfoList = project.conDepositInfoList;
        this.dataForm.cashDepositTotal = project.cashDepositTotal;
        this.dataForm.otherConTotal = project.otherConTotal;
        this.dataForm.otherHzTotal = project.otherHzTotal;
        this.dataForm.propertyTotal = project.propertyTotal;
        this.dataForm.getAmountTotal = project.getAmountTotal;
        this.dataForm.returnAmountTotal = project.returnAmountTotal;
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
