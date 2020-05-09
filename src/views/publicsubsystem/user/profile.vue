
<template>
<el-dialog title="个人信息" :visible.sync="visible" :append-to-body="true">
  <t-form :model="model" ref="ruleForm"  @submit.native.prevent @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="姓名" prop="name" verify :maxLength="50" class="is-required">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <el-form-item label="登陆名" prop="loginId" verify :maxLength="50" class="is-required">
      <el-input v-model="model.loginId"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" verify can-be-empty :maxLength="45">
      <el-input v-model="model.email"></el-input>
    </el-form-item>
    <el-form-item prop="mobile" label="手机" verify can-be-empty :maxLength="45">
      <el-input v-model="model.mobile"></el-input>
    </el-form-item>
    <el-form-item label="微信" prop="weixin" verify can-be-empty :maxLength="50">
      <el-input v-model="model.weixin"></el-input>
    </el-form-item>
  </t-form>
  <span slot="footer" class="dialog-footer">
      <el-button  type="primary" @click="dataFormSubmit()">确定</el-button>
      <el-button  @click="visible = false">取消</el-button>
    </span>
</el-dialog>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'

import baseComponent from '@/base/baseComponent'
export default {
  extends: baseComponent,
  data() {
    return {
      visible: false,
      model: {
        "id": null,
        "gmtVersion": -1,
        "loginId": null,
        "loginPassword": null,
        "name": null,
        "mobile": null,
        "email": null,
        "activited": null,
        "lastLoginTime": null,
        "shouldChangePassword": null,
        "roleIds": [],
        "lowerCaseLoginId": null
      },
    }
  },
  created() {

  },
  computed: {
    ...mapState({
      user: state => state.app.user,
    }),
  },
  activated() {

  },
  methods: {
    // 初始化
    init() {
      this.resetData();
      this.visible = true
      let self = this;
      tapp.services.base_User.getUser(this.user.userId).then(function(result) {
        self.model = self.$util.deepObjectAssign({},self.model,result);
        self.$refs.ruleForm.clearValidate();
      });
    },
    dataFormSubmit(formName) {
      let self = this;
      self.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          tapp.services.base_User.modifyMyProfile(self.model).then(function(result) {
            self.$store.commit('profile', {
              userId: self.model.id,
              userLoginId: self.model.loginId,
              userDisplayName: self.model.name,
              userMobile: self.model.mobile,
            });

            self.$notify.success({
              title: '操作成功！',
              message: '修改个人信息成功！',
              onClose: function() {
                self.visible = false;
              }
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
  }
}
</script>
