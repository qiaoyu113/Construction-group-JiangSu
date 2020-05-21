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
              <el-input readonly v-model="dataForm.rAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="sAmount" label="自营金额">
              <el-input readonly v-model="dataForm.sAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="oAmount" label="联营金额">
              <el-input readonly v-model="dataForm.oAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" >
            <el-form-item prop="sAmount" label="已支付预付款"></el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="sAmount" label="自营金额" label-width="80px">
              <el-input readonly v-model="dataForm.sAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="oAmount" label="联营金额">
              <el-input readonly v-model="dataForm.oAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'请款信息'"></t-sub-title>
        <el-col :span="4">
          <el-form-item prop="mangementRatio" label="总部管理费比例">
            <el-input readonly v-model="dataForm.mangementRatio">
              <span slot="append">%</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="deductAmount" label="扣款">
            <el-input readonly v-model="dataForm.deductAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realAmount" label="本次实际请款金额" label-width="140px">
            <el-input readonly v-model="dataForm.realAmount">
              <span slot="append">万元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="sAmount" label="自营金额">
            <el-input readonly v-model="dataForm.sAmount">
              <span slot="append">万元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="oAmount" label="联营金额">
            <el-input readonly v-model="dataForm.oAmount">
              <span slot="append">万元</span>
            </el-input>
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
              tapp.services.finaTakebackApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.finaTakebackApproval.pId
                self.dataForm.rId = result.finaTakebackApproval.rId
                self.dataForm.mangementRatio = result.finaTakebackApproval.mangementRatio
                self.dataForm.deductAmount = result.finaTakebackApproval.deductAmount
                self.dataForm.realAmount = result.finaTakebackApproval.realAmount
                self.dataForm.sAmount = result.finaTakebackApproval.sAmount
                self.dataForm.oAmount = result.finaTakebackApproval.oAmount
                self.dataForm.paidSAmount = result.finaTakebackApproval.paidSAmount
                self.dataForm.paidOAmount = result.finaTakebackApproval.paidOAmount
                self.dataForm.approvalStatus = result.finaTakebackApproval.approvalStatus
                self.dataForm.sign = result.finaTakebackApproval.sign
                self.dataForm.signTime = result.finaTakebackApproval.signTime
                self.dataForm.propose = result.finaTakebackApproval.propose
                self.dataForm.result = result.finaTakebackApproval.result
                self.dataForm.createtime = result.finaTakebackApproval.createtime
                self.dataForm.updatetime = result.finaTakebackApproval.updatetime
                self.dataForm.createuser = result.finaTakebackApproval.createuser
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
