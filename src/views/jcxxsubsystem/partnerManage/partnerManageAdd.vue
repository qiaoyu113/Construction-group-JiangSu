<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">合作方登记</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-dialog title="确定提交本次审批" :visible.sync="submitDialogVisible">
        <!-- businessKey值请修改当前流程的key值 -->
        <el-form ref="dialogForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="pType" label="用印类型：" class="is-required">
                <!-- <t-dic-dropdown-select dict_type="" v-model=""></t-dic-dropdown-select> -->
                <t-input v-model="pType" :readOnly="readOnly"></t-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="sealCount" label="用印数量：" class="is-required">
                <t-input v-model="sealCount" :readOnly="readOnly"></t-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button type="info" @click="submitDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-button type="primary" plain icon="el-icon-s-data" @click="dialogVisible = true">
        审批流程图
      </el-button>
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
        <!-- businessKey值请修改当前流程的key值 -->
        <t-workflow-map businessKey="t_baseinfo_partner_approval_process"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="120px"
             label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'合作方基本信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="companyName" label="合作方名称：">
            <t-input v-model="dataForm.companyName" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="creditCode" label="统一社会信用代码：" label-width="180px">
            <t-input v-model="dataForm.creditCode" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="companyAddress" label="合作方地址：">
            <t-input v-model="dataForm.companyAddress" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="legalPerson" label="法人：">
            <t-input v-model="dataForm.legalPerson" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="principal" label="负责人：">
            <t-input v-model="dataForm.principal" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="contactNum" label="联系电话：">
            <t-int-input v-model="dataForm.contactNum" :readOnly="readOnly"></t-int-input>
          </el-form-item>
        </el-col>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'合作方主要工程业绩'" extra="增加行" :readOnly="readOnly"
                     @extraClick="achievementDialogVisible = true"></t-sub-title>
        <el-table :data="dataForm.getPartnerAchievements" border style="width: 100%" max-height="220">
          <el-table-column prop="projectName" label="工程名称：" min-width="180"></el-table-column>
          <el-table-column prop="projectScale" label="工程规模：" width="180"></el-table-column>
          <el-table-column prop="buildStartDate" label="开工日期：" width="180"></el-table-column>
          <el-table-column prop="buildEndDate" label="竣工日期：" width="180"></el-table-column>
          <el-table-column prop="buildCompany" label="建设单位：" min-width="180"></el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, 'achievement')">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'合作方资产情况'"></t-sub-title>
        <el-col :span="12">
          <el-form-item prop="fixedAssets" label="固定资产：">
            <t-int-input v-model="dataForm.fixedAssets" :readOnly="readOnly"></t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="fluidCapital" label="流动资金：">
            <t-int-input v-model="dataForm.fluidCapital" :readOnly="readOnly"></t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="chargeAccount" label="应收账款：">
            <t-int-input v-model="dataForm.chargeAccount" :readOnly="readOnly"></t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="liabilities" label="负债：">
            <t-int-input v-model="dataForm.liabilities" :readOnly="readOnly"></t-int-input>
          </el-form-item>
        </el-col>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'合作方市场与拟合作项目情况'"></t-sub-title>
        <el-col :span="24">
          <el-form-item prop="marketSituation" label="市场情况：">
            <t-input type="textarea" :rows="3" v-model="dataForm.marketSituation" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="projectSituation" label="合作项目情况：">
            <t-input type="textarea" :rows="3" v-model="dataForm.projectSituation" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'合作方主要管理人员情况'" extra="增加行" :readOnly="readOnly"
                     @extraClick="managerDialogVisible = true"></t-sub-title>
        <el-table :data="dataForm.getPartnerStaffs" border style="width: 100%" max-height="220">
          <el-table-column prop="staffName" label="姓名：" width="180"></el-table-column>
          <el-table-column prop="age" label="年龄：" width="180"></el-table-column>
          <el-table-column prop="technicalTitle" label="职称及职业资格：" min-width="180"></el-table-column>
          <el-table-column prop="achievement" label="主要管理业绩：" min-width="180"></el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, 'manager')">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="' 合作方银行信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="bankName" label="开户行名称：">
            <t-input v-model="dataForm.bankName" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankAccountName" label="银行帐户名称：">
            <t-input v-model="dataForm.bankAccountName" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankAccount" label="银行帐号：">
            <t-int-input v-model="dataForm.bankAccount" :readOnly="readOnly"></t-int-input>
          </el-form-item>
        </el-col>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="' 登记信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="sign" label="登记人：">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="登记时间：">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'附件上传'"></t-sub-title>
        <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                   :businessDocId="docId"></sj-upload>
      </el-card>
    </el-form>
    <el-dialog title="添加业绩" :visible.sync="achievementDialogVisible" width="50%">
      <el-form ref="achievementForm" :model="achievementForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="工程名称" prop="projectName">
              <t-input v-model="achievementForm.projectName"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程规模" prop="projectScale">
              <t-input v-model="achievementForm.projectScale"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开工日期" prop="buildStartDate">
              <t-datetime-picker v-model="achievementForm.buildStartDate" type="date"></t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="竣工日期" prop="buildEndDate">
              <t-datetime-picker v-model="achievementForm.buildEndDate" type="date"></t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="建设单位" prop="buildCompany">
              <t-input v-model="achievementForm.buildCompany"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="achievementDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAchievement()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加管理人员" :visible.sync="managerDialogVisible" width="50%">
      <el-form ref="managerForm" :model="managerForm" label-width="120px" label-position="right">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="staffName">
              <t-input v-model="managerForm.staffName"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <t-int-input v-model="managerForm.age"></t-int-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="职称及职业资格" prop="technicalTitle">
              <t-input v-model="managerForm.technicalTitle"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="主要管理业绩" prop="achievement">
              <t-input v-model="managerForm.achievement"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="managerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManager()">确 定</el-button>
      </div>
    </el-dialog>
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
        achievements: [],
        managers: [],
        achievementDialogVisible: false,
        managerDialogVisible: false,
        submitDialogVisible: false,
        pType: '',
        sealCount: '',
        achievementForm: {
          projectName: '',
          projectScale: '',
          buildStartDate: '',
          buildEndDate: '',
          buildCompany: ''
        },
        managerForm: {
          staffName: '',
          age: '',
          technicalTitle: '',
          achievement: '',
        },
        dataForm: {
          bId: '',
          actTaskKey: '',
          companyName: '',
          creditCode: '',
          companyAddress: '',
          legalPerson: '',
          principal: '',
          contactNum: '',
          fixedAssets: '',
          fluidCapital: '',
          chargeAccount: '',
          liabilities: '',
          marketSituation: '',
          projectSituation: '',
          bankName: '',
          bankAccountName: '',
          bankAccount: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          approvalStatus: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          getPartnerAchievements: [],
          getPartnerStaffs: [],
        },
        dataRule: {
          bId: [
            {required: false, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: false, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          companyName: [
            {required: true, message: '合作方名称不能为空', trigger: 'blur'}
          ],
          creditCode: [
            {required: true, message: '统一社会信用代码不能为空', trigger: 'blur'}
          ],
          companyAddress: [
            {required: true, message: '合作方地址不能为空', trigger: 'blur'}
          ],
          legalPerson: [
            {required: true, message: '法人不能为空', trigger: 'blur'}
          ],
          principal: [
            {required: true, message: '负责人不能为空', trigger: 'blur'}
          ],
          contactNum: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'}
          ],
          fixedAssets: [
            {required: false, message: '固定资产-元不能为空', trigger: 'blur'}
          ],
          fluidCapital: [
            {required: false, message: '流动资金-元不能为空', trigger: 'blur'}
          ],
          chargeAccount: [
            {required: false, message: '应收账款-元不能为空', trigger: 'blur'}
          ],
          liabilities: [
            {required: false, message: '负债-元不能为空', trigger: 'blur'}
          ],
          marketSituation: [
            {required: false, message: '市场情况不能为空', trigger: 'blur'}
          ],
          projectSituation: [
            {required: false, message: '合作项目情况不能为空', trigger: 'blur'}
          ],
          bankName: [
            {required: true, message: '开户行名称不能为空', trigger: 'blur'}
          ],
          bankAccountName: [
            {required: true, message: '银行帐户名称不能为空', trigger: 'blur'}
          ],
          bankAccount: [
            {required: true, message: '银行帐号不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: false, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: false, message: '执行时间不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: true, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: true, message: '审核结果不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: true, message: '审批状态不能为空', trigger: 'blur'}
          ],
          createtime: [
            {required: true, message: '创建时间不能为空', trigger: 'blur'}
          ],
          updatetime: [
            {required: true, message: '更新时间不能为空', trigger: 'blur'}
          ],
          createuser: [
            {required: true, message: '创建人不能为空', trigger: 'blur'}
          ],
          updateuser: [
            {required: true, message: '更新人不能为空', trigger: 'blur'}
          ],
          datastatus: [
            {required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur'}
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
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            let self = this;
            if (this.dataForm.id) {
              let self = this;
              tapp.services.tBaseinfoPartnerApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                tapp.services.tBaseinfoPartnerStaff.getList({id: result.id}).then(staffs => {
                  self.dataForm.getPartnerStaffs = staffs
                })
                tapp.services.tBaseinfoPartnerAchievement.getList({id: result.id}).then(achievements => {
                  self.dataForm.getPartnerAchievements = achievements
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
      addAchievement() {
        if (this.achievementForm.projectName || this.achievementForm.projectScale || this.achievementForm.buildStartDate || this.achievementForm.buildEndDate || this.achievementForm.buildCompany) {
          this.dataForm.getPartnerAchievements.push(JSON.parse(JSON.stringify(this.achievementForm)))
        }
        this.$refs.achievementForm.resetFields()
        this.achievementDialogVisible = false
      },
      addManager() {
        if (this.managerForm.staffName || this.managerForm.age || this.managerForm.technicalTitle || this.managerForm.achievement) {
          this.dataForm.getPartnerStaffs.push(JSON.parse(JSON.stringify(this.managerForm)))
        }
        this.$refs.managerForm.resetFields()
        this.managerDialogVisible = false
      },
      handleDelete(index, row, type) {
        type == 'achievement' ? this.dataForm.getPartnerAchievements.splice(index, 1) : this.dataForm.getPartnerStaffs.splice(index, 1)
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tBaseinfoPartnerApproval.save(model).then(function (result) {
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
      },
      submit() {
      }
    }
  }
</script>
