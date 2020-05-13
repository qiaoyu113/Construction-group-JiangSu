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
          <el-form-item prop="actTaskKey" label="activiti执行任务key">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="项目id">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="fwaId" label="农民工工资帐户开立id">
            <el-input v-model="dataForm.fwaId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="payoffMoney" label="发放金额">
            <el-input v-model="dataForm.payoffMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="审批状态（字典表）">
            <el-input v-model="dataForm.approvalStatus"></el-input>
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
          <el-form-item prop="result" label="审核结果">
            <el-input v-model="dataForm.result"></el-input>
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
          bId: '',                                                                                                                                                            actTaskKey: '',                                                                                                                                                            pId: '',                                                                                                                                                            fwaId: '',                                                                                                                                                            payoffMoney: '',                                                                                                                                                            approvalStatus: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            propose: '',                                                                                                                                                            result: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
        dataRule: {
          bId: [
            { required: true, message: '业务id用于和一个流程实例绑定不能为空', trigger: 'blur' }
          ],
          actTaskKey: [
            { required: true, message: 'activiti执行任务key不能为空', trigger: 'blur' }
          ],
          pId: [
            { required: true, message: '项目id不能为空', trigger: 'blur' }
          ],
          fwaId: [
            { required: true, message: '农民工工资帐户开立id不能为空', trigger: 'blur' }
          ],
          payoffMoney: [
            { required: true, message: '发放金额不能为空', trigger: 'blur' }
          ],
          approvalStatus: [
            { required: true, message: '审批状态（字典表）不能为空', trigger: 'blur' }
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
          result: [
            { required: true, message: '审核结果不能为空', trigger: 'blur' }
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
              tapp.services.finaFpayoffApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaFpayoffApproval.bId
                this.dataForm.actTaskKey = result.finaFpayoffApproval.actTaskKey
                this.dataForm.pId = result.finaFpayoffApproval.pId
                this.dataForm.fwaId = result.finaFpayoffApproval.fwaId
                this.dataForm.payoffMoney = result.finaFpayoffApproval.payoffMoney
                this.dataForm.approvalStatus = result.finaFpayoffApproval.approvalStatus
                this.dataForm.sign = result.finaFpayoffApproval.sign
                this.dataForm.signTime = result.finaFpayoffApproval.signTime
                this.dataForm.propose = result.finaFpayoffApproval.propose
                this.dataForm.result = result.finaFpayoffApproval.result
                this.dataForm.createtime = result.finaFpayoffApproval.createtime
                this.dataForm.updatetime = result.finaFpayoffApproval.updatetime
                this.dataForm.createuser = result.finaFpayoffApproval.createuser
                this.dataForm.updateuser = result.finaFpayoffApproval.updateuser
                this.dataForm.datastatus = result.finaFpayoffApproval.datastatus
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
          tapp.services.finaFpayoffApproval.save(model).then(function(result) {
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
