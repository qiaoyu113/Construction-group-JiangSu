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
    <el-row :gutter="10" class="search-top-operate" v-if="isBackFill">
      <el-button type="primary" icon="el-icon-upload2" @click="doBackFillSave()">保存</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="120px" label-position="right">
      <el-card>
      <t-sub-title :title="'账户信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="bankAccount" label="银行账号：">
            <t-bank-select :readOnly="readOnly" v-model="dataForm.bankAccount" @selectedData="selectedData"></t-bank-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankName" label="开户行名称：">
            <el-input :readOnly="readOnly" v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAddress" label="开户网点：">
            <el-input :readOnly="readOnly" v-model="dataForm.bankAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccountName" label="银行账户名称：">
            <el-input :readOnly="readOnly" v-model="dataForm.bankAccountName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proName" label="项目名称：">
            <el-input :readOnly="readOnly" v-model="dataForm.proName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proCode" label="项目编号：">
            <el-input :readOnly="readOnly" v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="sign" label="经办人：">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经办时间：">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注销时间：" :class="{'is-required': isBackFill}">
            <el-date-picker type="datetime" placeholder="申请完成后，填写注销时间" :disabled="!isBackFill" v-model="dataForm.cancelTime"></el-date-picker>
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
  import find from 'lodash/find'

  export default {
    data () {
      var checkCancelTime = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.cancelTime == '' || this.dataForm.cancelTime == undefined)) callback(new Error('注销时间不能为空'));
        else callback();
      };
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        isBackFill: false,
        dataForm: {
          bId: '',
          pId: '',
          fwaId: '',
          cancelTime: '',
          approvalStatus: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          proCode: '',
          proName:'',
          bankAccountName: '',
          bankAddress: '',
          bankName: '',
          bankAccount: ''
        },
        dataRule: {
          cancelTime: [{validator: checkCancelTime, trigger: 'blur'}],
          proCode: [
            { required: true, message: '项目编码不能为空', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          bankAccountName: [
            { required: true, message: '银行帐户名称不能为空', trigger: 'blur' }
          ],
          bankAddress: [
            { required: true, message: '开户网点不能为空', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '开户行名称不能为空', trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '银行帐号不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
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
      selectedData(data) {
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        this.dataForm.fwaId = data.id
        this.dataForm.pId = data.pId
        this.dataForm.bankName = data.bankName
        this.dataForm.proName = data.proName
        this.dataForm.proCode = data.proCode
        this.dataForm.bankAddress = data.bankAddress
        this.dataForm.bankAccountName = data.bankAccountName
        this.dataForm.bankAccount = data.bankAccount
        this.dataForm.openTime = data.openTime

      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.finaCancelFwaccounapproval.get(id).then(function(result) {
                // console.log('result11111', result)
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                let params = {
                  filters: {},
                  maxResultCount: 20,
                  skipCount: 1,
                  sorting: "id descending",
                  id: result.pId
                }
                tapp.services.finaFwaccounapproval.getFinaBankList(params).then(_result => {
                  // console.log('result2222', _result)
                  if(_result && _result.items && _result.items.length > 0) {
                    let item = find(_result.items, {id: result.pId})
                    self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, item)
                  }
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
          tapp.services.finaCancelFwaccounapproval.save(model).then(function(result) {
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
      // 回填保存
      doBackFillSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaCancelFwaccounapproval.save(model).then(function(result) {
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
