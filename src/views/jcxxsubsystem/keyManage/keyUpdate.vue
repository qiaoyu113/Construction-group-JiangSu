<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">密钥办理申请</div>
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
        <t-workflow-map businessKey="t_baseinfo_key_approval_process"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent label-width="120px"
             label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'密钥信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="province" label="所属地区：">
              <t-region-s-picker :province.sync="dataForm.province" :city.sync="dataForm.city"
                                 :readOnly="readOnly"></t-region-s-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="keyType" label="类别名称：">
              <t-dic-dropdown-select dicType="key_type" v-model="dataForm.keyType"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="authCompany" label="批准单位：">
              <t-input v-model="dataForm.authCompany" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="loginUsername" label="登陆网名：">
              <t-input v-model="dataForm.loginUsername" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="loginUrl" label="登陆网址：">
              <t-input v-model="dataForm.loginUrl" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有效期至：" prop="expirationDate">
              <t-datetime-picker v-model="dataForm.expirationDate" type="date" :disabled="readOnly"
                                 :readOnly="readOnly"></t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="account" label="用户名：">
              <t-input v-model="dataForm.account" placeholder="如无用户名，请填无" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="password" label="密码：">
              <t-input v-model="dataForm.password" placeholder="如无密码，请填无" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="principalId" label="主要负责人：">
              <t-maincharge-select v-model="dataForm.principalId" :readOnly="readOnly"
                                   @selectedMainCharge="getSelectedMainCharge"></t-maincharge-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="useScenes" label="用途：">
              <t-input type="textarea" :rows="3" v-model="dataForm.useScenes" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间" prop="applyforDate">
              <t-datetime-picker v-model="dataForm.applyforDate" type="date" :disabled="readOnly"></t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="keyColor" label="密匙颜色：">
              <t-input v-model="dataForm.keyColor" :readOnly="readOnly"></t-input>
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
          <el-form-item prop="" label="办理单位：">
            <span>{{subCompany}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="登记时间：">
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
  import find from 'lodash/find'
  import {
    mapState
  } from 'vuex'

  export default {
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        submitDialogVisible: false,
        pType: '',
        sealCount: '',
        subCompany: '',
        mainChargeName: '',
        dataForm: {
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
          sign: '',
          signTime: '',
          flag: '1',
        },
        dataRule: {
          province: [
            {required: true, message: '省份', trigger: 'blur'}
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
          mainChargeName: [
            {required: false, message: '主要负责人不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    created () {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      console.log('this.readOnly', this.readOnly)
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    activated () {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      console.log('this.readOnly', this.readOnly)
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user
      })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
            if (this.dataForm.id) {
              let self = this
              tapp.services.tBaseinfoKeyApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                let params = {
                  filters: {},
                  maxResultCount: 20000,
                  skipCount: 1,
                  sorting: 'id descending',
                   id: result.principalId
                }
                /*tapp.services.base_User.getAllUsers(params).then(_result => {
                  if(_result && _result.items && _result.items.length > 0) {
                    let item = find(_result.items, {id: result.principalId})
                    if(item && item.name) {
                      self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, {mainChargeName: item.name, principalId: item.id})
                    }
                  }
                })*/
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate()
          })
        }
        this.getUserWithDepartments()
      },
      getSelectedMainCharge (charge) {
        console.log('current charge', charge)
        this.dataForm.principalId=charge.userId
      },
      getUserWithDepartments () {
        if (this.currentUser && this.currentUser.userId) {
          let self = this
          tapp.services.base_User.getUserWithDepartments(this.currentUser.userId).then(result => {
            if (result) {
              self.subCompany = result.grouplist[0] && result.grouplist[0].value ? result.grouplist[0].value : ''
            }
          })
        }
      },
      // 表单提交
      doSave () {
        let validPromises = [this.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          this.submitDialogVisible = true
          // let model = {...self.dataForm};
          // tapp.services.tBaseinfoKeyApproval.save(model).then(function (result) {
          //   self.$notify.success({
          //     title: "操作成功！",
          //     message: "保存成功！",
          //   });
          // });
        }).catch(function (e) {
          this.$notify.error({
            title: '错误',
            message: '保存失败！'
          })
          return false
        })
      },
      submit () {
        let self = this
        if (self.pType && self.sealCount) {
          let model = {...self.dataForm}
          tapp.services.tBaseinfoKeyApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！',
            })
          })
          // 用印接口
          this.submitDialogVisible = false
        } else {
          self.$notify.error({
            title: '错误',
            message: '请输入必填信息'
          })
        }
      },
    }
  }
</script>
