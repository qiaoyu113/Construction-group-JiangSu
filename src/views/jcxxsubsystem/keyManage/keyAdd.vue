<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">{{ title }}</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button v-if="isEdit" type="primary" plain icon="el-icon-arrow-left" @click="closeCurrentTabNav">返回</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="doSave()">保存</el-button>
      <el-button v-if="isEdit" type="primary" icon="el-icon-delete" @click="doDelete">删除</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="90px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'密钥信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="province" label="所属地区：" class="is-required">
              <t-region-s-picker :province.sync="dataForm.province" :city.sync="dataForm.city" :disabled="isEdit" :readOnly="readOnly"></t-region-s-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="keyType" label="类别名称：">
              <t-dic-dropdown-select dicType="key_type" v-model="dataForm.keyType"
                                      :disabled="isEdit"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="authCompany" label="批准单位：">
              <el-input v-model="dataForm.authCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="loginUsername" label="登陆网名：">
              <el-input v-model="dataForm.loginUsername"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="loginUrl" label="登陆网址：">
              <el-input v-model="dataForm.loginUrl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有效期至：" prop="expirationDate" class="is-required">
              <t-datetime-picker v-model="dataForm.expirationDate" type="date">
              </t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="account" label="用户名：">
              <el-input v-model="dataForm.account" placeholder="如无用户名，请填无"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="password" label="密码：">
              <el-input v-model="dataForm.password" placeholder="如无密码，请填无"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="principalId" label="主要负责人：">
              <t-maincharge-select v-model="dataForm.principalId" @selectedMainCharge="getSelectedMainCharge"></t-maincharge-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="useScenes" label="用途：">
              <t-input type="textarea" :rows="3" v-model="dataForm.useScenes" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：" prop="applyforDate" >
              <t-datetime-picker v-model="dataForm.applyforDate" type="date"  >
              </t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="keyColor" label="密匙颜色：">
              <el-input v-model="dataForm.keyColor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="existElectMark" label="是否有电子签章功能：" label-width="180px">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.existElectMark"
                                  :readOnly="readOnly"></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="remark" label="备注：">
              <t-input type="textarea" :rows="3" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
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
  </div>
</template>

<script>
  import moment from 'moment'
  import { mapState } from 'vuex'
  import baseView from '@/base/baseView'

  export default {
    extends: baseView,
    data () {
      return {
        title: '',
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        isEdit: false, // 是否是编辑状态
        readOnly: false,
        dataForm: {
          bId: '',
          actTaskKey: '',
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
          isInput: '',
          sign: '',
          signTime: '',
          keyStatus: '',
          propose: '',
          result: '',
          approvalStatus: ''
        },
        dataRule: {
          bId: [
            {required: false, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: false, message: 'activiti执行任务key不能为空', trigger: 'blur'}
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
            {required: true, message: '有效期不能为空', trigger: 'blur'}
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
            {required: false, message: '登记人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: false, message: '登记时间不能为空', trigger: 'blur'}
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
          ]
        }
      }
    },
    created () {
      this.init()

    },
    activated () {
      this.$nextTick((_) => {
        if (this.routeChanged) {
          this.docId = this.$route.query.id || ''
          this.init(this.docId)
        }
      })
    },
    watch: {
      isEdit: function (val) {
        if (val) {
          this.title = '密钥信息更新'
        } else {
          this.title = '密钥登记'
        }
        this.$util.ui.title(this.title)
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user
      })
    },
    methods: {
      getSelectedMainCharge (charge) {
        console.log('current charge', charge)
        // charge为从弹窗框列表带出来的那一行的数据
        // 主要负责人id 已从从组件里已经带出来，这里定义为 dataForm.mainPid，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的charge的其他值，从这里的charge获取
        // 例如 this.dataForm.id = charge.id
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
            if (this.dataForm.id) {
              let self = this
              tapp.services.tBaseinfoKeyApproval.get(id).then(function (result) {
                self.isEdit = true
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.bId = result.bId
                self.dataForm.actTaskKey = result.actTaskKey
                self.dataForm.province = result.province
                self.dataForm.city = result.city
                self.dataForm.keyType = result.keyType
                self.dataForm.authCompany = result.authCompany
                self.dataForm.loginUsername = result.loginUsername
                self.dataForm.loginUrl = result.loginUrl
                self.dataForm.expirationDate = result.expirationDate
                self.dataForm.account = result.account
                self.dataForm.principalId = result.principalId
                self.dataForm.useScenes = result.useScenes
                self.dataForm.applyforDate = result.applyforDate
                self.dataForm.keyColor = result.keyColor
                self.dataForm.existElectMark = result.existElectMark
                self.dataForm.remark = result.remark
                self.dataForm.password = result.password
                self.dataForm.isInput = result.isInput
                self.dataForm.sign = result.sign
                self.dataForm.signTime = result.signTime
                self.dataForm.keyStatus = result.keyStatus
                self.dataForm.propose = result.propose
                self.dataForm.result = result.result
                self.dataForm.approvalStatus = result.approvalStatus
                self.dataForm.createtime = result.createtime
                self.dataForm.updatetime = result.updatetime
                self.dataForm.createuser = result.createuser
                self.dataForm.updateuser = result.updateuser
                self.dataForm.datastatus = result.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.isEdit = false
            this.dataForm.id = ''
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate()
          })
        }
      },
      doDelete () {
        let self = this
        self.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          tapp.services.tBaseinfoKeyApproval.delete(self.dataForm.id).then(function (result) {
            self.closeCurrentTabNav()
            self.$notify.success({
              title: '系统成功',
              message: '删除成功！'
            })
          })
        })
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.tBaseinfoKeyApproval.save(model).then(function (result) {
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
      },
      // 关闭当前页面并跳转到新的页面
      closeCurrentTabNav () {
        this.$util.closeCurrentTabNav('key_update')
      }
    }
  }
</script>
