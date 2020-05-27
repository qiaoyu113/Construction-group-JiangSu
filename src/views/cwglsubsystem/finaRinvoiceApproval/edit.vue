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
    <el-row :gutter="10" class="search-top-operate" v-if="isBackFill">
      <el-button type="primary" icon="el-icon-upload2" @click="doBackFillSave()">保存</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'蓝字发票信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="fInvoiceNum" label="蓝字发票号码">
            <el-input v-model="dataForm.fInvoiceNum" @change="getByInvoiceNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票金额" prop="fInvoiceAmount">
            <el-input readonly v-model="dataForm.fInvoiceAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="对方单位名称" prop="pId">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方单位地址" prop="pId">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方联系电话" prop="pId">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纳税识别号" prop="pId">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行" prop="pId">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户账号" prop="pId">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票类别" prop="pId">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票日期" prop="fInvoiceDate">
            <el-date-picker readonly v-model="dataForm.fInvoiceDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外经证号" prop="invoiceDate">
            <el-input readonly v-model="dataForm.invoiceDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="pId">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目地址" prop="proAddress">
            <el-input readonly v-model="dataForm.proAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司" prop="proSubCompany">
            <el-input  v-model="dataForm.proSubCompany" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称" prop="conName">
            <el-input  v-model="dataForm.conName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同期间" prop="conPeriod">
            <t-datetime-range-picker  v-model="dataForm.conPeriod" disabled></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额" prop="conTotal">
            <el-input  v-model="dataForm.conTotal" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'红字开票信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="申请开票金额" prop="invoiceAmount">
            <t-currency-input v-model="dataForm.invoiceAmount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开票日期" prop="invoiceDate" :class="{'is-required': isBackFill}">
            <el-date-picker :disabled="!isBackFill" type="date" v-model="dataForm.invoiceDate" placeholder="开票后由专人填入"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号码" prop="invoiceNum" :class="{'is-required': isBackFill}">
            <el-input :disabled="!isBackFill" v-model="dataForm.invoiceNum" placeholder="开票后由专人填入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="红字申请理由" prop="reason">
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
      var checkInvoiceDate = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.invoiceDate == '' || this.dataForm.invoiceDate == undefined)) callback(new Error('注销时间不能为空'));
        else callback();
      };
      var checkInvoiceNum = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.invoiceNum == '' || this.dataForm.invoiceNum == undefined)) callback(new Error('注销时间不能为空'));
        else callback();
      };
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        isBackFill: false,
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
          ],
          invoiceDate: [{validator: checkInvoiceDate, trigger: 'blur'}],
          invoiceNum: [{validator: checkInvoiceNum, trigger: 'blur'}],
        }
      }
    },
    created() {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.isBackFill = currentQuery.status && (currentQuery.status == 1 || currentQuery.status == 2) ? true : false
      this.init(currentQuery.businessId)
    },
    activated() {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.isBackFill = currentQuery.status && (currentQuery.status == 1 || currentQuery.status == 2) ? true : false
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
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.finaRinvoiceApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.pId
                self.dataForm.biId = result.biId
                self.dataForm.invoiceAmount = result.invoiceAmount
                self.dataForm.reason = result.reason
                self.dataForm.invoiceDate = result.invoiceDate
                self.dataForm.invoiceCode = result.invoiceCode
                self.dataForm.invoiceNum = result.invoiceNum
                self.dataForm.approvalStatus = result.approvalStatus
                self.dataForm.sign = result.sign
                self.dataForm.signTime = result.signTime
                self.dataForm.propose = result.propose
                self.dataForm.result = result.result
                self.dataForm.createtime = result.createtime
                self.dataForm.updatetime = result.updatetime
                self.dataForm.createuser = result.createuser
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
      },
      // 保存回填
      doBackFillSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaRinvoiceApproval.save(model).then(function(result) {
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
