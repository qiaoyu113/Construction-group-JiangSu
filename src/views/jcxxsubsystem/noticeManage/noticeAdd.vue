<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">{{ title }}</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button v-if="isEdit" type="primary" plain icon="el-icon-arrow-left" @click="closeCurrentTabNav">返回</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="doSave()">保存</el-button>
      <el-button v-if="isEdit" type="primary" icon="el-icon-delete" @click="doDelete">删除</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'公告信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="noticeType" label="公告类型">
              <t-dic-dropdown-select dicType="notice_type" v-model="dataForm.noticeType"
                                     :readOnly="readOnly"></t-dic-dropdown-select>

            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="fromDept" label="发布部门">
              <el-input v-model="dataForm.fromDept"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="noticeTitle" label="公告标题">
              <el-input v-model="dataForm.noticeTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="noticeContent" label="公告内容">
              <t-input type="textarea" :rows="3" v-model="dataForm.noticeContent" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="remark" label="是否置顶">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.remark"
                                  :readOnly="readOnly"></t-dic-radio-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="timeLimit" label="有效期">
              <t-dic-dropdown-select dicType="time_limit" v-model="dataForm.timeLimit"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="createuser" label="发布人">
            <span>{{dataForm.createuser}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createtime" label="发布时间">
            <span>{{dataForm.createtime}}</span>
          </el-form-item>
        </el-col>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'附件上传'"></t-sub-title>
        <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications"
                   :businessDocId="docId"></sj-upload>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapState} from 'vuex'
  import baseView from '@/base/baseView'

  export default {
    extends: baseView,
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    watch: {
      isEdit: function (val) {
        if (val) {
          this.title = '公告更新'
        } else {
          this.title = '公告发布'
        }
        this.$util.ui.title(this.title)
      }
    },
    data () {
      return {
        title: '',
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        isEdit: false, // 是否是编辑状态
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
            {required: false, message: '有效期不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: false, message: '是否置顶不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created () {},
    activated () {
      this.$nextTick((_) => {
        if (this.routeChanged) {
          this.docId = this.$route.query.id
          this.init(this.docId)
        }
      })
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user
      })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
            if (this.dataForm.id) {
              tapp.services.tBaseinfoNotice.get(id).then(result => {
                this.isEdit = true
                this.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.noticeType = result.noticeType
                this.dataForm.fromDept = result.fromDept
                this.dataForm.noticeTitle = result.noticeTitle
                this.dataForm.noticeContent = result.noticeContent
                this.dataForm.timeLimit = result.timeLimit
                this.dataForm.remark = result.remark
                this.dataForm.createuser = result.createuser
                this.dataForm.updateuser = result.updateuser
                this.dataForm.datastatus = result.datastatus
                this.dataForm.createtime = result.createtime
                this.dataForm.updatetime = result.updatetime
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.isEdit = false
            this.dataForm.createuser = this.currentUser.userDisplayName
            this.dataForm.createtime = this.$util.datetimeFormat(moment())
            this.$refs.ruleForm.clearValidate()
            this.$refs['ruleForm'].resetFields()
          })
        }
      },
      doDelete () {
        let self = this
        self.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          tapp.services.tBaseinfoNotice.delete(self.dataForm.id).then(function (result) {
            self.closeCurrentTabNav()
            self.$notify.success({
              title: '系统成功',
              message: '删除成功！'
            })
          })
        })
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.tBaseinfoNotice.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！'
            })
          })
        }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '保存失败！'
          })
          return false
        })
      },
      // 关闭当前页面并跳转到新的页面
      closeCurrentTabNav () {
        this.$util.closeCurrentTabNav('noticeUpdate')
      }
    }
  }
</script>
