<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'备案信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pcId" label="项目名称">
            <el-input v-model="dataForm.pcId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="所属分公司">
            <el-input reanonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="所属事业部">
            <el-input reanonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="建设单位">
            <el-input reanonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="合同模式">
            <el-input reanonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item prop="amount" label="投资金额">
            <el-input readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="工程类别">
            <el-input reanonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="经营方式">
            <el-input reanonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pcId" label="计划项目规模">
            <el-input reanonly></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="promiseWay" label="保证方式">
            <t-dic-radio-select dicType="1260863582778822657" v-model="dataForm.promiseWay"
                                   :readOnly="readOnly"></t-dic-radio-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="amount" label="金额">
            <el-input v-model="dataForm.amount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="isCash" label="是否现金缴纳">
            <el-input v-model="dataForm.isCash"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="generateBank" label="开立银行">
            <el-input v-model="dataForm.generateBank" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="generateTime" label="开立时间">
            <el-input v-model="dataForm.generateTime" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invalidTime" label="到期时间">
            <el-input v-model="dataForm.invalidTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="plCode" label="保函编号">
            <el-input v-model="dataForm.plCode" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item prop="sign" label="经办人">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="经办时间">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="remark" label="备注">
            <t-input type="textarea" :rows="3" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
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
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pcId: '',
          promiseWay: '',
          amount: '',
          isCash: '',
          generateBank: '',
          generateTime: '',
          invalidTime: '',
          plCode: '',
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
          bId: [
            {required: true, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: true, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          pcId: [
            {required: true, message: '项目备案id不能为空', trigger: 'blur'}
          ],
          promiseWay: [
            {required: true, message: '保证方式（字典表）不能为空', trigger: 'blur'}
          ],
          amount: [
            {required: true, message: '金额不能为空', trigger: 'blur'}
          ],
          isCash: [
            {required: true, message: '是否现金缴纳（字典表）不能为空', trigger: 'blur'}
          ],
          generateBank: [
            {required: true, message: '开立银行不能为空', trigger: 'blur'}
          ],
          generateTime: [
            {required: true, message: '开立时间不能为空', trigger: 'blur'}
          ],
          invalidTime: [
            {required: true, message: '到期时间不能为空', trigger: 'blur'}
          ],
          plCode: [
            {required: true, message: '保函编号不能为空', trigger: 'blur'}
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
              tapp.services.tBidPromiseApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tBidPromiseApproval.bId
                this.dataForm.actTaskKey = result.tBidPromiseApproval.actTaskKey
                this.dataForm.pcId = result.tBidPromiseApproval.pcId
                this.dataForm.promiseWay = result.tBidPromiseApproval.promiseWay
                this.dataForm.amount = result.tBidPromiseApproval.amount
                this.dataForm.isCash = result.tBidPromiseApproval.isCash
                this.dataForm.generateBank = result.tBidPromiseApproval.generateBank
                this.dataForm.generateTime = result.tBidPromiseApproval.generateTime
                this.dataForm.invalidTime = result.tBidPromiseApproval.invalidTime
                this.dataForm.plCode = result.tBidPromiseApproval.plCode
                this.dataForm.remark = result.tBidPromiseApproval.remark
                this.dataForm.sign = result.tBidPromiseApproval.sign
                this.dataForm.signTime = result.tBidPromiseApproval.signTime
                this.dataForm.approvalStatus = result.tBidPromiseApproval.approvalStatus
                this.dataForm.propose = result.tBidPromiseApproval.propose
                this.dataForm.result = result.tBidPromiseApproval.result
                this.dataForm.createtime = result.tBidPromiseApproval.createtime
                this.dataForm.updatetime = result.tBidPromiseApproval.updatetime
                this.dataForm.createuser = result.tBidPromiseApproval.createuser
                this.dataForm.updateuser = result.tBidPromiseApproval.updateuser
                this.dataForm.datastatus = result.tBidPromiseApproval.datastatus
              })
            }
          })
        } else {
          this.dataForm.sign = this.currentUser.userDisplayName
          this.dataForm.signTime = this.$util.datetimeFormat(moment())
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
          tapp.services.tBidPromiseApproval.save(model).then(function (result) {
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
