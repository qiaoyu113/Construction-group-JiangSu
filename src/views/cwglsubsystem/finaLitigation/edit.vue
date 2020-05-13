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
          <el-form-item prop="bId" label="业务id用于和一个流程实例绑定">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="项目id">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRunMode" label="经营方式">
            <el-input v-model="dataForm.proRunMode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="unionCompany" label="联营单位">
            <el-input v-model="dataForm.unionCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="amount" label="划款金额">
            <el-input v-model="dataForm.amount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankName" label="划款银行">
            <el-input v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="accountNum" label="划款账号">
            <el-input v-model="dataForm.accountNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="执行人">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="执行时间">
            <el-input v-model="dataForm.signTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="propose" label="审核意见">
            <el-input v-model="dataForm.propose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createtime" label="创建时间">
            <el-input v-model="dataForm.createtime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="updatetime" label="更新时间">
            <el-input v-model="dataForm.updatetime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createuser" label="创建人">
            <el-input v-model="dataForm.createuser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="updateuser" label="更新人">
            <el-input v-model="dataForm.updateuser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="datastatus" label="数据有效性 1有效 0无效">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',                                                                                                                                                            pId: '',                                                                                                                                                            proRunMode: '',                                                                                                                                                            unionCompany: '',                                                                                                                                                            amount: '',                                                                                                                                                            bankName: '',                                                                                                                                                            accountNum: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            propose: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
        dataRule: {
          bId: [
            { required: true, message: '业务id用于和一个流程实例绑定不能为空', trigger: 'blur' }
          ],
          pId: [
            { required: true, message: '项目id不能为空', trigger: 'blur' }
          ],
          proRunMode: [
            { required: true, message: '经营方式不能为空', trigger: 'blur' }
          ],
          unionCompany: [
            { required: true, message: '联营单位不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '划款金额不能为空', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '划款银行不能为空', trigger: 'blur' }
          ],
          accountNum: [
            { required: true, message: '划款账号不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          propose: [
            { required: true, message: '审核意见不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updatetime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          createuser: [
            { required: true, message: '创建人不能为空', trigger: 'blur' }
          ],
          updateuser: [
            { required: true, message: '更新人不能为空', trigger: 'blur' }
          ],
          datastatus: [
            { required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      // this.init()
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.finaLitigation.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaLitigation.bId
                this.dataForm.pId = result.finaLitigation.pId
                this.dataForm.proRunMode = result.finaLitigation.proRunMode
                this.dataForm.unionCompany = result.finaLitigation.unionCompany
                this.dataForm.amount = result.finaLitigation.amount
                this.dataForm.bankName = result.finaLitigation.bankName
                this.dataForm.accountNum = result.finaLitigation.accountNum
                this.dataForm.sign = result.finaLitigation.sign
                this.dataForm.signTime = result.finaLitigation.signTime
                this.dataForm.propose = result.finaLitigation.propose
                this.dataForm.createtime = result.finaLitigation.createtime
                this.dataForm.updatetime = result.finaLitigation.updatetime
                this.dataForm.createuser = result.finaLitigation.createuser
                this.dataForm.updateuser = result.finaLitigation.updateuser
                this.dataForm.datastatus = result.finaLitigation.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          })
        }
      },
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaLitigation.save(model).then(function(result) {
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
