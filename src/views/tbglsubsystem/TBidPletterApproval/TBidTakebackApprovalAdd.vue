<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
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
              <t-input v-model="dataForm.proSubCompany" readonly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="所属事业部">
              <t-input v-model="dataForm.proBusDept" readonly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位">
              <t-input v-model="dataForm.proConstructCompany" readonly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttr" label="合同模式">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr"
                                     readonly></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="投资金额">
              <t-input v-model="dataForm.proTotalInvestment" readonly></t-input>
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
                                     readonly></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildArea" label="计划规模项目">
              <t-input v-model="dataForm.proBuildArea" readonly></t-input>
            </el-form-item>
          </el-col>
        </el-row>

        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="pId" label="保证金(保函)退回" label-width="180px">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.pId"
                                  :readOnly="readOnly"></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="amount" label="金额">
              <el-input v-model="dataForm.amount" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="isCash" label="是否现金缴纳">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.isCash"
                                  readonly></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="generateBank" label="开立银行">
              <el-input v-model="dataForm.generateBank" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="generateTime" label="开立时间">
              <el-input v-model="dataForm.generateTime" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="invalidTime" label="到期时间">
              <el-input v-model="dataForm.invalidTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="plCode" label="保函编号">
              <el-input v-model="dataForm.plCode" readonly></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="sign" label="经办人">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办时间">
              <span>{{dataForm.signTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="remark" label="备注">
              <t-input type="textarea" :rows="3" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
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
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pcId: '',
          pId: '',
          prId: '',
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
          bId: [
            {required: false, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: true, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          amount: [
            {required: true, message: '金额不能为空', trigger: 'blur'}
          ],

          pcId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          pId: [
            {required: false, message: '投标保证金申请不能为空', trigger: 'blur'}
          ],
          prId: [
            {required: true, message: '投标保证金不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: false, message: '备注不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: false, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: false, message: '执行时间不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: false, message: '审批状态不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: true, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: true, message: '审核结果不能为空', trigger: 'blur'}
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
    created() {
      this.init()
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

      },
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tBidTakebackApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tBidTakebackApproval.bId
                this.dataForm.actTaskKey = result.tBidTakebackApproval.actTaskKey
                this.dataForm.pcId = result.tBidTakebackApproval.pcId
                this.dataForm.pId = result.tBidTakebackApproval.pId
                this.dataForm.prId = result.tBidTakebackApproval.prId
                this.dataForm.remark = result.tBidTakebackApproval.remark
                this.dataForm.sign = result.tBidTakebackApproval.sign
                this.dataForm.signTime = result.tBidTakebackApproval.signTime
                this.dataForm.approvalStatus = result.tBidTakebackApproval.approvalStatus
                this.dataForm.propose = result.tBidTakebackApproval.propose
                this.dataForm.result = result.tBidTakebackApproval.result
                this.dataForm.createtime = result.tBidTakebackApproval.createtime
                this.dataForm.updatetime = result.tBidTakebackApproval.updatetime
                this.dataForm.createuser = result.tBidTakebackApproval.createuser
                this.dataForm.updateuser = result.tBidTakebackApproval.updateuser
                this.dataForm.datastatus = result.tBidTakebackApproval.datastatus
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
          tapp.services.tBidTakebackApproval.save(model).then(function (result) {
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
