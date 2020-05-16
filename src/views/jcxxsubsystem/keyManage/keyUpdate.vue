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
      <t-sub-title :title="'密钥信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="province" label="所属地区">
            <t-dic-tree-select dicType="base_region" v-model="dataForm.province"
                               :readOnly="readOnly"></t-dic-tree-select>
          </el-form-item>
        </el-col>
      <el-col :span="8">
        <el-form-item prop="keyType" label="类别名称">
          <t-dic-dropdown-select dicType="1260860565488799746" v-model="dataForm.keyType"
                                 :readOnly="readOnly"></t-dic-dropdown-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="authCompany" label="批准单位">
          <el-input v-model="dataForm.authCompany"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="loginUsername" label="登陆网名">
          <el-input v-model="dataForm.loginUsername"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="loginUrl" label="登陆网址">
          <el-input v-model="dataForm.loginUrl"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="有效期至" prop="expirationDate" verify class="is-required">
          <t-datetime-picker v-model="dataForm.expirationDate" type="date" :readOnly="readOnly">
          </t-datetime-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="account" label="用户名">
          <el-input v-model="dataForm.account" placeholder="如无用户名，请填无"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="password" label="密码">
          <el-input v-model="dataForm.password" placeholder="如无密码，请填无"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="principalId" label="主要负责人">
          <el-input v-model="dataForm.principalId"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="useScenes" label="用途">
          <t-input type="textarea" :rows="3" v-model="dataForm.useScenes" :readOnly="readOnly"></t-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="申请时间" prop="applyforDate" verify class="is-required">
          <t-datetime-picker v-model="dataForm.applyforDate" type="date" :readOnly="readOnly">
          </t-datetime-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="keyColor" label="密匙颜色">
          <el-input v-model="dataForm.keyColor"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="existElectMark" label="是否有电子签章功能" label-width="180px">
          <t-dic-radio-select dicType="1260860975985332225" v-model="dataForm.existElectMark"
                              :readOnly="readOnly"></t-dic-radio-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="remark" label="备注">
          <t-input type="textarea" :rows="3" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
        </el-form-item>
      </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-col :span="8">
        <el-form-item prop="sign" label="登记人">
          <span>{{dataForm.sign}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="sign" label="登记时间">
          <el-input v-model="dataForm.signTime"></el-input>
          <span>{{dataForm.signTime}}</span>
        </el-form-item>
      </el-col>
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    mapState
  } from 'vuex'
  import find from 'lodash/find'

  export default {
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          // bId: '',
          // actTaskKey: '',
          province: '',
          city: '',
          keyType: '',
          authCompany: '',
          loginUsername: '',
          loginUrl: '',
          expirationDate: '',
          account: '',
          principalId: '',
          useScenes: '',
          applyforDate: '',
          keyColor: '',
          existElectMark: '',
          remark: '',
          password: '',
          // isInput: '',
          sign: '',
          // signTime: '',
          // keyStatus: '',
          // propose: '',
          // result: '',
          // approvalStatus: '',
          // createtime: '',
          // updatetime: '',
          // createuser: '',
          // updateuser: '',
          // datastatus: ''
        },
        dataRule: {
          bId: [
            {required: true, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: true, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          province: [
            {required: true, message: '所属地区-省', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '所属地区-市', trigger: 'blur'}
          ],
          keyType: [
            {required: true, message: '类别名称', trigger: 'blur'}
          ],
          authCompany: [
            {required: true, message: '批准单位不能为空', trigger: 'blur'}
          ],
          loginUsername: [
            {required: true, message: '登陆网名不能为空', trigger: 'blur'}
          ],
          loginUrl: [
            {required: true, message: '登陆网址不能为空', trigger: 'blur'}
          ],
          expirationDate: [
            {required: true, message: '有效期至不能为空', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          principalId: [
            {required: true, message: '主要负责人不能为空', trigger: 'blur'}
          ],
          useScenes: [
            {required: true, message: '用途不能为空', trigger: 'blur'}
          ],
          applyforDate: [
            {required: true, message: '申请时间不能为空', trigger: 'blur'}
          ],
          keyColor: [
            {required: true, message: '密匙颜色不能为空', trigger: 'blur'}
          ],
          existElectMark: [
            {required: true, message: '是否有电子签章功能', trigger: 'blur'}
          ],
          remark: [
            {required: false, message: '备注不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          isInput: [
            {required: true, message: '是否直接登记', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '登记人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: true, message: '登记时间不能为空', trigger: 'blur'}
          ],
          keyStatus: [
            {required: true, message: '密钥状态不能为空', trigger: 'blur'}
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
    computed: {
      currentProvince: {
        get: function () {
          let a = find(tapp.data.base_datadictionary['base_region'], {id: this.dataForm.province})
          if (a) {
            return a.items
          } else {
            return []
          }
        }
      }
    },
    created() {
      this.init()
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
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tBaseinfoKeyApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tBaseinfoKeyApproval.bId
                this.dataForm.actTaskKey = result.tBaseinfoKeyApproval.actTaskKey
                this.dataForm.province = result.tBaseinfoKeyApproval.province
                this.dataForm.city = result.tBaseinfoKeyApproval.city
                this.dataForm.keyType = result.tBaseinfoKeyApproval.keyType
                this.dataForm.authCompany = result.tBaseinfoKeyApproval.authCompany
                this.dataForm.loginUsername = result.tBaseinfoKeyApproval.loginUsername
                this.dataForm.loginUrl = result.tBaseinfoKeyApproval.loginUrl
                this.dataForm.expirationDate = result.tBaseinfoKeyApproval.expirationDate
                this.dataForm.account = result.tBaseinfoKeyApproval.account
                this.dataForm.principalId = result.tBaseinfoKeyApproval.principalId
                this.dataForm.useScenes = result.tBaseinfoKeyApproval.useScenes
                this.dataForm.applyforDate = result.tBaseinfoKeyApproval.applyforDate
                this.dataForm.keyColor = result.tBaseinfoKeyApproval.keyColor
                this.dataForm.existElectMark = result.tBaseinfoKeyApproval.existElectMark
                this.dataForm.remark = result.tBaseinfoKeyApproval.remark
                this.dataForm.password = result.tBaseinfoKeyApproval.password
                this.dataForm.isInput = result.tBaseinfoKeyApproval.isInput
                this.dataForm.sign = result.tBaseinfoKeyApproval.sign
                this.dataForm.signTime = result.tBaseinfoKeyApproval.signTime
                this.dataForm.keyStatus = result.tBaseinfoKeyApproval.keyStatus
                this.dataForm.propose = result.tBaseinfoKeyApproval.propose
                this.dataForm.result = result.tBaseinfoKeyApproval.result
                this.dataForm.approvalStatus = result.tBaseinfoKeyApproval.approvalStatus
                this.dataForm.createtime = result.tBaseinfoKeyApproval.createtime
                this.dataForm.updatetime = result.tBaseinfoKeyApproval.updatetime
                this.dataForm.createuser = result.tBaseinfoKeyApproval.createuser
                this.dataForm.updateuser = result.tBaseinfoKeyApproval.updateuser
                this.dataForm.datastatus = result.tBaseinfoKeyApproval.datastatus
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
          tapp.services.tBaseinfoKeyApproval.save(model).then(function (result) {
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
<style lang="scss" scoped>
  .el-select .el-input {

  }
</style>

