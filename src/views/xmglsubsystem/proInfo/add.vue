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
             label-width="100px" label-position="right">
      <t-sub-title :title="'基本信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8" style="display: none">
          <el-form-item prop="pcId" label="备案项目id">
            <el-input v-model="dataForm.pcId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName">
            <el-input v-model="dataForm.proName" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCode" label="项目编号">
            <el-input v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proConstructCompany" label="建设单位">
            <el-input v-model="dataForm.proConstructCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proConstructCompanyAttr" label="单位性质（字典表）">
            <el-input v-model="dataForm.proConstructCompanyAttr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proAddressProvince" label="项目地址-省（字典表）">
            <el-input v-model="dataForm.proAddressProvince"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proAddressCity" label="项目地址-市（字典表）">
            <el-input v-model="dataForm.proAddressCity"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proAddressDetail" label="项目地址-详细">
            <el-input v-model="dataForm.proAddressDetail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proTotalInvestment" label="项目总投资">
            <el-input v-model="dataForm.proTotalInvestment"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属分公司">
            <el-input v-model="dataForm.proSubCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBusDept" label="所属事业部">
            <el-input v-model="dataForm.proBusDept"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proDriveSubject" label="实施主体（字典表）">
            <el-input v-model="dataForm.proDriveSubject"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContractAttr" label="承包形式（字典表）">
            <el-input v-model="dataForm.proContractAttr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proType" label="工程类别（字典表）">
            <el-input v-model="dataForm.proType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubType" label="类别子项（字典表）">
            <el-input v-model="dataForm.proSubType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proFundSource" label="资金来源（字典表）">
            <el-input v-model="dataForm.proFundSource"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proStructure" label="结构形式（字典表）">
            <el-input v-model="dataForm.proStructure"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContractScope" label="承包范围">
            <el-input v-model="dataForm.proContractScope"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proManager" label="项目经理">
            <el-input v-model="dataForm.proManager"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proWinAmount" label="中标金额-元">
            <el-input v-model="dataForm.proWinAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proWinAmountC" label="金额大写">
            <el-input v-model="dataForm.proWinAmountC"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proPlanStartDate" label="计划开工日期">
            <el-input v-model="dataForm.proPlanStartDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proPlanEndDate" label="计划完工日期">
            <el-input v-model="dataForm.proPlanEndDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRealStartDate" label="实际开工日期">
            <el-input v-model="dataForm.proRealStartDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRealEndDate" label="实际完工日期">
            <el-input v-model="dataForm.proRealEndDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proLimitTime" label="工程工期">
            <el-input v-model="dataForm.proLimitTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBuildArea" label="建筑面积-平方米">
            <el-input v-model="dataForm.proBuildArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSpan" label="高度/最大跨度-米">
            <el-input v-model="dataForm.proSpan"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proLayer" label="层数">
            <el-input v-model="dataForm.proLayer"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBlock" label="栋数">
            <el-input v-model="dataForm.proBlock"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBasementArea" label="地下室-平方米、层">
            <el-input v-model="dataForm.proBasementArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proIsFitout" label="是否为装配式（字典表）">
            <el-input v-model="dataForm.proIsFitout"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proFitoutRate" label="装配率-%">
            <el-input v-model="dataForm.proFitoutRate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proIsBim" label="是否应用BIM技术（字典表）">
            <el-input v-model="dataForm.proIsBim"></el-input>
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
          <el-form-item prop="proUnionCompany" label="联营公司id">
            <el-input v-model="dataForm.proUnionCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContacter" label="联系人">
            <el-input v-model="dataForm.proContacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCompanyHeader" label="负责人">
            <el-input v-model="dataForm.proCompanyHeader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContactway" label="联系方式">
            <el-input v-model="dataForm.proContactway"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRegister" label="登记人">
            <el-input v-model="dataForm.proRegister"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRegisterTime" label="登记时间">
            <el-input v-model="dataForm.proRegisterTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proStatue" label="项目状态（字典表）">
            <el-input v-model="dataForm.proStatue"></el-input>
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
          pcId: '',
          proCode: '',
          proName: '',
          proConstructCompany: '',
          proConstructCompanyAttr: '',
          proAddressProvince: '',
          proAddressCity: '',
          proAddressDetail: '',
          proTotalInvestment: '',
          proSubCompany: '',
          proBusDept: '',
          proDriveSubject: '',
          proContractAttr: '',
          proType: '',
          proSubType: '',
          proFundSource: '',
          proStructure: '',
          proContractScope: '',
          proManager: '',
          proWinAmount: '',
          proWinAmountC: '',
          proPlanStartDate: '',
          proPlanEndDate: '',
          proRealStartDate: '',
          proRealEndDate: '',
          proLimitTime: '',
          proBuildArea: '',
          proSpan: '',
          proLayer: '',
          proBlock: '',
          proBasementArea: '',
          proIsFitout: '',
          proFitoutRate: '',
          proIsBim: '',
          proRunMode: '',
          proProfitRate: '',
          proUnionCompanyMerate: '',
          proUnionCompany: '',
          proContacter: '',
          proCompanyHeader: '',
          proContactway: '',
          proRegister: '',
          proRegisterTime: '',
          proStatue: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          pcId: [
            {required: true, message: '备案项目id不能为空', trigger: 'blur'}
          ],
          proCode: [
            {required: true, message: '项目编号不能为空', trigger: 'blur'}
          ],
          proName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          proConstructCompany: [
            {required: true, message: '建设单位不能为空', trigger: 'blur'}
          ],
          proConstructCompanyAttr: [
            {required: true, message: '单位性质（字典表）不能为空', trigger: 'blur'}
          ],
          proAddressProvince: [
            {required: true, message: '项目地址-省（字典表）不能为空', trigger: 'blur'}
          ],
          proAddressCity: [
            {required: true, message: '项目地址-市（字典表）不能为空', trigger: 'blur'}
          ],
          proAddressDetail: [
            {required: true, message: '项目地址-详细不能为空', trigger: 'blur'}
          ],
          proTotalInvestment: [
            {required: true, message: '项目总投资不能为空', trigger: 'blur'}
          ],
          proSubCompany: [
            {required: true, message: '所属分公司不能为空', trigger: 'blur'}
          ],
          proBusDept: [
            {required: true, message: '所属事业部不能为空', trigger: 'blur'}
          ],
          proDriveSubject: [
            {required: true, message: '实施主体（字典表）不能为空', trigger: 'blur'}
          ],
          proContractAttr: [
            {required: true, message: '承包形式（字典表）不能为空', trigger: 'blur'}
          ],
          proType: [
            {required: true, message: '工程类别（字典表）不能为空', trigger: 'blur'}
          ],
          proSubType: [
            {required: true, message: '类别子项（字典表）不能为空', trigger: 'blur'}
          ],
          proFundSource: [
            {required: true, message: '资金来源（字典表）不能为空', trigger: 'blur'}
          ],
          proStructure: [
            {required: true, message: '结构形式（字典表）不能为空', trigger: 'blur'}
          ],
          proContractScope: [
            {required: true, message: '承包范围不能为空', trigger: 'blur'}
          ],
          proManager: [
            {required: true, message: '项目经理不能为空', trigger: 'blur'}
          ],
          proWinAmount: [
            {required: true, message: '中标金额-元不能为空', trigger: 'blur'}
          ],
          proWinAmountC: [
            {required: true, message: '金额大写不能为空', trigger: 'blur'}
          ],
          proPlanStartDate: [
            {required: true, message: '计划开工日期不能为空', trigger: 'blur'}
          ],
          proPlanEndDate: [
            {required: true, message: '计划完工日期不能为空', trigger: 'blur'}
          ],
          proRealStartDate: [
            {required: true, message: '实际开工日期不能为空', trigger: 'blur'}
          ],
          proRealEndDate: [
            {required: true, message: '实际完工日期不能为空', trigger: 'blur'}
          ],
          proLimitTime: [
            {required: true, message: '工程工期不能为空', trigger: 'blur'}
          ],
          proBuildArea: [
            {required: true, message: '建筑面积-平方米不能为空', trigger: 'blur'}
          ],
          proSpan: [
            {required: true, message: '高度/最大跨度-米不能为空', trigger: 'blur'}
          ],
          proLayer: [
            {required: true, message: '层数不能为空', trigger: 'blur'}
          ],
          proBlock: [
            {required: true, message: '栋数不能为空', trigger: 'blur'}
          ],
          proBasementArea: [
            {required: true, message: '地下室-平方米、层不能为空', trigger: 'blur'}
          ],
          proIsFitout: [
            {required: true, message: '是否为装配式（字典表）不能为空', trigger: 'blur'}
          ],
          proFitoutRate: [
            {required: true, message: '装配率-%不能为空', trigger: 'blur'}
          ],
          proIsBim: [
            {required: true, message: '是否应用BIM技术（字典表）不能为空', trigger: 'blur'}
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
            {required: true, message: '联营公司id不能为空', trigger: 'blur'}
          ],
          proContacter: [
            {required: true, message: '联系人不能为空', trigger: 'blur'}
          ],
          proCompanyHeader: [
            {required: true, message: '负责人不能为空', trigger: 'blur'}
          ],
          proContactway: [
            {required: true, message: '联系方式不能为空', trigger: 'blur'}
          ],
          proRegister: [
            {required: true, message: '登记人不能为空', trigger: 'blur'}
          ],
          proRegisterTime: [
            {required: true, message: '登记时间不能为空', trigger: 'blur'}
          ],
          proStatue: [
            {required: true, message: '项目状态（字典表）不能为空', trigger: 'blur'}
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
              tapp.services.proInfo.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.pcId = result.proInfo.pcId
                this.dataForm.proCode = result.proInfo.proCode
                this.dataForm.proName = result.proInfo.proName
                this.dataForm.proConstructCompany = result.proInfo.proConstructCompany
                this.dataForm.proConstructCompanyAttr = result.proInfo.proConstructCompanyAttr
                this.dataForm.proAddressProvince = result.proInfo.proAddressProvince
                this.dataForm.proAddressCity = result.proInfo.proAddressCity
                this.dataForm.proAddressDetail = result.proInfo.proAddressDetail
                this.dataForm.proTotalInvestment = result.proInfo.proTotalInvestment
                this.dataForm.proSubCompany = result.proInfo.proSubCompany
                this.dataForm.proBusDept = result.proInfo.proBusDept
                this.dataForm.proDriveSubject = result.proInfo.proDriveSubject
                this.dataForm.proContractAttr = result.proInfo.proContractAttr
                this.dataForm.proType = result.proInfo.proType
                this.dataForm.proSubType = result.proInfo.proSubType
                this.dataForm.proFundSource = result.proInfo.proFundSource
                this.dataForm.proStructure = result.proInfo.proStructure
                this.dataForm.proContractScope = result.proInfo.proContractScope
                this.dataForm.proManager = result.proInfo.proManager
                this.dataForm.proWinAmount = result.proInfo.proWinAmount
                this.dataForm.proWinAmountC = result.proInfo.proWinAmountC
                this.dataForm.proPlanStartDate = result.proInfo.proPlanStartDate
                this.dataForm.proPlanEndDate = result.proInfo.proPlanEndDate
                this.dataForm.proRealStartDate = result.proInfo.proRealStartDate
                this.dataForm.proRealEndDate = result.proInfo.proRealEndDate
                this.dataForm.proLimitTime = result.proInfo.proLimitTime
                this.dataForm.proBuildArea = result.proInfo.proBuildArea
                this.dataForm.proSpan = result.proInfo.proSpan
                this.dataForm.proLayer = result.proInfo.proLayer
                this.dataForm.proBlock = result.proInfo.proBlock
                this.dataForm.proBasementArea = result.proInfo.proBasementArea
                this.dataForm.proIsFitout = result.proInfo.proIsFitout
                this.dataForm.proFitoutRate = result.proInfo.proFitoutRate
                this.dataForm.proIsBim = result.proInfo.proIsBim
                this.dataForm.proRunMode = result.proInfo.proRunMode
                this.dataForm.proProfitRate = result.proInfo.proProfitRate
                this.dataForm.proUnionCompanyMerate = result.proInfo.proUnionCompanyMerate
                this.dataForm.proUnionCompany = result.proInfo.proUnionCompany
                this.dataForm.proContacter = result.proInfo.proContacter
                this.dataForm.proCompanyHeader = result.proInfo.proCompanyHeader
                this.dataForm.proContactway = result.proInfo.proContactway
                this.dataForm.proRegister = result.proInfo.proRegister
                this.dataForm.proRegisterTime = result.proInfo.proRegisterTime
                this.dataForm.proStatue = result.proInfo.proStatue
                this.dataForm.createtime = result.proInfo.createtime
                this.dataForm.updatetime = result.proInfo.updatetime
                this.dataForm.createuser = result.proInfo.createuser
                this.dataForm.updateuser = result.proInfo.updateuser
                this.dataForm.datastatus = result.proInfo.datastatus
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
          tapp.services.proInfo.save(model).then(function (result) {
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
