<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="">
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
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="proName" label="项目名称">
              <t-project-select placeholder="选择一个项目" v-model="dataForm.proName" @selectedProject="getSelectedProject"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proCode" :readOnly="readOnly" label="项目编号">
            <el-input v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="remark" :readOnly="readOnly" label="申请事项">
            <el-input type="textarea" v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="sign" label="经办人">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="signTime" label="经办时间">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'帐户信息（帐户开立申请通过后填写）'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="bankName" label="开户行名称">
            <el-input readonly v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAddress" label="开户网点">
            <el-input readonly v-model="dataForm.bankAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccountName" label="银行帐户名称">
            <el-input readonly v-model="dataForm.bankAccountName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccount" label="银行帐号">
            <el-input readonly v-model="dataForm.bankAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="openTime" label="开户时间">
            <el-date-picker type="datetime" readonly v-model="dataForm.openTime"></el-date-picker>
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
  import moment from 'moment'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        dialogFormVisible: false,
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        dataForm: {
          proName: '',
          proCode: '',
          bId: '',
          actTaskKey: '',
          pId: '',
          bankName: '',
          bankAddress: '',
          bankAccountName: '',
          bankAccount: '',
          openTime: '',
          approvalStatus: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          remark: ''
        },
        dataRule: {
          proCode: [
            { required: true, message: '项目编码不能为空', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          // bankName: [
          //   { required: true, message: '开户行名称不能为空', trigger: 'blur' }
          // ],
          // bankAddress: [
          //   { required: true, message: '开户网点不能为空', trigger: 'blur' }
          // ],
          // bankAccountName: [
          //   { required: true, message: '银行帐户名称不能为空', trigger: 'blur' }
          // ],
          // bankAccount: [
          //   { required: true, message: '银行帐号不能为空', trigger: 'blur' }
          // ],
          // openTime: [
          //   { required: true, message: '开户时间不能为空', trigger: 'blur' }
          // ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ]
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
      // 选择项目
      getSelectedProject(project) {
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        this.dataForm.proName = project.proName
        this.dataForm.pId = project.id
        this.dataForm.proCode = project.proCode

      },
      // 搜索条件重置
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.finaFwaccounapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.finaFwaccounapproval.pId
                self.dataForm.bankName = result.finaFwaccounapproval.bankName
                self.dataForm.bankAddress = result.finaFwaccounapproval.bankAddress
                self.dataForm.bankAccountName = result.finaFwaccounapproval.bankAccountName
                self.dataForm.bankAccount = result.finaFwaccounapproval.bankAccount
                self.dataForm.openTime = result.finaFwaccounapproval.openTime
                self.dataForm.approvalStatus = result.finaFwaccounapproval.approvalStatus
                self.dataForm.sign = result.finaFwaccounapproval.sign
                self.dataForm.signTime = result.finaFwaccounapproval.signTime
                self.dataForm.propose = result.finaFwaccounapproval.propose
                self.dataForm.result = result.finaFwaccounapproval.result
                self.dataForm.createtime = result.finaFwaccounapproval.createtime
                self.dataForm.updatetime = result.finaFwaccounapproval.updatetime
                self.dataForm.createuser = result.finaFwaccounapproval.createuser
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
          tapp.services.finaFwaccounapproval.save(model).then(function(result) {
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
      },
      proChoose() {
        //传送到父组件
        this.formInfo = this.$refs.multipleTable.selection;
        this.$emit('formInfo', this.formInfo);
        this.dataForm.proName = this.formInfo.proName;
      },
      doReset () {
        this.hasQuery = false
        // data恢复初始化数据
        this.queryCondition = util.deepObjectAssign({}, this.$options.data().queryCondition)
      },
    }
  }
</script>
