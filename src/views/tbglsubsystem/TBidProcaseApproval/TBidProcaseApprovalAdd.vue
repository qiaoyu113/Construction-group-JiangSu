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
      <t-sub-title :title="'备案信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proCode" label="项目备案编号">
            <el-input v-model="dataForm.proCode" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="备案单位">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBusDept" label="事业部">
            <el-input v-model="dataForm.proBusDept" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item prop="proName" label="拟建项目名称">
            <el-input v-model="dataForm.proName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="proIntroduce" label="项目简介">
            <t-input type="textarea" :rows="3" v-model="dataForm.proIntroduce" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proAddressProvince" label="项目地点">
            <el-row :gutter="0">
              <el-col :span="12">
                <t-dic-dropdown-select dicType="base_region" v-model="dataForm.proAddressProvince"
                                       :readOnly="readOnly"></t-dic-dropdown-select>
              </el-col>
              <el-col :span="12">
                <t-dic-dropdown-select dicType="base_region" v-model="dataForm.proAddressCity"
                                       :readOnly="readOnly"></t-dic-dropdown-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proAddressDetail" label="项目地址-详细">
            <el-input v-model="dataForm.proAddressDetail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proConstructCompany" label="建设单位">
            <el-input v-model="dataForm.proConstructCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proTotalInvestment" label="投资金额">
            <el-input v-model="dataForm.proTotalInvestment"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proType" label="工程类别">
            <t-dic-dropdown-select dicType="1260861756058767362" v-model="dataForm.proType"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContractAttr" label="计划合同模式">
            <t-dic-dropdown-select dicType="1260862577664200706" v-model="dataForm.proContractAttr"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRunMode" label="计划经营方式">
            <t-dic-dropdown-select dicType="1260863139436695554" v-model="dataForm.proRunMode"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proUnionCompany" label="合作单位">
            <el-input v-model="dataForm.proUnionCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBuildArea" label="计划项目规模">
            <el-input v-model="dataForm.proBuildArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="planBidDate" label="计划投标日期">
           <!-- <el-input v-model="dataForm.planBidDate"></el-input>-->
            <t-datetime-picker v-model="dataForm.planBidDate" type="date" :readOnly="readOnly">
            </t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proTracker" label="项目跟踪人">
            <el-input v-model="dataForm.proTracker"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="contactNum" label="联系方式">
            <el-input v-model="dataForm.contactNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="brRemark" label="备注">
            <t-input type="textarea" :rows="3" v-model="dataForm.brRemark" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-col :span="8">
        <el-form-item prop="sign" label="备案人">
          <span>{{dataForm.sign}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="signTime" label="备案时间">
          <span>{{dataForm.signTime}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="createtime" label="最近更新时间">
          <span>{{dataForm.createtime}}</span>
        </el-form-item>
      </el-col>
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
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          proCode: '',
          proSubCompany: '',
          proBusDept: '',
          proName: '',
          proIntroduce: '',
          proAddressProvince: '',
          proAddressCity: '',
          proAddressDetail: '',
          proConstructCompany: '',
          proConstructCompanyAttr: '',
          proTotalInvestment: '',
          proType: '',
          proContractAttr: '',
          proRunMode: '',
          proUnionCompany: '',
          proBuildArea: '',
          planBidDate: '',
          proTracker: '',
          contactNum: '',
          bidResult: '',
          bidCount: '',
          brUser: '',
          brTime: '',
          brRemark: '',
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

          proCode: [
            {required: false, message: '项目备案编号不能为空', trigger: 'blur'}
          ],
          proSubCompany: [
            {required: false, message: '所属分公司不能为空', trigger: 'blur'}
          ],
          proBusDept: [
            {required: false, message: '所属事业部不能为空', trigger: 'blur'}
          ],
          proName: [
            {required: true, message: '拟建项目名称不能为空', trigger: 'blur'}
          ],
          proIntroduce: [
            {required: false, message: '项目简介不能为空', trigger: 'blur'}
          ],
          proAddressProvince: [
            {required: true, message: '项目地址-省不能为空', trigger: 'blur'}
          ],
          proAddressCity: [
            {required: true, message: '项目地址-市不能为空', trigger: 'blur'}
          ],
          proAddressDetail: [
            {required: true, message: '项目地址-详细不能为空', trigger: 'blur'}
          ],
          proConstructCompany: [
            {required: true, message: '建设单位不能为空', trigger: 'blur'}
          ],
          proTotalInvestment: [
            {required: true, message: '项目总投资-元不能为空', trigger: 'blur'}
          ],
          proType: [
            {required: true, message: '工程类别不能为空', trigger: 'blur'}
          ],
          proContractAttr: [
            {required: false, message: '计划合同模式不能为空', trigger: 'blur'}
          ],
          proRunMode: [
            {required: true, message: '计划经营方式不能为空', trigger: 'blur'}
          ],
          proUnionCompany: [
            {required: false, message: '联营公司不能为空', trigger: 'blur'}
          ],
          proBuildArea: [
            {required: false, message: '计划项目规模-建筑面积-平方米不能为空', trigger: 'blur'}
          ],
          planBidDate: [
            {required: false, message: '计划投标日期不能为空', trigger: 'blur'}
          ],
          proTracker: [
            {required: true, message: '项目跟踪人不能为空', trigger: 'blur'}
          ],
          contactNum: [
            {required: false, message: '联系方式不能为空', trigger: 'blur'}
          ],
          brRemark: [
            {required: false, message: '投标结果备注不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
       this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tBidProcaseApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tBidProcaseApproval.bId
                this.dataForm.actTaskKey = result.tBidProcaseApproval.actTaskKey
                this.dataForm.proCode = result.tBidProcaseApproval.proCode
                this.dataForm.proSubCompany = result.tBidProcaseApproval.proSubCompany
                this.dataForm.proBusDept = result.tBidProcaseApproval.proBusDept
                this.dataForm.proName = result.tBidProcaseApproval.proName
                this.dataForm.proIntroduce = result.tBidProcaseApproval.proIntroduce
                this.dataForm.proAddressProvince = result.tBidProcaseApproval.proAddressProvince
                this.dataForm.proAddressCity = result.tBidProcaseApproval.proAddressCity
                this.dataForm.proAddressDetail = result.tBidProcaseApproval.proAddressDetail
                this.dataForm.proConstructCompany = result.tBidProcaseApproval.proConstructCompany
                this.dataForm.proConstructCompanyAttr = result.tBidProcaseApproval.proConstructCompanyAttr
                this.dataForm.proTotalInvestment = result.tBidProcaseApproval.proTotalInvestment
                this.dataForm.proType = result.tBidProcaseApproval.proType
                this.dataForm.proContractAttr = result.tBidProcaseApproval.proContractAttr
                this.dataForm.proRunMode = result.tBidProcaseApproval.proRunMode
                this.dataForm.proUnionCompany = result.tBidProcaseApproval.proUnionCompany
                this.dataForm.proBuildArea = result.tBidProcaseApproval.proBuildArea
                this.dataForm.planBidDate = result.tBidProcaseApproval.planBidDate
                this.dataForm.proTracker = result.tBidProcaseApproval.proTracker
                this.dataForm.contactNum = result.tBidProcaseApproval.contactNum
                this.dataForm.bidResult = result.tBidProcaseApproval.bidResult
                this.dataForm.bidCount = result.tBidProcaseApproval.bidCount
                this.dataForm.brUser = result.tBidProcaseApproval.brUser
                this.dataForm.brTime = result.tBidProcaseApproval.brTime
                this.dataForm.brRemark = result.tBidProcaseApproval.brRemark
                this.dataForm.sign = result.tBidProcaseApproval.sign
                this.dataForm.signTime = result.tBidProcaseApproval.signTime
                this.dataForm.approvalStatus = result.tBidProcaseApproval.approvalStatus
                this.dataForm.propose = result.tBidProcaseApproval.propose
                this.dataForm.result = result.tBidProcaseApproval.result
                this.dataForm.createtime = result.tBidProcaseApproval.createtime
                this.dataForm.updatetime = result.tBidProcaseApproval.updatetime
                this.dataForm.createuser = result.tBidProcaseApproval.createuser
                this.dataForm.updateuser = result.tBidProcaseApproval.updateuser
                this.dataForm.datastatus = result.tBidProcaseApproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate();
          })
        }
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tBidProcaseApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: "操作成功！",
              message: "保存成功！",
            });
          });
        }).catch(function (e) {
          self.$notify.error({
            title: "错误",
            message: "保存失败！"
          });
          return false;
        });
      }
    }
  }
</script>
