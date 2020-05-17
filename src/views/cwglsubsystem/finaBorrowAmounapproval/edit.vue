<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="success" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="pId" label="项目名称">
            <el-input v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="项目编号">
            <el-input :readonly="true" v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pId" label="所属单位">
            <el-input :readonly="true" v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="totalBorrowCount" label="累计借款次数">
            <el-input :readonly="true" v-model="dataForm.totalBorrowCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="totalBorrowAmount" label="累计借款金额">
            <el-input :readonly="true" v-model="dataForm.totalBorrowAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="applyAmount" label="本次申请额度">
            <el-input v-model="dataForm.applyAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="tiimeLimit" label="本次借款额度期限">
            <el-input :readonly="true" v-model="dataForm.tiimeLimit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="realAmount" label="确认借款额度">
            <el-input :readonly="true" placeholder="审批完成后填写确认可借款额度" v-model="dataForm.realAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="borrowDate" label="借款日期">
            <el-input :readonly="true" placeholder="审批完成后填写" v-model="dataForm.borrowDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="sign" label="经办人">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="signTime" label="经办时间">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="remark" label="借款原因">
            <el-input type="textarea" v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import moment from "moment";
  import {mapState} from "vuex";

  export default {
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',actTaskKey: '',pId: '',applyAmount: '',tiimeLimit: '',totalBorrowCount: '',totalBorrowAmount: '',
          realAmount: '',borrowDate: '',approvalStatus: '',sign: '',signTime: '',propose: '',result: '',
          createtime: '',updatetime: '',createuser: '',updateuser: '',datastatus: ''                                                                                        },
        dataRule: {
          bId: [
            { required: true, message: '业务id用于和一个流程实例绑定不能为空', trigger: 'blur' }
          ],
          actTaskKey: [
            { required: true, message: 'activiti执行任务key不能为空', trigger: 'blur' }
          ],
          pId: [
            { required: true, message: '项目id不能为空', trigger: 'blur' }
          ],
          applyAmount: [
            { required: true, message: '本次申请额度不能为空', trigger: 'blur' }
          ],
          tiimeLimit: [
            { required: true, message: '本次借款期限（月）不能为空', trigger: 'blur' }
          ],
          totalBorrowCount: [
            { required: true, message: '累计借款次数不能为空', trigger: 'blur' }
          ],
          totalBorrowAmount: [
            { required: true, message: '累计借款金额不能为空', trigger: 'blur' }
          ],
          realAmount: [
            { required: true, message: '确认借款额度不能为空', trigger: 'blur' }
          ],
          borrowDate: [
            { required: true, message: '借款日期不能为空', trigger: 'blur' }
          ],

          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '借款原因不能为空', trigger: 'blur' }
          ],

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
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.finaBorrowAmounapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaBorrowAmounapproval.bId
                this.dataForm.actTaskKey = result.finaBorrowAmounapproval.actTaskKey
                this.dataForm.pId = result.finaBorrowAmounapproval.pId
                this.dataForm.applyAmount = result.finaBorrowAmounapproval.applyAmount
                this.dataForm.tiimeLimit = result.finaBorrowAmounapproval.tiimeLimit
                this.dataForm.totalBorrowCount = result.finaBorrowAmounapproval.totalBorrowCount
                this.dataForm.totalBorrowAmount = result.finaBorrowAmounapproval.totalBorrowAmount
                this.dataForm.realAmount = result.finaBorrowAmounapproval.realAmount
                this.dataForm.borrowDate = result.finaBorrowAmounapproval.borrowDate
                this.dataForm.approvalStatus = result.finaBorrowAmounapproval.approvalStatus
                this.dataForm.sign = result.finaBorrowAmounapproval.sign
                this.dataForm.signTime = result.finaBorrowAmounapproval.signTime
                this.dataForm.propose = result.finaBorrowAmounapproval.propose
                this.dataForm.result = result.finaBorrowAmounapproval.result
                this.dataForm.createtime = result.finaBorrowAmounapproval.createtime
                this.dataForm.updatetime = result.finaBorrowAmounapproval.updatetime
                this.dataForm.createuser = result.finaBorrowAmounapproval.createuser
                this.dataForm.updateuser = result.finaBorrowAmounapproval.updateuser
                this.dataForm.datastatus = result.finaBorrowAmounapproval.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate()
            this.dataForm.sign = this.currentUser.userDisplayName
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
          })
        }
      },
      // 表单提交
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaBorrowAmounapproval.save(model).then(function(result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: "操作成功！",
              message: "保存成功！",
            });
          });
        }).catch(function(e) {
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
