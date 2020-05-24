<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">经营方式变更申请</div>
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
    </el-row>
    <el-dialog title="经营方式变更审批流程图" :visible.sync="dialogVisible" width="60%" center>
      <!-- businessKey为当前流程的key值 -->
      <t-workflow-map businessKey="t_pro_runmode_chage_approval_process"></t-workflow-map>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
    </el-dialog>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="150px" label-position="right">
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
          <el-form-item label="合同模式：" prop="proContractAttr" disabled>
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" :readOnly="readOnly" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额：" prop="proTotalInvestment">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：" prop="proType">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" :readOnly="readOnly" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模：" prop="proBuildArea">
            <el-input v-model="dataForm.proBuildArea" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目经理：" prop="proManager">
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
        <el-col :span="8">
          <el-form-item label="自营：" prop="conSelfRateO">
            <t-int-input v-model="dataForm.conSelfRateO" :readOnly="readOnly" disabled>
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联营：" prop="conUnionCompanyRateO">
            <t-int-input v-model="dataForm.conUnionCompanyRateO" :readOnly="readOnly" disabled>
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="净利润承诺超：" prop="proProfitRateO">
            <t-int-input v-model="dataForm.proProfitRateO" :readOnly="readOnly" disabled>
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proUnionCompanyContacterO" label="公司负责人：">
            <el-input v-model="dataForm.proUnionCompanyContacterO" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="有无借款：" prop="isBorrowing">
            <t-dic-dropdown-select dicType="have_or_not" v-model="dataForm.isBorrowing" :readOnly="readOnly" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proContacter" label="">
            <a>借还款信息</a>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联营单位名称：" prop="proUnionCompanyO">
            <el-input v-model="dataForm.proUnionCompanyO" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true" disabled></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContacterO" label="联系人：">
            <el-input v-model="dataForm.proContacterO" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContactwayO" label="联系方式：">
            <el-input v-model="dataForm.proContactwayO" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conPorjectFund" label="待确认工程款：">
            <el-input v-model="dataForm.conPorjectFund"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conDepositO" label="合同履约保证金：">
            <el-input v-model="dataForm.conDepositO" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="conDepositO" label="">
            <a>详细</a>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="管理费" prop="conDepositO">
            <t-int-input v-model="dataForm.conDepositO" :readOnly="readOnly" disabled>
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'变更后经营方式'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营方式：" prop="proRunMode">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="自营：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联营：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
      </el-row>
      <el-row>
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
          <el-form-item label="管理费：" prop="proUnionCompanyMerateO">
            <t-int-input v-model="dataForm.proUnionCompanyMerateO" :readOnly="readOnly">
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
      </el-card>
      <el-card shadow="never">
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
        dialogVisible: false,
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
          datastatus: '',
          isBorrowing:''
        },
        dataRule: {
          pId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
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
                self.$util.deepObjectAssign({}, self.dataForm, result);
                this.dataForm.bId = result.proRunmodeChageApproval.bId;
                this.dataForm.actTaskKey = result.proRunmodeChageApproval.actTaskKey;
                this.dataForm.pId = result.proRunmodeChageApproval.pId;
                this.dataForm.proRunModeO = result.proRunmodeChageApproval.proRunModeO;
                this.dataForm.proProfitRateO = result.proRunmodeChageApproval.proProfitRateO;
                this.dataForm.proUnionCompanyMerateO = result.proRunmodeChageApproval.proUnionCompanyMerateO;
                this.dataForm.proUnionCompanyO = result.proRunmodeChageApproval.proUnionCompanyO;
                this.dataForm.proContacterO = result.proRunmodeChageApproval.proContacterO;
                this.dataForm.proUnionCompanyContacterO = result.proRunmodeChageApproval.proUnionCompanyContacterO;
                this.dataForm.proContactwayO = result.proRunmodeChageApproval.proContactwayO;
                this.dataForm.conSelfRateO = result.proRunmodeChageApproval.conSelfRateO;
                this.dataForm.conUnionCompanyRateO = result.proRunmodeChageApproval.conUnionCompanyRateO;
                this.dataForm.conDepositO = result.proRunmodeChageApproval.conDepositO;
                this.dataForm.conPorjectFund = result.proRunmodeChageApproval.conPorjectFund;
                this.dataForm.proRunMode = result.proRunmodeChageApproval.proRunMode;
                this.dataForm.proProfitRate = result.proRunmodeChageApproval.proProfitRate;
                this.dataForm.proUnionCompanyMerate = result.proRunmodeChageApproval.proUnionCompanyMerate;
                this.dataForm.proUnionCompany = result.proRunmodeChageApproval.proUnionCompany;
                this.dataForm.proContacter = result.proRunmodeChageApproval.proContacter;
                this.dataForm.proUnionCompanyContacter = result.proRunmodeChageApproval.proUnionCompanyContacter;
                this.dataForm.proContactway = result.proRunmodeChageApproval.proContactway;
                this.dataForm.conSelfRate = result.proRunmodeChageApproval.conSelfRate;
                this.dataForm.conUnionCompanyRate = result.proRunmodeChageApproval.conUnionCompanyRate;
                this.dataForm.conDeposit = result.proRunmodeChageApproval.conDeposit;
                this.dataForm.approvalStatus = result.proRunmodeChageApproval.approvalStatus;
                this.dataForm.reason = result.proRunmodeChageApproval.reason;
                this.dataForm.sign = result.proRunmodeChageApproval.sign;
                this.dataForm.signTime = result.proRunmodeChageApproval.signTime;
                this.dataForm.propose = result.proRunmodeChageApproval.propose;
                this.dataForm.result = result.proRunmodeChageApproval.result;
                this.dataForm.createtime = result.proRunmodeChageApproval.createtime;
                this.dataForm.updatetime = result.proRunmodeChageApproval.updatetime;
                this.dataForm.createuser = result.proRunmodeChageApproval.createuser;
                this.dataForm.updateuser = result.proRunmodeChageApproval.updateuser;
                this.dataForm.datastatus = result.proRunmodeChageApproval.datastatus;
                this.dataForm.isBorrowing = result.proRunmodeChageApproval.isBorrowing
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
            this.dataForm.sign = this.currentUser.userDisplayName;
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
        this.dataForm.isBorrowing = project.isBorrowing;
        this.dataForm.proUnionCompanyContacterO = project.proCompanyHeader;
      },
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.proRunmodeChageApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result);
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！',
            })
          })
        }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '保存失败！'
          });
          return false
        })
      }
    }
  }
</script>
