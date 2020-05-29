<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="success" @click="doSave()">
        保存
      </el-button>
      <el-button type="primary" @click="">
        删除
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'文件信息上传'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="conName" label="主合同名称">
            <t-project-select placeholder="选择项目信息" v-model="dataForm.conName" @selectedProject="getSelectedProject"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="conCode" label="主合同编号：">
            <el-input v-model="dataForm.conCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="sign" label="填报人：">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="填报日期：">
             <span>{{dataForm.signTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <el-card shadow="never">
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload></el-card>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          relationId: '',
          bkId: '',
          filePath: '',
          fileSaveName: '',
          fileName: '',
          fileSuffixName: '',
          fileSpecialAttr: '',
          fileBusinessType: '',
          relationPId: '',
          isInvalid: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          sign: '',
          signTime: '',
          conName: '',
          conCode: '',
        },
        dataRule: {
          conCode: [
            {required: true, message: '项目编码不能为空', trigger: 'blur'}
          ],
          conName: [
            {required: true, message: '合同名称不能为空', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '填报人不能为空', trigger: 'blur'}
          ],
          signTime: [
            {required: true, message: '填报日期不能为空', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,
      })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tFileInfo.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.relationId = result.tFileInfo.relationId
                this.dataForm.bkId = result.tFileInfo.bkId
                this.dataForm.filePath = result.tFileInfo.filePath
                this.dataForm.fileSaveName = result.tFileInfo.fileSaveName
                this.dataForm.fileName = result.tFileInfo.fileName
                this.dataForm.fileSuffixName = result.tFileInfo.fileSuffixName
                this.dataForm.fileSpecialAttr = result.tFileInfo.fileSpecialAttr
                this.dataForm.fileBusinessType = result.tFileInfo.fileBusinessType
                this.dataForm.relationPId = result.tFileInfo.relationPId
                this.dataForm.isInvalid = result.tFileInfo.isInvalid
                this.dataForm.createtime = result.tFileInfo.createtime
                this.dataForm.updatetime = result.tFileInfo.updatetime
                this.dataForm.createuser = result.tFileInfo.createuser
                this.dataForm.updateuser = result.tFileInfo.updateuser
                this.dataForm.datastatus = result.tFileInfo.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate()
          })
        }
      },
      getSelectedProject(project) {
        console.log('current project', project);
        console.log('current project', project.cId);
        console.log('current project', project.conName);
        console.log('current project', project.conCode);
        this.dataForm.conName = project.conName;
        this.dataForm.conCode = project.conCode;
        this.dataForm.relationId = project.cId;
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.tFileInfo.save(model).then(function (result) {
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
