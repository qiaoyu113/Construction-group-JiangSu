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
        <t-workflow-map businessKey="pl_geapproval"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proName" label="项目名称">
              <t-bh-project-select v-model="dataForm.proName" @selectedData="getSelectedRecord"></t-bh-project-select>
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
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" :readOnly="readOnly"></t-dic-dropdown-select>
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
              <t-dic-dropdown-select dicType="pl_type" disabled v-model="dataForm.plType" :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保函申请">
              <span>√ 已通过</span>
            </el-form-item>
<!--            <el-form-item label="保函申请">-->
<!--              <span>√ 已通过</span>-->
<!--            </el-form-item>-->
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="金额">
              <el-input readonly v-model="dataForm.plAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其中:占用合同保证金" label-width="200px">
              <el-input readonly v-model="dataForm.conAmount">
                <span slot="append">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现金">
              <el-input readonly v-model="dataForm.caseAmount">
                <span slot="append">元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="开立银行">
              <el-input readonly v-model="dataForm.bankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开立时间">
              <t-datetime-picker type="date" disabled v-model="dataForm.generateTime"></t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到期时间">
              <t-datetime-picker type="date" disabled v-model="dataForm.expireTime"></t-datetime-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="保函时间">
              <t-datetime-picker type="date" disabled v-model="dataForm.plSignTime"></t-datetime-picker>
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
              <el-input type="textarea" :readOnly="readOnly" v-model="dataForm.remark"></el-input>
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
        isBackFill: false,
        dataForm: {
          id: 0,
          pId: '',
          plId: '',
          remark: '',
          sign: '',
          signTime: '',
          startDateBegin: '',
          startDateEnd: '',
          plType :'',
          plAmount :'',
          bankName :'',
          generateTime :'',
          expireTime :'',
          caseAmount : '',
          conAmount : '',
          plSignTime : '',

        },
        dataRule: {
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
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
        this.dataForm.pId = data.id
        this.dataForm.conName = data.conName
        this.dataForm.conTotal = data.conTotal
        this.dataForm.conPeriod = [data.proPlanStartDate + ' 00:00:00', data.proPlanEndDate + ' 00:00:00']
        // self.dataForm.conPeriod = [self.dataForm.conStartDate + ' 00:00:00', self.dataForm.conEndDate + ' 00:00:00']
        this.findPlGenerateApprovalAcount(data.id)
      },
      // 获取保函申请信息
      findPlGenerateApprovalAcount(id){
        let self = this;
        if (id) {
          tapp.services.plGenerateApproval.findPlGenerateApprovalAcount(id).then(function(result) {
            if (result) {
              self.dataForm.plId = result.id
              self.dataForm.plType = result.plType
              self.dataForm.plAmount = result.plAmount
              self.dataForm.bankName = result.bankName
              self.dataForm.generateTime = result.generateTime
              self.dataForm.expireTime = result.expireTime
              self.dataForm.plSignTime = result.signTime
              self.dataForm.caseAmount = result.caseAmount
              self.dataForm.conAmount = result.conAmount
            } else {
              self.$notify.error({
                title: "错误",
                message: "保函信息不存在！",
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
              tapp.services.plGeapproval.get(id).then(function(result) {
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
      onStartDateRangeChanged(val) {
        this.dataFrom.startDateBegin = val[0];
        this.dataFrom.startDateEnd = val[1];
      },
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.plGeapproval.save(model).then(function(result) {
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
