
<template>
<t-form :model="model" ref="ruleForm"  @submit.native.prevent @keyup.enter.native="dataFormSubmit()" label-width="300px">
  <el-form-item label="列表每页行数" prop="Paged_List_Per_Page_Size" verify class="is-required">
    <t-int-input v-model="model.Paged_List_Per_Page_Size"></t-int-input>
  </el-form-item>
  <el-form-item label="允许上传的文件类型" prop="Attachment_Accept_Extensions" verify :maxLength="200" class="is-required">
    <el-input v-model="model.Attachment_Accept_Extensions"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button  type="primary" @click="dataFormSubmit()">确定</el-button>
    <el-button  @click="doReset()">重置</el-button>
  </el-form-item>

</t-form>
</template>

<script>
import baseView from '@/base/baseView'
export default {
  extends: baseView,
  data() {
    return {
      model: { 
      },
    }
  },
  created() {
    this.model = tapp.data.base_setting.reduce(function(result, item, index, array) {
      result[item.id] = item.value;
      return result;
    }, {});
  },
  activated() {

  },
  methods: {
    dataFormSubmit() {
      let self = this;
      self.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let listValues = [];

          for (var mk in self.model) {
            listValues.push({
              id: mk,
              value: self.model[mk]
            });
          }
          tapp.services.base_Setting.saveList(listValues).then(function(result) {
            self.$notify.success({
              title: '操作成功！',
              message: '修改成功，注销后重新登陆系统后配置生效！',
            });
          });
        } else {
          this.$notify.error({
            title: '错误',
            message: '系统输入验证失败！'
          });
          return false;
        }
      });
    },
    doReset() {
      this.$refs['ruleForm'].clearValidate();
    }
  }
}
</script>
