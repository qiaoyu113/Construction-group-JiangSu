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
      <t-sub-title :title="'项目借款信息'"></t-sub-title>
      <el-card shadow="never">
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
            <el-form-item prop="pId" label="所属单位">
              <el-input readonly v-model="dataForm.pId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="realAmount" label="确认借款额度">
              <el-input readonly v-model="dataForm.realAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="tiimeLimit" label="借款期限">
              <t-int-input readonly v-model="dataForm.tiimeLimit">
                <span slot="append">月</span>
              </t-int-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="getAmount" label="本次放款金额">
              <el-input readonly v-model="dataForm.getAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="timeLimit" label="本次放款期限">
              <t-int-input readonly v-model="dataForm.timeLimit">
                <span slot="append">月</span>
              </t-int-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-card shadow="never">
          <t-sub-title :title="'已延期信息'"></t-sub-title>
        </el-card>
        <el-card shadow="never">
          <t-sub-title :title="'延期申请'"></t-sub-title>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="getAmount" label="本次放款累计已还金额" label-width="200px">
                <el-input readonly v-model="dataForm.getAmount">
                  <span slot="append">万元</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="tiimeLimit" label="本次放款累计未还金额" label-width="200px">
                <el-input readonly v-model="dataForm.tiimeLimit">
                  <span slot="append">万元</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="getCode" label="申请延期还款日" label-width="200px">
                <el-input v-model="dataForm.getCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
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
            <el-form-item prop="remark" label="延期说明">
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
          bId: '',
          actTaskKey: '',
          pId: '',gId: '',
          getAmount: '',
          tiimeLimit: '',
          getCode: '',
          approvalStatus: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          baId: [
            { required: true, message: '借款合同编号', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          proCode: [
            { required: true, message: '项目编码不能为空', trigger: 'blur' }
          ],
          getAmount: [
            { required: true, message: '本次放款累计已还金额不能为空', trigger: 'blur' }
          ],
          tiimeLimit: [
            { required: true, message: '本次放款累计未还金额不能为空', trigger: 'blur' }
          ],
          getCode: [
            { required: true, message: '申请延期还款日不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '延期说明不能为空', trigger: 'blur' }
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
              tapp.services.finaRpdelayApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.finaRpdelayApproval.pId
                self.dataForm.gId = result.finaRpdelayApproval.gId
                self.dataForm.getAmount = result.finaRpdelayApproval.getAmount
                self.dataForm.tiimeLimit = result.finaRpdelayApproval.tiimeLimit
                self.dataForm.getCode = result.finaRpdelayApproval.getCode
                self.dataForm.approvalStatus = result.finaRpdelayApproval.approvalStatus
                self.dataForm.sign = result.finaRpdelayApproval.sign
                self.dataForm.signTime = result.finaRpdelayApproval.signTime
                self.dataForm.propose = result.finaRpdelayApproval.propose
                self.dataForm.result = result.finaRpdelayApproval.result
                self.dataForm.createtime = result.finaRpdelayApproval.createtime
                self.dataForm.updatetime = result.finaRpdelayApproval.updatetime
                self.dataForm.createuser = result.finaRpdelayApproval.createuser

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
          tapp.services.finaRpdelayApproval.save(model).then(function(result) {
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
