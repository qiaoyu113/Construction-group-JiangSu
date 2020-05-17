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
          <el-form-item label="项目名称：" prop="actTaskKey" >
            <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="dataForm.actTaskKey"
                       placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="所属分公司：">
            <el-input readonly v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="所属事业部：">
            <el-input readonly v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="建设单位：">
            <el-input readonly v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式：" prop="pcId">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.grantUser" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="投资金额：">
            <el-input readonly v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.remark" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.sign" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="项目规模：">
            <el-input readonly v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pcId" label="项目经理：">
            <el-input readonly v-model="dataForm.propose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="所在单位：">
            <el-input readonly v-model="dataForm.result"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="称职：">
            <el-input readonly v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="授权期限：">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="授权人：">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
        <!--  <el-form-item prop="approvalStatus" label="授权内容：">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>-->
          <el-form-item label="授权内容：" prop="approvalStatus" verify can-be-empty :maxLength="200">
            <el-input type="textarea" v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
       <!-- <el-form-item prop="approvalStatus" label="经办人：">
          <el-input v-model="dataForm.approvalStatus"></el-input>
        </el-form-item>-->
          <el-form-item prop="approvalStatus" label="经办人:">
            系统登录人
          </el-form-item>
      </el-col>
        <el-col :span="8">
          <!--<el-form-item prop="approvalStatus" label="经办时间：">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>-->
          <el-form-item label="经办时间：" prop="approvalStatus">
            <span>{{dataForm.signTime}}</span>
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
          proManager: '',
          grantStarttime: '',
          grantEndtime: '',
          useScenes: '',
          grantUser: '',
          grantContent: '',
          remark: '',
          sign: '',
          signTime: new Date(),
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
            {required: true, message: '项目ID不能为空', trigger: 'blur'}
          ],
          proManager: [
            {required: true, message: '项目经理不能为空', trigger: 'blur'}
          ],
          grantStarttime: [
            {required: true, message: '授权期限-开始时间不能为空', trigger: 'blur'}
          ],
          grantEndtime: [
            {required: true, message: '授权期限-结束时间不能为空', trigger: 'blur'}
          ],
          useScenes: [
            {required: true, message: '授权用途（字典表）不能为空', trigger: 'blur'}
          ],
          grantUser: [
            {required: true, message: '授权人不能为空', trigger: 'blur'}
          ],
          grantContent: [
            {required: true, message: '授权内容不能为空', trigger: 'blur'}
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
              tapp.services.tGrantPmApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tGrantPmApproval.bId
                this.dataForm.actTaskKey = result.tGrantPmApproval.actTaskKey
                this.dataForm.pId = result.tGrantPmApproval.pId
                this.dataForm.proManager = result.tGrantPmApproval.proManager
                this.dataForm.grantStarttime = result.tGrantPmApproval.grantStarttime
                this.dataForm.grantEndtime = result.tGrantPmApproval.grantEndtime
                this.dataForm.useScenes = result.tGrantPmApproval.useScenes
                this.dataForm.grantUser = result.tGrantPmApproval.grantUser
                this.dataForm.grantContent = result.tGrantPmApproval.grantContent
                this.dataForm.remark = result.tGrantPmApproval.remark
                this.dataForm.sign = result.tGrantPmApproval.sign
                this.dataForm.signTime = result.tGrantPmApproval.signTime
                this.dataForm.propose = result.tGrantPmApproval.propose
                this.dataForm.result = result.tGrantPmApproval.result
                this.dataForm.approvalStatus = result.tGrantPmApproval.approvalStatus
                this.dataForm.createtime = result.tGrantPmApproval.createtime
                this.dataForm.updatetime = result.tGrantPmApproval.updatetime
                this.dataForm.createuser = result.tGrantPmApproval.createuser
                this.dataForm.updateuser = result.tGrantPmApproval.updateuser
                this.dataForm.datastatus = result.tGrantPmApproval.datastatus
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
          tapp.services.tGrantPmApproval.save(model).then(function (result) {
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
