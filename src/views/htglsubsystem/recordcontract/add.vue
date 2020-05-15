<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="success" @click="doSave()">
        保存
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <t-sub-title :title="'备案合同登记'"></t-sub-title>
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
          <el-form-item prop="bId" label="是否与主合同一致：">
            <el-input v-model="dataForm.bId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <t-sub-title :title="'项目基本信息'"></t-sub-title>
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
          <el-form-item prop="conStartDate" label="所属分公司：">
            <el-input v-model="dataForm.conStartDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conEndDate" label="所属事业部：">
            <el-input v-model="dataForm.conEndDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conSigningDate" label="实施主体：">
            <el-input v-model="dataForm.conSigningDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conPayWay" label="计划开工日期：">
            <el-input v-model="dataForm.conPayWay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="otherPayWay" label="计划完工日期：">
            <el-input v-model="dataForm.otherPayWay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conTotal" label="工程工期：">
            <el-input v-model="dataForm.conTotal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conSelfProportion" label="经营方式：">
            <el-input v-model="dataForm.conSelfProportion"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conOtherProportion" label="联营单位管理费：">
            <el-input v-model="dataForm.conOtherProportion"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conPayStandard" label="项目净利润承诺超：">
            <el-input v-model="dataForm.conPayStandard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conStatus" label="公司负责人：">
            <el-input v-model="dataForm.conStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="approvalStatus" label="联营公司名称：">
            <el-input v-model="dataForm.approvalStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sign" label="联系人：">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="联系方式：">
            <el-input v-model="dataForm.signTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="总合同额：">
            <el-input v-model="dataForm.signTime"></el-input>万元
          </el-form-item>
        </el-col>
      </el-row>
      <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
               label-width="120px" label-position="right"></el-form>
      <t-sub-title :title="'备案合同基本信息'"></t-sub-title>
      <el-col :span="8">
        <el-form-item prop="propose" label="备案合同名称：">
          <el-input v-model="dataForm.propose"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="result" label="备案合同编号：">
          <el-input v-model="dataForm.result"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="createtime" label="合同形式：">
          <el-input v-model="dataForm.createtime"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="updatetime" label="合同开始日期: ">
          <el-input v-model="dataForm.updatetime"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="createuser" label="合同结束日期：">
          <el-input v-model="dataForm.createuser"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="updateuser" label="甲方单位：">
          <el-input v-model="dataForm.updateuser"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="签订人：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="开户行名称：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="银行账户名称：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="银行账号：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="联系方式：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="地址：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item prop="updateuser" label="乙方单位：">
          <el-input v-model="dataForm.updateuser"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="签订人：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="开户行名称：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="银行账户名称：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="银行账号：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="联系方式：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="地址：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item prop="datastatus" label="签订日期：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item prop="datastatus" label="付款方式：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item prop="datastatus" label="备案合同额：">
          <el-input v-model="dataForm.datastatus"></el-input>万元
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="金额大写：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item prop="datastatus" label="自营占比：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="合同额：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="联营占比：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="datastatus" label="合同额：">
          <el-input v-model="dataForm.datastatus"></el-input>
        </el-form-item>
      </el-col>
      <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
               label-width="120px" label-position="right"></el-form>
      <t-sub-title :title="'合同保收款条件'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="datastatus">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload>
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
          datastatus: ''
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
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tContBranchInfo.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.pId = result.tContBranchInfo.pId
                this.dataForm.cId = result.tContBranchInfo.cId
                this.dataForm.conCode = result.tContBranchInfo.conCode
                this.dataForm.conName = result.tContBranchInfo.conName
                this.dataForm.conModality = result.tContBranchInfo.conModality
                this.dataForm.conStartDate = result.tContBranchInfo.conStartDate
                this.dataForm.conEndDate = result.tContBranchInfo.conEndDate
                this.dataForm.conSigningDate = result.tContBranchInfo.conSigningDate
                this.dataForm.conPayWay = result.tContBranchInfo.conPayWay
                this.dataForm.otherPayWay = result.tContBranchInfo.otherPayWay
                this.dataForm.conTotal = result.tContBranchInfo.conTotal
                this.dataForm.conSelfProportion = result.tContBranchInfo.conSelfProportion
                this.dataForm.conOtherProportion = result.tContBranchInfo.conOtherProportion
                this.dataForm.conPayStandard = result.tContBranchInfo.conPayStandard
                this.dataForm.createtime = result.tContBranchInfo.createtime
                this.dataForm.updatetime = result.tContBranchInfo.updatetime
                this.dataForm.createuser = result.tContBranchInfo.createuser
                this.dataForm.updateuser = result.tContBranchInfo.updateuser
                this.dataForm.datastatus = result.tContBranchInfo.datastatus
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
      }
    }
  }
</script>
