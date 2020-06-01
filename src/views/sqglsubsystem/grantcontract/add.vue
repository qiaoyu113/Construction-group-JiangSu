<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">合同备案授权</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" plain icon="el-icon-s-data" @click="dialogVisible = true">
        审批流程图
      </el-button>
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
        <!-- businessKey值请修改当前流程的key值 -->
        <t-workflow-map businessKey="t_grant_key_contract_approval"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称：" prop="proName">
             <t-project-select placeholder="选择一个项目" :readOnly="readOnly" v-model="dataForm.proName" @selectedProject="selectedData"></t-project-select>
              <!-- <t-bank-project-select :readOnly="readOnly" v-model="dataForm.proName" @selectedData="selectedData"></t-bank-project-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属分公司：">
              <t-input :readOnly="true" v-model="dataForm.proSubCompany"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="所属事业部：">
              <t-input :readOnly="true" v-model="dataForm.proBusDept"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompany" label="建设单位：">
              <t-input :readOnly="true" v-model="dataForm.proConstructCompany"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同模式：" prop="proContractAttr">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" :disabled="true"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="投资金额：">
              <t-input :readOnly="true" v-model="dataForm.proTotalInvestment"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类别：" prop="proType">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" :disabled="true"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营方式：" prop="proRunMode">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :disabled="true"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildArea" label="项目规模：">
              <t-input :readOnly="true" v-model="dataForm.proBuildArea"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'合同信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="合同名称">
            <t-input :readOnly="true" v-model="dataForm.conName"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同期间">
            <t-datetime-range-picker disabled v-model="dataForm.conPeriod"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额">
            <t-input :readOnly="true" v-model="dataForm.conTotal"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="授权内容：" prop="grantContent">
            <t-input type="textarea" :rows="2" v-model="dataForm.grantContent" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="grantStarttime" label="授权期限：" class="is-required">
            <t-datetime-range-picker v-model="grantTime" @change="onStartDateRangeChanged" :readOnly="readOnly"></t-datetime-range-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权人:" prop="grantUser">
            <t-dic-dropdown-select dicType="licensor" v-model="dataForm.grantUser"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <t-input type="textarea" :rows="2" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
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
  import moment from 'moment'
  import { mapState } from 'vuex'
  import find from 'lodash/find'

  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        grantTime:[],
        dataForm: {
          proName: '',
          proSubCompany: '',
          proBusDept: '',
          proConstructCompany: '',
          proContractAttr: '',
          proTotalInvestment: '',
          proType: '',
          proRunMode: '',
          proBuildArea: '',
          conName: '',
          conStartDate: '',
          conTotal: '',
          grantContent: '',
          grantStarttime: '',
          grantUser: '',
          sign: '',
          signTime: '',
          remark: ''
        },
        dataRule: {
          proName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          grantContent: [
            {required: true, message: '授权内容不能为空', trigger: 'blur'}
          ],
          grantStarttime: [
            {required: true, message: '授权期限不能为空', trigger: 'blur'}
          ],
          grantUser: [
            {required: true, message: '经办人不能为空', trigger: 'blur'}
          ]
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
        currentUser: state => state.app.user,
      })
    },
    methods: {
      resetFields() {
        this.$refs.ruleForm.resetFields();
      },
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.tGrantContractApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
                self.grantTime = [result.grantStarttime, result.grantEndtime]
                let params = {
                  filters: {},
                  maxResultCount: 20,
                  skipCount: 1,
                  sorting: "id descending",
                  id: result.pId
                }
                tapp.services.proInfo.getPagedList(params).then(_result => {
                  if(_result && _result.items && _result.items.length > 0) {
                    let item = find(_result.items, {id: result.pId})
                    if(item) {
                      self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, item)
                      self.dataForm.conPeriod = [self.dataForm.conStartDate, self.dataForm.conEndDate];
                    }
                  }
                })
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
      // 选择项目
      selectedData(data) {
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        this.dataForm = this.$util.deepObjectAssign({}, this.dataForm, data)
        this.dataForm.conPeriod = [data.conStartDate, data.conEndDate];
      },
      onStartDateRangeChanged(val) {
        this.dataForm.grantStarttime = val[0];
        this.dataForm.grantEndtime= val[1];
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tGrantContractApproval.save(model).then(function (result) {
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
