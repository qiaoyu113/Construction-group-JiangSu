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
        <t-workflow-map businessKey="pl_generate_approval"></t-workflow-map>
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
              <t-bank-project-select v-model="dataForm.proName" @selectedData="getSelectedRecord"></t-bank-project-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属分公司">
              <el-input readonly v-model="dataForm.proSubCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="所属事业部">
              <el-input readonly v-model="dataForm.proBusDept"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位">
              <el-input readonly v-model="dataForm.proConstructCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttr" label="合同模式">
              <t-dic-dropdown-select disabled dicType="contract_model" v-model="dataForm.proContractAttr" :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="投资金额">
              <el-input readonly v-model="dataForm.proTotalInvestment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proType" label="工程类别">
              <t-dic-dropdown-select dicType="engineering_type" disabled v-model="dataForm.proType" :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proRunMode" label="经营方式">
              <t-dic-dropdown-select dicType="business_type" disabled v-model="dataForm.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildArea" label="项目规模">
              <el-input readonly v-model="dataForm.proBuildArea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="conName" label="合同名称">
              <el-input readonly v-model="dataForm.conName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="conPeriod" label="合同期间">
              <t-datetime-range-picker disabled v-model="dataForm.conPeriod"></t-datetime-range-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="conTotal" label="合同金额">
              <el-input readonly v-model="dataForm.conTotal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="plType" label="保函类型">
              <t-dic-dropdown-select dicType="pl_type" v-model="dataForm.plType" :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="plAmount" label="保函金额">
              <t-input v-model="dataForm.plAmount"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同保证金" prop="contractType" class="is-required">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.contractType"
                                  :readOnly="readOnly"></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col>
            {{dataForm.conName}}
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-table :data="dataInfo" border size="mini">
            <el-table-column align="center" label="合同编号" prop="conCode">
            </el-table-column>
            <el-table-column align="center" label="合同名称" prop="conName">
            </el-table-column>
            <el-table-column align="center" label="合同保证金（元）" prop="technicalTitle">
            </el-table-column>
            <el-table-column align="center" label="可用合同保证金（元）" prop="asAmount">
            </el-table-column>
            <el-table-column align="center" label="本次占用合同保证金（元）" prop="asAmount">
            </el-table-column>
            <el-table-column align="center" label="剩余可用合同保证金（元）" prop="asAmount">
            </el-table-column>
          </el-table>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="现金缴纳" prop="cashType" class="is-required">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.cashType"
                                  :readOnly="readOnly"></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <t-input v-model="dataForm.amount" :read-only="dataForm.cashType != 'yes'"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="bankName" label="现金缴纳" :class="{'is-required': isBackFill}">
              <t-input :disabled="!isBackFill" v-model="dataForm.bankName" placeholder="保函开立员回填"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="generateTime" label="开立时间" :class="{'is-required': isBackFill}">
              <t-input :disabled="!isBackFill" v-model="dataForm.generateTime" placeholder="保函开立员回填"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="expireTime" label="到期时间" :class="{'is-required': isBackFill}">
              <t-input :disabled="!isBackFill" v-model="dataForm.expireTime" placeholder="保函开立员回填"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="plCode" label="保函编号" :class="{'is-required': isBackFill}">
              <t-input :disabled="!isBackFill" v-model="dataForm.plCode" placeholder="保函开立员回填"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="sign" label="经办时间">
              <span>{{dataForm.signTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="remark" label="备注">
              <t-input type="textarea" v-model="dataForm.remark"></t-input>
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
      var checkBankName = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.bankName == '' || this.dataForm.bankName == undefined)) callback(new Error('开立银行不能为空'));
        else callback();
      };
      var checkGenerateTime = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.generateTime == '' || this.dataForm.generateTime == undefined)) callback(new Error('开立时间不能为空'));
        else callback();
      };
      var checkExpireTime = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.expireTime == '' || this.dataForm.expireTime == undefined)) callback(new Error('到期时间不能为空'));
        else callback();
      };
      var checkPlCode = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.plCode == '' || this.dataForm.plCode == undefined)) callback(new Error('保函编号不能为空'));
        else callback();
      };
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        isBackFill: false,
        dataInfo: [],
        dataForm: {
          pId: '',
          plType: '',
          plAmount: '',
          bankName: '',
          generateTime: '',
          expireTime: '',
          plCode: '',
          remark: '',
          sign: '',
          signTime: '',
          contractType: 'no',
          cashType: 'no',
          cId: ''
        },
        dataRule: {
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          plType: [
            { required: true, message: '保函类型不能为空', trigger: 'blur' }
          ],
          plAmount: [
            { required: true, message: '保函金额不能为空', trigger: 'blur' }
          ],
          bankName: [{validator: checkBankName, trigger: 'blur'}],
          generateTime: [{validator: checkGenerateTime, trigger: 'blur'}],
          expireTime: [{validator: checkExpireTime, trigger: 'blur'}],
          plCode: [{validator: checkPlCode, trigger: 'blur'}],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '经办人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '经办时间不能为空', trigger: 'blur' }
          ],
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
      getSelectedRecord(data) {
        this.dataForm.proName = data.proName
        this.dataForm.proSubCompany = data.proSubCompany
        this.dataForm.proBusDept = data.proBusDept
        this.dataForm.proConstructCompany = data.proConstructCompany
        this.dataForm.proContractAttr = data.proContractAttr
        this.dataForm.proTotalInvestment = data.proTotalInvestment
        this.dataForm.proType = data.proType
        this.dataForm.proRunMode = data.proRunMode
        this.dataForm.proBuildArea = data.proBuildArea
        this.dataForm.pId = data.pId
        this.dataForm.cId = data.cId
        this.dataForm.conName = data.conName
        this.dataForm.conTotal = data.conTotal
        this.dataForm.conPeriod = [data.proPlanStartDate + ' 00:00:00', data.proPlanEndDate + ' 00:00:00']
        this.getConDto(data.pId)
      },
      getConDto(cId){
        if (cId) {
          let self = this
          // tapp.services.plGenerateApproval.findFinaConById(cId).then(function(result) {
          //   console.log('获取合同信息' + result)
          //   self.dataInfo = result
          // })
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
              tapp.services.plGenerateApproval.get(id).then(function(result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.conPeriod = [self.dataForm.conStartDate + ' 00:00:00', self.dataForm.conEndDate + ' 00:00:00']
                self.findPlGenerateApprovalAcount(self.dataForm.plId)
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
          tapp.services.plGenerateApproval.save(model).then(function(result) {
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
      // 回填保存
      doBackFillSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.plGenerateApproval.save(model).then(function(result) {
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
