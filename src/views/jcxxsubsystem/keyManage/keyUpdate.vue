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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="200px" label-position="right">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bId" label="流程业务id">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="activiti执行任务key">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="province" label="所属地区-省（字典表）">
            <el-input v-model="dataForm.province"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="city" label="所属地区-市（字典表）">
            <el-input v-model="dataForm.city"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="keyType" label="类别名称（字典表）">
            <el-input v-model="dataForm.keyType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="authCompany" label="批准单位">
            <el-input v-model="dataForm.authCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="loginUsername" label="登陆网名">
            <el-input v-model="dataForm.loginUsername"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="loginUrl" label="登陆网址">
            <el-input v-model="dataForm.loginUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="expirationDate" label="有效期至">
            <el-input v-model="dataForm.expirationDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="account" label="用户名">
            <el-input v-model="dataForm.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="principalId" label="主要负责人唯一标识">
            <el-input v-model="dataForm.principalId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="useScenes" label="用途">
            <el-input v-model="dataForm.useScenes"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="applyforDate" label="申请时间">
            <el-input v-model="dataForm.applyforDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="keyColor" label="密匙颜色">
            <el-input v-model="dataForm.keyColor"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="existElectMark" label="是否有电子签章功能（字典表）">
            <el-input v-model="dataForm.existElectMark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="remark" label="备注">
            <el-input v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="password" label="密码">
            <el-input v-model="dataForm.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="isInput" label="是否直接登记（字典表）">
            <el-input v-model="dataForm.isInput"></el-input>
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
          <el-form-item prop="keyStatus" label="密钥状态（字典表）">
            <el-input v-model="dataForm.keyStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="propose" label="审核意见">
            <el-input v-model="dataForm.propose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="result" label="审核结果">
            <el-input v-model="dataForm.result"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="审批状态（字典表）">
            <el-input v-model="dataForm.approvalStatus"></el-input>
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
          bId: '',                                                                                                                                                            actTaskKey: '',                                                                                                                                                            province: '',                                                                                                                                                            city: '',                                                                                                                                                            keyType: '',                                                                                                                                                            authCompany: '',                                                                                                                                                            loginUsername: '',                                                                                                                                                            loginUrl: '',                                                                                                                                                            expirationDate: '',                                                                                                                                                            account: '',                                                                                                                                                            principalId: '',                                                                                                                                                            useScenes: '',                                                                                                                                                            applyforDate: '',                                                                                                                                                            keyColor: '',                                                                                                                                                            existElectMark: '',                                                                                                                                                            remark: '',                                                                                                                                                            password: '',                                                                                                                                                            isInput: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            keyStatus: '',                                                                                                                                                            propose: '',                                                                                                                                                            result: '',                                                                                                                                                            approvalStatus: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
        dataRule: {
          bId: [
            { required: true, message: '流程业务id不能为空', trigger: 'blur' }
          ],
          actTaskKey: [
            { required: true, message: 'activiti执行任务key不能为空', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '所属地区-省（字典表）不能为空', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '所属地区-市（字典表）不能为空', trigger: 'blur' }
          ],
          keyType: [
            { required: true, message: '类别名称（字典表）不能为空', trigger: 'blur' }
          ],
          authCompany: [
            { required: true, message: '批准单位不能为空', trigger: 'blur' }
          ],
          loginUsername: [
            { required: true, message: '登陆网名不能为空', trigger: 'blur' }
          ],
          loginUrl: [
            { required: true, message: '登陆网址不能为空', trigger: 'blur' }
          ],
          expirationDate: [
            { required: true, message: '有效期至不能为空', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          principalId: [
            { required: true, message: '主要负责人唯一标识不能为空', trigger: 'blur' }
          ],
          useScenes: [
            { required: true, message: '用途不能为空', trigger: 'blur' }
          ],
          applyforDate: [
            { required: true, message: '申请时间不能为空', trigger: 'blur' }
          ],
          keyColor: [
            { required: true, message: '密匙颜色不能为空', trigger: 'blur' }
          ],
          existElectMark: [
            { required: true, message: '是否有电子签章功能（字典表）不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          isInput: [
            { required: true, message: '是否直接登记（字典表）不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          keyStatus: [
            { required: true, message: '密钥状态（字典表）不能为空', trigger: 'blur' }
          ],
          propose: [
            { required: true, message: '审核意见不能为空', trigger: 'blur' }
          ],
          result: [
            { required: true, message: '审核结果不能为空', trigger: 'blur' }
          ],
          approvalStatus: [
            { required: true, message: '审批状态（字典表）不能为空', trigger: 'blur' }
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
              tapp.services.tBaseinfoKeyApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tBaseinfoKeyApproval.bId
                this.dataForm.actTaskKey = result.tBaseinfoKeyApproval.actTaskKey
                this.dataForm.province = result.tBaseinfoKeyApproval.province
                this.dataForm.city = result.tBaseinfoKeyApproval.city
                this.dataForm.keyType = result.tBaseinfoKeyApproval.keyType
                this.dataForm.authCompany = result.tBaseinfoKeyApproval.authCompany
                this.dataForm.loginUsername = result.tBaseinfoKeyApproval.loginUsername
                this.dataForm.loginUrl = result.tBaseinfoKeyApproval.loginUrl
                this.dataForm.expirationDate = result.tBaseinfoKeyApproval.expirationDate
                this.dataForm.account = result.tBaseinfoKeyApproval.account
                this.dataForm.principalId = result.tBaseinfoKeyApproval.principalId
                this.dataForm.useScenes = result.tBaseinfoKeyApproval.useScenes
                this.dataForm.applyforDate = result.tBaseinfoKeyApproval.applyforDate
                this.dataForm.keyColor = result.tBaseinfoKeyApproval.keyColor
                this.dataForm.existElectMark = result.tBaseinfoKeyApproval.existElectMark
                this.dataForm.remark = result.tBaseinfoKeyApproval.remark
                this.dataForm.password = result.tBaseinfoKeyApproval.password
                this.dataForm.isInput = result.tBaseinfoKeyApproval.isInput
                this.dataForm.sign = result.tBaseinfoKeyApproval.sign
                this.dataForm.signTime = result.tBaseinfoKeyApproval.signTime
                this.dataForm.keyStatus = result.tBaseinfoKeyApproval.keyStatus
                this.dataForm.propose = result.tBaseinfoKeyApproval.propose
                this.dataForm.result = result.tBaseinfoKeyApproval.result
                this.dataForm.approvalStatus = result.tBaseinfoKeyApproval.approvalStatus
                this.dataForm.createtime = result.tBaseinfoKeyApproval.createtime
                this.dataForm.updatetime = result.tBaseinfoKeyApproval.updatetime
                this.dataForm.createuser = result.tBaseinfoKeyApproval.createuser
                this.dataForm.updateuser = result.tBaseinfoKeyApproval.updateuser
                this.dataForm.datastatus = result.tBaseinfoKeyApproval.datastatus
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
          tapp.services.tBaseinfoKeyApproval.save(model).then(function(result) {
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
