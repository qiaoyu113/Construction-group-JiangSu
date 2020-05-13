<template>
  <div>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <t-sub-title :title="'公告更新列表'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="noticeType" label="公告类型">
            <el-input v-model="dataForm.noticeType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="noticeTitle" label="公告标题">
            <el-input v-model="dataForm.noticeTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="noticeContent" label="公告内容">
            <el-input v-model="dataForm.noticeContent"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
          noticeType: '',
          fromDept: '',
          noticeTitle: '',
          noticeContent: '',
          timeLimit: '',
          remark: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          createtime: '',
          updatetime: ''
        },
        dataRule: {
          noticeType: [
            {required: true, message: '公告类型（字典表）不能为空', trigger: 'blur'}
          ],
          fromDept: [
            {required: true, message: '发布部门不能为空', trigger: 'blur'}
          ],
          noticeTitle: [
            {required: true, message: '公告标题不能为空', trigger: 'blur'}
          ],
          noticeContent: [
            {required: true, message: '公告内容不能为空', trigger: 'blur'}
          ],
          timeLimit: [
            {required: true, message: '有效期（字典表）不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '是否置顶（字典表）不能为空', trigger: 'blur'}
          ],
          createuser: [
            {required: true, message: '创建人不能为空', trigger: 'blur'}
          ],
          updateuser: [
            {required: true, message: '更新人不能为空', trigger: 'blur'}
          ],
          datastatus: [
            {required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur'}
          ],
          createtime: [
            {required: true, message: '创建时间不能为空', trigger: 'blur'}
          ],
          updatetime: [
            {required: true, message: '更新时间不能为空', trigger: 'blur'}
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
              tapp.services.tBaseinfoNotice.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.noticeType = result.tBaseinfoNotice.noticeType
                this.dataForm.fromDept = result.tBaseinfoNotice.fromDept
                this.dataForm.noticeTitle = result.tBaseinfoNotice.noticeTitle
                this.dataForm.noticeContent = result.tBaseinfoNotice.noticeContent
                this.dataForm.timeLimit = result.tBaseinfoNotice.timeLimit
                this.dataForm.remark = result.tBaseinfoNotice.remark
                this.dataForm.createuser = result.tBaseinfoNotice.createuser
                this.dataForm.updateuser = result.tBaseinfoNotice.updateuser
                this.dataForm.datastatus = result.tBaseinfoNotice.datastatus
                this.dataForm.createtime = result.tBaseinfoNotice.createtime
                this.dataForm.updatetime = result.tBaseinfoNotice.updatetime
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
          tapp.services.tBaseinfoNotice.save(model).then(function (result) {
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
