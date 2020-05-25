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
             label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目基本信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="actTaskKey" label="项目名称：">
            <el-input v-model="dataForm.actTaskKey" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="项目编号：">
            <el-input v-model="dataForm.actTaskKey" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="pId" label="建设单位：">
            <el-input v-model="dataForm.pId" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conCode" label="单位性质：">
            <t-dic-dropdown-select dicType="unit_nature" v-model="dataForm.proConstructCompanyAttr"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="region" label="项目地址：" class="is-required">
            <t-region-picker v-model="dataForm.province" @province="getProvince" @city="getCity" :readOnly="readOnly"></t-region-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conModality" label="项目总投资：">
            <el-input v-model="dataForm.conModality" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="conStartDate" label="所属分公司：">
            <el-input v-model="dataForm.conStartDate" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conEndDate" label="所属事业部：">
            <el-input v-model="dataForm.conEndDate" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conCode" label="实施主体：">
            <t-dic-dropdown-select dicType="ss_zt" v-model="dataForm.proConstructCompanyAttr"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="conPayWay" label="计划开工日期：">
            <el-input v-model="dataForm.conPayWay" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="otherPayWay" label="计划完工日期：">
            <el-input v-model="dataForm.otherPayWay" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conTotal" label="工程工期：">
            <el-input v-model="dataForm.conTotal" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item prop="conCode" label="经营方式：">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proConstructCompanyAttr"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="conOtherProportion" label="联营单位管理费：">
            <el-input v-model="dataForm.conOtherProportion" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="conPayStandard" label="项目净利润承诺超：">
            <el-input v-model="dataForm.conPayStandard" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="conStatus" label="公司负责人：">
            <el-input v-model="dataForm.conStatus" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="联营公司名称：">
            <el-input v-model="dataForm.approvalStatus" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="联系人：">
            <el-input v-model="dataForm.sign" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="联系方式：">
            <el-input v-model="dataForm.signTime" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'合同基本信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="propose" label="合同名称：">
            <el-input v-model="dataForm.propose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="result" label="合同编号：">
            <el-input v-model="dataForm.result"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="createtime" label="合同形式：">
            <t-dic-dropdown-select dicType="1260865980897300482" v-model="dataForm.proConstructCompanyAttr"
                                   :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同开始日期:" prop="updatetime" verify gtdatenow class="is-required">
            <t-datetime-picker v-model="dataForm.updatetime" type="date"></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同结束日期：" prop="createuser" verify gtdatenow class="is-required">
            <t-datetime-picker v-model="dataForm.updatetime" type="date"></t-datetime-picker>
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
          <el-form-item label="签订日期：" prop="datastatus" verify gtdatenow class="is-required">
            <t-datetime-picker v-model="dataForm.datastatus" type="date"></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!--<el-form-item prop="datastatus" label="付款方式：">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>-->
          <el-form-item prop="createtime" label="付款方式：">
            <t-dic-dropdown-select dicType="1260865577187151874" v-model="dataForm.proConstructCompanyAttr"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item prop="datastatus" label="合同额：">
            <el-input v-model="dataForm.datastatus" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item prop="datastatus" label="金额大写：">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="datastatus" label="自营占比：">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="datastatus" label="合同额：">
            <el-input v-model="dataForm.datastatus" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="datastatus" label="联营占比：">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="datastatus" label="合同额：">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'合同保证金信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="datastatus" label="联营公司名称：">
            <el-input v-model="dataForm.datastatus" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="datastatus" label="本合同保证金额：">
            <el-input v-model="dataForm.datastatus" readOnly></el-input>
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
          <el-form-item prop="datastatus" label="其他合作协议的履约担保：">
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
            <el-input type="textarea"></el-input>
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
          province: '',
          city: '',
        },
        dataRule: {
          bId: [
            {required: true, message: '流程业务id不能为空', trigger: 'blur'}
          ],
          actTaskKey: [
            {required: true, message: 'activiti执行任务key不能为空', trigger: 'blur'}
          ],
          pId: [
            {required: true, message: '项目id不能为空', trigger: 'blur'}
          ],
          conCode: [
            {required: true, message: '合同编号不能为空', trigger: 'blur'}
          ],
          conName: [
            {required: true, message: '合同名称不能为空', trigger: 'blur'}
          ],
          conModality: [
            {required: true, message: '合同形式（字典表）不能为空', trigger: 'blur'}
          ],
          conStartDate: [
            {required: true, message: '合同开始日期不能为空', trigger: 'blur'}
          ],
          conEndDate: [
            {required: true, message: '合同结束日期不能为空', trigger: 'blur'}
          ],
          conSigningDate: [
            {required: true, message: '签订日期不能为空', trigger: 'blur'}
          ],
          conPayWay: [
            {required: true, message: '付款方式（字典表）不能为空', trigger: 'blur'}
          ],
          otherPayWay: [
            {required: true, message: '其他付款方式不能为空', trigger: 'blur'}
          ],
          conTotal: [
            {required: true, message: '合同总额不能为空', trigger: 'blur'}
          ],
          conSelfProportion: [
            {required: true, message: '自营占比不能为空', trigger: 'blur'}
          ],
          conOtherProportion: [
            {required: true, message: '联营占比不能为空', trigger: 'blur'}
          ],
          conPayStandard: [
            {required: true, message: '合同收款条件不能为空', trigger: 'blur'}
          ],
          conStatus: [
            {required: true, message: '合同状态（字典表）不能为空', trigger: 'blur'}
          ],
          approvalStatus: [
            {required: true, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '执行人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: true, message: '执行时间不能为空', trigger: 'blur'}
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
          ],
          province: [
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
          let secondPartyData = self.$refs['secondParty'].getData()
          secondPartyData.map(item => { delete item.errorMessage;delete item.entityStatus;delete item.hasError;delete item.id;return; })

          // TODO firtPartyData 和 secondPartyData 怎么放在 model 里面，需要调整
          // 举例 model.firstPartyData = firstPartyData
          // 举例 model.secondPartyData = secondPartyData

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
      getProvince (province) {
        this.dataForm.province = province
      },
      getCity (city) {
        this.dataForm.city = city
      },
    }
  }
</script>
