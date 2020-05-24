<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目收入登记</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">提交审批</el-button>
      <el-button type="primary" plain @click="dialogVisible = true">
                    <span style="display: flex;align-items:center;">
                      <v-icon name="sitemap"></v-icon>
                      <span style="margin-left: 5px;">审批流程图</span>
                    </span>
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'收款信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="pId" label="项目名称：">
              <el-input v-model="dataForm.pId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="cId" label="项目编号：" verify class="is-required">
              <el-input v-model="dataForm.code" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="subCompany" label="所属分公司：" verify class="is-required">
              <el-input v-model="dataForm.subCompany" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="address" label="项目地址：" verify class="is-required">
              <el-input v-model="dataForm.address" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="getType" label="本次收款类型：">
              <el-input v-model="dataForm.getType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="amount" label="本次收款金额：">
              <el-input v-model="dataForm.amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际收款日期：" prop="getDate">
              <t-datetime-picker v-model="dataForm.getDate" type="date" :readOnly="readOnly">
              </t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经办人：" prop="sign">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经办时间：" prop="signTime">
              <span>{{dataForm.signTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="收款说明" prop="remark">
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
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          cId: '',
          getType: '',
          amount: '',
          getDate: '',
          remark: '',
          sign: '',
          signTime: '',
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
          getType: [
            {required: true, message: '本次收款类型不能为空', trigger: 'blur'}
          ],
          amount: [
            {required: true, message: '本次收款金额不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.osIncomeApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.osIncomeApproval.bId
                this.dataForm.actTaskKey = result.osIncomeApproval.actTaskKey
                this.dataForm.pId = result.osIncomeApproval.pId
                this.dataForm.cId = result.osIncomeApproval.cId
                this.dataForm.getType = result.osIncomeApproval.getType
                this.dataForm.amount = result.osIncomeApproval.amount
                this.dataForm.getDate = result.osIncomeApproval.getDate
                this.dataForm.remark = result.osIncomeApproval.remark
                this.dataForm.sign = result.osIncomeApproval.sign
                this.dataForm.signTime = result.osIncomeApproval.signTime
                this.dataForm.approvalStatus = result.osIncomeApproval.approvalStatus
                this.dataForm.propose = result.osIncomeApproval.propose
                this.dataForm.result = result.osIncomeApproval.result
                this.dataForm.createtime = result.osIncomeApproval.createtime
                this.dataForm.updatetime = result.osIncomeApproval.updatetime
                this.dataForm.createuser = result.osIncomeApproval.createuser
                this.dataForm.updateuser = result.osIncomeApproval.updateuser
                this.dataForm.datastatus = result.osIncomeApproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
          })
        }
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.osIncomeApproval.save(model).then(function (result) {
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
