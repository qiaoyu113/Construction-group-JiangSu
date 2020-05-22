<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">竣工验收文件归档</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-folder">归档</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="150px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="项目名称：" prop="proName">
            <el-input v-model="dataForm.proName" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="actTaskKey" label="">
            <a>项目详细信息</a>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCode" label="项目编号：">
            <el-input v-model="dataForm.proCode" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="建设单位：" prop="proConstructCompany">
            <el-input v-model="dataForm.proConstructCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proTotalInvestment" label="项目总投资：">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目地址：" prop="socialSecurityId" verify class="is-required">
            <t-dic-tree-select dicType="base_region" v-model="dataForm.proAddressCity" :readOnly="readOnly"></t-dic-tree-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="详细地址：" prop="proAddressDetail" verify class="is-required">
            <el-input v-model="dataForm.proAddressDetail" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContractAttr" label="承包形式：">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" :readOnly="readOnly"></t-dic-dropdown-select>
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
          <el-form-item prop="proManager" label="项目经理：">
            <el-input v-model="dataForm.proManager" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proFundSource" label="资金来源：">
            <t-dic-dropdown-select dicType="money_source" v-model="dataForm.proFundSource" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proType" label="工程类别：">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubType" label="类别子项：">
            <t-dic-dropdown-select dicType="category_child" v-model="dataForm.proSubType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同总金额(含补充协议)：" prop="proTotalInvestment" label-width="200px">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="search-date-picker">
          <el-form-item label="合同起止日：">
            <t-datetime-range-picker v-model="dataForm.dateRange" @change="onStartDateRangeChanged">
            </t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际开工日期：" prop="proRealStartDate" verify class="is-required">
            <t-datetime-picker v-model="dataForm.proRealStartDate" type="date" :readOnly="readOnly">
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
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联营单位管理费：" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目净利润承诺超：" prop="proProfitRate" verify class="is-required">
            <t-int-input v-model="dataForm.proProfitRate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proContacter" label="联系人：">
            <el-input v-model="dataForm.proContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联营公司名称：" prop="proUnionCompany">
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
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'建筑情况'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="建筑面积：" prop="proBuildArea" verify class="is-required">
            <t-int-input v-model="dataForm.proBuildArea" :readOnly="readOnly">
              <span slot="append">平方米</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="高度/最大跨度：" prop="proSpan" verify class="is-required">
            <t-int-input v-model="dataForm.proSpan" :readOnly="readOnly">
              <span slot="append">米</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="层数：" prop="proLayer" verify class="is-required">
            <t-int-input v-model="dataForm.proLayer" :readOnly="readOnly">
              <span slot="append">层</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="栋数：" prop="proBlock" verify class="is-required">
            <t-int-input v-model="dataForm.proBlock" :readOnly="readOnly">
              <span slot="append">栋</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地下室：" prop="proBasementArea" verify class="is-required">
            <t-int-input v-model="dataForm.proBasementArea" :readOnly="readOnly">
              <span slot="append">平方米、层</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proIsFitout" label="是否为装配式：">
            <t-dic-dropdown-select dicType="y_or_n" v-model="dataForm.proIsFitout" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="装配率：" prop="proFitoutRate" verify class="is-required">
            <t-int-input v-model="dataForm.proFitoutRate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proIsBim" label="是否应用BIM技术：">
            <t-dic-dropdown-select dicType="y_or_n" v-model="dataForm.proIsBim" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="proIsBim" label="项目文件归档：">
            <a>确认归档（确认以下双方盖章后文件：中标文件、主合同文件、项目竣工验收证明上传后勾上确认归档）查看文件一览</a>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="申请竣工日期：" prop="completedTime" verify class="is-required">
            <t-datetime-picker v-model="dataForm.completedTime" type="date" :readOnly="readOnly">
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
          datastatus: ''
        },
        dataRule: {
          completedTime: [
            {required: true, message: '申请竣工日期不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '说明不能为空', trigger: 'blur'}
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
              tapp.services.proCompletedApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.proCompletedApproval.bId
                this.dataForm.actTaskKey = result.proCompletedApproval.actTaskKey
                this.dataForm.pId = result.proCompletedApproval.pId
                this.dataForm.completedTime = result.proCompletedApproval.completedTime
                this.dataForm.remark = result.proCompletedApproval.remark
                this.dataForm.sign = result.proCompletedApproval.sign
                this.dataForm.signTime = result.proCompletedApproval.signTime
                this.dataForm.approvalStatus = result.proCompletedApproval.approvalStatus
                this.dataForm.propose = result.proCompletedApproval.propose
                this.dataForm.result = result.proCompletedApproval.result
                this.dataForm.createtime = result.proCompletedApproval.createtime
                this.dataForm.updatetime = result.proCompletedApproval.updatetime
                this.dataForm.createuser = result.proCompletedApproval.createuser
                this.dataForm.updateuser = result.proCompletedApproval.updateuser
                this.dataForm.datastatus = result.proCompletedApproval.datastatus
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
      onStartDateRangeChanged (val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1]
      },
      // 表单提交
      doSave () {
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
