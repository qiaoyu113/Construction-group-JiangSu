<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button type="success" @click="doSave()">
        保存
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()"
             label-width="120px" label-position="right">
      <t-sub-title :title="'项目经理资质登记'"></t-sub-title>
      <t-sub-title :title="'资质信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="pmId" label="项目经理">
            <el-input v-model="dataForm.pmId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="pmId" label="所属单位">
            <el-input v-model="dataForm.pmId" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="constructorLevel" label="联系方式">
            <el-input v-model="dataForm.constructorLevel" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="constructorLevel" label="建造师登记">
            <el-input v-model="dataForm.constructorLevel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="constructorCode" label="建造师证书编号">
            <el-input v-model="dataForm.constructorCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="安全B证">
            <el-input v-model="dataForm.safeB"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="是否在建">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item prop="safeB" label="累计项目合同额">
            <el-input v-model="dataForm.safeB" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="在建项目名称">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="项目开工日期">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="项目合同额">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="在建项目名称">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="项目开工日期">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="项目合同额">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="在建项目名称">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="项目开工日期">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="safeB" label="项目合同额">
            <el-input v-model="dataForm.safeB" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item prop="remark" label="备注" >
            <t-input type="textarea" :rows="3" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-col :span="8">
        <el-form-item prop="createuser" label="登记人" >
          <span>{{dataForm.createuser}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="createtime" label="登记时间" >
          <span>{{dataForm.createtime}}</span>
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
          pmId: '',
          constructorLevel: '',
          constructorCode: '',
          safeB: '',
          remark: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          pmId: [
            {required: false, message: '项目经理唯一标识id不能为空', trigger: 'blur'}
          ],
          constructorLevel: [
            {required: false, message: '建造师等级（字典表）不能为空', trigger: 'blur'}
          ],
          constructorCode: [
            {required: false, message: '建造师证书编号不能为空', trigger: 'blur'}
          ],
          safeB: [
            {required: false, message: '安全B证不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: false, message: '备注不能为空', trigger: 'blur'}
          ],
          createtime: [
            {required: false, message: '创建时间不能为空', trigger: 'blur'}
          ],
          updatetime: [
            {required: false, message: '更新时间不能为空', trigger: 'blur'}
          ],
          createuser: [
            {required: false, message: '创建人不能为空', trigger: 'blur'}
          ],
          updateuser: [
            {required: false, message: '更新人不能为空', trigger: 'blur'}
          ],
          datastatus: [
            {required: false, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
   this.init()
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,  })},
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.tBaseinfoPmQualification.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.pmId = result.tBaseinfoPmQualification.pmId
                this.dataForm.constructorLevel = result.tBaseinfoPmQualification.constructorLevel
                this.dataForm.constructorCode = result.tBaseinfoPmQualification.constructorCode
                this.dataForm.safeB = result.tBaseinfoPmQualification.safeB
                this.dataForm.remark = result.tBaseinfoPmQualification.remark
                this.dataForm.createtime = result.tBaseinfoPmQualification.createtime
                this.dataForm.updatetime = result.tBaseinfoPmQualification.updatetime
                this.dataForm.createuser = result.tBaseinfoPmQualification.createuser
                this.dataForm.updateuser = result.tBaseinfoPmQualification.updateuser
                this.dataForm.datastatus = result.tBaseinfoPmQualification.datastatus
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
          tapp.services.tBaseinfoPmQualification.save(model).then(function (result) {
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
