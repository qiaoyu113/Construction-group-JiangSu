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
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="plType" label="保函类型">
            <t-dic-dropdown-select dicType="1260863704975675394" v-model="dataForm.plType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保函申请">
            <span>√ 已通过</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="金额">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中:  占用合同保证金">
            <el-input readonly v-model="dataForm.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现金">
            <el-input readonly v-model="dataForm.account"></el-input>
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
            <el-input readonly v-model="dataForm.generateTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到期时间">
            <el-input readonly v-model="dataForm.expireTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="保函时间">
            <el-input readonly v-model="dataForm.expireTime"></el-input>
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
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
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
          pId: '',                                                                                                            plId: '',                                                                                                            remark: '',                                                                                                            sign: '',                                                                                                            signTime: '',                                                                                                                                                                                                                                                                                        },
        dataRule: {
          pId: [
            { required: true, message: '项目id不能为空', trigger: 'blur' }
          ],
          plId: [
            { required: true, message: '保函id不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
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
              tapp.services.plReamounapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.plReamounapproval.bId
                this.dataForm.actTaskKey = result.plReamounapproval.actTaskKey
                this.dataForm.pId = result.plReamounapproval.pId
                this.dataForm.plId = result.plReamounapproval.plId
                this.dataForm.remark = result.plReamounapproval.remark
                this.dataForm.sign = result.plReamounapproval.sign
                this.dataForm.signTime = result.plReamounapproval.signTime
                this.dataForm.propose = result.plReamounapproval.propose
                this.dataForm.result = result.plReamounapproval.result
                this.dataForm.approvalStatus = result.plReamounapproval.approvalStatus
                this.dataForm.createtime = result.plReamounapproval.createtime
                this.dataForm.updatetime = result.plReamounapproval.updatetime
                this.dataForm.createuser = result.plReamounapproval.createuser
                this.dataForm.updateuser = result.plReamounapproval.updateuser
                this.dataForm.datastatus = result.plReamounapproval.datastatus
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
          tapp.services.plReamounapproval.save(model).then(function(result) {
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
