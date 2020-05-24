<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">投标项目详细信息</div>
      </el-col>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目基本信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="pcId" label="项目名称：">
              <t-input v-model="dataForm.pcId"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="proSubCompany" label="项目简介：">
              <t-input type="textarea" v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="项目地点：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="建设单位：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="投资金额：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="工程类别：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="项目规模：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
            <el-form-item prop="proSubCompany" label="合同模式：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'项目经营方式'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="keyId" label="经营方式：">
              <t-dic-dropdown-select dicType="1260860565488799746" v-model="dataForm.keyId" :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="dispatch" label="自营联营分配：">
              <el-row :gutter="5">
                <el-col :span="12">
                  <el-form-item prop="datastatus" label="自营：">
                    <t-input v-model="dataForm.datastatus">
                      <span slot="append">%</span>
                    </t-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="datastatus" label="联营：">
                    <t-input v-model="dataForm.datastatus">
                      <span slot="append">%</span>
                    </t-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="联营单位管理费：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="净利润承诺超：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="公司负责人">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="联营单位名称">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="useScenes" label="联系人">
              <t-input v-model="dataForm.useScenes" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="联系方式">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="联营单位名称">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="useScenes" label="联系人">
              <t-input v-model="dataForm.useScenes" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="联系方式">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'项目投标信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="投标次数：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="投标价格：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="预算价格：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="投标时间">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="existElectMark" label="投标结果：">
              <t-dic-radio-select dicType="bid_result" v-model="dataForm.proSubCompany" disabled></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="投标保证金：">
              <t-input v-model="dataForm.proSubCompany" disabled></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'项目其他信息：'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="useScenes" label="备注：">
              <t-input type="textarea" v-model="dataForm.useScenes" disabled></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'投标项目审批信息'"></t-sub-title>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        readOnly: false,
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
          ],
          createtime: [
            {required: false, message: '创建时间不能为空', trigger: 'blur'}
          ],
          updatetime: [
            {required: false, message: '更新时间不能为空', trigger: 'blur'}
          ],
          createuser: [
            {required: false, message: '创建人不能为空', trigger: 'blur'}
          ],
          updateuser: [
            {required: false, message: '更新人不能为空', trigger: 'blur'}
          ],
          datastatus: [
            {required: false, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur'}
          ]
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
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this
              tapp.services.tBidPckeyApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.bId = result.bId
                self.dataForm.actTaskKey = result.actTaskKey
                self.dataForm.pcId = result.pcId
                self.dataForm.keyId = result.keyId
                self.dataForm.proSubCompany = result.proSubCompany
                self.dataForm.useScenes = result.useScenes
                self.dataForm.limitStarttime = result.limitStarttime
                self.dataForm.limitEnditme = result.limitEnditme
                self.dataForm.getTime = result.getTime
                self.dataForm.returnTime = result.returnTime
                self.dataForm.sign = result.sign
                self.dataForm.signTime = result.signTime
                self.dataForm.approvalStatus = result.approvalStatus
                self.dataForm.propose = result.propose
                self.dataForm.result = result.result
                self.dataForm.createtime = result.createtime
                self.dataForm.updatetime = result.updatetime
                self.dataForm.createuser = result.createuser
                self.dataForm.updateuser = result.updateuser
                self.dataForm.datastatus = result.datastatus
              })
            }
          })
        } else {
          self.$nextTick(() => {
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
