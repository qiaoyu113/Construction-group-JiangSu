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
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proName" label="项目名称">
            <el-input v-model="dataForm.proName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCode" label="所属分公司">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proCode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proCode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proCode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同期间">
            <t-datetime-range-picker v-model="dataForm.proCode"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="plType" label="保函类型">
            <t-dic-dropdown-select dicType="1260863704975675394" v-model="dataForm.plType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="plAmount" label="保函金额">
            <el-input v-model="dataForm.plAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="plAmount" label="现金金额">
            <el-input v-model="dataForm.plAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bankName" label="开立银行">
            <el-input readonly v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="generateTime" label="开立时间">
            <el-input readonly v-model="dataForm.generateTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="expireTime" label="到期时间">
            <el-input readonly v-model="dataForm.expireTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="plCode" label="保函编号">
            <el-input readonly v-model="dataForm.plCode"></el-input>
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
          id: 0,
          pId: '',
          plType: '',
          plAmount: '',
          bankName: '',
          generateTime: '',
          expireTime: '',
          plCode: '',
          remark: '',
          sign: '',
          signTime: ''
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
          bankName: [
            { required: true, message: '开立银行不能为空', trigger: 'blur' }
          ],
          generateTime: [
            { required: true, message: '开立时间不能为空', trigger: 'blur' }
          ],
          expireTime: [
            { required: true, message: '到期时间不能为空', trigger: 'blur' }
          ],
          plCode: [
            { required: true, message: '保函编号不能为空', trigger: 'blur' }
          ],
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
              tapp.services.plGenerateApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.plGenerateApproval.bId
                this.dataForm.actTaskKey = result.plGenerateApproval.actTaskKey
                this.dataForm.pId = result.plGenerateApproval.pId
                this.dataForm.plType = result.plGenerateApproval.plType
                this.dataForm.plAmount = result.plGenerateApproval.plAmount
                this.dataForm.bankName = result.plGenerateApproval.bankName
                this.dataForm.generateTime = result.plGenerateApproval.generateTime
                this.dataForm.expireTime = result.plGenerateApproval.expireTime
                this.dataForm.plCode = result.plGenerateApproval.plCode
                this.dataForm.remark = result.plGenerateApproval.remark
                this.dataForm.sign = result.plGenerateApproval.sign
                this.dataForm.signTime = result.plGenerateApproval.signTime
                this.dataForm.propose = result.plGenerateApproval.propose
                this.dataForm.result = result.plGenerateApproval.result
                this.dataForm.approvalStatus = result.plGenerateApproval.approvalStatus
                this.dataForm.createtime = result.plGenerateApproval.createtime
                this.dataForm.updatetime = result.plGenerateApproval.updatetime
                this.dataForm.createuser = result.plGenerateApproval.createuser
                this.dataForm.updateuser = result.plGenerateApproval.updateuser
                this.dataForm.datastatus = result.plGenerateApproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
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
      }
    }
  }
</script>
