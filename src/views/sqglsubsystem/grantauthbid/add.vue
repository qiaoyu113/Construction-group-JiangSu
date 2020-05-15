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
      <t-sub-title :title="'备案信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bId" label="项目名称：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="所属分公司">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="所属事业部：">
            <el-input v-model="dataForm.pcId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="useScenes" label="建设单位：">
            <el-input v-model="dataForm.useScenes"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="grantUser" label="合同模式：">
            <el-input v-model="dataForm.grantUser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="grantContent" label="投资金额：">
            <el-input v-model="dataForm.grantContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="remark" label="工程类别：">
            <el-input v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="经营方式：">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="计划项目规模：">
            <el-input v-model="dataForm.signTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="propose" label="授权用途：：">
              <el-input v-model="dataForm.propose"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="result" label="授权人：">
              <el-input v-model="dataForm.result"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="approvalStatus" label="授权内容：">
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
          <el-col :span="8">
            <el-form-item prop="approvalStatus" label="备注：">
              <el-input v-model="dataForm.approvalStatus"></el-input>
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
          pcId: '',
          useScenes: '',
          grantUser: '',
          grantContent: '',
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
          pcId: [
            {required: true, message: '备案项目ID不能为空', trigger: 'blur'}
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
              tapp.services.tGrantAuthbidApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tGrantAuthbidApproval.bId
                this.dataForm.actTaskKey = result.tGrantAuthbidApproval.actTaskKey
                this.dataForm.pcId = result.tGrantAuthbidApproval.pcId
                this.dataForm.useScenes = result.tGrantAuthbidApproval.useScenes
                this.dataForm.grantUser = result.tGrantAuthbidApproval.grantUser
                this.dataForm.grantContent = result.tGrantAuthbidApproval.grantContent
                this.dataForm.remark = result.tGrantAuthbidApproval.remark
                this.dataForm.sign = result.tGrantAuthbidApproval.sign
                this.dataForm.signTime = result.tGrantAuthbidApproval.signTime
                this.dataForm.propose = result.tGrantAuthbidApproval.propose
                this.dataForm.result = result.tGrantAuthbidApproval.result
                this.dataForm.approvalStatus = result.tGrantAuthbidApproval.approvalStatus
                this.dataForm.createtime = result.tGrantAuthbidApproval.createtime
                this.dataForm.updatetime = result.tGrantAuthbidApproval.updatetime
                this.dataForm.createuser = result.tGrantAuthbidApproval.createuser
                this.dataForm.updateuser = result.tGrantAuthbidApproval.updateuser
                this.dataForm.datastatus = result.tGrantAuthbidApproval.datastatus
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
          tapp.services.tGrantAuthbidApproval.save(model).then(function (result) {
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
