<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目投标申请</div>
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
        <!-- businessKey值请修改当前流程的key值 -->
        <t-workflow-map businessKey="t_bid_probid_approval_process"></t-workflow-map>
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
            <el-form-item label="项目名称:" prop="proNameA">
              <t-record-select v-model="dataForm.proNameA" @selectedRecord="getSelectedRecord"
                               :readOnly="readOnly"></t-record-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompanyA" label="所属分公司:">
              <t-input v-model="dataForm.proSubCompanyA" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDeptA" label="所属事业部:">
              <t-input v-model="dataForm.proBusDeptA" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompanyA" label="建设单位:">
              <t-input v-model="dataForm.proConstructCompanyA" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttrA" label="合同模式:">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttrA"
                                     :disabled="true"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestmentA" label="投资金额:">
              <t-input v-model="dataForm.proTotalInvestmentA" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTypeA" label="工程类别:">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proTypeA"
                                     :disabled="true"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proRunModeA" label="经营方式:">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunModeA"
                                     :disabled="true"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildAreaA" label="计划规模项目:">
              <t-input v-model="dataForm.proBuildAreaA" :readOnly="true"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <t-sub-title :title="'项目信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proName" label="项目名称:">
              <t-input v-model="dataForm.proName" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位:">
              <t-input v-model="dataForm.proConstructCompany" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildArea" label="项目规模:">
              <t-input v-model="dataForm.proBuildArea" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttr" label="合同模式:">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proType" label="工程类别:">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proManager" label="项目经理:">
              <t-manager-select v-model="dataForm.proManager"
                                @selectedManager="getSelectedManager" :readOnly="readOnly"></t-manager-select>
            </el-form-item>
          </el-col>
        </el-row>
        <t-sub-title :title="'经营方式'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proRunMode" label="项目性质:">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="proUnionCompanyMerate" label="联营单位管理费:">
              <t-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proProfitRate" label="项目净利润承诺超:">
              <t-input v-model="dataForm.proProfitRate" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proCompanyHeader" label="主要负责人:">
              <t-maincharge-select v-model="dataForm.proCompanyHeader" :readOnly="readOnly"
                                   @selectedMainCharge="getSelectedMainCharge"></t-maincharge-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proUnionCompany" label="联营单位名称:">
              <t-input v-model="dataForm.proUnionCompany" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContacter" label="联系人:">
              <t-input v-model="dataForm.proContacter" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContactway" label="联系方式:">
              <t-input v-model="dataForm.proContactway" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <t-sub-title :title="'投标信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="bidCount" label="投标次数:">
              <t-input v-model="dataForm.bidCount" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="bidAmount" label="投标价格:">
              <t-input v-model="dataForm.bidAmount" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="budgetAmount" label="预算价格:" :readOnly="readOnly">
              <t-input v-model="dataForm.budgetAmount" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="bidTime" label="投标时间:">
              <t-datetime-picker v-model="dataForm.bidTime" type="date" :disabled="readOnly">
              </t-datetime-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人:">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办时间:">
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
  import {mapState} from 'vuex'
  import find from 'lodash/find'

  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          showButton: true,
          readOnly: false,
          dialogVisible: false,
          submitDialogVisible: false,
          bId: '',
          actTaskKey: '',
          pcId: '',
          proName: '',
          proConstructCompany: '',
          proBuildArea: '',
          proContractAttr: '',
          proType: '',
          proManager: '',
          proRunMode: '',
          proProfitRate: '',
          proUnionCompanyMerate: '',
          proUnionCompany: '',
          proContacter: '',
          proCompanyHeader: '',
          proContactway: '',
          bidCount: '',
          bidAmount: '',
          budgetAmount: '',
          bidTime: '',
          tiimes: '',
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
            {required: false, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: false, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          pcId: [
            {required: true, message: '项目备案名称不能为空', trigger: 'blur'}
          ],
          proNameA: [
            {required: false, message: '项目名称不能为空', trigger: 'blur'}
          ],
          proName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          proConstructCompany: [
            {required: true, message: '建设单位不能为空', trigger: 'blur'}
          ],
          proBuildArea: [
            {required: true, message: '项目规模-建筑面积-平方米不能为空', trigger: 'blur'}
          ],
          proContractAttr: [
            {required: true, message: '合同模式不能为空', trigger: 'blur'}
          ],
          proType: [
            {required: true, message: '工程类别不能为空', trigger: 'blur'}
          ],
          proManager: [
            {required: true, message: '项目经理不能为空', trigger: 'blur'}
          ],
          proRunMode: [
            {required: false, message: '经营方式不能为空', trigger: 'blur'}
          ],
          proProfitRate: [
            {required: false, message: '项目净利润承诺超不能为空', trigger: 'blur'}
          ],
          proUnionCompanyMerate: [
            {required: false, message: '联营单位管理费不能为空', trigger: 'blur'}
          ],
          proUnionCompany: [
            {required: false, message: '联营公司名称不能为空', trigger: 'blur'}
          ],
          proContacter: [
            {required: false, message: '联系人不能为空', trigger: 'blur'}
          ],
          proCompanyHeader: [
            {required: false, message: '负责人不能为空', trigger: 'blur'}
          ],
          proContactway: [
            {required: false, message: '联系方式不能为空', trigger: 'blur'}
          ],
          bidCount: [
            {required: false, message: '投标次数不能为空', trigger: 'blur'}
          ],
          bidAmount: [
            {required: true, message: '投标价格不能为空', trigger: 'blur'}
          ],
          budgetAmount: [
            {required: true, message: '预算价格不能为空', trigger: 'blur'}
          ],
          bidTime: [
            {required: true, message: '投标时间不能为空', trigger: 'blur'}
          ],
          tiimes: [
            {required: false, message: '第几次投标不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: false, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: false, message: '执行时间不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: false, message: '审批状态不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: false, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: false, message: '审核结果不能为空', trigger: 'blur'}
          ],
          createtime: [
            {required: false, message: '创建时间不能为空', trigger: 'blur'}
          ],
          updatetime: [
            {required: false, message: '更新时间不能为空', trigger: 'blur'}
          ],
          createuser: [
            {required: false, message: '创建人不能为空', trigger: 'blur'}
          ],
          updateuser: [
            {required: false, message: '更新人不能为空', trigger: 'blur'}
          ],
          datastatus: [
            {required: false, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur'}
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
        currentUser: state => state.app.user,
      })
    },
    methods: {
      getSelectedMainCharge(charge) {
        console.log('current charge', charge)
        //获取主要负责人

        // 需要传到接口的是 主要负责人的id的话 请联系 前端修改
      },
      getSelectedManager(manager) {
        console.log('current manager', manager)
        //获取项目经理

        // 需要传到接口的是 项目经理的id的话 请联系 前端修改
      },
      getSelectedRecord(pcId) {
        console.log('current proName', pcId)
        this.dataForm.proNameA = pcId.proName
        this.dataForm.proSubCompanyA = pcId.proSubCompany
        this.dataForm.proBusDeptA = pcId.proBusDept
        this.dataForm.proConstructCompanyA = pcId.proConstructCompany
        this.dataForm.proContractAttrA = pcId.proContractAttr
        this.dataForm.proTotalInvestmentA = pcId.proTotalInvestment
        this.dataForm.proTypeA = pcId.proType
        this.dataForm.proRunModeA = pcId.proRunMode
        this.dataForm.proBuildAreaA = pcId.proBuildArea

      },
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this
              tapp.services.tBidProbidApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                let params = {}
                if(/^[0-9]*$/.test(result.pcId)) {
                  params = {
                    filters: {}, maxResultCount: 20, skipCount: 1, sorting: "id descending",
                    id: result.pcId
                  } 
                } else {
                  params = {
                    filters: {}, maxResultCount: 20, skipCount: 1, sorting: "id descending",
                    proName: result.pcId
                  } 
                }
                tapp.services.tBidProcaseApproval.getPagedList(params).then(resp => {
                  if(resp && resp.items && resp.items.length > 0) {
                    let item;
                    item = find(resp.items, {id: result.pcId})
                    if(!item) item = find(resp.items, {proName: result.pcId})
                    self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, {
                      proNameA: item.proName,
                      proRunModeA: item.proRunMode,
                      proSubCompanyA: item.proSubCompany,
                      proBusDeptA: item.proBusDept,
                      proConstructCompanyA: item.proConstructCompany,
                      proContractAttrA: item.proContractAttr,
                      proTotalInvestmentA: item.proTotalInvestment,
                      proTypeA: item.proType,
                      proBuildAreaA: item.proBuildArea,
                    })
                  }

                })
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate();
          })
        }
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tBidProbidApproval.save(model).then(function (result) {
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
