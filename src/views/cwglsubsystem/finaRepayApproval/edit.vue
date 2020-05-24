<template>
  <div>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" plain icon="el-icon-s-data" @click="dialogVisible = true">
        审批流程图
      </el-button>
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
        <!-- businessKey值请修改当前流程的key值 -->
        <t-workflow-map businessKey="t_baseinfo_key_approval_process"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目放款信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="baId" label="借款合同编号">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="proName" label="项目名称">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCode" label="项目编号">
            <el-input readonly v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属单位">
            <el-input readonly v-model="dataForm.proSubCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realAmount" label="确认借款额度">
            <el-input readonly v-model="dataForm.realAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="tiimeLimit" label="借款期限（月）">
            <el-input readonly v-model="dataForm.tiimeLimit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item prop="getAmount" label="本次放款金额" >
          <el-input readonly v-model="dataForm.getAmount"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="timeLimit" label="本次放款期限（月）" label-width="140px">
            <el-input readonly v-model="dataForm.timeLimit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'项目还款信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="getAmount" label="本次还款金额">
            <el-input v-model="dataForm.getAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="tiimeLimit" label="本次累计已还金额">
            <el-input readonly v-model="dataForm.tiimeLimit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="getCode" label="本次累计未还金额">
            <el-input readonly v-model="dataForm.getCode"></el-input>
          </el-form-item>
        </el-col>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人">
              <el-input v-model="dataForm.sign"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办时间">
              <span>{{dataForm.signTime}}</span>
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
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import moment from "moment";
  import {mapState} from "vuex";

  export default {
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        dataForm: {
          bId: '',actTaskKey: '',pId: '',gId: '',getAmount: '',tiimeLimit: '',getCode: '',approvalStatus: '',
          sign: '',signTime: new Date(),propose: '',result: '',createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: ''                                                                                        },
        dataRule: {
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          proCode: [
            { required: true, message: '项目编号不能为空', trigger: 'blur' }
          ],
          getAmount: [
            { required: true, message: '本次还款金额不能为空', trigger: 'blur' }
          ],
          tiimeLimit: [
            { required: true, message: '本次累计已还金额不能为空', trigger: 'blur' }
          ],
          getCode: [
            { required: true, message: '本次累计未还金额不能为空', trigger: 'blur' }
          ],
          proSubCompany: [
            { required: true, message: '所属单位不能为空', trigger: 'blur' }
          ],
          realAmount: [
            { required: true, message: '确认借款额度不能为空', trigger: 'blur' }
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
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    activated() {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
                        if (this.dataForm.id) {
              let self = this;
              tapp.services.finaRepayApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.finaRepayApproval.pId
                self.dataForm.gId = result.finaRepayApproval.gId
                self.dataForm.getAmount = result.finaRepayApproval.getAmount
                self.dataForm.tiimeLimit = result.finaRepayApproval.tiimeLimit
                self.dataForm.getCode = result.finaRepayApproval.getCode
                self.dataForm.approvalStatus = result.finaRepayApproval.approvalStatus
                self.dataForm.sign = result.finaRepayApproval.sign
                self.dataForm.signTime = result.finaRepayApproval.signTime
                self.dataForm.propose = result.finaRepayApproval.propose
                self.dataForm.result = result.finaRepayApproval.result
                self.dataForm.createtime = result.finaRepayApproval.createtime
                self.dataForm.updatetime = result.finaRepayApproval.updatetime
                self.dataForm.createuser = result.finaRepayApproval.createuser
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
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaRepayApproval.save(model).then(function(result) {
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
