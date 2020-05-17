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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'蓝字发票信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="biId" label="蓝字发票号码">
            <el-input v-model="dataForm.biId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票金额">
            <el-input readonly v-model="dataForm.biId"></el-input>
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
            <el-input readonly v-model="dataForm.invoiceDate"></el-input>
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
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司">
            <el-input  v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称">
            <el-input  v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同期间">
            <t-datetime-range-picker  v-model="dataForm.pId"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额">
            <el-input  v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'红字开票信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="申请开票金额">
            <el-input v-model="dataForm.invoiceAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开票日期">
            <el-date-picker readonly type="date" placeholder="开票后由专人填入" v-model="dataForm.invoiceDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号码">
            <el-input readonly placeholder="开票后由专人填入" v-model="dataForm.invoiceNum"></el-input>
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
        dataForm: {
          bId: '',actTaskKey: '',pId: '',biId: '',invoiceAmount: '',reason: '',invoiceDate: '',
          invoiceCode: '',invoiceNum: '',approvalStatus: '',sign: '',signTime: '',propose: '',
          result: '',createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: ''                                                                                        },
        dataRule: {
          biId: [
            { required: true, message: '蓝字发票标识id不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.init()
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
              tapp.services.finaRinvoiceApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaRinvoiceApproval.bId
                this.dataForm.actTaskKey = result.finaRinvoiceApproval.actTaskKey
                this.dataForm.pId = result.finaRinvoiceApproval.pId
                this.dataForm.biId = result.finaRinvoiceApproval.biId
                this.dataForm.invoiceAmount = result.finaRinvoiceApproval.invoiceAmount
                this.dataForm.reason = result.finaRinvoiceApproval.reason
                this.dataForm.invoiceDate = result.finaRinvoiceApproval.invoiceDate
                this.dataForm.invoiceCode = result.finaRinvoiceApproval.invoiceCode
                this.dataForm.invoiceNum = result.finaRinvoiceApproval.invoiceNum
                this.dataForm.approvalStatus = result.finaRinvoiceApproval.approvalStatus
                this.dataForm.sign = result.finaRinvoiceApproval.sign
                this.dataForm.signTime = result.finaRinvoiceApproval.signTime
                this.dataForm.propose = result.finaRinvoiceApproval.propose
                this.dataForm.result = result.finaRinvoiceApproval.result
                this.dataForm.createtime = result.finaRinvoiceApproval.createtime
                this.dataForm.updatetime = result.finaRinvoiceApproval.updatetime
                this.dataForm.createuser = result.finaRinvoiceApproval.createuser
                this.dataForm.updateuser = result.finaRinvoiceApproval.updateuser
                this.dataForm.datastatus = result.finaRinvoiceApproval.datastatus
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
