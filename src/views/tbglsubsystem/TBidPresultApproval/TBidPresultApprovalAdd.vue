<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目备案信息登记</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'备案信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="pcId">
              <t-record-select v-model="dataForm.pcId" @selectedRecord="getSelectedRecord"></t-record-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompanyA" label="所属分公司">
              <el-input v-model="dataForm.proSubCompanyA" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDeptA" label="所属事业部">
              <el-input v-model="dataForm.proBusDeptA" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompanyA" label="建设单位">
              <el-input v-model="dataForm.proConstructCompanyA" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContractAttrA" label="  合同模式">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttrA"
                                     readonly></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestmentA" label="投资金额">
              <el-input v-model="dataForm.proTotalInvestmentA" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTypeA" label="工程类别">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proTypeA"
                                     readonly></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proRunModeA" label="经营方式">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunModeA"
                                     readonly></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBuildAreaA" label="计划项目规模">
              <el-input v-model="dataForm.proBuildAreaA" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20" class="page-title">
          <el-col :span="8">
            <el-form-item prop="bidResult" label="  投标结果">
              <t-dic-radio-select dicType="bid_result" v-model="dataForm.bidResult"
                                  readonly></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="brUser" label="登记人">
              <span>{{dataForm.brUser}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="brTime" label="登记时间">
              <span>{{dataForm.brTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="brRemark" label="备注">
              <t-input type="textarea" :rows="3" v-model="dataForm.brRemark" :readOnly="readOnly"></t-input>
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
  import {mapState} from 'vuex'
  import baseView from "../../../base/baseView";

  export default {
    name: 'myTask',
    extends: baseView,
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      },
    },
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bidResult: '',
          brRemark: '',
          brUser: '',
          brTime: '',
        },
        dataRule: {

          bidResult: [
            {required: false, message: '投标结果不能为空', trigger: 'blur'}
          ],
          brRemark: [
            {required: false, message: '投标备注', trigger: 'blur'}
          ],
          brUser: [
            {required: true, message: '登记人', trigger: 'blur'}
          ],
          brTime: [
            {required: true, message: '登记时间', trigger: 'blur'}
          ],
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
      getSelectedRecord(pcId) {
        console.log('current proName', pcId)
        this.dataForm.proNameA = pcId.proName
        this.dataForm.proSubCompanyA = pcId.proSubCompany
        this.dataForm.proBusDeptA = pcId.proBusDept
        this.dataForm.proConstructCompanyA = pcId.proConstructCompany
        this.dataForm.proContractAttrA = pcId.proContractAttr
        this.dataForm.proTotalInvestmentA = pcId.proTotalInvestment
        this.dataForm.proTypeA = pcId.proType
        this.dataForm.proRunModeA = pcId.proRunMode
        this.dataForm.proBuildAreaA = pcId.proBuildArea

      },
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tBidProcaseApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bidResult = result.tBidProcaseApproval.bidResult
                this.dataForm.brUser = result.tBidProcaseApproval.brUser
                this.dataForm.brTime = result.tBidProcaseApproval.brTime
                this.dataForm.brRemark = result.tBidProcaseApproval.brRemark
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.dataForm.brUser = this.currentUser.userDisplayName
            this.dataForm.brTime = this.$util.datetimeFormat(moment())
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
          tapp.services.tBidProcaseApproval.save(model).then(function (result) {
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
      },
      getProvince(proAddressProvince) {
        console.log('proAddressProvince', proAddressProvince)
        // 赋值给实际页面的值
        this.dataForm.proAddressProvince = proAddressProvince
      },
      getCity(proAddressCity) {
        console.log('proAddressCity', proAddressCity)
        // 赋值给实际页面的值
        this.dataForm.proAddressCity = proAddressCity
      },
    }
  }
</script>
