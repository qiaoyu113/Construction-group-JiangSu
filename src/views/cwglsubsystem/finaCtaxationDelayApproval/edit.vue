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
      <t-sub-title :title="'跨区域涉税事项报告信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="licenceCode" label="外经证号">
            <t-projcet-ctaxa-select v-model="dataForm.licenceCode" @selectedData="selectedData"></t-projcet-ctaxa-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  label="使用期限">
            <t-datetime-range-picker disabled v-model="dataForm.startDate"></t-datetime-range-picker>
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
          <el-form-item prop="proPlanDate" label="工程起止时间">
            <t-datetime-range-picker disabled v-model="dataForm.proPlanDate"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="conName" label="合同名称">
            <el-input readonly v-model="dataForm.conName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="conTotal" label="合同金额">
            <el-input readonly v-model="dataForm.conTotal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="companyName" label="合同对方企业名称" label-width="140px">
            <el-input readonly v-model="dataForm.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proSubCompany" label="所属公司">
            <el-input readonly v-model="dataForm.proSubCompany"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="taxMethod" label="计税方式">
            <t-dic-dropdown-select dicType="tax_method" v-model="dataForm.taxMethod" :readOnly="false"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="applyAmount" label="申请金额">
            <el-input readonly v-model="dataForm.applyAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item prop="province" label="外出经营地">
            <el-input readonly v-model="dataForm.province"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="city" label="">
            <el-input readonly v-model="dataForm.city"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="district" label="">
            <el-input readonly v-model="dataForm.district"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="address" label="">
            <el-input readonly v-model="dataForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'延期申请'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="signTime" label="申请延期使用至">
            <t-datetime-picker type="date" v-model="dataForm.delayDate"></t-datetime-picker>
          </el-form-item>
        </el-col>
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
          <el-form-item prop="remark" label="申请延期说明">
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
  import moment from 'moment'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        dataForm: {
          bId: '',actTaskKey: '',pId: '',lId: '',delayDate: '',approvalStatus: '',sign: '',signTime: '',
          propose: '',result: '',createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: '' ,
          licenceCode: '' ,conName:'',conTotal: '',companyName:'',proSubCompany:'',proPlanDate:'',
          proName: ''},
        dataRule: {
          companyName: [
            { required: true, message: '合同对方企业名称', trigger: 'blur' }
          ],
          proSubCompany: [
            { required: true, message: '所属公司', trigger: 'blur' }
          ],
          conName: [
            { required: true, message: '合同名称不能为空', trigger: 'blur' }
          ],
          conTotal: [
            { required: true, message: '合同金额不能为空', trigger: 'blur' }
          ],
          licenceCode: [
            { required: true, message: '外经证号不能为空', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          applyAmount: [
            { required: true, message: '申请金额不能为空', trigger: 'blur' }
          ],
          taxMethod: [
            { required: true, message: '计税方式不能为空', trigger: 'blur' }
          ],
          delayDate: [
            { required: true, message: '申请延期使不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          proPlanDate: [
            { required: true, message: '工程起止时间不能为空', trigger: 'blur' }
          ]
          ,province: [
            { required: true, message: '外出经营地不能为空', trigger: 'blur' }
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
      // 选择项目
      selectedData(data) {
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        this.dataForm.pId = data.pId
        this.dataForm.lId = data.id
        this.dataForm.licenceCode = data.licenceCode
        this.dataForm.proName = data.proName
        this.dataForm.conName = data.conName
        this.dataForm.conTotal = data.conTotal
        this.dataForm.proSubCompany = data.proSubCompany
        this.dataForm.taxMethod = data.taxMethod
        this.dataForm.applyAmount = data.applyAmount
        this.dataForm.address = data.address
        this.dataForm.district = data.district
        this.dataForm.city = data.city
        this.dataForm.province = data.province
        this.dataForm.companyName = data.companyName
        this.dataForm.proPlanDate = [data.proPlanStartDate + ' 00:00:00',data.proPlanEndDate + ' 00:00:00']
        this.dataForm.startDate = [data.startDate,data.endDate]
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
                        if (this.dataForm.id) {
              let self = this;
              tapp.services.finaCtaxationDelayApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.finaCtaxationDelayApproval.pId
                self.dataForm.lId = result.finaCtaxationDelayApproval.lId
                self.dataForm.delayDate = result.finaCtaxationDelayApproval.delayDate
                self.dataForm.approvalStatus = result.finaCtaxationDelayApproval.approvalStatus
                self.dataForm.sign = result.finaCtaxationDelayApproval.sign
                self.dataForm.signTime = result.finaCtaxationDelayApproval.signTime
                self.dataForm.propose = result.finaCtaxationDelayApproval.propose
                self.dataForm.result = result.finaCtaxationDelayApproval.result
                self.dataForm.createtime = result.finaCtaxationDelayApproval.createtime
                self.dataForm.updatetime = result.finaCtaxationDelayApproval.updatetime
                self.dataForm.createuser = result.finaCtaxationDelayApproval.createuser
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
          model.endDate = model.startDate[1]
          model.startDate = model.startDate[0]
          tapp.services.finaCtaxationDelayApproval.save(model).then(function(result) {
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
