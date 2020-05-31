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
        <t-workflow-map businessKey="t_fina_key_rpdelay_approval"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目借款信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="getCode" label="借款合同编号">
              <t-get-amount-select :readonly="true" placeholder="选择项目信息"  v-model="dataForm.getCode" @selectedProject="getSelectedData"></t-get-amount-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="proName" label="项目名称">
              <el-input readonly v-model="dataForm.pId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proCode" label="项目编号">
              <el-input readonly v-model="dataForm.pId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属单位">
              <el-input readonly v-model="dataForm.proSubCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="applyAmount" label="确认借款额度">
              <el-input readonly v-model="dataForm.applyAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="tiimeLimit" label="借款期限">
              <el-input readonly v-model="dataForm.tiimeLimit">
                <span slot="append">月</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="getAmount" label="本次放款金额" >
              <el-input readonly v-model="dataForm.getAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="timeLimit" label="本次放款期限">
              <el-input readonly v-model="dataForm.timeLimit">
                <span slot="append">月</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'已延期信息'"></t-sub-title>
<!--        <div v-for="(index, item) in dataForm.rpdelapList" :key="item.id">-->
        <div v-for="(item, index) in  dataForm.rpdelapList">
          <el-row justify="space-around" type="flex"  style="border-bottom: 0.5px solid #eee;margin-right: 15px;padding-bottom: 12px;">
            <el-col :span="5">
              <span>第{{index + 1}}次延期：已还金额：{{item.totalAmount}}万元</span>
            </el-col>
            <el-col :span="4">
              <span>未还金额：{{item.arrearAmount}}万元</span>
            </el-col>
            <el-col :span="6">
              <span>申请延期还款日：{{item.delayDate.substring(0,10)}}</span>
            </el-col>
            <el-col :span="4">
              <span>申请人：{{item.sign}}</span>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'延期申请'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="totalAmount" label="本次放款累计已还金额" label-width="200px">
              <el-input readonly v-model="dataForm.totalAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="arrearAmount" label="本次放款累计未还金额" label-width="200px">
              <el-input readonly v-model="dataForm.arrearAmount">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="delayDate" label="申请延期还款日" label-width="200px">
              <t-datetime-picker type="date" v-model="dataForm.delayDate"></t-datetime-picker>
            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item prop="signTime" label="经办时间">
              <span>{{dataForm.signTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="remark" label="延期说明">
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
          bId: '',
          actTaskKey: '',
          pId: '',gId: '',
          getAmount: '',
          tiimeLimit: '',
          getCode: '',
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
          proName: '',
          arrearAmount:'',
          totalAmount:'',
          returnAmount:'' ,
          remark: '',
          rpdelapList:[]
        },
        dataRule: {
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          timeLimit: [
            { required: true, message: '本次放款期限不能为空', trigger: 'blur' }
          ],
          tiimeLimit: [
            { required: true, message: '借款期限不能为空', trigger: 'blur' }
          ],
          getAmount: [
            { required: true, message: '本次放款金额不能为空', trigger: 'blur' }
          ],
          proCode: [
            { required: true, message: '项目编号不能为空', trigger: 'blur' }
          ],
          proSubCompany: [
            { required: true, message: '所属单位不能为空', trigger: 'blur' }
          ],
          applyAmount: [
            { required: true, message: '确认借款额度不能为空', trigger: 'blur' }
          ],
          totalAmount: [
            { required: true, message: '本次放款累计已还金额不能为空', trigger: 'blur' }
          ],
          arrearAmount: [
            { required: true, message: '本次放款累计未还金额不能为空', trigger: 'blur' }
          ],
          getCode: [
            { required: true, message: '借款合同编号不能为空', trigger: 'blur' }
          ],
          delayDate: [
            { required: true, message: '申请延期还款日不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '延期说明不能为空', trigger: 'blur' }
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
      // 选择到账信息
      getSelectedData(data) {
        this.dataForm.rpdelapList = []
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        this.dataForm.proName = data.proName
        this.dataForm.proCode = data.proCode
        this.dataForm.pId = data.pId
        this.dataForm.gId = data.id
        this.dataForm.proSubCompany = data.proSubCompany
        this.dataForm.getAmount = data.getAmount
        this.dataForm.timeLimit = data.timeLimit
        this.dataForm.applyAmount = data.applyAmount // 借款申请金额
        this.dataForm.tiimeLimit = data.tiimeLimit // 借款期限
        this.dataForm.borrowDate = data.borrowDate // 借款日期
        this.dataForm.totalAmount = data.returnAmount // 借款日期
        this.dataForm.arrearAmount = data.getAmount - data.returnAmount

        this.getRpdelayApprovalList(data.pId, data.id)
      },
      // 获取未还款信息
      getRpdelayApprovalList(pId, gId) {
        if (pId && gId) {
          let self = this;
          let model = {'pId': pId, 'gId' : gId}
          tapp.services.finaRpdelayApproval.getList(model).then(function(result) {
            self.dataForm.rpdelapList = result
          })
        }
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.finaRpdelayApproval.get(id).then(function(result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
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
          tapp.services.finaRpdelayApproval.save(model).then(function(result) {
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
