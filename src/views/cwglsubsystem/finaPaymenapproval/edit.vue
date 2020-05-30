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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="150px"
             label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'付款申请信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proName" label="项目名称">
              <t-bank-project-select placeholder="选择项目信息" v-model="dataForm.proName"
                                     @selectedData="getSelectedProject"></t-bank-project-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proRunMode" label="经营模式">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode"
                                     @change="onProRunMode"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="conTotal" label="项目合同额">
              <el-input v-model="dataForm.conTotal" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="fundPurpose" label="资金用途">
              <t-dic-dropdown-select dicType="user_funds" :disabled="fundPurposeDisabled"
                                     v-model="dataForm.fundPurpose"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="paymentType" label="本次付款类型">
              <t-dic-dropdown-select dicType="payment_type" v-model="dataForm.paymentType"
                                     @change="onPaymentAmount"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :hidden="lNumFlag">
            <el-form-item prop="lNum" label="票号">
              <el-input v-model="dataForm.lNum" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :hidden="scConNameFlag">
            <el-form-item prop="scConName" label="子合同名称">
              <t-cont-subcontract-spproval :pId="dataForm.pId" v-model="dataForm.scConName" @selectedCon="getSelected">
              </t-cont-subcontract-spproval>
            </el-form-item>
          </el-col>
          <el-col :span="8" :hidden="scConCodeFlag">
            <el-form-item prop="scConCode" label="子合同编号">
              <el-input :readonly="true" v-model="dataForm.scConCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :hidden="scConTotalFlag">
            <el-form-item prop="scConTotal" label="子合同金额">
              <el-input :readonly="true" v-model="dataForm.scConTotal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="paymentAmount" label="本次付款金额">
              <el-input v-model="dataForm.paymentAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="processBranch" label="流程审批">
              <t-dic-radio-select dicType="1260909446947803138" v-model="dataForm.processBranch"></t-dic-radio-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 承兑汇票 -->
        <acceptance-bill-table :searchData="acceptanceSearchData" @selectedData="getAcceptanceSelectedData"></acceptance-bill-table>

        <!-- 预付款 -->
        <prepay-table :searchData="prepaySearchData" @selectedData="getPrepaySelectedData"></prepay-table>

        <!-- 项目借款 -->
        <project-loan-table ref="projectLoan"></project-loan-table>

      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'累计付款信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="totalReceived" label="本项目累计已收款">
              <el-input :readonly="true" v-model="dataForm.totalReceived"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="totalReceivedRatio" label="已收款比例">
              <el-input :readonly="true" v-model="dataForm.totalReceivedRatio"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="totalPayment" label="本项目累计已付款">
              <el-input :readonly="true" v-model="dataForm.totalPayment"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :hidden="scTotalReceivedFlag">
            <el-form-item prop="scTotalReceived" label="当前子合同累计已付款" label-width="180px">
              <el-input :readonly="true" v-model="dataForm.scTotalReceived"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :hidden="scTotalReceivedRatioFlag">
            <el-form-item prop="scTotalReceivedRatio" label="当前子合同累计已付款比例" label-width="200px">
              <el-input :readonly="true" v-model="dataForm.scTotalReceivedRatio"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :hidden="afterThisRatioFlag">
            <el-form-item prop="afterThisRatio" label="累计付款比例">
              <el-input :readonly="true" v-model="dataForm.afterThisRatio"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="leftoverAmount" label="本项目余款">
              <el-input :readonly="true" v-model="dataForm.leftoverAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="leftoverAmountRatio" label="项目余款比例">
              <el-input :readonly="true" v-model="dataForm.leftoverAmountRatio"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人">
              <el-input v-model="dataForm.sign"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办时间">
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
        <t-sub-title :title="'收款单位信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="12" :hidden="receiveCompanyFlag">
            <el-form-item prop="receiveCompany" label="收款单位">
              <el-input v-model="dataForm.receiveCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :hidden="bankNameFlag">
            <el-form-item prop="bankName" label="开户行名称">
              <el-input v-model="dataForm.bankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :hidden="bankAccountNameFlag">
            <el-form-item prop="bankAccountName" label="银行帐户名称">
              <el-input v-model="dataForm.bankAccountName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :hidden="bankAccountFlag">
            <el-form-item prop="bankAccount" label="银行帐号">
              <el-input v-model="dataForm.bankAccount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :hidden="contacterFlag">
            <el-form-item prop="contacter" label="联系人">
              <el-input v-model="dataForm.contacter"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :hidden="contacterTelFlag">
            <el-form-item prop="contacterTel" label="联系电话">
              <el-input v-model="dataForm.contacterTel"></el-input>
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
  import acceptanceBillTable from './components/acceptance-bill-table'
  import prepayTable from './components/prepay-table'
  import projectLoanTable from './components/project-loan-table'
  import {mapState} from 'vuex'

  export default {
    components: {
      acceptanceBillTable,
      prepayTable,
      projectLoanTable
    },
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        customerRelationGridOptions: {
          dataSource: [],
          grid: {
            offsetHeight: 36, // 36:查询部分高度
            defaultSort: {
              prop: 'id',
              order: 'ascending'
            }
          }
        },
        lNumFlag: true,
        afterThisRatioFlag: true,
        scTotalReceivedRatioFlag: true,
        scTotalReceivedFlag: true,
        scConTotalFlag: false,
        scConCodeFlag: false,
        scConNameFlag: false,
        contacterTelFlag: false,
        contacterFlag: false,
        bankAccountFlag: false,
        bankAccountNameFlag: false,
        bankNameFlag: false,
        receiveCompanyFlag: false,
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        fundPurposeDisabled: false,
        conNameFlag: true,
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          proRunMode: '',
          unionCompany: '',
          scId: '',
          paymentType: '',
          fundPurpose: '',
          processBranch: '',
          paymentWay: '',
          totalReceived: '',
          totalReceivedRatio: '',
          totalPayment: '',
          scTotalReceived: '',
          scTotalReceivedRatio: '',
          paymentAmount: '',
          afterThisRatio: '',
          leftoverAmount: '',
          leftoverAmountRatio: '',
          receiveCompany: '',
          bankName: '',
          bankAccountName: '',
          bankAccount: '',
          contacter: '',
          contacterTel: '',
          approvalStatus: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          conCode: '',
          conName: '',
          scConTotal: '',
          scConCode: '',
          scConName: ''
        },
        dataRule: {
          scConTotal: [
            {required: true, message: '子合同金额不能为空', trigger: 'blur'}
          ],
          scConCode: [
            {required: true, message: '子合同编码不能为空', trigger: 'blur'}
          ],
          scConName: [
            {required: true, message: '子合同名称不能为空', trigger: 'blur'}
          ],
          conCode: [
            {required: true, message: '合同编码不能为空', trigger: 'blur'}
          ],
          conName: [
            {required: true, message: '合同名称不能为空', trigger: 'blur'}
          ],
          pId: [
            {required: true, message: '项目不能为空', trigger: 'blur'}
          ],
          proRunMode: [
            {required: true, message: '经营方式不能为空', trigger: 'blur'}
          ],
          unionCompany: [
            {required: true, message: '联营单位标识不能为空', trigger: 'blur'}
          ],
          scId: [
            {required: true, message: '子合同不能为空', trigger: 'blur'}
          ],
          paymentType: [
            {required: true, message: '本次付款类型不能为空', trigger: 'blur'}
          ],
          fundPurpose: [
            {required: true, message: '资金用途不能为空', trigger: 'blur'}
          ],
          processBranch: [
            {required: true, message: '流程审批不能为空', trigger: 'blur'}
          ],
          paymentWay: [
            {required: true, message: '付款方式不能为空', trigger: 'blur'}
          ],
          rId: [
            {required: true, message: '到账标识不能为空', trigger: 'blur'}
          ],
          totalReceived: [
            {required: true, message: '本项目累计已收款不能为空', trigger: 'blur'}
          ],
          totalReceivedRatio: [
            {required: true, message: '已收款比例不能为空', trigger: 'blur'}
          ],
          totalPayment: [
            {required: true, message: '本项目累计已付款不能为空', trigger: 'blur'}
          ],
          scTotalReceived: [
            {required: true, message: '当前子合同累计已付款不能为空', trigger: 'blur'}
          ],
          scTotalReceivedRatio: [
            {required: true, message: '当前子合同累计已付款比例不能为空', trigger: 'blur'}
          ],
          paymentAmount: [
            {required: true, message: '本次付款金额不能为空', trigger: 'blur'}
          ],
          afterThisRatio: [
            {required: true, message: '累计付款比例不能为空', trigger: 'blur'}
          ],
          leftoverAmount: [
            {required: true, message: '本项目余款不能为空', trigger: 'blur'}
          ],
          leftoverAmountRatio: [
            {required: true, message: '项目余款比例不能为空', trigger: 'blur'}
          ],
          receiveCompany: [
            {required: true, message: '收款单位不能为空', trigger: 'blur'}
          ],
          bankName: [
            {required: true, message: '开户行名称不能为空', trigger: 'blur'}
          ],
          bankAccountName: [
            {required: true, message: '银行帐户名称不能为空', trigger: 'blur'}
          ],
          bankAccount: [
            {required: true, message: '银行帐号不能为空', trigger: 'blur'}
          ],
          contacter: [
            {required: true, message: '联系人不能为空', trigger: 'blur'}
          ],
          contacterTel: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: true, message: '执行时间不能为空', trigger: 'blur'}
          ]

        },
        // 承兑汇票传入查询信息
        acceptanceSearchData: {},
        // 预付款传入查询信息
        prepaySearchData: {},
        // 项目借款传入查询信息
        projectLoanSearchData: {}
      }
    },
    created () {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly === 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly === 'true')
      this.init(currentQuery.businessId)
    },
    activated () {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly === 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly === 'true')
      this.init(currentQuery.businessId)
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user
      })
    },
    methods: {
      // 本次付款类型事件
      onPaymentAmount () {
        this.scConNameFlag = false
        this.scConCodeFlag = false
        this.scConTotalFlag = false
        this.contacterTelFlag = false
        this.contacterFlag = false
        this.bankAccountFlag = false
        this.bankAccountNameFlag = false
        this.bankNameFlag = false
        this.receiveCompanyFlag = false
        this.afterThisRatioFlag = true
        this.scTotalReceivedRatioFlag = true
        this.scTotalReceivedFlag = true
        this.lNumFlag = true
        // alert(this.dataForm.paymentType)
        if (this.dataForm.paymentType === 'other_payment' || this.dataForm.paymentType === 'cnhpglf') {
          if (this.dataForm.paymentType === 'cnhpglf') {
            this.scConNameFlag = true
            this.scConCodeFlag = true
            this.scConTotalFlag = true
            this.afterThisRatioFlag = true
            this.scTotalReceivedRatioFlag = true
            this.scTotalReceivedFlag = true
            this.lNumFlag = false
          }
          this.contacterFlag = true
          this.bankAccountFlag = true
          this.bankAccountNameFlag = true
          this.bankNameFlag = true
          this.receiveCompanyFlag = true
        }
      },
      // 经营模式
      onProRunMode () {
        if (this.dataForm.proRunMode === 'pool' || this.dataForm.proRunMode === 'proprietary') {
          this.dataForm.fundPurpose = 'user_' + this.dataForm.proRunMode
          this.fundPurposeDisabled = true
        } else {
          this.dataForm.fundPurpose = ''
          this.fundPurposeDisabled = false
        }
      },
      // 选择项目到账信息
      getSelectedProject (data) {
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        this.dataForm.proName = data.proName
        this.dataForm.proCode = data.proCode
        this.dataForm.pId = data.pId
        this.dataForm.proSubCompany = data.proSubCompany
        this.dataForm.proRunMode = data.proRunMode
        this.dataForm.conTotal = data.conTotal
        this.conNameFlag = false
        this.onProRunMode()
      },
      // 选择自合同信息
      getSelected (data) {
        debugger
        this.dataForm.scId = data.id
        this.dataForm.scConName = data.conName
        this.dataForm.scConCode = data.conCode
        this.dataForm.scConTotal = data.conTotal
        this.afterThisRatioFlag = false
        this.scTotalReceivedRatioFlag = false
        this.scTotalReceivedFlag = false
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            if (this.dataForm.id) {
              let self = this
              tapp.services.finaPaymenapproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.finaPaymenapproval.pId
                self.dataForm.proRunMode = result.finaPaymenapproval.proRunMode
                self.dataForm.unionCompany = result.finaPaymenapproval.unionCompany
                self.dataForm.scId = result.finaPaymenapproval.scId
                self.dataForm.paymentType = result.finaPaymenapproval.paymentType
                self.dataForm.fundPurpose = result.finaPaymenapproval.fundPurpose
                self.dataForm.processBranch = result.finaPaymenapproval.processBranch
                self.dataForm.paymentWay = result.finaPaymenapproval.paymentWay
                self.dataForm.rId = result.finaPaymenapproval.rId
                self.dataForm.totalReceived = result.finaPaymenapproval.totalReceived
                self.dataForm.totalReceivedRatio = result.finaPaymenapproval.totalReceivedRatio
                self.dataForm.totalPayment = result.finaPaymenapproval.totalPayment
                self.dataForm.scTotalReceived = result.finaPaymenapproval.scTotalReceived
                self.dataForm.scTotalReceivedRatio = result.finaPaymenapproval.scTotalReceivedRatio
                self.dataForm.paymentAmount = result.finaPaymenapproval.paymentAmount
                self.dataForm.afterThisRatio = result.finaPaymenapproval.afterThisRatio
                self.dataForm.leftoverAmount = result.finaPaymenapproval.leftoverAmount
                self.dataForm.leftoverAmountRatio = result.finaPaymenapproval.leftoverAmountRatio
                self.dataForm.receiveCompany = result.finaPaymenapproval.receiveCompany
                self.dataForm.bankName = result.finaPaymenapproval.bankName
                self.dataForm.bankAccountName = result.finaPaymenapproval.bankAccountName
                self.dataForm.bankAccount = result.finaPaymenapproval.bankAccount
                self.dataForm.contacter = result.finaPaymenapproval.contacter
                self.dataForm.contacterTel = result.finaPaymenapproval.contacterTel
                self.dataForm.approvalStatus = result.finaPaymenapproval.approvalStatus
                self.dataForm.sign = result.finaPaymenapproval.sign
                self.dataForm.signTime = result.finaPaymenapproval.signTime
                self.dataForm.propose = result.finaPaymenapproval.propose
                self.dataForm.result = result.finaPaymenapproval.result
                self.dataForm.createtime = result.finaPaymenapproval.createtime
                self.dataForm.updatetime = result.finaPaymenapproval.updatetime
                self.dataForm.createuser = result.finaPaymenapproval.createuser
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
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.finaPaymenapproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！'
            })
          })
        }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '保存失败！'
          })
          return true
        })
      },

      // 承兑汇票
      getAcceptanceSelectedData (val) {
        console.log('getAcceptanceSelectedData 承兑汇票获取到的选中的数据', val)
      },
      // 预付款
      getPrepaySelectedData (val) {
        console.log('getPrepaySelectedData 预付款获取到的选中的数据', val)
      }
    }
  }
</script>
<style type="text/css" scoped>
  .fina-function-button {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
</style>
