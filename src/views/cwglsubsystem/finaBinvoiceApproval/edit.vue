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
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proName" label="项目名称">
            <t-bank-project-select :readonly="true" @selectedData="selectedData"></t-bank-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  prop="proSubCompany"  label="所属公司">
            <t-input :readonly="true" v-model="dataForm.proSubCompany"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proAddress" label="项目地址">
            <t-input v-model="dataForm.proAddress"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方单位名称">
            <t-input :readonly="readOnly" v-model="dataForm.secompanyName"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方单位地址">
            <t-input :readonly="readOnly" v-model="dataForm.secompanyAddress"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方联系电话">
            <t-input :readonly="readOnly" v-model="dataForm.secompanyTel"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纳税识别号">
            <t-input :readonly="readOnly" v-model="dataForm.taxNo"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行">
            <t-input :readonly="readOnly" v-model="dataForm.bankName"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户账号">
            <t-input :readonly="readOnly" v-model="dataForm.bankAccount"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称">
            <t-input :readonly="true" v-model="dataForm.conName"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同期间">
            <t-datetime-range-picker disabled v-model="dataForm.conPeriod"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额">
            <t-input :readonly="true" v-model="dataForm.conTotal"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'开票信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计税方法">
            <t-dic-radio-select dicType="tax_method" v-model="dataForm.taxMethod" :readonly="readOnly" ></t-dic-radio-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票类别">
            <t-dic-radio-select dicType="invoice_type" v-model="dataForm.invoiceType" :readonly="readOnly" ></t-dic-radio-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" >
          <el-form-item prop="levyRate" label="适用税率或征收率" label-width="130px">
            <t-input :readonly="readOnly"  v-model="dataForm.levyRate"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="isLevyTax" label="有无预征税款">
            <t-dic-radio-select dicType="have_or_not" v-model="dataForm.isLevyTax" :readonly="readOnly" ></t-dic-radio-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="levyTaxNum" label="预征税款完税凭证号码" label-width="160px">
            <t-input v-model="dataForm.levyTaxNum" :readonly="readOnly" ></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item  label="申请开票金额">
            <t-currency-input v-model="dataForm.invoiceAmount" :readonly="readOnly"  @change="exceedStandardFunc">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已开票金额">
            <t-currency-input disabled v-model="dataForm.totalIamount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="exceedStandard">
          <span style="color: #ff0000; font-weight: bold">注意：已超合同金额（需要上传附件）</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="可抵扣分包金额">
            <t-currency-input :readonly="readOnly"  v-model="dataForm.deductAmount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已抵扣分包金额">
            <t-currency-input disabled v-model="dataForm.totalDamount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有无应收款">
            <t-dic-radio-select dicType="have_or_not" v-model="dataForm.isReceivables" :readonly="readOnly" ></t-dic-radio-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="增值税">
            <t-currency-input v-model="dataForm.vat" :readonly="readOnly" >
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城建税">
            <t-currency-input v-model="dataForm.uct" :readonly="readOnly" >
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教育费附加">
            <t-currency-input v-model="dataForm.est" :readonly="readOnly">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地方教育费附加">
            <t-currency-input v-model="dataForm.lest" :readonly="readOnly" >
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="印花税">
            <t-currency-input v-model="dataForm.st" :readonly="readOnly" >
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业所得税">
            <t-currency-input v-model="dataForm.cit" :readonly="readOnly" >
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="个人所得税">
            <t-currency-input v-model="dataForm.pit" :readonly="readOnly" >
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他">
            <t-currency-input v-model="dataForm.ot" :readonly="readOnly" >
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="预缴税务局">
            <t-input v-model="dataForm.taxBureau" :readonly="readOnly" ></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="税款所属期间">
            <t-datetime-range-picker v-model="dataForm.taxStartTime" :readonly="readOnly" ></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交税日期">
            <t-datetime-picker v-model="dataForm.paymentDate" type="date"></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外经证号">
            <t-input v-model="dataForm.lId" :readonly="readOnly" ></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invoiceDate" label="开票日期" :class="{'is-required': isBackFill}">
            <t-datetime-picker :disabled="!isBackFill" v-model="dataForm.invoiceDate" type="date" placeholder="开票后由专人填入"></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invoiceNum" label="发票号码" :class="{'is-required': isBackFill}">
            <t-input :disabled="!isBackFill" v-model="dataForm.invoiceNum" placeholder="开票后由专人填入"></t-input>
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
          <el-form-item label="备注">
            <t-input type="textarea" :readonly="readOnly"  v-model="dataForm.remark"></t-input>
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
        exceedStandard: false,
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        isBackFill: false,
        dataForm: {
          bId: '',actTaskKey: '',pId: '',cId: '',taxMethod: '',invoiceType: '',levyRate: '',isLevyTax: '',levyTaxNum: '',invoiceAmount: '',deductAmount: '',
          isReceivables: '',vat: '',uct: '',est: '',lest: '',st: '',cit: '',pit: '',ot: '',taxBureau: '',taxStartTime: '',taxEndTime: '',
          paymentDate: '',lId: '',invoiceDate: '',invoiceNum: '',approvalStatus: '',sign: '',signTime: '',propose: '',result: '',
          createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: '',conPeriod: '',taxNo: '',secompanyTel: '',
          secompanyAddress: '',secompanyName: '',proAddress: '',bankName: '', bankAccount:'',proName: '',proSubCompany:'',totalIamount:'',totalDamount:'',
          proCode:''
        },
        dataRule: {
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
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
      resetFields() {
        this.$refs.ruleForm.resetFields();
      },
      // 判断本次开票加以往开票是否超标
      exceedStandardFunc(){
        let conTotal = this.dataForm.conTotal * 100;
        let totalIamount = this.dataForm.totalIamount * 100;
        let invoiceAmount = this.dataForm.invoiceAmount * 100;
        conTotal = conTotal - totalIamount - invoiceAmount;
        if (conTotal < 0) {
          this.exceedStandard = true
        } else {
          this.exceedStandard = false
        }
      },
      // 选择项目
      selectedData(data) {
        debugger
        this.resetFields()
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        this.dataForm.pId = data.pId
        this.dataForm.cId = data.cId
        this.dataForm.bankName = data.bankName
        this.dataForm.proName = data.proName
        this.dataForm.proCode = data.proCode
        this.dataForm.secompanyAddress = data.bankAccountName
        this.dataForm.secompanyTel = data.contactInfo
        this.dataForm.bankAccount = data.bankAccount
        this.dataForm.conName = data.conName
        this.dataForm.proAddress = data.proAddressProvince + data.proAddressCity + data.proAddressDetail
        this.dataForm.conTotal = data.conTotal
        this.dataForm.proSubCompany = data.proSubCompany
        this.dataForm.secompanyName = data.companyName
        this.dataForm.conPeriod = [data.conStartDate + ' 00:00:00', data.conEndDate + ' 00:00:00'];
        this.findTotalSum();
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.finaBinvoiceApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.pId
                self.dataForm.cId = result.cId
                self.dataForm.taxMethod = result.taxMethod
                self.dataForm.invoiceType = result.invoiceType
                self.dataForm.levyRate = result.levyRate
                self.dataForm.isLevyTax = result.isLevyTax
                self.dataForm.levyTaxNum = result.levyTaxNum
                self.dataForm.invoiceAmount = result.invoiceAmount
                self.dataForm.deductAmount = result.deductAmount
                self.dataForm.isReceivables = result.isReceivables
                self.dataForm.vat = result.vat
                self.dataForm.uct = result.uct
                self.dataForm.est = result.est
                self.dataForm.lest = result.lest
                self.dataForm.st = result.st
                self.dataForm.cit = result.cit
                self.dataForm.pit = result.pit
                self.dataForm.ot = result.ot
                self.dataForm.taxBureau = result.taxBureau
                self.dataForm.taxStartTime = result.taxStartTime
                self.dataForm.taxEndTime = result.taxEndTime
                self.dataForm.paymentDate = result.paymentDate
                self.dataForm.lId = result.lId
                self.dataForm.invoiceDate = result.invoiceDate
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
      // 获取已经开票金额
      findTotalSum () {
        let self = this;
        let model = { ...self.dataForm };
        tapp.services.finaBinvoiceApproval.findTotalSum(model.pId).then(function(result) {
          self.dataForm.totalIamount = result.invoiceAmount
          self.dataForm.totalDamount = result.deductAmount
        });
      },
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm }
          let taxTime = model.taxStartTime
          model.taxStartTime = taxTime[0]
          model.taxEndTime = taxTime[1]
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
      },
      // 保存回填
      doBackFillSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm }
          let taxTime = model.taxStartTime
          model.taxStartTime = taxTime[0]
          model.taxEndTime = taxTime[1]
          tapp.services.finaBinvoiceApproval.save(model).then(function(result) {
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
