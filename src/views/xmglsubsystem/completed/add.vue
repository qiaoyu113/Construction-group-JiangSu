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
          <el-form-item prop="actTaskKey" label="项目详细信息">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCode" label="项目编号">
            <el-input v-model="dataForm.proCode" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="建设单位" prop="proConstructCompany">
            <el-input v-model="dataForm.proConstructCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proTotalInvestment" label="项目总投资">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="项目地址" prop="socialSecurityId" verify class="is-required">
            <t-dic-tree-select dicType="base_region" v-model="dataForm.socialSecurityId" :readOnly="readOnly"></t-dic-tree-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContractAttr" label="承包形式">
            <el-input v-model="dataForm.proContractAttr" readonly></el-input>
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
          <el-form-item prop="proManager" label="项目经理">
            <el-input v-model="dataForm.proManager" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proFundSource" label="资金来源">
            <el-input v-model="dataForm.proFundSource" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别" prop="proType">
            <el-input v-model="dataForm.proType" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubType" label="类别子项">
            <el-input v-model="dataForm.proSubType" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同总金额(含补充协议)" prop="proTotalInvestment">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRealStartDate" label="实际开工日期">
            <el-input v-model="dataForm.proRealStartDate" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proPlanEndDate" label="计划完工日期">
            <el-input v-model="dataForm.proPlanEndDate" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'经营方式'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item prop="proRunMode" label="经营方式">
            <el-input v-model="dataForm.proRunMode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联营单位管理费" prop="proUnionCompanyMerate" verify class="is-required">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目净利润承诺超" prop="proProfitRate" verify class="is-required">
            <t-int-input v-model="dataForm.proProfitRate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proContacter" label="联系人">
            <el-input v-model="dataForm.proContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联营公司名称" prop="proUnionCompany">
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
      </el-row>
      <t-sub-title :title="'建筑情况'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="建筑面积" prop="proBuildArea" verify class="is-required">
            <t-int-input v-model="dataForm.proBuildArea" :readOnly="readOnly">
              <span slot="append">平方米</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="高度/最大跨度" prop="proSpan" verify class="is-required">
            <t-int-input v-model="dataForm.proSpan" :readOnly="readOnly">
              <span slot="append">米</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="层数" prop="proLayer" verify class="is-required">
            <t-int-input v-model="dataForm.proLayer" :readOnly="readOnly">
              <span slot="append">层</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="栋数" prop="proBlock" verify class="is-required">
            <t-int-input v-model="dataForm.proBlock" :readOnly="readOnly">
              <span slot="append">栋</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地下室" prop="proBasementArea" verify class="is-required">
            <t-int-input v-model="dataForm.proBasementArea" :readOnly="readOnly">
              <span slot="append">平方米、层</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proIsFitout" label="是否为装配式">
            <el-input v-model="dataForm.proIsFitout"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="装配率" prop="proFitoutRate" verify class="is-required">
            <t-int-input v-model="dataForm.proFitoutRate" :readOnly="readOnly">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="proIsBim" label="是否应用BIM技术">
            <el-input v-model="dataForm.proIsBim"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="processBranch" label="申请竣工日期">
            <el-input v-model="dataForm.completedTime"></el-input>
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
          })
        }
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
