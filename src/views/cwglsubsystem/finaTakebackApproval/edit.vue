<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="success" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px" label-position="right">
      <t-sub-title :title="'到账信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="rId" label="到帐信息选择">
            <el-input v-model="dataForm.rId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="proName" label="项目名称">
            <el-input readonly v-model="dataForm.proName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proCode" label="项目编号">
            <el-input readonly v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proRunMode" label="经营模式">
            <el-input  v-model="dataForm.proRunMode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="unionCompany" label="所属单位">
            <el-input readonly v-model="dataForm.unionCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="rWay" label="到帐方式">
            <t-dic-dropdown-select dicType="1260866780805599234" v-model="dataForm.rWay" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="lNum" label="票号">
            <el-input readonly v-model="dataForm.lNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="rType" label="到帐类型">
            <t-dic-dropdown-select dicType="1260866912477384705" v-model="dataForm.rType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="rAmount" label="到帐金额">
            <el-input readonly v-model="dataForm.rAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="sAmount" label="自营金额">
            <el-input readonly v-model="dataForm.sAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="oAmount" label="联营金额">
            <el-input readonly v-model="dataForm.oAmount"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item prop="sAmount" label="已支付预付款  自营">
            <el-input readonly v-model="dataForm.sAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="oAmount" label="联营">
            <el-input readonly v-model="dataForm.oAmount"></el-input>
          </el-form-item>
        </el-col>

        <t-sub-title :title="'请款信息'"></t-sub-title>
        <el-col :span="4">
          <el-form-item prop="mangementRatio" label="总部管理费比例">
            <el-input readonly v-model="dataForm.mangementRatio"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="deductAmount" label="扣款">
            <el-input readonly v-model="dataForm.deductAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realAmount" label="本次实际请款金额">
            <el-input readonly v-model="dataForm.realAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="sAmount" label="自营金额">
            <el-input readonly v-model="dataForm.sAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="oAmount" label="联营金额">
            <el-input readonly v-model="dataForm.oAmount"></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人">
              <el-input v-model="dataForm.sign"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办日期">
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
      </el-row>
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
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
        dataForm: {
          bId: '',                                                                                                                                                            actTaskKey: '',                                                                                                                                                            pId: '',                                                                                                                                                            rId: '',                                                                                                                                                            mangementRatio: '',                                                                                                                                                            deductAmount: '',                                                                                                                                                            realAmount: '',                                                                                                                                                            sAmount: '',                                                                                                                                                            oAmount: '',                                                                                                                                                            paidSAmount: '',                                                                                                                                                            paidOAmount: '',                                                                                                                                                            approvalStatus: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            propose: '',                                                                                                                                                            result: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
        dataRule: {
          proCode: [
            { required: true, message: '项目编码不能为空', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          rId: [
            { required: true, message: '到帐标识id不能为空', trigger: 'blur' }
          ],
          mangementRatio: [
            { required: true, message: '总部管理费比例不能为空', trigger: 'blur' }
          ],
          deductAmount: [
            { required: true, message: '扣款不能为空', trigger: 'blur' }
          ],
          realAmount: [
            { required: true, message: '本次实际请款金额不能为空', trigger: 'blur' }
          ],
          sAmount: [
            { required: true, message: '自营金额不能为空', trigger: 'blur' }
          ],
          oAmount: [
            { required: true, message: '联营金额不能为空', trigger: 'blur' }
          ],
          paidSAmount: [
            { required: true, message: '已支付预付款金额-自营不能为空', trigger: 'blur' }
          ],
          paidOAmount: [
            { required: true, message: '已支付预付款金额-联营不能为空', trigger: 'blur' }
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
      this.init()
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
              tapp.services.finaTakebackApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaTakebackApproval.bId
                this.dataForm.actTaskKey = result.finaTakebackApproval.actTaskKey
                this.dataForm.pId = result.finaTakebackApproval.pId
                this.dataForm.rId = result.finaTakebackApproval.rId
                this.dataForm.mangementRatio = result.finaTakebackApproval.mangementRatio
                this.dataForm.deductAmount = result.finaTakebackApproval.deductAmount
                this.dataForm.realAmount = result.finaTakebackApproval.realAmount
                this.dataForm.sAmount = result.finaTakebackApproval.sAmount
                this.dataForm.oAmount = result.finaTakebackApproval.oAmount
                this.dataForm.paidSAmount = result.finaTakebackApproval.paidSAmount
                this.dataForm.paidOAmount = result.finaTakebackApproval.paidOAmount
                this.dataForm.approvalStatus = result.finaTakebackApproval.approvalStatus
                this.dataForm.sign = result.finaTakebackApproval.sign
                this.dataForm.signTime = result.finaTakebackApproval.signTime
                this.dataForm.propose = result.finaTakebackApproval.propose
                this.dataForm.result = result.finaTakebackApproval.result
                this.dataForm.createtime = result.finaTakebackApproval.createtime
                this.dataForm.updatetime = result.finaTakebackApproval.updatetime
                this.dataForm.createuser = result.finaTakebackApproval.createuser
                this.dataForm.updateuser = result.finaTakebackApproval.updateuser
                this.dataForm.datastatus = result.finaTakebackApproval.datastatus
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
          tapp.services.finaTakebackApproval.save(model).then(function(result) {
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
