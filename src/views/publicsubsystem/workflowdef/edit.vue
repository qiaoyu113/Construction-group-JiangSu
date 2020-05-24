
<template>
<el-dialog :title="formAction == 0 ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
  <t-form :model="model" ref="ruleForm"  @submit.native.prevent @keyup.enter.native="dataFormSubmit()" label-width="130px">
    <el-form-item label="标识" prop="key" verify :maxLength="255" class="is-required">
      <el-input v-model="model.key"></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name" verify :maxLength="255" class="is-required">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <el-form-item label="流程路径" prop="procInstStartUrl" verify :maxLength="200" class="is-required">
      <el-input v-model="model.procInstStartUrl"></el-input>
    </el-form-item>
    <el-form-item label="业务路由" prop="procInstRouteUrl" verify :maxLength="200" class="is-required">
      <el-input v-model="model.procInstRouteUrl"></el-input>
    </el-form-item>
    <el-form-item label="表单路由" prop="procInstViewUrl" verify :maxLength="200" class="is-required">
      <el-input v-model="model.procInstViewUrl"></el-input>
    </el-form-item>
    <el-form-item label="发起权限" prop="procInstStartRequiredPermissionId" can-be-empty verify :maxLength="200">
      <el-input v-model="model.procInstStartRequiredPermissionId"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="desc" verify can-be-empty :maxLength="200">
      <el-input type="textarea" v-model="model.desc"></el-input>
    </el-form-item>
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
      formAction: 0, //0 add,//1,edit
      visible: false,
      model: {
        "id": null,
        "key": null,
        "name": null,
        "desc": null,
        "gmtVersion": -1,
        "procInstStartUrl": null,
        "procInstRouteUrl": null,
        "procInstViewUrl": null,
        "procInstStartRequiredPermissionId": null,
      },
    };
  },
  created() {

  },
  activated() {},
  methods: {
    init(category,id) {
      this.resetData();
      this.visible = true;
      if (id) {
        let self = this;
        tapp.services.wf_Model.get(id).then(function(result) {
          self.$refs.ruleForm.clearValidate();
          self.model = self.$util.deepObjectAssign({},self.model,result);
          self.model.category = category;
          self.formAction = 1;
        });
      }else{
        this.model.category = category;
        this.formAction = 0;
        this.$nextTick(() => {
          this.$refs.ruleForm.clearValidate();
        })
      }
    },
    dataFormSubmit() {
      let self = this;
      self.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let model = self.model;
          tapp.services.wf_Model.save(model).then(function(result) {
            self.model = self.$util.deepObjectAssign({},self.model,result);
            self.formAction = 1;
            self.$notify.success({
              title: '操作成功',
              message: '保存成功！',
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
