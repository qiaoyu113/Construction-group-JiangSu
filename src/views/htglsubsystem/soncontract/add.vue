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
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proName" label="项目名称：">
            <t-project-select placeholder="选择一个项目" v-model="dataForm.projectId" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conCode" label="项目编号：">
            <el-input v-model="dataForm.conCode" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="proConstructCompany" label="建设单位：">
            <el-input  v-model="dataForm.proConstructCompany" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proConstructCompanyAttr" label="单位性质：">
            <t-dic-dropdown-select dicType="unit_nature" v-model="dataForm.proConstructCompanyAttr"
                                   disabled></t-dic-dropdown-select></el-form-item>
        </el-col>
        </el-row>
        <el-row :gutter="20">
       <!-- <el-col :span="8">
          <el-form-item label="项目地址：" prop="proAddressCity" verify class="is-required">
            <t-dic-tree-select dicType="base_region" v-model="dataForm.proAddressCity" disabled></t-dic-tree-select>
          </el-form-item>
        </el-col>-->
          <el-col :span="16">
            <el-form-item label="项目地址：" prop="pro_address">
              <el-row type="flex" justify="space-between">
                <el-col :span="10">
                  <t-region-picker v-model="dataForm.proAddressProvince" @province="getProvince" @city="getCity" :readOnly="readOnly"></t-region-picker>
                </el-col>
                <el-col :span="13">
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
          <el-form-item label="所属分公司" prop="proSubCompany">
            <el-input v-model="dataForm.proSubCompany" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部" prop="proBusDept">
            <el-input v-model="dataForm.proBusDept" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="proDriveSubject" label="实施主体：">
            <t-dic-dropdown-select dicType="ss_zt" v-model="dataForm.proDriveSubject"
                                   disabled></t-dic-dropdown-select></el-form-item>
        </el-col>
        </el-row>
        <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计划开工日期：" prop="proPlanStartDate" verify class="is-required">
            <t-datetime-picker v-model="dataForm.proPlanStartDate" type="date" disabled>
            </t-datetime-picker>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row :gutter="20">
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
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'主合同基本信息'"></t-sub-title>
        <el-row :gutter="20">
         <el-col :span="8">
           <el-form-item prop="bId" label="主合同名称：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="主合同编号：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="合同开始日期：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="合同结束日期：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="总合同额：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
       </el-row>
      </el-card>
      <el-card shadow="never">
       <t-sub-title :title="'子合同基本信息'"></t-sub-title>
       <el-row :gutter="20">
         <el-col :span="8">
           <el-form-item prop="bId" label="子合同名称：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="子合同类型：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="子合同编号 ：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="合同开始日期：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="合同结束日期：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="甲方单位：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="签订人：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="乙方单位：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="签订人：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="子合同形式：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="付款方式：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="签订日期：">
             <el-input v-model="dataForm.bId"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="子合同额：">
             <el-input v-model="dataForm.bId"></el-input>万元  金额大写： 自动转换为大写金额
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="合同价格审核：">
             <el-input v-model="dataForm.bId"></el-input>万元  金额大写： 自动转换为大写金额
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="是否经招标程序：">
             <el-input v-model="dataForm.bId"></el-input>万元  金额大写： 自动转换为大写金额
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="备注：">
             <el-input v-model="dataForm.bId"></el-input>万元  金额大写： 自动转换为大写金额
           </el-form-item>
         </el-col>
       </el-row>
      </el-card>
      <el-card shadow="never">
       <t-sub-title :title="'付款条件'"></t-sub-title>
       <el-row :gutter="20">
         <el-col :span="8">
             <el-input></el-input>
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
          conType: '',
          otherConType: '',
          conStartDate: '',
          conEndDate: '',
          conSigningDate: '',
          conPayWay: '',
          otherPayWay: '',
          conTotal: '',
          conPartya: '',
          signatorya: '',
          conPartyb: '',
          signatoryb: '',
          isExceedTotal: '',
          isExceed: '',
          isRunProcedure: '',
          remarks: '',
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
          datastatus: ''
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
            {required: true, message: '子合同编号不能为空', trigger: 'blur'}
          ],
          conName: [
            {required: true, message: '子合同名称不能为空', trigger: 'blur'}
          ],
          conModality: [
            {required: true, message: '子合同形式（字典表）不能为空', trigger: 'blur'}
          ],
          conType: [
            {required: true, message: '子合同类型（字典表）不能为空', trigger: 'blur'}
          ],
          otherConType: [
            {required: true, message: '其他子合同类型不能为空', trigger: 'blur'}
          ],
          conStartDate: [
            {required: true, message: '子合同开始日期不能为空', trigger: 'blur'}
          ],
          conEndDate: [
            {required: true, message: '子合同结束日期不能为空', trigger: 'blur'}
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
            {required: true, message: '子合同总额不能为空', trigger: 'blur'}
          ],
          conPartya: [
            {required: true, message: '甲方不能为空', trigger: 'blur'}
          ],
          signatorya: [
            {required: true, message: '甲方签订人不能为空', trigger: 'blur'}
          ],
          conPartyb: [
            {required: true, message: '乙方不能为空', trigger: 'blur'}
          ],
          signatoryb: [
            {required: true, message: '乙方签订人不能为空', trigger: 'blur'}
          ],
          isExceedTotal: [
            {required: true, message: '总价是否超预算（字典表）不能为空', trigger: 'blur'}
          ],
          isExceed: [
            {required: true, message: '单价是否超预算（字典表）不能为空', trigger: 'blur'}
          ],
          isRunProcedure: [
            {required: true, message: '是否经招标程序（字典表）不能为空', trigger: 'blur'}
          ],
          remarks: [
            {required: true, message: '备注不能为空', trigger: 'blur'}
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
              tapp.services.tContSubcontractApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.bId = result.bId
                self.dataForm.actTaskKey = result.actTaskKey
                self.dataForm.pId = result.pId
                self.dataForm.conCode = result.conCode
                self.dataForm.conName = result.conName
                self.dataForm.conModality = result.conModality
                self.dataForm.conType = result.conType
                self.dataForm.otherConType = result.otherConType
                self.dataForm.conStartDate = result.conStartDate
                self.dataForm.conEndDate = result.conEndDate
                self.dataForm.conSigningDate = result.conSigningDate
                self.dataForm.conPayWay = result.conPayWay
                self.dataForm.otherPayWay = result.otherPayWay
                self.dataForm.conTotal = result.conTotal
                self.dataForm.conPartya = result.conPartya
                self.dataForm.signatorya = result.signatorya
                self.dataForm.conPartyb = result.conPartyb
                self.dataForm.signatoryb = result.signatoryb
                self.dataForm.isExceedTotal = result.isExceedTotal
                self.dataForm.isExceed = result.isExceed
                self.dataForm.isRunProcedure = result.isRunProcedure
                self.dataForm.remarks = result.remarks
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
      getSelectedProject(project) {
        console.log('current project', project);
        this.dataForm.proSubCompany = project.proSubCompany;
        this.dataForm.proBusDept = project.proBusDept;
        this.dataForm.proConstructCompany = project.proConstructCompany;
        this.dataForm.proContractAttr = project.proContractAttr;
        this.dataForm.proTotalInvestment = project.proTotalInvestment;
        this.dataForm.proType = project.proType;
        this.dataForm.proRunMode = project.proRunMode;
        this.dataForm.proBuildArea = project.proBuildArea;
        this.dataForm.proName = project.proName;
        this.dataForm.pcId = project.pcId;
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all([validPromises]).then(resultList => {
          let model = {...self.dataForm};

          tapp.services.tContSubcontractApproval.save(model).then(function (result) {
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
