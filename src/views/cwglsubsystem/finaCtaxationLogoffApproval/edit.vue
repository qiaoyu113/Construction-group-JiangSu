<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'跨区域涉税事项报告信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="licenceCode" label="外经证号">
            <el-input v-model="dataForm.licenceCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="startDate" label="使用期限">
            <t-datetime-range-picker v-model="dataForm.startDate"></t-datetime-range-picker>
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
          <el-form-item prop="pId" label="工程起止时间">
            <el-date-picker type="datetime"  v-model="dataForm.signTime"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="cId" label="合同名称">
            <el-input readonly v-model="dataForm.cId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cId" label="合同金额">
            <el-input readonly v-model="dataForm.cId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="cId" label="合同对方企业名称">
            <el-input readonly v-model="dataForm.cId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cId" label="所属公司">
            <el-input readonly v-model="dataForm.cId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="taxMethod" label="计税方式">
            <t-dic-dropdown-select dicType="1260866411727818753" v-model="dataForm.taxMethod" :readOnly="readOnly"></t-dic-dropdown-select>
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
      <t-sub-title :title="'注销申请'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="logoffDate" label="注销时间">
            <el-date-picker type="datetime" readonly placeholder="申请通过后填写" v-model="dataForm.logoffDate"></el-date-picker>
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
          <el-form-item prop="remark" label="注销说明">
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
        dataForm: {
          bId: '',actTaskKey: '',pId: '',
          lId: '',logoffDate: '',
          approvalStatus: '',sign: '',
          signTime: '',propose: '',result: '',
          createtime: '',updatetime: '',createuser: '',
          updateuser: '',datastatus: '',proName: ''
        },
        dataRule: {
          licenceCode: [
            { required: true, message: '外经证号不能为空', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          lId: [
            { required: true, message: '外经证号标识id不能为空', trigger: 'blur' }
          ],
          logoffDate: [
            { required: true, message: '注销日期不能为空', trigger: 'blur' }
          ],

          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '注销原因不能为空', trigger: 'blur' }
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
              tapp.services.finaCtaxationLogoffApproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaCtaxationLogoffApproval.bId
                this.dataForm.actTaskKey = result.finaCtaxationLogoffApproval.actTaskKey
                this.dataForm.pId = result.finaCtaxationLogoffApproval.pId
                this.dataForm.lId = result.finaCtaxationLogoffApproval.lId
                this.dataForm.logoffDate = result.finaCtaxationLogoffApproval.logoffDate
                this.dataForm.approvalStatus = result.finaCtaxationLogoffApproval.approvalStatus
                this.dataForm.sign = result.finaCtaxationLogoffApproval.sign
                this.dataForm.signTime = result.finaCtaxationLogoffApproval.signTime
                this.dataForm.propose = result.finaCtaxationLogoffApproval.propose
                this.dataForm.result = result.finaCtaxationLogoffApproval.result
                this.dataForm.createtime = result.finaCtaxationLogoffApproval.createtime
                this.dataForm.updatetime = result.finaCtaxationLogoffApproval.updatetime
                this.dataForm.createuser = result.finaCtaxationLogoffApproval.createuser
                this.dataForm.updateuser = result.finaCtaxationLogoffApproval.updateuser
                this.dataForm.datastatus = result.finaCtaxationLogoffApproval.datastatus
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
          tapp.services.finaCtaxationLogoffApproval.save(model).then(function(result) {
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
