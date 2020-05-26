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
             label-width="120px" label-position="center">
      <el-card shadow="never">
      <t-sub-title :title="'主合同补充协议'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pId" label="主合同名称：">
            <el-input v-model="dataForm.bId" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="主合同编号：">
            <el-input v-model="dataForm.bId" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
    </el-form>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目基本信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item prop="pId" label="项目名称：">
            <el-input v-model="dataForm.actTaskKey" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="pId" label="项目编号：">
            <el-input v-model="dataForm.actTaskKey" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
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
            <t-region-picker :province.sync="dataForm.province" :city.sync="dataForm.city" :district.sync="dataForm.district"  :readOnly="readOnly"></t-region-picker>
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
          <el-form-item prop="pId" label="联营公司名称：">
            <el-input v-model="dataForm.approvalStatus" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="联系人：">
            <el-input v-model="dataForm.sign" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="联系方式：">
            <el-input v-model="dataForm.signTime" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'主合同基本信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="conCode" label="主合同形式：">
            <t-dic-dropdown-select dicType="1260865980897300482" v-model="dataForm.format" readonly></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主合同开始日期:" prop="updatetime" verify gtdatenow class="is-required">
            <t-datetime-picker v-model="dataForm.updatetime" type="date" readonly></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主合同结束日期:" prop="updatetime" verify gtdatenow class="is-required">
            <t-datetime-picker v-model="dataForm.updatetime" type="date" readonly></t-datetime-picker>
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
            <el-input v-model="dataForm.datastatus" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
               label-width="120px" label-position="right" readonly></el-form>
      <el-card shadow="never">
      <t-sub-title :title="'补充协议内容'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="datastatus" label="补充协议名称：">
            <el-input v-model="dataForm.datastatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="签订日期：" prop="updatetime" verify gtdatenow class="is-required">
            <t-datetime-picker v-model="dataForm.updatetime" type="date"></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="datastatus" label="付款方式：">
            <t-dic-dropdown-select dicType="1260865577187151874"
                                   v-model="dataForm.proConstructCompanyAttr"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="datastatus" label="调整金额：">
            <el-input v-model="dataForm.datastatus"></el-input>
            <el-form-item label="万元"></el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="备注：" prop="datastatus" verify can-be-empty :maxLength="200">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
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
          pId: '',
          cId: '',
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
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          province: '',
          city: '',
          district: '',
        },
        dataRule: {
          pId: [
            {required: true, message: '项目id不能为空', trigger: 'blur'}
          ],
          cId: [
            {required: true, message: '主合同id不能为空', trigger: 'blur'}
          ],
          conCode: [
            {required: true, message: '备案合同编号不能为空', trigger: 'blur'}
          ],
          conName: [
            {required: true, message: '备案合同名称不能为空', trigger: 'blur'}
          ],
          conModality: [
            {required: true, message: '备案合同形式（字典表）不能为空', trigger: 'blur'}
          ],
          conStartDate: [
            {required: true, message: '备案合同开始日期不能为空', trigger: 'blur'}
          ],
          conEndDate: [
            {required: true, message: '备案合同结束日期不能为空', trigger: 'blur'}
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
            {required: true, message: '备案合同额不能为空', trigger: 'blur'}
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
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.tContBranchInfo.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.pId = result.pId
                self.dataForm.cId = result.cId
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
          let secondPartyData = self.$refs['secondParty'].getData().list
          secondPartyData.map(item => { delete item.errorMessage;delete item.entityStatus;delete item.hasError;delete item.id;return; })

          // TODO firtPartyData 和 secondPartyData 怎么放在 model 里面，需要调整
          // 举例 model.firstPartyData = firstPartyData
          // 举例 model.secondPartyData = secondPartyData

          tapp.services.tContBranchInfo.save(model).then(function (result) {
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
    }
  }
</script>
