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
          <el-form-item prop="bId" label="项目名称：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="所属分公司：">
            <el-input v-model="dataForm.actTaskKey" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="所属事业部：">
            <el-input v-model="dataForm.pId" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cId" label="建设单位：">
            <el-input v-model="dataForm.cId" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!--<el-form-item prop="grantStarttime" label="合同模式：">
            <el-input v-model="dataForm.grantStarttime" readonly></el-input>
          </el-form-item>-->
          <el-form-item label="合同模式：" prop="proContractAttr">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.grantStarttime" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="grantEndtime" label="投资金额：">
            <el-input v-model="dataForm.grantEndtime" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.grantUser" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
          <!--<el-form-item prop="grantUser" label="工程类别：">
            <el-input v-model="dataForm.grantUser" readonly></el-input>
          </el-form-item>-->
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.grantUser" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="remark" label="项目规模：">
            <el-input v-model="dataForm.remark" readonly></el-input>
          </el-form-item>
          </el-col>
      </el-row>
        <t-sub-title :title="'合同信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="bId" label="合同名称：">
              <el-input v-model="dataForm.bId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="bId" label="合同期间：">
              <el-input v-model="dataForm.bId"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="bId" label="合同金额：">
              <el-input v-model="dataForm.bId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <t-sub-title :title="'办理信息'"></t-sub-title>
          <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item prop="bId" verify can-be-empty :maxLength="200" label="授权内容：">
                  <el-input type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="bId" label="授权期限：">
                <el-input v-model="dataForm.bId"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item prop="bId" label="授权人：">
                <el-input v-model="dataForm.bId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="bId" label="经办人：">
                <el-input v-model="dataForm.bId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="bId" label="经办时间：">
                <el-input v-model="dataForm.bId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="bId" verify can-be-empty :maxLength="200" label="备注：">
                <el-input type="textarea"></el-input>
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
          grantStarttime: '',
          grantEndtime: '',
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
          pId: [
            {required: true, message: '项目ID不能为空', trigger: 'blur'}
          ],
          cId: [
            {required: true, message: '合同id不能为空', trigger: 'blur'}
          ],
          grantStarttime: [
            {required: true, message: '授权期限-开始时间不能为空', trigger: 'blur'}
          ],
          grantEndtime: [
            {required: true, message: '授权期限-结束时间不能为空', trigger: 'blur'}
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
              tapp.services.tGrantContractApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tGrantContractApproval.bId
                this.dataForm.actTaskKey = result.tGrantContractApproval.actTaskKey
                this.dataForm.pId = result.tGrantContractApproval.pId
                this.dataForm.cId = result.tGrantContractApproval.cId
                this.dataForm.grantStarttime = result.tGrantContractApproval.grantStarttime
                this.dataForm.grantEndtime = result.tGrantContractApproval.grantEndtime
                this.dataForm.grantUser = result.tGrantContractApproval.grantUser
                this.dataForm.grantContent = result.tGrantContractApproval.grantContent
                this.dataForm.remark = result.tGrantContractApproval.remark
                this.dataForm.sign = result.tGrantContractApproval.sign
                this.dataForm.signTime = result.tGrantContractApproval.signTime
                this.dataForm.propose = result.tGrantContractApproval.propose
                this.dataForm.result = result.tGrantContractApproval.result
                this.dataForm.approvalStatus = result.tGrantContractApproval.approvalStatus
                this.dataForm.createtime = result.tGrantContractApproval.createtime
                this.dataForm.updatetime = result.tGrantContractApproval.updatetime
                this.dataForm.createuser = result.tGrantContractApproval.createuser
                this.dataForm.updateuser = result.tGrantContractApproval.updateuser
                this.dataForm.datastatus = result.tGrantContractApproval.datastatus
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
          tapp.services.tGrantContractApproval.save(model).then(function (result) {
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
