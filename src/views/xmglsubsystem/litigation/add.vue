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
          <el-form-item label="项目名称" prop="proName">
            <el-input v-model="dataForm.proName" readonly>
              <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司" prop="proSubCompany">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部" prop="proBusDept">
            <el-input v-model="dataForm.proBusDept" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位" prop="proConstructCompany">
            <el-input v-model="dataForm.proConstructCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式" prop="proContractAttr">
            <el-input v-model="dataForm.proContractAttr" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额" prop="proTotalInvestment">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别" prop="proType">
            <el-input v-model="dataForm.proType" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式" prop="proRunMode">
            <el-input v-model="dataForm.proRunMode" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模" prop="proBuildArea">
            <el-input v-model="dataForm.proBuildArea" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'已有诉讼信息'"></t-sub-title>
      <t-sub-title :title="'新诉讼信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="isLitigation" label="是否标记诉讼">
            <el-input v-model="dataForm.isLitigation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="owingtoUnionCompany" label="是否与联营单位有关">
            <el-input v-model="dataForm.owingtoUnionCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="冻结金额" prop="freezingAmount" verify class="is-required">
            <t-currency-input v-model="dataForm.freezingAmount" :readOnly="readOnly">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sign" label="标记人">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="标记时间">
            <el-input v-model="dataForm.signTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="说明" prop="remark">
            <el-input type="textarea" :rows="2" v-model="dataForm.remark"></el-input>
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
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      },
    },
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          isLitigation: '',
          owingtoUnionCompany: '',
          unionCompany: '',
          freezingAmount: '',
          remark: '',
          sign: '',
          signTime: '',
          litigationStatus: '',
          cancelTime: '',
          approvalStatus: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          bId: [
            {required: true, message: '业务id用于和一个流程实例绑定不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: true, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          pId: [
            {required: true, message: '项目id不能为空', trigger: 'blur'}
          ],
          isLitigation: [
            {required: true, message: '是否标记诉讼（字典表）不能为空', trigger: 'blur'}
          ],
          owingtoUnionCompany: [
            {required: true, message: '是否与联营单位有关（字典表）不能为空', trigger: 'blur'}
          ],
          unionCompany: [
            {required: true, message: '联营公司标识不能为空', trigger: 'blur'}
          ],
          freezingAmount: [
            {required: true, message: '冻结金额不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '说明不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: true, message: '执行时间不能为空', trigger: 'blur'}
          ],
          litigationStatus: [
            {required: true, message: '诉讼状态（字典表）不能为空', trigger: 'blur'}
          ],
          cancelTime: [
            {required: true, message: '取消时间不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: true, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: true, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: true, message: '审核结果不能为空', trigger: 'blur'}
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
    created () {
      // this.init()
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            if (this.dataForm.id) {
              tapp.services.proLitigation.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.proLitigation.bId
                this.dataForm.actTaskKey = result.proLitigation.actTaskKey
                this.dataForm.pId = result.proLitigation.pId
                this.dataForm.isLitigation = result.proLitigation.isLitigation
                this.dataForm.owingtoUnionCompany = result.proLitigation.owingtoUnionCompany
                this.dataForm.unionCompany = result.proLitigation.unionCompany
                this.dataForm.freezingAmount = result.proLitigation.freezingAmount
                this.dataForm.remark = result.proLitigation.remark
                this.dataForm.sign = result.proLitigation.sign
                this.dataForm.signTime = result.proLitigation.signTime
                this.dataForm.litigationStatus = result.proLitigation.litigationStatus
                this.dataForm.cancelTime = result.proLitigation.cancelTime
                this.dataForm.approvalStatus = result.proLitigation.approvalStatus
                this.dataForm.propose = result.proLitigation.propose
                this.dataForm.result = result.proLitigation.result
                this.dataForm.createtime = result.proLitigation.createtime
                this.dataForm.updatetime = result.proLitigation.updatetime
                this.dataForm.createuser = result.proLitigation.createuser
                this.dataForm.updateuser = result.proLitigation.updateuser
                this.dataForm.datastatus = result.proLitigation.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate()
          })
        }
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.proLitigation.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！',
            })
          })
        }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '保存失败！'
          })
          return false
        })
      }
    }
  }
</script>
