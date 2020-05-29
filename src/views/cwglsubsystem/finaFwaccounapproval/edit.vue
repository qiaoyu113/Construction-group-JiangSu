<template>
  <div>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
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
    <el-row :gutter="10" class="search-top-operate" v-if="isBackFill">
      <el-button type="primary" icon="el-icon-upload2" @click="doBackFillSave()">保存</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="proName" label="项目名称">
              <t-project-select placeholder="选择一个项目" :disabled="readOnly" v-model="dataForm.proName" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proCode" label="项目编号">
            <t-input v-model="dataForm.proCode" :readOnly="readOnly" ></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="remark" label="申请事项">
            <t-input type="textarea" v-model="dataForm.remark" :readOnly="readOnly" ></t-input>
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
          <el-form-item prop="bankName" label="开户行名称" :class="{'is-required': isBackFill}">
            <t-input :disabled="!isBackFill" v-model="dataForm.bankName"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAddress" label="开户网点" :class="{'is-required': isBackFill}">
            <t-input :disabled="!isBackFill" v-model="dataForm.bankAddress"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccountName" label="银行帐户名称" :class="{'is-required': isBackFill}">
            <t-input :disabled="!isBackFill" v-model="dataForm.bankAccountName"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccount" label="银行帐号" :class="{'is-required': isBackFill}">
            <t-input :disabled="!isBackFill" v-model="dataForm.bankAccount"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="openTime" label="开户时间" :class="{'is-required': isBackFill}">
            <el-date-picker type="datetime" :disabled="!isBackFill" v-model="dataForm.openTime"></el-date-picker>
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
      var checkBankName = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.bankName == '' || this.dataForm.bankName == undefined)) callback(new Error('开户行名称不能为空'));
        else callback();
      };
      var checkBackAddress = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.bankAddress == '' || this.dataForm.bankAddress == undefined)) callback(new Error('开户网点不能为空'));
        else callback();
      };
      var checkAccountName = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.bankAccountName == '' || this.dataForm.bankAccountName == undefined)) callback(new Error('银行账户不能为空'));
        else callback();
      };
      var checkBankAccount = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.bankAccount == '' || this.dataForm.bankAccount == undefined)) callback(new Error('银行账号不能为空'));
        else callback();
      };
      var checkOpenTime = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.openTime == '' || this.dataForm.openTime == undefined)) callback(new Error('开户时间不能为空'));
        else callback();
      };
      return {
        dialogFormVisible: false,
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        isBackFill: false,
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
          bankName: [{validator: checkBankName, trigger: 'blur'}],
          bankAddress: [{validator: checkBackAddress, trigger: 'blur'}],
          bankAccountName: [{validator: checkAccountName, trigger: 'blur'}],
          bankAccount: [{validator: checkBankAccount, trigger: 'blur'}],
          openTime: [{validator: checkOpenTime, trigger: 'blur'}],
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
      this.isBackFill = currentQuery.status && (currentQuery.status == 1 || currentQuery.status == 2) ? true : false
      this.init(currentQuery.businessId)
    },
    activated() {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.isBackFill = currentQuery.status && (currentQuery.status == 1 || currentQuery.status == 2) ? true : false
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
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              console.log('id', id)
              tapp.services.finaFwaccounapproval.get(id).then(function(result) {
                console.log('result111111', result)
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                let params = {
                  filters: {},
                  maxResultCount: 20,
                  skipCount: 1,
                  sorting: "id descending",
                  id: result.pId
                }
                tapp.services.proInfo.getPagedList(params).then(_result => {
                  console.log('result2222', _result)
                  if(_result && _result.items && _result.items.length > 0) self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, _result.items[0])
                })
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
            self.$notify.success({
              title: "操作成功！",
              message: "保存成功！",
            });
            self.$refs['ruleForm'].resetFields()
          });
        }).catch(function(e) {
          self.$notify.error({
            title: "错误",
            message: "保存失败！"
          });
          return false;
        });
      },
      // 回填信息保存
      doBackFillSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaFwaccounapproval.save(model).then(function(result) {
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
