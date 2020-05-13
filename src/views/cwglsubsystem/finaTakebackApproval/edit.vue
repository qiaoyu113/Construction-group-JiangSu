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
          <el-form-item prop="rId" label="到帐标识id">
            <el-input v-model="dataForm.rId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="mangementRatio" label="总部管理费比例">
            <el-input v-model="dataForm.mangementRatio"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="deductAmount" label="扣款">
            <el-input v-model="dataForm.deductAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realAmount" label="本次实际请款金额">
            <el-input v-model="dataForm.realAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sAmount" label="自营金额">
            <el-input v-model="dataForm.sAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="oAmount" label="联营金额">
            <el-input v-model="dataForm.oAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="paidSAmount" label="已支付预付款金额-自营">
            <el-input v-model="dataForm.paidSAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="paidOAmount" label="已支付预付款金额-联营">
            <el-input v-model="dataForm.paidOAmount"></el-input>
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
          bId: '',                                                                                                                                                            actTaskKey: '',                                                                                                                                                            pId: '',                                                                                                                                                            rId: '',                                                                                                                                                            mangementRatio: '',                                                                                                                                                            deductAmount: '',                                                                                                                                                            realAmount: '',                                                                                                                                                            sAmount: '',                                                                                                                                                            oAmount: '',                                                                                                                                                            paidSAmount: '',                                                                                                                                                            paidOAmount: '',                                                                                                                                                            approvalStatus: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            propose: '',                                                                                                                                                            result: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
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
          rId: [
            { required: true, message: '到帐标识id不能为空', trigger: 'blur' }
          ],
          mangementRatio: [
            { required: true, message: '总部管理费比例不能为空', trigger: 'blur' }
          ],
          deductAmount: [
            { required: true, message: '扣款不能为空', trigger: 'blur' }
          ],
          realAmount: [
            { required: true, message: '本次实际请款金额不能为空', trigger: 'blur' }
          ],
          sAmount: [
            { required: true, message: '自营金额不能为空', trigger: 'blur' }
          ],
          oAmount: [
            { required: true, message: '联营金额不能为空', trigger: 'blur' }
          ],
          paidSAmount: [
            { required: true, message: '已支付预付款金额-自营不能为空', trigger: 'blur' }
          ],
          paidOAmount: [
            { required: true, message: '已支付预付款金额-联营不能为空', trigger: 'blur' }
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
              tapp.services.finaTakebackApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaTakebackApproval.bId
                this.dataForm.actTaskKey = result.finaTakebackApproval.actTaskKey
                this.dataForm.pId = result.finaTakebackApproval.pId
                this.dataForm.rId = result.finaTakebackApproval.rId
                this.dataForm.mangementRatio = result.finaTakebackApproval.mangementRatio
                this.dataForm.deductAmount = result.finaTakebackApproval.deductAmount
                this.dataForm.realAmount = result.finaTakebackApproval.realAmount
                this.dataForm.sAmount = result.finaTakebackApproval.sAmount
                this.dataForm.oAmount = result.finaTakebackApproval.oAmount
                this.dataForm.paidSAmount = result.finaTakebackApproval.paidSAmount
                this.dataForm.paidOAmount = result.finaTakebackApproval.paidOAmount
                this.dataForm.approvalStatus = result.finaTakebackApproval.approvalStatus
                this.dataForm.sign = result.finaTakebackApproval.sign
                this.dataForm.signTime = result.finaTakebackApproval.signTime
                this.dataForm.propose = result.finaTakebackApproval.propose
                this.dataForm.result = result.finaTakebackApproval.result
                this.dataForm.createtime = result.finaTakebackApproval.createtime
                this.dataForm.updatetime = result.finaTakebackApproval.updatetime
                this.dataForm.createuser = result.finaTakebackApproval.createuser
                this.dataForm.updateuser = result.finaTakebackApproval.updateuser
                this.dataForm.datastatus = result.finaTakebackApproval.datastatus
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
          tapp.services.finaTakebackApproval.save(model).then(function(result) {
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
