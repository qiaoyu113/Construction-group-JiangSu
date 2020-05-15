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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <t-sub-title :title="'备案信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pcId" label="项目名称">
            <el-input v-model="dataForm.pcId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属分公司">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属事业部">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="建设单位">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="合同模式">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="投资金额">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="工程类别">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="经营方式">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="计划项目规模">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'密钥信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属地区">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="密钥类别">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="批准单位">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="登录网名">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="登录网址">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="有效期至">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="useScenes" label="用途">
            <el-input v-model="dataForm.useScenes"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="用户名">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="密码">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="主要负责人">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="密钥颜色">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="是否有电子签章功能">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="办理单位">
            <el-input v-model="dataForm.proSubCompany" readonly></el-input>
          </el-form-item>
        </el-col>
        <t-sub-title :title="'办理信息'"></t-sub-title>

        <el-col :span="8">
          <el-form-item prop="limitStarttime" label="领用期限-开始时间">
            <el-input v-model="dataForm.limitStarttime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="limitEnditme" label="领用期限-结束时间">
            <el-input v-model="dataForm.limitEnditme"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="getTime" label="领用时间">
            <el-input v-model="dataForm.getTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="returnTime" label="归还时间">
            <el-input v-model="dataForm.returnTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="执行人">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="执行时间">
            <el-input v-model="dataForm.signTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="审批状态（字典表）">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="propose" label="审核意见">
            <el-input v-model="dataForm.propose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="result" label="审核结果">
            <el-input v-model="dataForm.result"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createtime" label="创建时间">
            <el-input v-model="dataForm.createtime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="updatetime" label="更新时间">
            <el-input v-model="dataForm.updatetime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createuser" label="创建人">
            <el-input v-model="dataForm.createuser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="updateuser" label="更新人">
            <el-input v-model="dataForm.updateuser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="datastatus" label="数据有效性 1有效 0无效">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload>
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
          bId: '',
          actTaskKey: '',
          pcId: '',
          keyId: '',
          proSubCompany: '',
          useScenes: '',
          limitStarttime: '',
          limitEnditme: '',
          getTime: '',
          returnTime: '',
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
          pcId: [
            {required: true, message: '项目备案id不能为空', trigger: 'blur'}
          ],
          keyId: [
            {required: true, message: '密钥id不能为空', trigger: 'blur'}
          ],
          proSubCompany: [
            {required: true, message: '该项目所属分公司不能为空', trigger: 'blur'}
          ],
          useScenes: [
            {required: true, message: '用途不能为空', trigger: 'blur'}
          ],
          limitStarttime: [
            {required: true, message: '领用期限-开始时间不能为空', trigger: 'blur'}
          ],
          limitEnditme: [
            {required: true, message: '领用期限-结束时间不能为空', trigger: 'blur'}
          ],
          getTime: [
            {required: true, message: '领用时间不能为空', trigger: 'blur'}
          ],
          returnTime: [
            {required: true, message: '归还时间不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: true, message: '执行时间不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: true, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: true, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: true, message: '审核结果不能为空', trigger: 'blur'}
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
              tapp.services.tBidPckeyApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tBidPckeyApproval.bId
                this.dataForm.actTaskKey = result.tBidPckeyApproval.actTaskKey
                this.dataForm.pcId = result.tBidPckeyApproval.pcId
                this.dataForm.keyId = result.tBidPckeyApproval.keyId
                this.dataForm.proSubCompany = result.tBidPckeyApproval.proSubCompany
                this.dataForm.useScenes = result.tBidPckeyApproval.useScenes
                this.dataForm.limitStarttime = result.tBidPckeyApproval.limitStarttime
                this.dataForm.limitEnditme = result.tBidPckeyApproval.limitEnditme
                this.dataForm.getTime = result.tBidPckeyApproval.getTime
                this.dataForm.returnTime = result.tBidPckeyApproval.returnTime
                this.dataForm.sign = result.tBidPckeyApproval.sign
                this.dataForm.signTime = result.tBidPckeyApproval.signTime
                this.dataForm.approvalStatus = result.tBidPckeyApproval.approvalStatus
                this.dataForm.propose = result.tBidPckeyApproval.propose
                this.dataForm.result = result.tBidPckeyApproval.result
                this.dataForm.createtime = result.tBidPckeyApproval.createtime
                this.dataForm.updatetime = result.tBidPckeyApproval.updatetime
                this.dataForm.createuser = result.tBidPckeyApproval.createuser
                this.dataForm.updateuser = result.tBidPckeyApproval.updateuser
                this.dataForm.datastatus = result.tBidPckeyApproval.datastatus
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
          tapp.services.tBidPckeyApproval.save(model).then(function (result) {
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
