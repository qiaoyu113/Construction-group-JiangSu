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
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bId" label="业务id用于和一个流程实例绑定">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="activiti执行任务key">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="项目id">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cId" label="合同id">
            <el-input v-model="dataForm.cId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="taxMethod" label="计税方法（字典表）">
            <el-input v-model="dataForm.taxMethod"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invoiceType" label="发票类别（字典表）">
            <el-input v-model="dataForm.invoiceType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="levyRate" label="适用税率或征收率">
            <el-input v-model="dataForm.levyRate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="isLevyTax" label="有无预征税款（字典表）">
            <el-input v-model="dataForm.isLevyTax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="levyTaxNum" label="预征税款完税凭证号码">
            <el-input v-model="dataForm.levyTaxNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invoiceAmount" label="申请开票金额（元）">
            <el-input v-model="dataForm.invoiceAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="deductAmount" label="可抵扣分包金额（元）">
            <el-input v-model="dataForm.deductAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="isReceivables" label="有无应收款（字典表）">
            <el-input v-model="dataForm.isReceivables"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="vat" label="增值税（元）">
            <el-input v-model="dataForm.vat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="uct" label="城建税（元）">
            <el-input v-model="dataForm.uct"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="est" label="教育费附加（元）">
            <el-input v-model="dataForm.est"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="lest" label="地方教育费附加（元）">
            <el-input v-model="dataForm.lest"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="st" label="印花税（元）">
            <el-input v-model="dataForm.st"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cit" label="企业所得税（元）">
            <el-input v-model="dataForm.cit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pit" label="个人所得税（元）">
            <el-input v-model="dataForm.pit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="ot" label="其他（元）">
            <el-input v-model="dataForm.ot"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="taxBureau" label="预缴税务局">
            <el-input v-model="dataForm.taxBureau"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="taxStartTime" label="税款所属开始时间">
            <el-input v-model="dataForm.taxStartTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="taxEndTime" label="税款所属结束时间">
            <el-input v-model="dataForm.taxEndTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="paymentDate" label="交税日期">
            <el-input v-model="dataForm.paymentDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="lId" label="外经证号标识id">
            <el-input v-model="dataForm.lId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invoiceDate" label="开票日期">
            <el-input v-model="dataForm.invoiceDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invoiceNum" label="发票号码">
            <el-input v-model="dataForm.invoiceNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="审批状态（字典表）">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
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
        <el-col :span="8">
          <el-form-item prop="propose" label="审核意见">
            <el-input v-model="dataForm.propose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="result" label="审核结果">
            <el-input v-model="dataForm.result"></el-input>
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
          bId: '',                                                                                                                                                            actTaskKey: '',                                                                                                                                                            pId: '',                                                                                                                                                            cId: '',                                                                                                                                                            taxMethod: '',                                                                                                                                                            invoiceType: '',                                                                                                                                                            levyRate: '',                                                                                                                                                            isLevyTax: '',                                                                                                                                                            levyTaxNum: '',                                                                                                                                                            invoiceAmount: '',                                                                                                                                                            deductAmount: '',                                                                                                                                                            isReceivables: '',                                                                                                                                                            vat: '',                                                                                                                                                            uct: '',                                                                                                                                                            est: '',                                                                                                                                                            lest: '',                                                                                                                                                            st: '',                                                                                                                                                            cit: '',                                                                                                                                                            pit: '',                                                                                                                                                            ot: '',                                                                                                                                                            taxBureau: '',                                                                                                                                                            taxStartTime: '',                                                                                                                                                            taxEndTime: '',                                                                                                                                                            paymentDate: '',                                                                                                                                                            lId: '',                                                                                                                                                            invoiceDate: '',                                                                                                                                                            invoiceNum: '',                                                                                                                                                            approvalStatus: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            propose: '',                                                                                                                                                            result: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
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
          cId: [
            { required: true, message: '合同id不能为空', trigger: 'blur' }
          ],
          taxMethod: [
            { required: true, message: '计税方法（字典表）不能为空', trigger: 'blur' }
          ],
          invoiceType: [
            { required: true, message: '发票类别（字典表）不能为空', trigger: 'blur' }
          ],
          levyRate: [
            { required: true, message: '适用税率或征收率不能为空', trigger: 'blur' }
          ],
          isLevyTax: [
            { required: true, message: '有无预征税款（字典表）不能为空', trigger: 'blur' }
          ],
          levyTaxNum: [
            { required: true, message: '预征税款完税凭证号码不能为空', trigger: 'blur' }
          ],
          invoiceAmount: [
            { required: true, message: '申请开票金额（元）不能为空', trigger: 'blur' }
          ],
          deductAmount: [
            { required: true, message: '可抵扣分包金额（元）不能为空', trigger: 'blur' }
          ],
          isReceivables: [
            { required: true, message: '有无应收款（字典表）不能为空', trigger: 'blur' }
          ],
          vat: [
            { required: true, message: '增值税（元）不能为空', trigger: 'blur' }
          ],
          uct: [
            { required: true, message: '城建税（元）不能为空', trigger: 'blur' }
          ],
          est: [
            { required: true, message: '教育费附加（元）不能为空', trigger: 'blur' }
          ],
          lest: [
            { required: true, message: '地方教育费附加（元）不能为空', trigger: 'blur' }
          ],
          st: [
            { required: true, message: '印花税（元）不能为空', trigger: 'blur' }
          ],
          cit: [
            { required: true, message: '企业所得税（元）不能为空', trigger: 'blur' }
          ],
          pit: [
            { required: true, message: '个人所得税（元）不能为空', trigger: 'blur' }
          ],
          ot: [
            { required: true, message: '其他（元）不能为空', trigger: 'blur' }
          ],
          taxBureau: [
            { required: true, message: '预缴税务局不能为空', trigger: 'blur' }
          ],
          taxStartTime: [
            { required: true, message: '税款所属开始时间不能为空', trigger: 'blur' }
          ],
          taxEndTime: [
            { required: true, message: '税款所属结束时间不能为空', trigger: 'blur' }
          ],
          paymentDate: [
            { required: true, message: '交税日期不能为空', trigger: 'blur' }
          ],
          lId: [
            { required: true, message: '外经证号标识id不能为空', trigger: 'blur' }
          ],
          invoiceDate: [
            { required: true, message: '开票日期不能为空', trigger: 'blur' }
          ],
          invoiceNum: [
            { required: true, message: '发票号码不能为空', trigger: 'blur' }
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
              tapp.services.finaBinvoiceApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaBinvoiceApproval.bId
                this.dataForm.actTaskKey = result.finaBinvoiceApproval.actTaskKey
                this.dataForm.pId = result.finaBinvoiceApproval.pId
                this.dataForm.cId = result.finaBinvoiceApproval.cId
                this.dataForm.taxMethod = result.finaBinvoiceApproval.taxMethod
                this.dataForm.invoiceType = result.finaBinvoiceApproval.invoiceType
                this.dataForm.levyRate = result.finaBinvoiceApproval.levyRate
                this.dataForm.isLevyTax = result.finaBinvoiceApproval.isLevyTax
                this.dataForm.levyTaxNum = result.finaBinvoiceApproval.levyTaxNum
                this.dataForm.invoiceAmount = result.finaBinvoiceApproval.invoiceAmount
                this.dataForm.deductAmount = result.finaBinvoiceApproval.deductAmount
                this.dataForm.isReceivables = result.finaBinvoiceApproval.isReceivables
                this.dataForm.vat = result.finaBinvoiceApproval.vat
                this.dataForm.uct = result.finaBinvoiceApproval.uct
                this.dataForm.est = result.finaBinvoiceApproval.est
                this.dataForm.lest = result.finaBinvoiceApproval.lest
                this.dataForm.st = result.finaBinvoiceApproval.st
                this.dataForm.cit = result.finaBinvoiceApproval.cit
                this.dataForm.pit = result.finaBinvoiceApproval.pit
                this.dataForm.ot = result.finaBinvoiceApproval.ot
                this.dataForm.taxBureau = result.finaBinvoiceApproval.taxBureau
                this.dataForm.taxStartTime = result.finaBinvoiceApproval.taxStartTime
                this.dataForm.taxEndTime = result.finaBinvoiceApproval.taxEndTime
                this.dataForm.paymentDate = result.finaBinvoiceApproval.paymentDate
                this.dataForm.lId = result.finaBinvoiceApproval.lId
                this.dataForm.invoiceDate = result.finaBinvoiceApproval.invoiceDate
                this.dataForm.invoiceNum = result.finaBinvoiceApproval.invoiceNum
                this.dataForm.approvalStatus = result.finaBinvoiceApproval.approvalStatus
                this.dataForm.sign = result.finaBinvoiceApproval.sign
                this.dataForm.signTime = result.finaBinvoiceApproval.signTime
                this.dataForm.propose = result.finaBinvoiceApproval.propose
                this.dataForm.result = result.finaBinvoiceApproval.result
                this.dataForm.createtime = result.finaBinvoiceApproval.createtime
                this.dataForm.updatetime = result.finaBinvoiceApproval.updatetime
                this.dataForm.createuser = result.finaBinvoiceApproval.createuser
                this.dataForm.updateuser = result.finaBinvoiceApproval.updateuser
                this.dataForm.datastatus = result.finaBinvoiceApproval.datastatus
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
          tapp.services.finaBinvoiceApproval.save(model).then(function(result) {
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
