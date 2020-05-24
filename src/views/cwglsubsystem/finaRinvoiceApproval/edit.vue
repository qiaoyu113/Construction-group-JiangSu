<template>
  <div>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" plain icon="el-icon-s-data" @click="dialogVisible = true">
        审批流程图
      </el-button>
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
        <!-- businessKey值请修改当前流程的key值 -->
        <t-workflow-map businessKey="t_baseinfo_key_approval_process"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'蓝字发票信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="fInvoiceNum" label="蓝字发票号码">
            <el-input v-model="dataForm.fInvoiceNum" @change="getByInvoiceNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票金额">
            <el-input readonly v-model="dataForm.fInvoiceAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="对方单位名称">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方单位地址">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方联系电话">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纳税识别号">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户账号">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票类别">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票日期">
            <el-date-picker readonly v-model="dataForm.fInvoiceDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外经证号">
            <el-input readonly v-model="dataForm.invoiceDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目地址">
            <el-input readonly v-model="dataForm.proAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司">
            <el-input  v-model="dataForm.proSubCompany" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称">
            <el-input  v-model="dataForm.conName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同期间">
            <t-datetime-range-picker  v-model="dataForm.conPeriod" disabled></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额">
            <el-input  v-model="dataForm.conTotal" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'红字开票信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="申请开票金额">
            <t-currency-input v-model="dataForm.invoiceAmount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开票日期">
            <el-date-picker readonly type="date" v-model="dataForm.invoiceDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号码">
            <el-input readonly v-model="dataForm.invoiceNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="红字申请理由">
            <el-input type="textarea" v-model="dataForm.reason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="sign" label="经办人">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办时间">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="remark" label="备注">
            <el-input type="textarea" v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
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
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        dataForm: {
          bId: '',actTaskKey: '',pId: '',biId: '',invoiceAmount: '',reason: '',invoiceDate: '',fInvoiceAmount:'',
          invoiceCode: '',invoiceNum: '',approvalStatus: '',sign: '',signTime: '',propose: '',fInvoiceNum: '',
          result: '',createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: '' ,
          conPeriod: '',taxNo: '',secompanyTel: '',bankName: '', bankAccount:'',proName: '',proSubCompany:'',conName: '',
          secompanyAddress: '',secompanyName: '',proAddress: '',  fInvoiceDate: ''
        },
        dataRule: {
          fInvoiceNum: [
            { required: true, message: '蓝字发票信息不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    activated() {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })
    },
    methods: {
      // 根据发票号码获取发票信息
      getByInvoiceNum(val){
        let self = this;
        let model = { ...self.dataForm };
        if (val) {
          tapp.services.finaBinvoiceApproval.getByInvoiceNum(val).then(function(result) {
            if (result) {
              console.log(result)
              self.dataForm.pId = result.pId
              self.dataForm.biId = result.id
              self.dataForm.bankName = result.bankName
              self.dataForm.proName = result.proName
              self.dataForm.proCode = result.proCode
              self.dataForm.secompanyAddress = result.bankAccountName
              self.dataForm.secompanyTel = result.contactInfo
              self.dataForm.bankAccount = result.bankAccount
              self.dataForm.conName = result.conName
              self.dataForm.proAddress = result.proAddress
              self.dataForm.conTotal = result.conTotal
              self.dataForm.proSubCompany = result.proSubCompany
              self.dataForm.secompanyName = result.secompanyName
              self.dataForm.conPeriod = [result.conStartDate + ' 00:00:00', result.conEndDate + ' 00:00:00']
              self.dataForm.fInvoiceAmount = result.invoiceAmount
              self.dataForm.fInvoiceDate = result.invoiceDate
            } else {
              self.$notify.error({
                title: "错误",
                message: "系统不存在该蓝字发票，请重新输入！",
              });
            }
          });
        }
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
                        if (this.dataForm.id) {
              let self = this;
              tapp.services.finaRinvoiceApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.finaRinvoiceApproval.pId
                self.dataForm.biId = result.finaRinvoiceApproval.biId
                self.dataForm.invoiceAmount = result.finaRinvoiceApproval.invoiceAmount
                self.dataForm.reason = result.finaRinvoiceApproval.reason
                self.dataForm.invoiceDate = result.finaRinvoiceApproval.invoiceDate
                self.dataForm.invoiceCode = result.finaRinvoiceApproval.invoiceCode
                self.dataForm.invoiceNum = result.finaRinvoiceApproval.invoiceNum
                self.dataForm.approvalStatus = result.finaRinvoiceApproval.approvalStatus
                self.dataForm.sign = result.finaRinvoiceApproval.sign
                self.dataForm.signTime = result.finaRinvoiceApproval.signTime
                self.dataForm.propose = result.finaRinvoiceApproval.propose
                self.dataForm.result = result.finaRinvoiceApproval.result
                self.dataForm.createtime = result.finaRinvoiceApproval.createtime
                self.dataForm.updatetime = result.finaRinvoiceApproval.updatetime
                self.dataForm.createuser = result.finaRinvoiceApproval.createuser
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
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaRinvoiceApproval.save(model).then(function(result) {
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
