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
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proName" label="项目名称">
            <el-input v-model="dataForm.proName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="所属公司">
            <el-input :readonly="true" v-model="dataForm.proSubCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目地址">
            <el-input v-model="dataForm.proAddressProvince"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方单位名称">
            <el-input v-model="dataForm.secompanyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方单位地址">
            <el-input v-model="dataForm.secompanyAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对方联系电话">
            <el-input v-model="dataForm.secompanyTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纳税识别号">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户账号">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称">
            <el-input :readonly="true" v-model="dataForm.conName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同期间">
            <t-datetime-range-picker disabled v-model="dataForm.cId"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额">
            <el-input :readonly="true" v-model="dataForm.conTotal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'开票信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计税方法">
            <t-dic-radio-select dicType="tax_method" v-model="dataForm.taxMethod" :readOnly="false"></t-dic-radio-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票类别">
            <t-dic-radio-select dicType="invoice_type" v-model="dataForm.invoiceType" :readOnly="false"></t-dic-radio-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" >
          <el-form-item label="适用税率或征收率" label-width="130px">
            <el-input v-model="dataForm.levyRate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有无预征税款">
            <t-dic-radio-select dicType="have_or_not" v-model="dataForm.isLevyTax" :readOnly="false"></t-dic-radio-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预征税款完税凭证号码" label-width="160px">
            <el-input v-model="dataForm.levyTaxNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item  label="申请开票金额">
            <t-currency-input v-model="dataForm.invoiceAmount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已开票金额">
            <t-currency-input disabled v-model="dataForm.invoiceAmount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span style="color: red; font-weight: bold">注意：已超合同金额（需要上传附件）</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="可抵扣分包金额">
            <t-currency-input v-model="dataForm.deductAmount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已抵扣分包金额">
            <t-currency-input disabled v-model="dataForm.deductAmount">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有无应收款">
            <t-dic-radio-select dicType="have_or_not" v-model="dataForm.isReceivables" :readOnly="false"></t-dic-radio-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="增值税">
            <t-currency-input v-model="dataForm.vat">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城建税">
            <t-currency-input v-model="dataForm.uct">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教育费附加">
            <t-currency-input v-model="dataForm.est">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地方教育费附加">
            <t-currency-input v-model="dataForm.lest">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="印花税">
            <t-currency-input v-model="dataForm.st">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业所得税">
            <t-currency-input v-model="dataForm.cit">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="个人所得税">
            <t-currency-input v-model="dataForm.pit">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他">
            <t-currency-input v-model="dataForm.ot">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="预缴税务局">
            <el-input v-model="dataForm.taxBureau"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="税款所属期间">
            <t-datetime-range-picker v-model="dataForm.taxStartTime"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交税日期">
            <el-input v-model="dataForm.paymentDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外经证号">
            <el-input v-model="dataForm.lId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invoiceDate" label="开票日期">
            <el-input :readonly="true" v-model="dataForm.invoiceDate" placeholder="开票后由专人填入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号码">
            <el-input :readonly="true" v-model="dataForm.invoiceNum" placeholder="开票后由专人填入"></el-input>
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
          bId: '',actTaskKey: '',pId: '',cId: '',taxMethod: '',invoiceType: '',levyRate: '',isLevyTax: '',levyTaxNum: '',invoiceAmount: '',deductAmount: '',
          isReceivables: '',vat: '',uct: '',est: '',lest: '',st: '',cit: '',pit: '',ot: '',taxBureau: '',taxStartTime: '',taxEndTime: '',
          paymentDate: '',lId: '',invoiceDate: '',invoiceNum: '',approvalStatus: '',sign: '',signTime: '',propose: '',result: '',
          createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: ''                                                                                        },
        dataRule: {
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
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
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
                        if (this.dataForm.id) {
              let self = this;
              tapp.services.finaBinvoiceApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.finaBinvoiceApproval.pId
                self.dataForm.cId = result.finaBinvoiceApproval.cId
                self.dataForm.taxMethod = result.finaBinvoiceApproval.taxMethod
                self.dataForm.invoiceType = result.finaBinvoiceApproval.invoiceType
                self.dataForm.levyRate = result.finaBinvoiceApproval.levyRate
                self.dataForm.isLevyTax = result.finaBinvoiceApproval.isLevyTax
                self.dataForm.levyTaxNum = result.finaBinvoiceApproval.levyTaxNum
                self.dataForm.invoiceAmount = result.finaBinvoiceApproval.invoiceAmount
                self.dataForm.deductAmount = result.finaBinvoiceApproval.deductAmount
                self.dataForm.isReceivables = result.finaBinvoiceApproval.isReceivables
                self.dataForm.vat = result.finaBinvoiceApproval.vat
                self.dataForm.uct = result.finaBinvoiceApproval.uct
                self.dataForm.est = result.finaBinvoiceApproval.est
                self.dataForm.lest = result.finaBinvoiceApproval.lest
                self.dataForm.st = result.finaBinvoiceApproval.st
                self.dataForm.cit = result.finaBinvoiceApproval.cit
                self.dataForm.pit = result.finaBinvoiceApproval.pit
                self.dataForm.ot = result.finaBinvoiceApproval.ot
                self.dataForm.taxBureau = result.finaBinvoiceApproval.taxBureau
                self.dataForm.taxStartTime = result.finaBinvoiceApproval.taxStartTime
                self.dataForm.taxEndTime = result.finaBinvoiceApproval.taxEndTime
                self.dataForm.paymentDate = result.finaBinvoiceApproval.paymentDate
                self.dataForm.lId = result.finaBinvoiceApproval.lId
                self.dataForm.invoiceDate = result.finaBinvoiceApproval.invoiceDate
                self.dataForm.invoiceNum = result.finaBinvoiceApproval.invoiceNum
                self.dataForm.approvalStatus = result.finaBinvoiceApproval.approvalStatus
                self.dataForm.sign = result.finaBinvoiceApproval.sign
                self.dataForm.signTime = result.finaBinvoiceApproval.signTime
                self.dataForm.propose = result.finaBinvoiceApproval.propose
                self.dataForm.result = result.finaBinvoiceApproval.result
                self.dataForm.createtime = result.finaBinvoiceApproval.createtime
                self.dataForm.updatetime = result.finaBinvoiceApproval.updatetime
                self.dataForm.createuser = result.finaBinvoiceApproval.createuser
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
