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
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="fwaId" label="银行账号">
            <el-input readonly="true" v-model="dataForm.fwaId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="fwaId" label="开户行名称">
            <el-input readonly="true" v-model="dataForm.fwaId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="fwaId" label="开户网点">
            <el-input readonly="true" v-model="dataForm.fwaId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="fwaId" label="银行账户名称">
            <el-input readonly="true" v-model="dataForm.fwaId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="pId" label="项目名称">
            <el-input readonly="true" v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="pId" label="项目编号">
            <el-input readonly="true" v-model="dataForm.pId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="sign" label="经办人">
            <el-input v-model="dataForm.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="signTime" label="经办时间">
            <el-date-picker type="datetime" readonly="true" v-model="dataForm.signTime"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cancelTime" label="注销时间">
            <el-date-picker type="datetime" readonly="true" v-model="dataForm.cancelTime"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'附件上传'"></t-sub-title>
      <sj-upload ref="demo" :assetCategoryClassifications="assetCategoryClassifications" :businessDocId="docId"></sj-upload>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          bId: '',
          pId: '',
          fwaId: '',
          cancelTime: '',
          approvalStatus: '',
          sign: '',
          signTime: new Date(),
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
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
          fwaId: [
            { required: true, message: '农民工工资帐户开立id不能为空', trigger: 'blur' }
          ],
          cancelTime: [
            { required: true, message: '注销时间不能为空', trigger: 'blur' }
          ],

          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
          ],

        }
      }
    },
    created() {
      // this.init()
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.finaCancelFwaccounapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaCancelFwaccounapproval.bId
                this.dataForm.actTaskKey = result.finaCancelFwaccounapproval.actTaskKey
                this.dataForm.pId = result.finaCancelFwaccounapproval.pId
                this.dataForm.fwaId = result.finaCancelFwaccounapproval.fwaId
                this.dataForm.cancelTime = result.finaCancelFwaccounapproval.cancelTime
                this.dataForm.approvalStatus = result.finaCancelFwaccounapproval.approvalStatus
                this.dataForm.sign = result.finaCancelFwaccounapproval.sign
                this.dataForm.signTime = result.finaCancelFwaccounapproval.signTime
                this.dataForm.propose = result.finaCancelFwaccounapproval.propose
                this.dataForm.result = result.finaCancelFwaccounapproval.result
                this.dataForm.createtime = result.finaCancelFwaccounapproval.createtime
                this.dataForm.updatetime = result.finaCancelFwaccounapproval.updatetime
                this.dataForm.createuser = result.finaCancelFwaccounapproval.createuser
                this.dataForm.updateuser = result.finaCancelFwaccounapproval.updateuser
                this.dataForm.datastatus = result.finaCancelFwaccounapproval.datastatus
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
      doSave () {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = { ...self.dataForm };
          tapp.services.finaCancelFwaccounapproval.save(model).then(function(result) {
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
