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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px" label-position="right">
      <t-sub-title :title="'付款申请信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pId" label="项目名称">
            <el-input v-model="dataForm.pId" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRunMode" label="经营方式">
<!--            <el-input v-model="dataForm.proRunMode" readonly></el-input>-->
            <t-dic-dropdown-select dicType="public_sex" v-model="dataForm.paymentType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRunMode" label="项目合同额">
            <el-input v-model="dataForm.proRunMode" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
      <el-col :span="8">
          <el-form-item prop="fundPurpose" label="资金用途">
<!--            <el-input v-model="dataForm.fundPurpose"></el-input>-->
            <t-dic-dropdown-select dicType="public_sex" v-model="dataForm.paymentType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="paymentType" label="本次付款类型">
            <t-dic-dropdown-select dicType="public_sex" v-model="dataForm.paymentType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="8">
          <el-form-item prop="scId" label="子合同名称">
            <el-input v-model="dataForm.scId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="scId" label="子合同编号">
            <el-input v-model="dataForm.scId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="scId" label="子合同金额">
            <el-input v-model="dataForm.scId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="24">
          <el-form-item prop="processBranch" label="流程审批">
            <t-dic-radio-select dicType="pl_loanenter_job" class="el-radio-group-vertical" v-model="dataForm.processBranch" :readOnly="readOnly"></t-dic-radio-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
<!--        <el-col :span="8">-->
<!--          <el-form-item prop="unionCompany" label="联营单位标识">-->
<!--            <el-input v-model="dataForm.unionCompany"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item prop="paymentWay" label="付款方式">-->
<!--&lt;!&ndash;            <el-input v-model="dataForm.paymentWay"></el-input>&ndash;&gt;-->
<!--            <t-dic-dropdown-select dicType="public_sex" v-model="dataForm.paymentWay" :readOnly="readOnly"></t-dic-dropdown-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item prop="rId" label="到账标识id">-->
<!--            <el-input v-model="dataForm.rId"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col :span="8">
          <el-form-item prop="totalReceived" label="本项目累计已收款">
            <el-input v-model="dataForm.totalReceived"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="totalReceivedRatio" label="已收款比例">
            <el-input v-model="dataForm.totalReceivedRatio"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="8">
          <el-form-item prop="totalPayment" label="本项目累计已付款">
            <el-input v-model="dataForm.totalPayment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="8">
          <el-form-item prop="scTotalReceived" label="当前子合同累计已付款">
            <el-input v-model="dataForm.scTotalReceived"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="scTotalReceivedRatio" label="当前子合同累计已付款比例">
            <el-input v-model="dataForm.scTotalReceivedRatio"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="8">
          <el-form-item prop="paymentAmount" label="本次付款金额">
            <el-input v-model="dataForm.paymentAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="afterThisRatio" label="累计付款比例">
            <el-input v-model="dataForm.afterThisRatio"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="8">
          <el-form-item prop="leftoverAmount" label="本项目余款">
            <el-input v-model="dataForm.leftoverAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="leftoverAmountRatio" label="项目余款比例">
            <el-input v-model="dataForm.leftoverAmountRatio"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row gutter="20">
        <el-col :span="8">
          <el-form-item prop="sign" label="执行人">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="执行时间">
            <el-input v-model="dataForm.signTime"></el-input>
          </el-form-item>
        </el-col>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="remark" label="备注">
              <el-input type="textarea" v-model="dataForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <t-sub-title :title="'收款单位信息'"></t-sub-title>
      <el-row gutter="20">
        <el-col :span="8">
          <el-form-item prop="receiveCompany" label="收款单位">
            <el-input v-model="dataForm.receiveCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankName" label="开户行名称">
            <el-input v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankAccountName" label="银行帐户名称">
            <el-input v-model="dataForm.bankAccountName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankAccount" label="银行帐号">
            <el-input v-model="dataForm.bankAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="contacter" label="联系人">
            <el-input v-model="dataForm.contacter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="contacterTel" label="联系电话">
            <el-input v-model="dataForm.contacterTel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
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
          bId: '',actTaskKey: '',pId: '',proRunMode: '',unionCompany: '',scId: '',paymentType: '',
          fundPurpose: '',processBranch: '',paymentWay: '',rId: '',totalReceived: '',
          totalReceivedRatio: '',totalPayment: '',scTotalReceived: '',scTotalReceivedRatio: '',
          paymentAmount: '',afterThisRatio: '',leftoverAmount: '',leftoverAmountRatio: '',receiveCompany: '',
          bankName: '',bankAccountName: '',bankAccount: '',contacter: '',contacterTel: '',approvalStatus: '',sign: '',
          signTime: new Date(),propose: '',result: '',createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: ''                                                                                        },
        dataRule: {
          bId: [
            { required: true, message: '业务id用于和一个流程实例绑定不能为空', trigger: 'blur' }
          ],
          actTaskKey: [
            { required: true, message: 'activiti执行任务key不能为空', trigger: 'blur' }
          ],
          pId: [
            { required: true, message: '项目id不能为空', trigger: 'blur' }
          ],
          proRunMode: [
            { required: true, message: '经营方式（字典表）不能为空', trigger: 'blur' }
          ],
          unionCompany: [
            { required: true, message: '联营单位标识不能为空', trigger: 'blur' }
          ],
          scId: [
            { required: true, message: '子合同id不能为空', trigger: 'blur' }
          ],
          paymentType: [
            { required: true, message: '本次付款类型（字典表）不能为空', trigger: 'blur' }
          ],
          fundPurpose: [
            { required: true, message: '资金用途（字典表）不能为空', trigger: 'blur' }
          ],
          processBranch: [
            { required: true, message: '流程审批不能为空', trigger: 'blur' }
          ],
          paymentWay: [
            { required: true, message: '付款方式（字典表）不能为空', trigger: 'blur' }
          ],
          rId: [
            { required: true, message: '到账标识id不能为空', trigger: 'blur' }
          ],
          totalReceived: [
            { required: true, message: '本项目累计已收款不能为空', trigger: 'blur' }
          ],
          totalReceivedRatio: [
            { required: true, message: '已收款比例不能为空', trigger: 'blur' }
          ],
          totalPayment: [
            { required: true, message: '本项目累计已付款不能为空', trigger: 'blur' }
          ],
          scTotalReceived: [
            { required: true, message: '当前子合同累计已付款不能为空', trigger: 'blur' }
          ],
          scTotalReceivedRatio: [
            { required: true, message: '当前子合同累计已付款比例不能为空', trigger: 'blur' }
          ],
          paymentAmount: [
            { required: true, message: '本次付款金额不能为空', trigger: 'blur' }
          ],
          afterThisRatio: [
            { required: true, message: '累计付款比例不能为空', trigger: 'blur' }
          ],
          leftoverAmount: [
            { required: true, message: '本项目余款不能为空', trigger: 'blur' }
          ],
          leftoverAmountRatio: [
            { required: true, message: '项目余款比例不能为空', trigger: 'blur' }
          ],
          receiveCompany: [
            { required: true, message: '收款单位不能为空', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '开户行名称不能为空', trigger: 'blur' }
          ],
          bankAccountName: [
            { required: true, message: '银行帐户名称不能为空', trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '银行帐号不能为空', trigger: 'blur' }
          ],
          contacter: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          contacterTel: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ],
          approvalStatus: [
            { required: true, message: '审批状态（字典表）不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          propose: [
            { required: true, message: '审核意见不能为空', trigger: 'blur' }
          ],
          result: [
            { required: true, message: '审核结果不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updatetime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          createuser: [
            { required: true, message: '创建人不能为空', trigger: 'blur' }
          ],
          updateuser: [
            { required: true, message: '更新人不能为空', trigger: 'blur' }
          ],
          datastatus: [
            { required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      // this.init()
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.finaPaymenapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaPaymenapproval.bId
                this.dataForm.actTaskKey = result.finaPaymenapproval.actTaskKey
                this.dataForm.pId = result.finaPaymenapproval.pId
                this.dataForm.proRunMode = result.finaPaymenapproval.proRunMode
                this.dataForm.unionCompany = result.finaPaymenapproval.unionCompany
                this.dataForm.scId = result.finaPaymenapproval.scId
                this.dataForm.paymentType = result.finaPaymenapproval.paymentType
                this.dataForm.fundPurpose = result.finaPaymenapproval.fundPurpose
                this.dataForm.processBranch = result.finaPaymenapproval.processBranch
                this.dataForm.paymentWay = result.finaPaymenapproval.paymentWay
                this.dataForm.rId = result.finaPaymenapproval.rId
                this.dataForm.totalReceived = result.finaPaymenapproval.totalReceived
                this.dataForm.totalReceivedRatio = result.finaPaymenapproval.totalReceivedRatio
                this.dataForm.totalPayment = result.finaPaymenapproval.totalPayment
                this.dataForm.scTotalReceived = result.finaPaymenapproval.scTotalReceived
                this.dataForm.scTotalReceivedRatio = result.finaPaymenapproval.scTotalReceivedRatio
                this.dataForm.paymentAmount = result.finaPaymenapproval.paymentAmount
                this.dataForm.afterThisRatio = result.finaPaymenapproval.afterThisRatio
                this.dataForm.leftoverAmount = result.finaPaymenapproval.leftoverAmount
                this.dataForm.leftoverAmountRatio = result.finaPaymenapproval.leftoverAmountRatio
                this.dataForm.receiveCompany = result.finaPaymenapproval.receiveCompany
                this.dataForm.bankName = result.finaPaymenapproval.bankName
                this.dataForm.bankAccountName = result.finaPaymenapproval.bankAccountName
                this.dataForm.bankAccount = result.finaPaymenapproval.bankAccount
                this.dataForm.contacter = result.finaPaymenapproval.contacter
                this.dataForm.contacterTel = result.finaPaymenapproval.contacterTel
                this.dataForm.approvalStatus = result.finaPaymenapproval.approvalStatus
                this.dataForm.sign = result.finaPaymenapproval.sign
                this.dataForm.signTime = result.finaPaymenapproval.signTime
                this.dataForm.propose = result.finaPaymenapproval.propose
                this.dataForm.result = result.finaPaymenapproval.result
                this.dataForm.createtime = result.finaPaymenapproval.createtime
                this.dataForm.updatetime = result.finaPaymenapproval.updatetime
                this.dataForm.createuser = result.finaPaymenapproval.createuser
                this.dataForm.updateuser = result.finaPaymenapproval.updateuser
                this.dataForm.datastatus = result.finaPaymenapproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          })
        }
      },
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaPaymenapproval.save(model).then(function(result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: "操作成功！",
              message: "保存成功！",
            });
          });
        }).catch(function(e) {
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
