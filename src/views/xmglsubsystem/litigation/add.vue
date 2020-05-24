<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目诉讼登记</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-bell" @click="doSave()">保存并通知</el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-operation" @click="">通知流程图</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="140px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：" prop="pId">
            <t-project-select  placeholder="选择一个项目" v-model="dataForm.pId" @selectedProject="getSelectedProject"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司：" prop="proSubCompany">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部：" prop="proBusDept">
            <el-input v-model="dataForm.proBusDept" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位：" prop="proConstructCompany">
            <el-input v-model="dataForm.proConstructCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式：">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额：" prop="proTotalInvestment">
            <el-input v-model="dataForm.proTotalInvestment" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：" prop="proType">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：" prop="proRunMode">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模：" prop="proBuildArea">
            <el-input v-model="dataForm.proBuildArea" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'已有诉讼信息'"></t-sub-title>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'新诉讼信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="isLitigation" label="标记诉讼：">
            <t-dic-dropdown-select dicType="y_or_n" v-model="dataForm.isLitigation" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="owingtoUnionCompany" label="与联营单位有关：">
            <t-dic-dropdown-select dicType="y_or_n" v-model="dataForm.owingtoUnionCompany" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="冻结金额：" prop="freezingAmount">
            <t-currency-input v-model="dataForm.freezingAmount" :readOnly="readOnly">
              <span slot="append">元</span>
            </t-currency-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sign" label="标记人：">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="标记时间：">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="说明：" prop="remark">
            <el-input type="textarea" :rows="2" v-model="dataForm.remark"></el-input>
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
  import moment from 'moment'
  import { mapState } from 'vuex'
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
          pId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '说明不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })
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
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
          })
        }
      },
      getSelectedProject(project) {
        console.log('current project', project);
        this.dataForm.proSubCompany = project.proSubCompany;
        this.dataForm.proBusDept = project.proBusDept;
        this.dataForm.proConstructCompany = project.proConstructCompany;
        this.dataForm.proContractAttr = project.proContractAttr;
        this.dataForm.proTotalInvestment = project.proTotalInvestment;
        this.dataForm.proType = project.proType;
        this.dataForm.proRunMode = project.proRunMode;
        this.dataForm.proBuildArea = project.proBuildArea;
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
