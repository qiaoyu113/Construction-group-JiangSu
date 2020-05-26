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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="' 划款信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="amount" label="划款金额">
            <t-number-input v-model="dataForm.amount">
              <span slot="append">元</span>
            </t-number-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bankName" label="划款银行">
            <el-input v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="accountNum" label="划款账号">
            <el-input v-model="dataForm.accountNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="sign" label="登记人">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="登记时间">
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
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称：" prop="proName">
              <t-project-select placeholder="选择一个项目" v-model="dataForm.projectId" @selectedProject="getSelectedProject" disabled></t-project-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属分公司：">
              <el-input  v-model="dataForm.proSubCompany" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="所属事业部：">
              <el-input  v-model="dataForm.proBusDept" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位：">
              <el-input  v-model="dataForm.proConstructCompany" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同模式：" prop="proContractAttr">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="投资金额：">
              <el-input disabled v-model="dataForm.proTotalInvestment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类别：" prop="proType">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营方式：" prop="proRunMode">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildArea" label="计划项目规模：">
              <el-input  v-model="dataForm.proBuildArea" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'诉讼信息'"></t-sub-title>
        <el-table :data="litigationData" border style="width: 100%">
          <el-table-column prop="litigationCode" label="诉讼编号" min-width="100"></el-table-column>
          <el-table-column prop="freezingAmount" label="冻结金额"></el-table-column>
          <el-table-column prop="sign" label="标记人"></el-table-column>
          <el-table-column prop="signTime" label="标记时间" width="180"></el-table-column>
          <el-table-column prop="owingtoUnionCompany" label="是否与联营单位有关" min-width="160">
            <template slot-scope="scope">
              <span>{{ $util.dataDicFormat('yes_or_no', scope.row.owingtoUnionCompany) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="说明"></el-table-column>
          <el-table-column prop="litigationStatus" label="当前状态" min-width="100">
            <template slot-scope="scope">
              <span>{{ $util.dataDicFormat('litigation_status', scope.row.litigationStatus) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cancelTime" label="取消时间" min-width="160"></el-table-column>
<!--          <el-table-column align="center" min-width="100">-->
<!--            <template slot-scope="scope">-->
<!--              &lt;!&ndash; 标记中的状态才需要展示该按钮 &ndash;&gt;-->
<!--              <el-button v-if="scope.row.litigationStatus === 'marking'" size="mini" type="danger"-->
<!--                         @click="cancelLitigation(scope.row)">取消诉讼-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
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
        litigationData: [],
        dataForm: {
          bId: '',pId: '',proRunMode: '',unionCompany: '',amount: '',bankName: '',accountNum: '',sign: '',signTime: '',
          propose: '',createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: '',  proSubCompany:'',
          pcId:'',proName:'',proBuildArea:'',proType:'',proTotalInvestment:'',proContractAttr:'',proConstructCompany:'',
          proBusDept:''
        },
        dataRule: {
          proBuildArea:[
            { required: true, message: '计划项目规模不能为空', trigger: 'blur' }
          ],
          proContractAttr:[
            { required: true, message: '合同模式不能为空', trigger: 'blur' }
          ],
          proConstructCompany:[
            { required: true, message: '建设单位不能为空', trigger: 'blur' }
          ],
          proTotalInvestment:[
            { required: true, message: '投资金额不能为空', trigger: 'blur' }
          ],
          proBusDept:[
            { required: true, message: '所属事业部不能为空', trigger: 'blur' }
          ],
          proSubCompany:[
            { required: true, message: '所属分公司不能为空', trigger: 'blur' }
          ],
          proType:[
            { required: true, message: '工程类别不能为空', trigger: 'blur' }
          ],
          proName:[
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          bId: [
            { required: true, message: '业务id用于和一个流程实例绑定不能为空', trigger: 'blur' }
          ],
          pId: [
            { required: true, message: '项目id不能为空', trigger: 'blur' }
          ],
          proRunMode: [
            { required: true, message: '经营方式不能为空', trigger: 'blur' }
          ],
          unionCompany: [
            { required: true, message: '联营单位不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '划款金额不能为空', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '划款银行不能为空', trigger: 'blur' }
          ],
          accountNum: [
            { required: true, message: '划款账号不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          propose: [
            { required: true, message: '审核意见不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updatetime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          createuser: [
            { required: true, message: '创建人不能为空', trigger: 'blur' }
          ],
          updateuser: [
            { required: true, message: '更新人不能为空', trigger: 'blur' }
          ],
          datastatus: [
            { required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur' }
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
      getSelectedProject(project) {
        console.log('current project', project)
        this.dataForm.proSubCompany = project.proSubCompany
        this.dataForm.proBusDept = project.proBusDept
        this.dataForm.proConstructCompany = project.proConstructCompany
        this.dataForm.proContractAttr = project.proContractAttr
        this.dataForm.proTotalInvestment = project.proTotalInvestment
        this.dataForm.proType = project.proType
        this.dataForm.proRunMode = project.proRunMode
        this.dataForm.proBuildArea = project.proBuildArea
        this.dataForm.proName = project.proName
        this.dataForm.pId = project.id
        this.getLitigationList(this.dataForm.pId)
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
                        if (this.dataForm.id) {
              let self = this;
              tapp.services.finaLitigation.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.bId = result.finaLitigation.bId
                self.dataForm.pId = result.finaLitigation.pId
                self.dataForm.proRunMode = result.finaLitigation.proRunMode
                self.dataForm.unionCompany = result.finaLitigation.unionCompany
                self.dataForm.amount = result.finaLitigation.amount
                self.dataForm.bankName = result.finaLitigation.bankName
                self.dataForm.accountNum = result.finaLitigation.accountNum
                self.dataForm.sign = result.finaLitigation.sign
                self.dataForm.signTime = result.finaLitigation.signTime
                self.dataForm.propose = result.finaLitigation.propose
                self.dataForm.createtime = result.finaLitigation.createtime
                self.dataForm.updatetime = result.finaLitigation.updatetime
                self.dataForm.createuser = result.finaLitigation.createuser
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
      // 获取诉讼信息
      getLitigationList(value) {
        const params = {
          pId: value
        };
        tapp.services.proLitigation.getList(params).then(res => {
          console.log('获取诉讼信息', res);
          this.litigationData = res
        }).catch(err => {
          console.log('获取诉讼信息 错误', err)
        })
      },
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaLitigation.save(model).then(function(result) {
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
