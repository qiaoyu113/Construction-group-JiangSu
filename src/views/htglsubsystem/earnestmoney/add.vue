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
          <el-form-item prop="bId" label="项目名称:">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="actTaskKey" label="项目编号:">
            <el-input v-model="dataForm.actTaskKey" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pId" label="主合同名称：">
            <el-input v-model="dataForm.pId" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cId" label="主合同编号：">
            <el-input v-model="dataForm.cId" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="createtime" label="合同形式：">
            <t-dic-dropdown-select dicType="1260865980897300482" v-model="dataForm.unionCompany"
                                   readonly></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同开始日期：" prop="sign" verify class="is-required" :verify="validateEndTime">
            <t-datetime-picker v-model="dataForm.amountMoney" type="date" :readOnly="readOnly"></t-datetime-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同结束日期：" prop="sign" verify class="is-required" :verify="validateEndTime">
            <t-datetime-picker v-model="dataForm.sign" type="date" :readOnly="readOnly"></t-datetime-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="signTime" label="付款方式：">
            <t-dic-dropdown-select dicType="1260865577187151874" v-model="dataForm.signTime"
                                   readonly></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="propose" label="合同总额：">
            <el-input v-model="dataForm.propose" readonly></el-input>
            元
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="result" label="联营公司名称：">
            <el-input v-model="dataForm.result" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="合同保证金额：">
            <el-input v-model="dataForm.approvalStatus" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item prop="fromType" label="现金：">
            <el-input v-model="dataForm.fromType" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="createtime" label="房产：">
            <el-input v-model="dataForm.createtime" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="updatetime" label="其他合作协议的履行担保：">
            <el-input v-model="dataForm.updatetime" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="createuser" label="其他合同转：">
            <el-input v-model="dataForm.createuser" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bId" label="本次可退还合同保证金额：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item prop="bId" label="本次申请退还明细：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="bId" label="现金:">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="bId" label="房产(他项权)：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="bId" label="其他合作协议的履约担保：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="bId" label="其他合同转：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="bId" label="经办人：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bId" label="经办时间：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
         <!-- <el-form-item prop="bId" label="备注：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>-->
          <el-form-item prop="bId" verify can-be-empty :maxLength="200" label="备注：">
            <el-input type="textarea"></el-input>
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
  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          cId: '',
          unionCompany: '',
          amountMoney: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          approvalStatus: '',
          fromType: '',
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
            {required: true, message: '项目ID不能为空', trigger: 'blur'}
          ],
          cId: [
            {required: true, message: '主合同ID不能为空', trigger: 'blur'}
          ],
          unionCompany: [
            {required: true, message: '联营单位标识不能为空', trigger: 'blur'}
          ],
          amountMoney: [
            {required: true, message: '本次退还金额不能为空', trigger: 'blur'}
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
          approvalStatus: [
            {required: true, message: '审批状态（字典表）不能为空', trigger: 'blur'}
          ],
          fromType: [
            {required: true, message: '来源标示（字典表）（项目竣工、合同终止、合同注销、联营公司变更、合同保证金减少）不能为空', trigger: 'blur'}
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
              tapp.services.tContReturnDepositApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.tContReturnDepositApproval.bId
                this.dataForm.actTaskKey = result.tContReturnDepositApproval.actTaskKey
                this.dataForm.pId = result.tContReturnDepositApproval.pId
                this.dataForm.cId = result.tContReturnDepositApproval.cId
                this.dataForm.unionCompany = result.tContReturnDepositApproval.unionCompany
                this.dataForm.amountMoney = result.tContReturnDepositApproval.amountMoney
                this.dataForm.sign = result.tContReturnDepositApproval.sign
                this.dataForm.signTime = result.tContReturnDepositApproval.signTime
                this.dataForm.propose = result.tContReturnDepositApproval.propose
                this.dataForm.result = result.tContReturnDepositApproval.result
                this.dataForm.approvalStatus = result.tContReturnDepositApproval.approvalStatus
                this.dataForm.fromType = result.tContReturnDepositApproval.fromType
                this.dataForm.createtime = result.tContReturnDepositApproval.createtime
                this.dataForm.updatetime = result.tContReturnDepositApproval.updatetime
                this.dataForm.createuser = result.tContReturnDepositApproval.createuser
                this.dataForm.updateuser = result.tContReturnDepositApproval.updateuser
                this.dataForm.datastatus = result.tContReturnDepositApproval.datastatus
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
          tapp.services.tContReturnDepositApproval.save(model).then(function (result) {
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
