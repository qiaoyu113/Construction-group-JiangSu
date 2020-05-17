<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="success" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bId" label="项目名称：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="项目编号：">
            <el-input v-model="dataForm.actTaskKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="建设单位：">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conCode" label="单位性质：">
            <el-input v-model="dataForm.conCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conName" label="项目地址：">
            <el-input v-model="dataForm.conName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conModality" label="项目总投资：">
            <el-input v-model="dataForm.conModality"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conType" label="所属分公司：">
            <el-input v-model="dataForm.conType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="otherConType" label="所属事业部：">
            <el-input v-model="dataForm.otherConType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conStartDate" label="实施主体：">
            <el-input v-model="dataForm.conStartDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conEndDate" label="计划开工日期：">
            <el-input v-model="dataForm.conEndDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conSigningDate" label="计划完工日期：">
            <el-input v-model="dataForm.conSigningDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conPayWay" label="工程工期：">
            <el-input v-model="dataForm.conPayWay"></el-input>
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
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tContSubcontractApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tContSubcontractApproval.bId
                this.dataForm.actTaskKey = result.tContSubcontractApproval.actTaskKey
                this.dataForm.pId = result.tContSubcontractApproval.pId
                this.dataForm.conCode = result.tContSubcontractApproval.conCode
                this.dataForm.conName = result.tContSubcontractApproval.conName
                this.dataForm.conModality = result.tContSubcontractApproval.conModality
                this.dataForm.conType = result.tContSubcontractApproval.conType
                this.dataForm.otherConType = result.tContSubcontractApproval.otherConType
                this.dataForm.conStartDate = result.tContSubcontractApproval.conStartDate
                this.dataForm.conEndDate = result.tContSubcontractApproval.conEndDate
                this.dataForm.conSigningDate = result.tContSubcontractApproval.conSigningDate
                this.dataForm.conPayWay = result.tContSubcontractApproval.conPayWay
                this.dataForm.otherPayWay = result.tContSubcontractApproval.otherPayWay
                this.dataForm.conTotal = result.tContSubcontractApproval.conTotal
                this.dataForm.conPartya = result.tContSubcontractApproval.conPartya
                this.dataForm.signatorya = result.tContSubcontractApproval.signatorya
                this.dataForm.conPartyb = result.tContSubcontractApproval.conPartyb
                this.dataForm.signatoryb = result.tContSubcontractApproval.signatoryb
                this.dataForm.isExceedTotal = result.tContSubcontractApproval.isExceedTotal
                this.dataForm.isExceed = result.tContSubcontractApproval.isExceed
                this.dataForm.isRunProcedure = result.tContSubcontractApproval.isRunProcedure
                this.dataForm.remarks = result.tContSubcontractApproval.remarks
                this.dataForm.conPayStandard = result.tContSubcontractApproval.conPayStandard
                this.dataForm.conStatus = result.tContSubcontractApproval.conStatus
                this.dataForm.approvalStatus = result.tContSubcontractApproval.approvalStatus
                this.dataForm.sign = result.tContSubcontractApproval.sign
                this.dataForm.signTime = result.tContSubcontractApproval.signTime
                this.dataForm.propose = result.tContSubcontractApproval.propose
                this.dataForm.result = result.tContSubcontractApproval.result
                this.dataForm.createtime = result.tContSubcontractApproval.createtime
                this.dataForm.updatetime = result.tContSubcontractApproval.updatetime
                this.dataForm.createuser = result.tContSubcontractApproval.createuser
                this.dataForm.updateuser = result.tContSubcontractApproval.updateuser
                this.dataForm.datastatus = result.tContSubcontractApproval.datastatus
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
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
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
      }
    }
  }
</script>
