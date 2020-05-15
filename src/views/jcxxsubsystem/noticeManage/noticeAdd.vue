<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="success" @click="doSave()">
        保存
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <t-sub-title :title="'公告信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="noticeType" label="公告类型">
            <t-dic-dropdown-select dicType="1260861375056580609" v-model="dataForm.noticeType"
                                   :readOnly="readOnly"></t-dic-dropdown-select>

          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item prop="fromDept" label="发布部门">
            <el-input v-model="dataForm.fromDept"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item prop="noticeTitle" label="公告标题">
            <el-input v-model="dataForm.noticeTitle" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item prop="noticeContent" label="公告内容">
            <el-input v-model="dataForm.noticeContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="remark" label="是否置顶">
            <t-dic-radio-select dicType="1260860975985332225" v-model="dataForm.remark"
                                :readOnly="readOnly"></t-dic-radio-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="timeLimit" label="有效期">
            <t-dic-dropdown-select dicType="1260861490588684289" v-model="dataForm.timeLimit" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-col :span="8">
        <el-form-item prop="createuser" label="登记人">
          <el-input v-model="dataForm.createuser"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="createtime" label="登记时间">
          <el-input v-model="dataForm.createtime"></el-input>
        </el-form-item>
      </el-col>
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                 :businessDocId="docId"></sj-upload>
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
            {required: true, message: '公告类型不能为空', trigger: 'blur'}
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
            {required: true, message: '有效期不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '是否置顶不能为空', trigger: 'blur'}
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
       this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })
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
            this.dataForm.createuser = this.currentUser.userDisplayName
            this.dataForm.createtime = this.$util.datetimeFormat(moment())
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
