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
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bId" label="授权编号 ：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="企业名称：">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="统一社会信用代码：">
            <el-input v-model="dataForm.pcId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="useScenes" label="企业地址：">
            <el-input v-model="dataForm.useScenes"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="grantUser" label="企业性质：">
            <el-input v-model="dataForm.grantUser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="grantContent" label="法人代表：">
            <el-input v-model="dataForm.grantContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="remark" label="备注：">
            <el-input v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="propose" label="意向项目：">
            <el-input v-model="dataForm.propose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="result" label="项目规模：">
            <el-input v-model="dataForm.result"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="授权人：">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="经办人：">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="经办时间：">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload>
      </el-card>
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
          companyName: '',
          creditCode: '',
          companyAddress: '',
          companyAttr: '',
          legalPerson: '',
          intentionProject: '',
          proBuildArea: '',
          grantUser: '',
          remark: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
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
            {required: true, message: '授权编号不能为空', trigger: 'blur'}
          ],
          companyName: [
            {required: true, message: '企业名称不能为空', trigger: 'blur'}
          ],
          creditCode: [
            {required: true, message: '统一社会信用代码不能为空', trigger: 'blur'}
          ],
          companyAddress: [
            {required: true, message: '企业地址不能为空', trigger: 'blur'}
          ],
          companyAttr: [
            {required: true, message: '企业性质（字典表）不能为空', trigger: 'blur'}
          ],
          legalPerson: [
            {required: true, message: '法人代表不能为空', trigger: 'blur'}
          ],
          intentionProject: [
            {required: true, message: '意向项目不能为空', trigger: 'blur'}
          ],
          proBuildArea: [
            {required: true, message: '项目规模-建筑面积-平方米不能为空', trigger: 'blur'}
          ],
          grantUser: [
            {required: true, message: '授权人不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '备注不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: true, message: '执行时间不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: true, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: true, message: '审核结果不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: true, message: '审核状态（字典表）不能为空', trigger: 'blur'}
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
              tapp.services.tGrantEnterpriseApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tGrantEnterpriseApproval.bId
                this.dataForm.actTaskKey = result.tGrantEnterpriseApproval.actTaskKey
                this.dataForm.pId = result.tGrantEnterpriseApproval.pId
                this.dataForm.companyName = result.tGrantEnterpriseApproval.companyName
                this.dataForm.creditCode = result.tGrantEnterpriseApproval.creditCode
                this.dataForm.companyAddress = result.tGrantEnterpriseApproval.companyAddress
                this.dataForm.companyAttr = result.tGrantEnterpriseApproval.companyAttr
                this.dataForm.legalPerson = result.tGrantEnterpriseApproval.legalPerson
                this.dataForm.intentionProject = result.tGrantEnterpriseApproval.intentionProject
                this.dataForm.proBuildArea = result.tGrantEnterpriseApproval.proBuildArea
                this.dataForm.grantUser = result.tGrantEnterpriseApproval.grantUser
                this.dataForm.remark = result.tGrantEnterpriseApproval.remark
                this.dataForm.sign = result.tGrantEnterpriseApproval.sign
                this.dataForm.signTime = result.tGrantEnterpriseApproval.signTime
                this.dataForm.propose = result.tGrantEnterpriseApproval.propose
                this.dataForm.result = result.tGrantEnterpriseApproval.result
                this.dataForm.approvalStatus = result.tGrantEnterpriseApproval.approvalStatus
                this.dataForm.createtime = result.tGrantEnterpriseApproval.createtime
                this.dataForm.updatetime = result.tGrantEnterpriseApproval.updatetime
                this.dataForm.createuser = result.tGrantEnterpriseApproval.createuser
                this.dataForm.updateuser = result.tGrantEnterpriseApproval.updateuser
                this.dataForm.datastatus = result.tGrantEnterpriseApproval.datastatus
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
          tapp.services.tGrantEnterpriseApproval.save(model).then(function (result) {
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
