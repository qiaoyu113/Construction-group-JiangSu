<template>
  <div>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="dialogVisible = true">
        审批流程图
      </el-button>
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
        <!-- businessKey值请修改当前流程的key值 -->
        <t-workflow-map businessKey="t_bid_pckey_approval_process"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'备案信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称：" prop="proName">
              <t-record-select v-model="dataForm.proName" @selectedRecord="getSelectedRecord"
                               :readOnly="readOnly"></t-record-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属分公司：">
              <t-input v-model="dataForm.proSubCompany" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="所属事业部：">
              <t-input v-model="dataForm.proBusDept" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位：">
              <t-input v-model="dataForm.proConstructCompany" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttr" label="  合同模式：">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投资金额：" prop="proTotalInvestment">
              <t-currency-input v-model="dataForm.proTotalInvestment" :readOnly="readOnly">
                <span slot="append">元</span>
              </t-currency-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proType" label="工程类别：">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proRunMode" label="经营方式：">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投资金额：" prop="proTotalInvestment">
              <t-currency-input v-model="dataForm.proTotalInvestment" :readOnly="readOnly">
                <span slot="append">元</span>
              </t-currency-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'密钥信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="所属地区：">
              <t-region-s-picker :province.sync="dataForm.proAddressProvince" :city.sync="dataForm.proAddressCity"
                                 readOnly></t-region-s-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="keyType" label="密钥类别：">
              <t-dic-dropdown-select dicType="key_type" v-model="dataForm.keyType"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="authCompany" label="批准单位：">
              <t-input v-model="dataForm.authCompany" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="loginUsername" label="登录网名：">
              <t-input v-model="dataForm.loginUsername" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="loginUrl" label="登录网址：">
              <t-input v-model="dataForm.loginUrl" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="expirationDate" label="有效期至：">
              <t-input v-model="dataForm.expirationDate" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用途：">
              <t-input type="textarea" :rows="3" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="account" label="用户名：">
              <t-input v-model="dataForm.account" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="password" label="密码：">
              <t-input v-model="dataForm.password" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="principalId" label="主要负责人：">
              <t-input v-model="dataForm.principalId" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="keyColor" label="密钥颜色：">
              <t-input v-model="dataForm.keyColor" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="" label="办理单位：">
              <t-input v-model="dataForm.proSubCompany" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="existElectMark" label="是否有电子签章功能：" label-width="180px">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.existElectMark" readonly></t-dic-radio-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="领用单位：">
              <t-input v-model="dataForm.proSubCompany" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="useScenes" label="用途：">
              <t-input v-model="dataForm.useScenes" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="领用期限：">
              <t-datetime-range-picker v-model="dataForm.limitStarttime" :disabled="readOnly">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="getTime" label="领用时间：">
              <t-input v-model="dataForm.getTime" placeholder="经营部主管审核后自动更新" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="returnTime" label="归还时间：">
              <t-input v-model="dataForm.returnTime" placeholder="经营部主管确认归还后自动更新" readOnly></t-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="经办人：">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="经办时间：">
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
    <el-dialog title="提示" :visible.sync="hitDiablogVisible" width="width">
      <div>{{hint}}</div>
      <div slot="footer">
        <el-button type="primary" @click="hitDiablogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapState} from 'vuex'
  import baseView from '@/base/baseView'
  import find from 'lodash/find'

  export default {
    extends: baseView,
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        isEdit: false,
        hint: '',
        municipality: ['820000', '810000', '500000', '310000', '110000', '120000', '710000'],
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        hitDiablogVisible: false,
        submitDialogVisible: false,
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
          datastatus: '',
          proAddressProvince: '',
          proAddressCity: '',
          keyType: '',
          existElectMark: ''
        },
        dataRule: {
          bId: [
            {required: false, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: false, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          pcId: [
            {required: false, message: '项目备案id不能为空', trigger: 'blur'}
          ],
          keyId: [
            {required: false, message: '密钥id不能为空', trigger: 'blur'}
          ],
          proSubCompany: [
            {required: false, message: '该项目所属分公司不能为空', trigger: 'blur'}
          ],
          useScenes: [
            {required: false, message: '用途不能为空', trigger: 'blur'}
          ],
          limitStarttime: [
            {required: false, message: '领用期限-开始时间不能为空', trigger: 'blur'}
          ],
          limitEnditme: [
            {required: false, message: '领用期限-结束时间不能为空', trigger: 'blur'}
          ],
          getTime: [
            {required: false, message: '领用时间不能为空', trigger: 'blur'}
          ],
          returnTime: [
            {required: false, message: '归还时间不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: false, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: false, message: '执行时间不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: false, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          propose: [
            {required: false, message: '审核意见不能为空', trigger: 'blur'}
          ],
          result: [
            {required: false, message: '审核结果不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    activated () {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
      this.$nextTick((_) => {
        if (this.routeChanged) {
          this.docId = this.$route.query.id || ''
          this.init(this.docId)
        }
      })
    },
    watch: {
      'dataForm.province': {
        handler: function (val) {
          // 820000 810000 500000 310000 110000 120000 710000
          this.dataForm.city = ''
          if ((this.municipality.indexOf(val) >= 0 && this.dataForm.keyType)) {
            this.getPkey({province: val, city: this.dataForm.city, keyType: this.dataForm.keyType})
          }
        },
      },
      'dataForm.city': {
        handler: function (val) {
          console.log('city', val)
          if (this.dataForm.province && this.dataForm.keyType) {
            this.getPkey({province: this.dataForm.province, city: val, keyType: this.dataForm.keyType})
          }
        },
      },
      'dataForm.keyType': {
        handler: function (val) {
          if ((this.dataForm.province && this.municipality.indexOf(this.dataForm.province) >= 0) || (this.dataForm.province && this.dataForm.city)) {
            this.getPkey({province: this.dataForm.province, city: this.dataForm.city, keyType: val})
          }
        },
      },
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,
      })
    },

    methods: {
      getSelectedRecord (pcId) {
        console.log('current proName', pcId)
        this.dataForm.proName = pcId.proName
        this.dataForm.pcId = pcId.id
        this.dataForm.proSubCompany1 = pcId.proSubCompany
        this.dataForm.proBusDept = pcId.proBusDept
        this.dataForm.proConstructCompany = pcId.proConstructCompany
        this.dataForm.proContractAttr = pcId.proContractAttr
        this.dataForm.proTotalInvestment = pcId.proTotalInvestment
        this.dataForm.proType = pcId.proType
        this.dataForm.proRunMode = pcId.proRunMode
        this.dataForm.proBuildArea = pcId.proBuildArea
        this.dataForm.authCompany = pcId.authCompany
        this.dataForm.province = pcId.proAddressProvince
        this.dataForm.city = pcId.proAddressCity
        this.dataForm.proSubCompany = pcId.proSubCompany
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
            if (this.dataForm.id) {
              let self = this
              tapp.services.tBidPckeyApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)

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
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.tBidPckeyApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！',
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
      getPkey (searchData) {
        const param = {
          skipCount: 1,
          maxResultCount: 20,
          sorting: 'id descending'
        }
        let a = this.$util.deepObjectAssign({}, param, searchData)
        let self = this
        tapp.services.tBaseinfoKeyApproval.getPagedList(a).then(result => {
          let b = find(result.items, {province: a.province, city: a.city, keyType: a.keyType})
          if (b) {
            self.dataForm.authCompany = b.authCompany
            self.dataForm.loginUsername = b.loginUsername
            self.dataForm.loginUrl = b.loginUrl
            self.dataForm.expirationDate = b.expirationDate
            self.dataForm.useScenes = b.useScenes
            self.dataForm.existElectMark = b.existElectMark
            self.dataForm.password = b.password
            self.dataForm.principalId = b.principalId
            self.dataForm.keyColor = b.keyColor
            self.dataForm.proSubCompany = b.proSubCompany
            self.dataForm.account = b.account
            // tapp.services.roleService.getRoleCategoryUsers(self.dataForm.principalId, self.dataForm.proSubCompany).then(_result => {
            //   console.log(_result)
            // })
            if (b.keyStatus !== 'can_recipients') {
              self.hint = '此密钥被' + self.dataForm.proSubCompany + '单位领用！'
              self.dialogVisible = true
            }
          } else {
            self.hint = '当前选择的地区和密钥类型，没有对应的密钥'
            self.dialogVisible = true
          }
        })
      }
    }
  }
</script>
