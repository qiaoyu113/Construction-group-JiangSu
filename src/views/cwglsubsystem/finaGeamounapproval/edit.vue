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
      <t-sub-title :title="'项目借款信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="pId" label="项目名称">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="项目编号">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="所属单位">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realAmount" label="确认借款额度">
            <el-input readonly v-model="dataForm.realAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="tiimeLimit" label="本次借款期限（月）">
            <el-input readonly v-model="dataForm.tiimeLimit"></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'项目借款信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="getAmount" label="本次放款金额">
            <el-input v-model="dataForm.getAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="timeLimit" label="本次放款期限（月）">
            <el-input v-model="dataForm.timeLimit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="getCode" label="借款合同编号">
            <el-input readonly v-model="dataForm.getCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="totalBorrowAmount" label="累计放款金额">
            <el-input readonly v-model="dataForm.totalBorrowAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="leftAmount" label="剩余可用额度">
            <el-input readonly v-model="dataForm.leftAmount"></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人">
              <el-input v-model="dataForm.sign"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办时间">
              <el-date-picker type="datetime" readonly="true" v-model="dataForm.signTime"></el-date-picker>
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
          bId: '',actTaskKey: '',pId: '',baId: '',getAmount: '',timeLimit: '',getCode: '',totalBorrowAmount: '',
          leftAmount: '',fromType: '',approvalStatus: '',sign: '',signTime: new Date(),propose: '',
          result: '',createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: ''                                                                                        },
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
          baId: [
            { required: true, message: '申请额度id不能为空', trigger: 'blur' }
          ],
          getAmount: [
            { required: true, message: '本次放款金额不能为空', trigger: 'blur' }
          ],
          timeLimit: [
            { required: true, message: '本次放款期限（月）不能为空', trigger: 'blur' }
          ],
          getCode: [
            { required: true, message: '借款合同编号不能为空', trigger: 'blur' }
          ],
          totalBorrowAmount: [
            { required: true, message: '累计放款金额不能为空', trigger: 'blur' }
          ],
          leftAmount: [
            { required: true, message: '剩余可用额度不能为空', trigger: 'blur' }
          ],
          fromType: [
            { required: true, message: '是否集团公司直接付款（字典表）不能为空', trigger: 'blur' }
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
              tapp.services.finaGeamounapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaGeamounapproval.bId
                this.dataForm.actTaskKey = result.finaGeamounapproval.actTaskKey
                this.dataForm.pId = result.finaGeamounapproval.pId
                this.dataForm.baId = result.finaGeamounapproval.baId
                this.dataForm.getAmount = result.finaGeamounapproval.getAmount
                this.dataForm.timeLimit = result.finaGeamounapproval.timeLimit
                this.dataForm.getCode = result.finaGeamounapproval.getCode
                this.dataForm.totalBorrowAmount = result.finaGeamounapproval.totalBorrowAmount
                this.dataForm.leftAmount = result.finaGeamounapproval.leftAmount
                this.dataForm.fromType = result.finaGeamounapproval.fromType
                this.dataForm.approvalStatus = result.finaGeamounapproval.approvalStatus
                this.dataForm.sign = result.finaGeamounapproval.sign
                this.dataForm.signTime = result.finaGeamounapproval.signTime
                this.dataForm.propose = result.finaGeamounapproval.propose
                this.dataForm.result = result.finaGeamounapproval.result
                this.dataForm.createtime = result.finaGeamounapproval.createtime
                this.dataForm.updatetime = result.finaGeamounapproval.updatetime
                this.dataForm.createuser = result.finaGeamounapproval.createuser
                this.dataForm.updateuser = result.finaGeamounapproval.updateuser
                this.dataForm.datastatus = result.finaGeamounapproval.datastatus
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
          tapp.services.finaGeamounapproval.save(model).then(function(result) {
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
