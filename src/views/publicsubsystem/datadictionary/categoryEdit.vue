
<template>
<el-dialog :title="(formAction == 0 ? '新增子项' : '修改') + '-' + parentCategoryName" :close-on-click-modal="false" :visible.sync="visible">
  <t-form :model="model" ref="ruleForm"  @submit.native.prevent @keyup.enter.native="dataFormSubmit()" label-width="80px">

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="编码" prop="id">
          <t-input v-model="model.id" :readOnly="true"></t-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="名称" prop="name" verify :maxLength="32" class="is-required">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="备注" prop="remark" verify can-be-empty :maxLength="200">
          <el-input type="textarea" v-model="model.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </t-form>
  <span slot="footer" class="dialog-footer">
      <el-button  type="primary" @click="dataFormSubmit()">确定</el-button>
      <el-button  @click="visible = false">取消</el-button>
    </span>
</el-dialog>
</template>

<script>
import baseComponent from '@/base/baseComponent'
export default {
  extends: baseComponent,
  data() {
    return {
      parentCategoryName: '',
      formAction: 0, //0 add,//1,edit
      visible: false,
      model: {
        "id": null,
        "gmtVersion": -1,
        "name": null,
        "visible": null,
        "nodeType": null,
        "remark": null
      },
    };
  },
  created() {

  },
  activated() {},
  methods: {
    new(id, name) {

      this.resetData();

      this.visible = true;
      this.formAction = 0;
      this.parentCategoryName = name;
      this.model.parentId = id;
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    edit(id, name) {
      this.resetData();
      this.visible = true;
      this.formAction = 1;
      this.parentCategoryName = name;
      let self = this;
      tapp.services.base_DataDictionary.getCategory(id).then(function(result) {
        self.$refs.ruleForm.clearValidate();
        self.model = self.$util.deepObjectAssign({}, self.model, result);
      });
    },
    dataFormSubmit() {
      let self = this;
      self.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let model = self.model;
          tapp.services.base_DataDictionary.saveCategory(model).then(function(result) {
            self.model = self.$util.deepObjectAssign({}, self.model, result);
            self.formAction = 1;
            self.$notify.success({
              title: '操作成功',
              message: '保存成功，注销后重新登陆系统后修改生效！',
              duration: 1500,
              onClose: () => {
                self.visible = false;
                self.$emit('change');
              }
            });
          });

        } else {
          self.$notify.error({
            title: '错误',
            message: '系统输入验证失败！'
          });
          return false;
        }
      });
    },
  }
}
</script>
