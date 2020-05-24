<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">密钥领用归还申请</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'备案信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="pcId">
              <t-record-select v-model="dataForm.pcId" @selectedRecord="getSelectedRecord"></t-record-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属分公司">
              <el-input v-model="dataForm.proSubCompany" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="所属事业部">
              <el-input v-model="dataForm.proBusDept" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位">
              <el-input v-model="dataForm.proConstructCompany" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttr" label="  合同模式">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr"
                                     readonly></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="投资金额">
              <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proType" label="工程类别">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType"
                                     readonly></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proRunMode" label="经营方式">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildArea" label="计划项目规模">
              <el-input v-model="dataForm.proBuildArea" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'密钥信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="province" label="所属地区">
              <t-region-picker ref="regionPicker" @province="getProvince" @city="getCity" :disabled="isEdit" :readOnly="readOnly"></t-region-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="keyType" label="密钥类别">
              <t-dic-dropdown-select dicType="key_type" v-model="dataForm.keyType"
                                     :readOnly="readOnly" :disabled="isEdit"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="authCompany" label="批准单位">
              <el-input v-model="dataForm.authCompany" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="loginUsername" label="登录网名">
              <el-input v-model="dataForm.loginUsername" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="loginUrl" label="登录网址">
              <el-input v-model="dataForm.loginUrl" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="expirationDate" label="有效期至">
              <el-input v-model="dataForm.expirationDate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item  label="用途">
              <t-input type="textarea" :rows="3"readonly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="用户名">
              <el-input v-model="dataForm.proSubCompany" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="密码">
              <el-input v-model="dataForm.proSubCompany" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="principalId" label="主要负责人">
              <el-input v-model="dataForm.principalId" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="keyColor" label="密钥颜色">
              <el-input v-model="dataForm.keyColor" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="existElectMark" label="是否有电子签章功能" label-width="180px">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.proSubCompany"
                                  :readOnly="readOnly"></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="" label="办理单位">
              <el-input v-model="dataForm.proSubCompany" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="领用单位:">
              <span>该项目所属分公司</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="useScenes" label="用途:">
              <t-input v-model="dataForm.useScenes"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="领用期限:">
              <t-datetime-range-picker v-model="dataForm.limitStarttime">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="getTime" label="领用时间:">
              <el-input v-model="dataForm.getTime" placeholder="经营部主管审核后自动更新" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="returnTime" label="归还时间:">
              <el-input v-model="dataForm.returnTime" placeholder="经营部主管确认归还后自动更新" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人:">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办时间:">
              <span>{{dataForm.signTime}}</span>
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
  import baseView from '@/base/baseView'
  export default {
    extends: baseView,
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pcId: '',
          keyId: '',
          proSubCompany: '',
          useScenes: '',
          limitStarttime: '',
          limitEnditme: '',
          getTime: '',
          returnTime: '',
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
          bId: [
            {required: false, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: false, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          pcId: [
            {required: false, message: '项目备案id不能为空', trigger: 'blur'}
          ],
          keyId: [
            {required: false, message: '密钥id不能为空', trigger: 'blur'}
          ],
          proSubCompany: [
            {required: false, message: '该项目所属分公司不能为空', trigger: 'blur'}
          ],
          useScenes: [
            {required: false, message: '用途不能为空', trigger: 'blur'}
          ],
          limitStarttime: [
            {required: false, message: '领用期限-开始时间不能为空', trigger: 'blur'}
          ],
          limitEnditme: [
            {required: false, message: '领用期限-结束时间不能为空', trigger: 'blur'}
          ],
          getTime: [
            {required: false, message: '领用时间不能为空', trigger: 'blur'}
          ],
          returnTime: [
            {required: false, message: '归还时间不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: false, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: false, message: '执行时间不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: false, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: false, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: false, message: '审核结果不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {},
    activated () {
      this.$nextTick((_) => {
        if (this.routeChanged) {
          this.docId = this.$route.query.id
          this.init(this.docId)
        }
      })
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,
      })
    },

    methods: {
      getSelectedRecord(pcId) {
        console.log('current proName', pcId)
        this.dataForm.proName = pcId.proName
        this.dataForm.proSubCompany = pcId.proSubCompany
        this.dataForm.proBusDept = pcId.proBusDept
        this.dataForm.proConstructCompany = pcId.proConstructCompany
        this.dataForm.proContractAttr = pcId.proContractAttr
        this.dataForm.proTotalInvestment = pcId.proTotalInvestment
        this.dataForm.proType = pcId.proType
        this.dataForm.proRunMode = pcId.proRunMode
        this.dataForm.proBuildArea = pcId.proBuildArea
        this.dataForm.authCompany = pcId.authCompany






      },
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tBidPckeyApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tBidPckeyApproval.bId
                this.dataForm.actTaskKey = result.tBidPckeyApproval.actTaskKey
                this.dataForm.pcId = result.tBidPckeyApproval.pcId
                this.dataForm.keyId = result.tBidPckeyApproval.keyId
                this.dataForm.proSubCompany = result.tBidPckeyApproval.proSubCompany
                this.dataForm.useScenes = result.tBidPckeyApproval.useScenes
                this.dataForm.limitStarttime = result.tBidPckeyApproval.limitStarttime
                this.dataForm.limitEnditme = result.tBidPckeyApproval.limitEnditme
                this.dataForm.getTime = result.tBidPckeyApproval.getTime
                this.dataForm.returnTime = result.tBidPckeyApproval.returnTime
                this.dataForm.sign = result.tBidPckeyApproval.sign
                this.dataForm.signTime = result.tBidPckeyApproval.signTime
                this.dataForm.approvalStatus = result.tBidPckeyApproval.approvalStatus
                this.dataForm.propose = result.tBidPckeyApproval.propose
                this.dataForm.result = result.tBidPckeyApproval.result
                this.dataForm.createtime = result.tBidPckeyApproval.createtime
                this.dataForm.updatetime = result.tBidPckeyApproval.updatetime
                this.dataForm.createuser = result.tBidPckeyApproval.createuser
                this.dataForm.updateuser = result.tBidPckeyApproval.updateuser
                this.dataForm.datastatus = result.tBidPckeyApproval.datastatus
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
          tapp.services.tBidPckeyApproval.save(model).then(function (result) {
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
