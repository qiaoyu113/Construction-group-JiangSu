<template>
  <div>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <t-sub-title :title="'项目经理资质更新列表'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pmId" label="项目经理唯一标识id">
            <el-input v-model="dataForm.pmId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="constructorLevel" label="姓名">
            <el-input v-model="dataForm.constructorLevel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="constructorLevel" label="建造师等级">
            <el-input v-model="dataForm.constructorLevel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="constructorCode" label="分公司">
            <el-input v-model="dataForm.constructorCode"></el-input>
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
          pmId: '',
          constructorLevel: '',
          constructorCode: '',
          safeB: '',
          remark: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          pmId: [
            {required: true, message: '项目经理唯一标识id不能为空', trigger: 'blur'}
          ],
          constructorLevel: [
            {required: true, message: '建造师等级（字典表）不能为空', trigger: 'blur'}
          ],
          constructorCode: [
            {required: true, message: '建造师证书编号不能为空', trigger: 'blur'}
          ],
          safeB: [
            {required: true, message: '安全B证不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '备注不能为空', trigger: 'blur'}
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
              tapp.services.tBaseinfoPmQualification.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.pmId = result.tBaseinfoPmQualification.pmId
                this.dataForm.constructorLevel = result.tBaseinfoPmQualification.constructorLevel
                this.dataForm.constructorCode = result.tBaseinfoPmQualification.constructorCode
                this.dataForm.safeB = result.tBaseinfoPmQualification.safeB
                this.dataForm.remark = result.tBaseinfoPmQualification.remark
                this.dataForm.createtime = result.tBaseinfoPmQualification.createtime
                this.dataForm.updatetime = result.tBaseinfoPmQualification.updatetime
                this.dataForm.createuser = result.tBaseinfoPmQualification.createuser
                this.dataForm.updateuser = result.tBaseinfoPmQualification.updateuser
                this.dataForm.datastatus = result.tBaseinfoPmQualification.datastatus
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
          tapp.services.tBaseinfoPmQualification.save(model).then(function (result) {
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

