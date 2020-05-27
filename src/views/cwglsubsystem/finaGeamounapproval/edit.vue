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
      <el-card shadow="never">
      <t-sub-title :title="'项目借款信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="baId" label="借款额度信息">
            <t-borrow-amount-select :readonly="true" placeholder="选择项目信息"  v-model="dataForm.baId" @selectedProject="getSelectedProject"></t-borrow-amount-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item  prop="proName" label="项目名称">
            <t-input :readonly="true" v-model="dataForm.proName"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCode" label="项目编号">
            <t-input :readonly="true" v-model="dataForm.proCode"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属单位">
            <t-input :readonly="true" v-model="dataForm.proSubCompany"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realAmount" label="确认借款额度">
            <t-input :readonly="true" v-model="dataForm.realAmount">
              <span slot="append">万元</span>
            </t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="tiimeLimit" label="本次借款期限">
            <t-input :readonly="true" v-model="dataForm.tiimeLimit">
              <span slot="append">月</span>
            </t-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'项目借款信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="getAmount" label="本次放款金额">
            <t-input v-model="dataForm.getAmount" @change="onGetAmount" :readonly="readOnly">
              <span slot="append">万元</span>
            </t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="timeLimit" label="本次放款期限">
            <t-int-input v-model="dataForm.timeLimit" :readonly="readOnly">
              <span slot="append">月</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="getCode" label="借款合同编号" :class="{'is-required': isBackFill}">
            <t-input :disabled="!isBackFill" v-model="dataForm.getCode" placeholder="审批完成后填写"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="totalBorrowAmount" label="累计放款金额">
            <t-input :readonly="true" v-model="dataForm.totalBorrowAmount">
              <span slot="append">万元</span>
            </t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="leftAmount" label="剩余可用额度">
            <t-input :readonly="true" v-model="dataForm.leftAmount">
              <span slot="append">万元</span>
            </t-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
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
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="remark" label="备注">
              <t-input type="textarea" v-model="dataForm.remark"></t-input>
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
      var checkGetCode = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.getCode == '' || this.dataForm.getCode == undefined)) callback(new Error('借款合同编号不能为空'));
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
          bId: '',actTaskKey: '',pId: '',baId: '',getAmount: '',timeLimit: '',getCode: '',totalBorrowAmount: '',
          leftAmount: '',fromType: '',approvalStatus: '',sign: '',signTime: '',propose: '',
          result: '',createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: ''                                                                                        },
        dataRule: {
          baId: [
            { required: true, message: '借款额度信息不能为空', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          proCode: [
            { required: true, message: '项目编号不能为空', trigger: 'blur' }
          ],
          getAmount: [
            { required: true, message: '请输入数字，并且不能为空', trigger: 'blur' }
          ],
          timeLimit: [
            { required: true, message: '本次放款期限（月）不能为空', trigger: 'blur' }
          ],
          totalBorrowAmount: [
            { required: true, message: '累计放款金额不能为空', trigger: 'blur' }
          ],
          leftAmount: [
            { required: true, message: '剩余可用额度不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          proSubCompany: [
            { required: true, message: '所属单位不能为空', trigger: 'blur' }
          ],
          tiimeLimit: [
            { required: true, message: '确认借款期限不能为空', trigger: 'blur' }
          ],
          realAmount: [
            { required: true, message: '本次借款额度不能为空', trigger: 'blur' }
          ],
          getCode: [{validator: checkGetCode, trigger: 'blur'}],
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
      onGetAmount(){
        if (!isNaN(this.dataForm.getAmount)) {
          let amount = this.dataForm.realAmount - this.dataForm.getAmount - this.dataForm.totalBorrowAmount;
          if (amount >= 0) {
            this.dataForm.leftAmount = amount
          } else {
            this.dataForm.getAmount = 0
            this.$notify.error({
              title: "失败！",
              message: "请重新输入！",
            });
          }
        }
      },
      // 选择项目到账信息
      getSelectedProject(data) {
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        this.dataForm.proName = data.proName
        this.dataForm.proCode = data.proCode
        this.dataForm.pId = data.pId
        this.dataForm.baId = data.id
        this.dataForm.proSubCompany = data.proSubCompany
        this.dataForm.realAmount = data.realAmount
        this.dataForm.tiimeLimit = data.tiimeLimit
        this.dataForm.totalBorrowAmount = data.getAmount
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.finaGeamounapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.pId
                self.dataForm.baId = result.baId
                self.dataForm.getAmount = result.getAmount
                self.dataForm.timeLimit = result.timeLimit
                self.dataForm.getCode = result.getCode
                self.dataForm.totalBorrowAmount = result.totalBorrowAmount
                self.dataForm.leftAmount = result.leftAmount
                self.dataForm.fromType = result.fromType
                self.dataForm.approvalStatus = result.approvalStatus
                self.dataForm.sign = result.sign
                self.dataForm.signTime = result.signTime
                self.dataForm.propose = result.propose
                self.dataForm.result = result.result
                self.dataForm.createtime = result.createtime
                self.dataForm.updatetime = result.updatetime
                self.dataForm.createuser = result.createuser
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
          tapp.services.finaGeamounapproval.save(model).then(function(result) {
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
      // 保存回填
      doBackFillSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaGeamounapproval.save(model).then(function(result) {
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
