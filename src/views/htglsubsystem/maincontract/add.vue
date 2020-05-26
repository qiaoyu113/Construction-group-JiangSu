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
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="100px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目基本信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="proName" label="项目名称：">
            <t-project-select placeholder="选择一个项目" v-model="dataForm.projectId" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCode" label="项目编号：">
            <el-input v-model="dataForm.proCode" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="proConstructCompany" label="建设单位：">
            <el-input  v-model="dataForm.proConstructCompany" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proConstructCompanyAttr" label="单位性质：">
            <t-dic-dropdown-select dicType="unit_nature" v-model="dataForm.proConstructCompanyAttr"
                                   disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="项目地址：" prop="pro_address">
            <el-row type="flex" justify="space-between" :gutter="2">
              <el-col :span="8">
                <t-region-s-picker :province.sync="dataForm.proAddressProvince" :city.sync="dataForm.proAddressCity" :disabled="true"></t-region-s-picker>
              </el-col>
              <el-col :span="16">
                <el-form-item prop="proAddressDetail">
                  <el-input v-model="dataForm.proAddressDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proTotalInvestment" label="项目总投资：">
            <el-input v-model="dataForm.proTotalInvestment" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proSubCompany" label="所属分公司：">
            <el-input v-model="dataForm.proSubCompany" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proBusDept" label="所属事业部：">
            <el-input v-model="dataForm.proBusDept" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proDriveSubject" label="实施主体：">
            <t-dic-dropdown-select dicType="ss_zt" v-model="dataForm.proDriveSubject"
                                   disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计划开工日期：" prop="proPlanStartDate" verify class="is-required">
            <t-datetime-picker v-model="dataForm.proPlanStartDate" type="date" disabled>
            </t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划完工日期：" prop="proPlanEndDate">
            <t-datetime-picker v-model="dataForm.proPlanEndDate" type="date" disabled>
            </t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proLimitTime" label="工程工期：">
            <el-input v-model="dataForm.proLimitTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="6">
          <el-form-item prop="proRunMode" label="经营方式：">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :disabled="true"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="联营单位管理费：" prop="proUnionCompanyMerate">
            <t-int-input v-model="dataForm.proUnionCompanyMerate" :readOnly="readOnly" disabled>
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目净利润承诺超：" prop="proProfitRate">
            <t-int-input v-model="dataForm.proProfitRate" :readOnly="readOnly" disabled>
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proCompanyHeader" label="公司负责人：">
            <el-input v-model="dataForm.proCompanyHeader" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="companyName" label="联营公司名称：">
            <el-input v-model="dataForm.companyName" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContacter" label="联系人：">
            <el-input v-model="dataForm.proContacter" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proContactway" label="联系方式：">
            <el-input v-model="dataForm.proContactway" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'合同基本信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="conName" label="合同名称：">
            <el-input v-model="dataForm.conName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conCode" label="合同编号：">
            <el-input v-model="dataForm.conCode" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="conModality" label="合同形式：">
            <t-dic-dropdown-select dicType="con_modality" v-model="dataForm.conModality"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同开始日期:" prop="conStartDate" >
            <t-datetime-picker v-model="dataForm.conStartDate" type="date"></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同结束日期：" prop="conEndDate">
            <t-datetime-picker v-model="dataForm.conEndDate" type="date"></t-datetime-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <t-first-party ref="firstParty" :readOnly="readOnly"></t-first-party>
      </el-row>
      <el-row>
        <t-second-party ref="secondParty" :readOnly="readOnly"></t-second-party>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="签订日期：" prop="conSigningDate">
            <t-datetime-picker v-model="dataForm.conSigningDate" type="date"></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="showOtherWay ? 8 : 24">
              <el-form-item prop="conPayWay" label="付款方式：">
                <t-dic-dropdown-select dicType="con_pay_way" v-model="dataForm.conPayWay"></t-dic-dropdown-select>
              </el-form-item>
            </el-col>
            <el-col v-if="showOtherWay" :span="16" sytle="padding-left: 2px;">
              <el-form-item prop="otherPayWay" label="其他付款方式：">
                <el-input v-model="dataForm.otherPayWay"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conTotal" label="合同额">
            <t-number-input v-model="dataForm.conTotal" @change="onStartDateRangeChangedallAmount">
              <span slot="append">万元</span>
            </t-number-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item prop="conTotal" label="金额大写：">
           <span>{{$util.moneyArabiaToChinese(parseFloat(dataForm.conTotal))}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="showProprietaryPool">
        <el-col :span="6">
          <el-form-item prop="conSelfProportion" label="自营占比：" class="is-required">
            <t-int-input v-model="dataForm.conSelfProportion" @change="onStartDateRangeChangedselfAmount">
              <span slot="append">%</span></t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="selfAmount" label="合同额：">
            <t-number-input v-model="dataForm.selfAmount" :readOnly="readOnly" :disabled="true">
              <span slot="append">万元</span></t-number-input>
            <!--<span>{{moneyProprietaryTransformation(dataForm.conSelfProportion)}}</span>-->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="conOtherProportion" label="联营占比：" class="is-required">
            <t-int-input v-model="dataForm.conOtherProportion" @change="onStartDateRangeChangedjointAamount">
              <span slot="append">%</span>
            </t-int-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="jointAamount" label="合同额：">
            <t-number-input v-model="dataForm.jointAamount" :readOnly="readOnly" :disabled="true">
              <span slot="append">万元</span></t-number-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never" v-if="showDepositInfo">
      <t-sub-title :title="'合同保证金信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="companyName" label="联营公司名称：">
           <el-input v-model="dataForm.companyName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <div>已交总保证金额：{{depositTotal}}万元</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="currentDeposit" label="本合同保证金额：" label-width="130px">
            <el-input v-model="currentDeposit" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item prop="datastatus" label="现金：">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="datastatus" label="房产(他项权)：">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="datastatus" label="其他合作协议的履约担保：" label-width="150px">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="datastatus" label="其他合同转：">
            <el-input v-model="dataForm.datastatus" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
               label-width="120px" label-position="right"></el-form>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'合同收款条件'"></t-sub-title>
      <el-row :gutter="20">
          <el-form-item prop="datastatus" verify can-be-empty :maxLength="200">
            <el-input type="textarea" v-model="dataForm.datastatus" readOnly></el-input>
          </el-form-item>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'附件'"></t-sub-title>
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
        readOnly: false,
        showOtherWay: false,
        showProprietaryPool: false,
        showDepositInfo: false,
        depositTotal: 0,
        currentDeposit: 0,
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          conCode: '',
          conName: '',
          conModality: '',
          conStartDate: '',
          conEndDate: '',
          conSigningDate: '',
          conPayWay: '',
          otherPayWay: '',
          conTotal: '',
          conSelfProportion: '',
          conOtherProportion: '',
          conPayStandard: '',
          conStatus: '',
          approvalStatus: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          proAddressCity: '',
          proAddressProvince: '',
          selfAmount: '',
          jointAamount: '',
          district: '',
          companyName: '',
          otherPayWay: '',
          condeposiinfoData: {
          },
        },
        dataRule: {
          otherPayWay: [{validator: this.isOtherPayWayEmpty, trigger: 'blur'}],
          conSelfProportion: [{validator: this.isConSelfProportionEmpty, trigger: 'blur'}],
          conOtherProportion: [{validator: this.isConOtherProportionEmpty, trigger: 'blur'}],
          conPayWay: [{required: true, message: '付款方式不能为空', trigger: 'change'}],
        }
      }
    },
    created() {
      // this.init()
    },
    watch: {
      'dataForm.conPayWay': {
        handler: function(val) {
          if(val == 'other_pay_way') {
            this.showOtherWay = true
          } else {
            this.showOtherWay = false
          }
        },
        deep: true
      },
    },
    methods: {
      getSelectedProject(project) {
        this.$nextTick(() => {
          this.dataForm.proCode = project.proCode;
          this.dataForm.proSubCompany = project.proSubCompany;
          this.dataForm.proBusDept = project.proBusDept;
          this.dataForm.proConstructCompany = project.proConstructCompany;
          this.dataForm.proConstructCompanyAttr = project.proConstructCompanyAttr;
          this.dataForm.proAddressCity = project.proAddressCity;
          this.dataForm.proAddressDetail = project.proAddressDetail;
          this.dataForm.proAddressProvince = project.proAddressProvince;
          this.dataForm.proRunMode = project.proRunMode;
          this.dataForm.proPlanStartDate = project.proPlanStartDate;
          this.dataForm.proPlanEndDate = project.proPlanEndDate;
          this.dataForm.proLimitTime = project.proLimitTime;
          this.dataForm.proUnionCompanyMerate = project.proUnionCompanyMerate;
          this.dataForm.proProfitRate = project.proProfitRate;
          this.dataForm.proCompanyHeader = project.proCompanyHeader;
          this.dataForm.proContacter = project.proContacter;
          this.dataForm.proContactway = project.proContactway;
          this.dataForm.proDriveSubject = project.proDriveSubject;
          this.dataForm.proContractAttr = project.proContractAttr;
          this.dataForm.proTotalInvestment = project.proTotalInvestment;
          this.dataForm.proUnionCompany = project.proUnionCompany;
          this.dataForm.proType = project.proType;
          this.dataForm.proBuildArea = project.proBuildArea;
          this.dataForm.proName = project.proName;
          this.dataForm.pcId = project.pcId;

          this.showProprietaryPool = this.dataForm.proRunMode == 'proprietary_pool' ? true : false
          this.showDepositInfo = (this.dataForm.proRunMode == 'proprietary_pool' || this.dataForm.proRunMode == 'pool') ? true : false

          let self = this;
          tapp.services.tBaseinfoPartnerApproval.get(project.proUnionCompany).then(function (result) {
            console.log('result',result)
            self.dataForm.companyName = result.companyName;
            self.dataForm.unionCompany = result.id;
          })
        })
      },
      getSelectedProject2(project) {

      },
      onStartDateRangeChangedallAmount(val) {
        let conSelfProportion=this.dataForm.conSelfProportion;
        let conOtherProportion=this.dataForm.conOtherProportion;
        if(conSelfProportion>0){
          this.dataForm.selfAmount = conSelfProportion/100 * val;
        }if(conOtherProportion>0){
          this.dataForm.jointAamount = conOtherProportion/100 * val;
        }
      },
      onStartDateRangeChangedselfAmount(val) {
        this.dataForm.selfAmount = this.dataForm.conTotal * val/100;
      },
      onStartDateRangeChangedjointAamount(val) {
        this.dataForm.jointAamount = this.dataForm.conTotal * val/100;
      },
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.tContInfoApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.bId = result.bId
                self.dataForm.actTaskKey = result.actTaskKey
                self.dataForm.pId = result.pId
                self.dataForm.conCode = result.conCode
                self.dataForm.conName = result.conName
                self.dataForm.conModality = result.conModality
                self.dataForm.conStartDate = result.conStartDate
                self.dataForm.conEndDate = result.conEndDate
                self.dataForm.conSigningDate = result.conSigningDate
                self.dataForm.conPayWay = result.conPayWay
                self.dataForm.otherPayWay = result.otherPayWay
                self.dataForm.conTotal = result.conTotal
                self.dataForm.conSelfProportion = result.conSelfProportion
                self.dataForm.conOtherProportion = result.conOtherProportion
                self.dataForm.conPayStandard = result.conPayStandard
                self.dataForm.conStatus = result.conStatus
                self.dataForm.approvalStatus = result.approvalStatus
                self.dataForm.sign = result.sign
                self.dataForm.signTime = result.signTime
                self.dataForm.propose = result.propose
                self.dataForm.result = result.result
                self.dataForm.createtime = result.createtime
                self.dataForm.updatetime = result.updatetime
                self.dataForm.createuser = result.createuser
                self.dataForm.updateuser = result.updateuser
                self.dataForm.datastatus = result.datastatus
                self.dataForm.proBusDept = result.proBusDept
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
        let validPromises = self.$refs['ruleForm'].validate();
        let firstPartyPromises = self.$refs['firstParty'].validate()
        let secondPartyPromises = self.$refs['secondParty'].validate()
        Promise.all([validPromises, firstPartyPromises, secondPartyPromises]).then(resultList => {
          let model = {...self.dataForm};
          // 甲乙方数据
          let firstPartyData = self.$refs['firstParty'].getData().list
          firstPartyData.map(item => { delete item.errorMessage;delete item.entityStatus;delete item.hasError;delete item.id;return; })
          let secondPartyData = self.$refs['secondParty'].getData().list
          secondPartyData.map(item => { delete item.errorMessage;delete item.entityStatus;delete item.hasError;delete item.id;return; })
          // TODO firtPartyData 和 secondPartyData 怎么放在 model 里面，需要调整
          // 举例 model.firstPartyData = firstPartyData
          // 举例 model.secondPartyData = secondPartyData
          model.firstPartyData = firstPartyData;
          model.secondPartyData = secondPartyData;
          tapp.services.tContInfoApproval.save(model).then(function (result) {
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

      isOtherPayWayEmpty (rule, value, cb) {
        if(!this.dataForm.conPayWay || (this.dataForm.conPayWay && this.dataForm.conPayWay !== 'other_pay_way')) return cb()
        if(this.dataForm.conPayWay && this.dataForm.conPayWay === 'other_pay_way') {
          if (this.dataForm.otherPayWay == null || this.dataForm.otherPayWay.length == 0 || this.dataForm.otherPayWay == '') {
            return cb(new Error('其他付款方式不能为空'))
          }
        }
        return cb()
      },
      isConSelfProportionEmpty (rule, value, cb) {
        if(!this.dataForm.proRunMode || (this.dataForm.proRunMode && this.dataForm.proRunMode !== 'proprietary_pool')) return cb()
        if(this.dataForm.proRunMode && this.dataForm.proRunMode === 'proprietary_pool') {
          if (this.dataForm.conSelfProportion == null || this.dataForm.conSelfProportion.length == 0 || this.dataForm.conSelfProportion == '') {
            return cb(new Error('自营占比不能为空'))
          }
        }
        return cb()
      },
      isConOtherProportionEmpty (rule, value, cb) {
        if(!this.dataForm.proRunMode || (this.dataForm.proRunMode && this.dataForm.proRunMode !== 'proprietary_pool')) return cb()
        if(this.dataForm.proRunMode && this.dataForm.proRunMode === 'proprietary_pool') {
          if (this.dataForm.conOtherProportion == null || this.dataForm.conOtherProportion.length == 0 || this.dataForm.conOtherProportion == '') {
            return cb(new Error('联营占比不能为空'))
          }
        }
        return cb()
      },
    }
  }
</script>
