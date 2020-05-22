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
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">企业入库授权</div>
      </el-col>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pId" label="授权编号 ：">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="companyName" label="企业名称：">
            <el-input v-model="dataForm.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="creditCode" label="统一社会信用代码：">
            <el-input v-model="dataForm.creditCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="companyAddress" label="企业地址：">
            <el-input v-model="dataForm.companyAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="companyAttr" label="企业性质：">
            <el-input v-model="dataForm.companyAttr"></el-input>
            <t-dic-dropdown-select dicType="unit_nature"  v-model="gridOptions.dataSource.serviceInstanceInputParameters.companyAttr"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="legalPerson" label="法人代表：">
            <el-input v-model="dataForm.legalPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注：" prop="remark" verify can-be-empty :maxLength="200">
            <el-input type="textarea" v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="intentionProject" label="意向项目：">
            <el-input v-model="dataForm.intentionProject"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBuildArea" label="项目规模：">
            <el-input v-model="dataForm.proBuildArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="授权人:" prop="grantUser">
              <t-dic-dropdown-select dicType="licensor" v-model="dataForm.grantUser"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="登记人">
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
  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
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
          pId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      // this.init()
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tGrantEnterpriseApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tGrantEnterpriseApproval.bId
                this.dataForm.actTaskKey = result.tGrantEnterpriseApproval.actTaskKey
                this.dataForm.pId = result.tGrantEnterpriseApproval.pId
                this.dataForm.companyName = result.tGrantEnterpriseApproval.companyName
                this.dataForm.creditCode = result.tGrantEnterpriseApproval.creditCode
                this.dataForm.companyAddress = result.tGrantEnterpriseApproval.companyAddress
                this.dataForm.companyAttr = result.tGrantEnterpriseApproval.companyAttr
                this.dataForm.legalPerson = result.tGrantEnterpriseApproval.legalPerson
                this.dataForm.intentionProject = result.tGrantEnterpriseApproval.intentionProject
                this.dataForm.proBuildArea = result.tGrantEnterpriseApproval.proBuildArea
                this.dataForm.grantUser = result.tGrantEnterpriseApproval.grantUser
                this.dataForm.remark = result.tGrantEnterpriseApproval.remark
                this.dataForm.sign = result.tGrantEnterpriseApproval.sign
                this.dataForm.signTime = result.tGrantEnterpriseApproval.signTime
                this.dataForm.propose = result.tGrantEnterpriseApproval.propose
                this.dataForm.result = result.tGrantEnterpriseApproval.result
                this.dataForm.approvalStatus = result.tGrantEnterpriseApproval.approvalStatus
                this.dataForm.createtime = result.tGrantEnterpriseApproval.createtime
                this.dataForm.updatetime = result.tGrantEnterpriseApproval.updatetime
                this.dataForm.createuser = result.tGrantEnterpriseApproval.createuser
                this.dataForm.updateuser = result.tGrantEnterpriseApproval.updateuser
                this.dataForm.datastatus = result.tGrantEnterpriseApproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
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
