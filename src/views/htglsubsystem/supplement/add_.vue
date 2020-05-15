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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
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
          <el-form-item prop="pId" label="项目id">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cId" label="主合同id">
            <el-input v-model="dataForm.cId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="saCode" label="补充协议编号">
            <el-input v-model="dataForm.saCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="saName" label="补充协议名称">
            <el-input v-model="dataForm.saName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="additionContent" label="补充协议内容">
            <el-input v-model="dataForm.additionContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conStatus" label="协议状态（字典表）">
            <el-input v-model="dataForm.conStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conSigningDate" label="签订日期">
            <el-input v-model="dataForm.conSigningDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conPayWay" label="付款方式（字典表）">
            <el-input v-model="dataForm.conPayWay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="otherPayWay" label="其他付款方式">
            <el-input v-model="dataForm.otherPayWay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conTotal" label="调整金额">
            <el-input v-model="dataForm.conTotal"></el-input>
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
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          cId: '',
          saCode: '',
          saName: '',
          additionContent: '',
          conStatus: '',
          conSigningDate: '',
          conPayWay: '',
          otherPayWay: '',
          conTotal: '',
          approvalStatus: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          bId: [
            {required: true, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: true, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          pId: [
            {required: true, message: '项目id不能为空', trigger: 'blur'}
          ],
          cId: [
            {required: true, message: '主合同id不能为空', trigger: 'blur'}
          ],
          saCode: [
            {required: true, message: '补充协议编号不能为空', trigger: 'blur'}
          ],
          saName: [
            {required: true, message: '补充协议名称不能为空', trigger: 'blur'}
          ],
          additionContent: [
            {required: true, message: '补充协议内容不能为空', trigger: 'blur'}
          ],
          conStatus: [
            {required: true, message: '协议状态（字典表）不能为空', trigger: 'blur'}
          ],
          conSigningDate: [
            {required: true, message: '签订日期不能为空', trigger: 'blur'}
          ],
          conPayWay: [
            {required: true, message: '付款方式（字典表）不能为空', trigger: 'blur'}
          ],
          otherPayWay: [
            {required: true, message: '其他付款方式不能为空', trigger: 'blur'}
          ],
          conTotal: [
            {required: true, message: '调整金额不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: true, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          createtime: [
            {required: true, message: '创建时间不能为空', trigger: 'blur'}
          ],
          updatetime: [
            {required: true, message: '更新时间不能为空', trigger: 'blur'}
          ],
          createuser: [
            {required: true, message: '创建人不能为空', trigger: 'blur'}
          ],
          updateuser: [
            {required: true, message: '更新人不能为空', trigger: 'blur'}
          ],
          datastatus: [
            {required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      // this.init()
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tContSideAgreementInfo.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tContSideAgreementInfo.bId
                this.dataForm.actTaskKey = result.tContSideAgreementInfo.actTaskKey
                this.dataForm.pId = result.tContSideAgreementInfo.pId
                this.dataForm.cId = result.tContSideAgreementInfo.cId
                this.dataForm.saCode = result.tContSideAgreementInfo.saCode
                this.dataForm.saName = result.tContSideAgreementInfo.saName
                this.dataForm.additionContent = result.tContSideAgreementInfo.additionContent
                this.dataForm.conStatus = result.tContSideAgreementInfo.conStatus
                this.dataForm.conSigningDate = result.tContSideAgreementInfo.conSigningDate
                this.dataForm.conPayWay = result.tContSideAgreementInfo.conPayWay
                this.dataForm.otherPayWay = result.tContSideAgreementInfo.otherPayWay
                this.dataForm.conTotal = result.tContSideAgreementInfo.conTotal
                this.dataForm.approvalStatus = result.tContSideAgreementInfo.approvalStatus
                this.dataForm.createtime = result.tContSideAgreementInfo.createtime
                this.dataForm.updatetime = result.tContSideAgreementInfo.updatetime
                this.dataForm.createuser = result.tContSideAgreementInfo.createuser
                this.dataForm.updateuser = result.tContSideAgreementInfo.updateuser
                this.dataForm.datastatus = result.tContSideAgreementInfo.datastatus
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
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tContSideAgreementInfo.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: "操作成功！",
              message: "保存成功！",
            });
          });
        }).catch(function (e) {
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
