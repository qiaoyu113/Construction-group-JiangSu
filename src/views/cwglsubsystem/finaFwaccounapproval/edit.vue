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
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="proName" label="项目名称">
            <el-input v-model="dataForm.proName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proCode" label="项目编号">
            <el-input v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="remark" label="申请事项">
            <el-input type="textarea" v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="sign" label="经办人">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="signTime" label="经办时间">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'帐户信息（帐户开立申请通过后填写）'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="bankName" label="开户行名称">
            <el-input readonly v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAddress" label="开户网点">
            <el-input readonly v-model="dataForm.bankAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccountName" label="银行帐户名称">
            <el-input readonly v-model="dataForm.bankAccountName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccount" label="银行帐号">
            <el-input readonly v-model="dataForm.bankAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="openTime" label="开户时间">
            <el-date-picker type="datetime" readonly v-model="dataForm.openTime"></el-date-picker>
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
          proName: '',
          proCode: '',
          bId: '',
          actTaskKey: '',
          pId: '',
          bankName: '',
          bankAddress: '',
          bankAccountName: '',
          bankAccount: '',
          openTime: '',
          approvalStatus: '',
          sign: '',
          signTime: new Date(),
          propose: '',
          result: '',
          remark: ''
        },
        dataRule: {
          proCode: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目编码不能为空', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '开户行名称不能为空', trigger: 'blur' }
          ],
          bankAddress: [
            { required: true, message: '开户网点不能为空', trigger: 'blur' }
          ],
          bankAccountName: [
            { required: true, message: '银行帐户名称不能为空', trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '银行帐号不能为空', trigger: 'blur' }
          ],
          openTime: [
            { required: true, message: '开户时间不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
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
              tapp.services.finaFwaccounapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaFwaccounapproval.bId
                this.dataForm.actTaskKey = result.finaFwaccounapproval.actTaskKey
                this.dataForm.pId = result.finaFwaccounapproval.pId
                this.dataForm.bankName = result.finaFwaccounapproval.bankName
                this.dataForm.bankAddress = result.finaFwaccounapproval.bankAddress
                this.dataForm.bankAccountName = result.finaFwaccounapproval.bankAccountName
                this.dataForm.bankAccount = result.finaFwaccounapproval.bankAccount
                this.dataForm.openTime = result.finaFwaccounapproval.openTime
                this.dataForm.approvalStatus = result.finaFwaccounapproval.approvalStatus
                this.dataForm.sign = result.finaFwaccounapproval.sign
                this.dataForm.signTime = result.finaFwaccounapproval.signTime
                this.dataForm.propose = result.finaFwaccounapproval.propose
                this.dataForm.result = result.finaFwaccounapproval.result
                this.dataForm.createtime = result.finaFwaccounapproval.createtime
                this.dataForm.updatetime = result.finaFwaccounapproval.updatetime
                this.dataForm.createuser = result.finaFwaccounapproval.createuser
                this.dataForm.updateuser = result.finaFwaccounapproval.updateuser
                this.dataForm.datastatus = result.finaFwaccounapproval.datastatus
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
          tapp.services.finaFwaccounapproval.save(model).then(function(result) {
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
