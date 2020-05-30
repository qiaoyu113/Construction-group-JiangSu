<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">企业入库授权</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" plain icon="el-icon-s-data" @click="dialogVisible = true">
        审批流程图
      </el-button>
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
        <!-- businessKey值请修改当前流程的key值 -->
        <t-workflow-map businessKey="t_grant_key_enterprise_approval"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="140px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pId" label="授权编号 ：">
            <t-input v-model="dataForm.pId" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="companyName" label="企业名称：">
            <t-input v-model="dataForm.companyName" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="creditCode" label="统一社会信用代码：">
            <t-input v-model="dataForm.creditCode" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="companyAddress" label="企业地址：">
            <t-input v-model="dataForm.companyAddress" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="companyAttr" label="企业性质：">
            <t-dic-dropdown-select :disabled="readOnly" dicType="unit_nature" v-model="dataForm.companyAttr"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="legalPerson" label="法人代表：">
            <t-input v-model="dataForm.legalPerson" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
              <t-input type="textarea" :rows="2" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="intentionProject" label="意向项目：">
            <t-input v-model="dataForm.intentionProject" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBuildArea" label="项目规模：">
            <t-input v-model="dataForm.proBuildArea" placeholder="请输入数字" :readOnly="readOnly"></t-input>
          <!--  <t-number-range-input v-model="dataForm.proBuildArea"></t-number-range-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="授权人：" prop="grantUser">
              <t-dic-dropdown-select :disabled="readOnly" dicType="licensor" v-model="dataForm.grantUser"
                                     ></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="登记人：">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办时间：" prop="signTime">
            <span>{{dataForm.signTime}}</span>
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
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        dataForm: {
          pId: '',
          companyName: '',
          creditCode: '',
          companyAddress: '',
          companyAttr: '',
          legalPerson: '',
          remark: '',
          intentionProject: '',
          proBuildArea: '',
          grantUser: '',
          sign: '',
          signTime: ''
        },
        dataRule: {
          proBuildArea: [{validator: this.isNumber, trigger: 'change'}]
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
        currentUser: state => state.app.user,
      })
    },
    methods: {
      isNumber (rule, value, cb) {
        if (!this.$util.verifyNumber(value)) {
          return cb(new Error('请输入数字！'))
        }
        return cb()
      },
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.tGrantEnterpriseApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate()
          })
        }
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tGrantEnterpriseApproval.save(model).then(function (result) {
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
