
<template>
<el-dialog title="修改密码" :visible.sync="visible" :append-to-body="true">
  <t-form :model="model" ref="ruleForm"  @submit.native.prevent @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="姓名">
      <span>{{ model.name }}</span>
    </el-form-item>
    <el-form-item label="账号">
      <span>{{ model.loginId }}</span>
    </el-form-item>
    <el-form-item label="原密码" prop="oldPassword" :maxLength="128" class="is-required">
      <el-input type="password" v-model="model.oldPassword"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword" :maxLength="128" class="is-required">
      <el-input type="password" v-model="model.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmNewPassword" :maxLength="128" class="is-required">
      <el-input type="password" v-model="model.confirmNewPassword"></el-input>
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
        id: null,
        name: null,
        loginId: null,
        oldPassword: '',
        confirmNewPassword: '',
        newPassword: '',
        "gmtVersion": -1,
      },
    }
  },
  created() {},
  activated() {

  },
  computed: {
    ...mapState({
      user: state => state.app.user,
    }),
  },
  methods: {
    // 初始化
    init() {
      this.resetData();
      this.model.id = this.user.userId;
      this.model.name = this.user.userDisplayName;
      this.model.loginId = this.user.userLoginId;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },

    dataFormSubmit() {
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!(.)\1{5}).{6,16}$/.test(this.model.newPassword))) {
        this.$notify.error({
          title: '系统输入验证失败',
          message: '新密码强度弱，长度必须在6位和16位数之间，包含字母数字！'
        });
        return;
      }
      if (this.model.newPassword !== this.model.confirmNewPassword) {
        this.$notify.error({
          title: '系统输入验证失败',
          message: '确认新密码与新密码不一致！'
        });
        return;

      }
      let self = this;
      self.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          tapp.services.base_User.changePassword(self.model).then(function(result) {
            self.$notify.success({
              title: '操作成功！',
              message: '修改密码成功！',
              onClose: function() {
                self.visible = false;
                self.$store.commit('loginOut');
                window.location.href = window.SITE_CONFIG['domain'] + 'login';
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
