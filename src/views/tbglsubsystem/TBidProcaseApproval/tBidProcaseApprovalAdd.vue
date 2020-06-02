<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目备案信息登记</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="dialogVisible = true">
        审批流程图
      </el-button>
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
        <t-workflow-map businessKey="t_bid_procase_approval_process"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'备案信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proCode" label="项目备案编号：">
              <t-input v-model="dataForm.proCode" placeholder="系统自动生成" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="备案单位：">
              <t-input v-model="dataForm.proSubCompany" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="事业部：">
              <t-input v-model="dataForm.proBusDept" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="proName" label="拟建项目名称：">
              <t-input v-model="dataForm.proName" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="proIntroduce" label="项目简介：">
              <t-input type="textarea" :rows="3" v-model="dataForm.proIntroduce" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proAddressProvince" label="项目地点：">
              <t-region-s-picker :province.sync="dataForm.proAddressProvince" :city.sync="dataForm.proAddressCity"
                                 :readOnly="readOnly"></t-region-s-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proAddressDetail" label="详细地址：" display="t">
              <t-input v-model="dataForm.proAddressDetail" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位：">
              <t-input v-model="dataForm.proConstructCompany" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="投资金额：">
              <t-input v-model="dataForm.proTotalInvestment" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proType" label="工程类别：">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttr" label="计划合同模式：">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proRunMode" label="计划经营方式：">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proUnionCompany" label="合作单位：">
              <t-input v-model="dataForm.proUnionCompany" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildArea" label="计划项目规模：">
              <t-input v-model="dataForm.proBuildArea" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="planBidDate" label="计划投标日期：">
              <t-datetime-picker v-model="dataForm.planBidDate" type="date" :disabled="readOnly">
              </t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTracker" label="项目跟踪人：">
              <t-manager-select v-model="dataForm.proTracker" placeholder=" "
                                :readOnly="readOnly" @selectedManager="getSelectedManager"></t-manager-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="contactNum" label="联系方式：">
              <t-input v-model="dataForm.contactNum" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="brRemark" label="备注：">
              <t-input type="textarea" :rows="3" v-model="dataForm.brRemark" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="sign" label="备案人：">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="备案时间：">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createtime" label="最近更新时间：">
            <span>{{dataForm.createtime}}</span>
          </el-form-item>
        </el-col>
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
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        submitDialogVisible: false,
        dataForm: {
          bId: '',
          actTaskKey: '',
          proCode: '',
          proSubCompany: '',
          proBusDept: '',
          proName: '',
          proIntroduce: '',
          proAddressProvince: '',
          proAddressCity: '',
          proAddressDetail: '',
          proConstructCompany: '',
          proConstructCompanyAttr: '',
          proTotalInvestment: '',
          proType: '',
          proContractAttr: '',
          proRunMode: '',
          proUnionCompany: '',
          proBuildArea: '',
          planBidDate: '',
          proTracker: '',
          contactNum: '',
          bidResult: '',
          bidCount: '',
          brUser: '',
          brTime: '',
          brRemark: '',
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
          proCode: [
            {required: false, message: '项目备案编号不能为空', trigger: 'blur'}
          ],
          proSubCompany: [
            {required: false, message: '所属分公司不能为空', trigger: 'blur'}
          ],
          proBusDept: [
            {required: false, message: '所属事业部不能为空', trigger: 'blur'}
          ],
          proName: [
            {required: true, message: '拟建项目名称不能为空', trigger: 'blur'}
          ],
          proIntroduce: [
            {required: false, message: '项目简介不能为空', trigger: 'blur'}
          ],
          proAddressDetail: [
            {required: true, message: '项目地址不能为空', trigger: 'blur'}
          ],
          proConstructCompany: [
            {required: true, message: '建设单位不能为空', trigger: 'blur'}
          ],
          proTotalInvestment: [
            {required: true, message: '项目总投资-元不能为空', trigger: 'blur'}
          ],
          proType: [
            {required: true, message: '工程类别不能为空', trigger: 'blur'}
          ],
          proContractAttr: [
            {required: false, message: '计划合同模式不能为空', trigger: 'blur'}
          ],
          proRunMode: [
            {required: true, message: '计划经营方式不能为空', trigger: 'blur'}
          ],
          proUnionCompany: [
            {required: false, message: '联营公司不能为空', trigger: 'blur'}
          ],
          proBuildArea: [
            {required: false, message: '计划项目规模-建筑面积-平方米不能为空', trigger: 'blur'}
          ],
          planBidDate: [
            {required: false, message: '计划投标日期不能为空', trigger: 'blur'}
          ],
          proTracker: [
            {required: true, message: '项目跟踪人不能为空', trigger: 'blur'}
          ],
          contactNum: [
            {required: false, message: '联系方式不能为空', trigger: 'blur'}
          ],
          brRemark: [
            {required: false, message: '投标结果备注不能为空', trigger: 'blur'}
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
        currentUser: state => state.app.user
      })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
            if (this.dataForm.id) {
              let self = this
              tapp.services.tBidProcaseApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.dataForm.sign = this.currentUser.userDisplayName
            this.getUserWithDepartments()
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate()
          })
        }
      },
      getSelectedManager(manager) {
        console.log('current manager', manager)
      },
      getUserWithDepartments() {
        if (this.currentUser && this.currentUser.userId) {
          let self = this
          tapp.services.base_User.getUserWithDepartments(this.currentUser.userId).then(result => {
            if (result) {
              // console.log('result', result)
              self.dataForm.proSubCompany = result.grouplist[0].value
              self.dataForm.proBusDept = result.departmentlist[0].value
            }
          })
        }
      },
      // 表单提交
      doSave() {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.tBidProcaseApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！'
            })
          })
        }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '保存失败！'
          })
          return false
        })
      }
    }
  }
</script>
