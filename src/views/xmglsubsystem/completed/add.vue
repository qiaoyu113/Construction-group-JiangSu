<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目竣工申请</div>
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
    <el-dialog title="项目竣工申请审批流程图" :visible.sync="dialogVisible" width="60%" center>
      <!-- businessKey为当前流程的key值 -->
      <t-workflow-map businessKey="t_pro_completed_approval_process"></t-workflow-map>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
    </el-dialog>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="150px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="项目名称：" prop="pId">
              <t-project-select placeholder="选择一个项目" v-model="dataForm.pId" :readOnly="readOnly" @selectedProject="getSelectedProject"></t-project-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <a style="line-height: 36px;">项目详细信息</a>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proCode" label="项目编号：">
              <t-input v-model="dataForm.proCode" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="建设单位：" prop="proConstructCompany">
              <t-input v-model="dataForm.proConstructCompany" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="项目总投资：">
              <t-input v-model="dataForm.proTotalInvestment" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proAddressCity" label="项目地址：">
              <t-region-s-picker :province.sync="dataForm.proAddressProvince" :city.sync="dataForm.proAddressCity" :readOnly="true"></t-region-s-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址：" prop="proAddressDetail">
              <t-input v-model="dataForm.proAddressDetail" :readOnly="true" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttr" label="承包形式：">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" :disabled="true"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分公司：" prop="proSubCompany">
              <t-input v-model="dataForm.proSubCompany" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属事业部：" prop="proBusDept">
              <t-input v-model="dataForm.proBusDept" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proManager" label="项目经理：">
              <t-input v-model="dataForm.proManager" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proFundSource" label="资金来源：">
              <t-dic-dropdown-select dicType="money_source" v-model="dataForm.proFundSource" :disabled="true"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proType" label="工程类别：">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" :disabled="true"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubType" label="类别子项：">
              <t-dic-dropdown-select dicType="category_child" v-model="dataForm.proSubType" :disabled="true"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同总金额(含补充协议)：" prop="proTotalInvestment" label-width="200px">
              <t-input v-model="dataForm.conTotal" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际开工日期：" prop="proRealStartDate">
              <t-datetime-picker v-model="dataForm.proRealStartDate" type="date" :disabled="true">
              </t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划完工日期：" prop="proPlanEndDate">
              <t-datetime-picker v-model="dataForm.proPlanEndDate" type="date":disabled="true">
              </t-datetime-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'经营方式'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="经营方式：" prop="proRunMode">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :disabled="true" ></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联营单位管理费：" prop="proUnionCompanyMerate">
              <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="true">
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目净利润承诺超：" prop="proProfitRate">
              <t-int-input v-model="dataForm.proProfitRate" :readOnly="true">
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="proContacter" label="联系人：">
              <t-input v-model="dataForm.proContacter" :disabled="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联营公司名称：" prop="proUnionCompany">
              <t-input v-model="dataForm.proUnionCompany" :disabled="true">
                <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
              </t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContacter" label="联系人：">
              <t-input v-model="dataForm.proContacter" :disabled="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContactway" label="联系方式：">
              <t-input v-model="dataForm.proContactway" :disabled="true"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'建筑情况'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="建筑面积：" prop="proBuildArea">
              <t-int-input v-model="dataForm.proBuildArea" :readOnly="true">
                <span slot="append">平方米</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="高度/最大跨度：" prop="proSpan">
              <t-int-input v-model="dataForm.proSpan" :readOnly="true">
                <span slot="append">米</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="层数：" prop="proLayer" class="is-required">
              <t-int-input v-model="dataForm.proLayer" :readOnly="true">
                <span slot="append">层</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="栋数：" prop="proBlock" class="is-required">
              <t-int-input v-model="dataForm.proBlock" :readOnly="true" disabled>
                <span slot="append">栋</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地下室：" prop="proBasementArea" class="is-required">
              <t-int-input v-model="dataForm.proBasementArea" :readOnly="true" disabled>
                <span slot="append">平方米、层</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="proIsFitout" label="是否为装配式：">
              <t-dic-dropdown-select dicType="y_or_n" v-model="dataForm.proIsFitout" :disabled="true"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="装配率：" prop="proFitoutRate" verify class="is-required">
              <t-int-input v-model="dataForm.proFitoutRate" :readOnly="true">
                <span slot="append">%</span>
              </t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="proIsBim" label="是否应用BIM技术：">
              <t-dic-dropdown-select dicType="y_or_n" v-model="dataForm.proIsBim" :disabled="true"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="申请竣工日期：" prop="completedTime" verify class="is-required">
              <t-datetime-picker v-model="dataForm.completedTime" type="date" :disabled="readOnly">
              </t-datetime-picker>
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
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        showButton:true,
        readOnly: false,
        dialogVisible: false,
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          completedTime: '',
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
          flag: '1',
          pName: '',
          conBcxyTotal: ''
        },
        dataRule: {
          pId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          completedTime: [
            {required: true, message: '申请竣工日期不能为空', trigger: 'blur'}
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
        currentUser: state => state.app.user,
      })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0;
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields();
            if (this.dataForm.id) {
              let self = this;
              tapp.services.proCompletedApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                let params = {
                  filters: {},
                  maxResultCount: 20,
                  skipCount: 1,
                  sorting: "id descending",
                  id: result.pId
                };
                tapp.services.proInfo.getPagedList(params).then(_result => {
                  if(_result && _result.items && _result.items.length > 0) {
                    self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, _result.items[0])
                    self.dataForm.pName = _result.proName
                    self.dataForm.pId = _result.id
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
        this.dataForm.proRunMode = project.proRunMode;
        this.dataForm.proBuildArea = project.proBuildArea;
        this.dataForm.proRealStartDate = project.proRealStartDate;
        this.dataForm.proPlanEndDate = project.proPlanEndDate;
        this.dataForm.proUnionCompanyMerate = project.proUnionCompanyMerate;
        this.dataForm.proProfitRate = project.proProfitRate;
        this.dataForm.proContacter = project.proContacter;
        this.dataForm.proContactway = project.proContactway;
        this.dataForm.proSpan = project.proSpan;
        this.dataForm.proLayer = project.proLayer;
        this.dataForm.proBlock = project.proBlock;
        this.dataForm.proBasementArea = project.proBasementArea;
        this.dataForm.proIsFitout = project.proIsFitout;
        this.dataForm.proFitoutRate = project.proFitoutRate;
        this.dataForm.proUnionCompany = project.proUnionCompany;
        this.dataForm.proIsBim = project.proIsBim;
        this.dataForm.conTotal = project.conBcxyTotal;
        this.dataForm.pName = project.proName;
        this.dataForm.pId = project.id;
        this.dataForm.conBcxyTotal = project.conBcxyTotal;
      },
      // 表单提交
      doSave() {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.proCompletedApproval.save(model).then(function (result) {
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
