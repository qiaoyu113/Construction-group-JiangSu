<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">经营方式变更申请</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="150px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：" prop="pId">
            <t-project-select  placeholder="选择一个项目" v-model="dataForm.pId" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
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
        <el-col :span="4" v-if="dataForm.proRunModeO === 'proprietary'">
          <el-form-item label="有无借款：" prop="isBorrow">
            <t-dic-dropdown-select dicType="have_or_not" v-model="dataForm.isBorrow" readOnly></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-if="dataForm.proRunModeO === 'proprietary' && dataForm.isBorrow === 'have'">
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
            <t-input v-model="dataForm.conPorjectFund" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'变更后经营方式'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经营方式：" prop="proRunMode">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :disabled="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item label="自营：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item label="联营：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" v-if="dataForm.proRunMode === 'proprietary' || dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item label="净利润承诺超：" prop="proProfitRate" verify class="is-required">
            <t-int-input v-model="dataForm.proProfitRate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'proprietary' || dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item prop="proUnionCompanyContacter" label="公司负责人：">
            <t-input v-model="dataForm.proUnionCompanyContacter" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'pool' || dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item label="管理费：" prop="proUnionCompanyMerateO">
            <t-int-input v-model="dataForm.proUnionCompanyMerateO" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'pool' || dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item label="联营单位名称：" prop="proUnionCompany">
            <t-input v-model="dataForm.proUnionCompany" :readOnly="readOnly">
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'pool' || dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item prop="proContacter" label="联系人：">
            <t-input v-model="dataForm.proContacter" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'pool' || dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item prop="proContactway" label="联系方式：">
            <t-input v-model="dataForm.proContactway" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'pool' || dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item prop="conDepositO" label="总保证金额：">
            <t-input v-model="dataForm.conDepositO" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="dataForm.proRunMode === 'pool' || dataForm.proRunMode === 'proprietary_pool'">
          <el-form-item prop="conDeposit" label="本合同履约保证金：">
            <t-input v-model="dataForm.conDeposit" :readOnly="readOnly"></t-input>
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
            <t-input type="textarea" :rows="2" v-model="dataForm.reason" :readOnly="readOnly"></t-input>
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
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton:true,
        readOnly: false,
        dialogVisible: false,
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          proRunModeO:  'proprietary', // 默认自营
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
          proRunMode: 'proprietary', // 默认自营
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
          isBorrow:'',
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
          this.dataForm.id = id || 0;
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields();
            if (this.dataForm.id) {
              let self = this;
              tapp.services.proRunmodeChageApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result);
                let params = {}
                if(/^\d$/.test(result.pId)) {
                  params = {
                    filters: {}, maxResultCount: 20, skipCount: 1, sorting: "id descending",
                    id: result.pId
                  }
                } else {
                  params = {
                    filters: {}, maxResultCount: 20, skipCount: 1, sorting: "id descending",
                    proName: result.pId
                  }
                }
                tapp.services.proInfo.getPagedList(params).then(_result => {
                  if(_result && _result.items && _result.items.length > 0) {
                    self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, _result.items[0])
                    self.dataForm.pName = self.dataForm.proName
                    self.dataForm.proRunMode = result.proRunMode
                  }
                })
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
        this.dataForm.pName = project.proName;
        this.dataForm.conTotal = project.conTotal;
        this.dataForm.conBcxyTotal = project.conBcxyTotal;
        this.dataForm.pId = project.id;
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
