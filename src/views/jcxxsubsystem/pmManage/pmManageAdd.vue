<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-upload2" @click="doSave()">保存</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-row :gutter="20" class="page-title">
        <el-col>
          <div class="title">项目经理资质登记</div>
        </el-col>
      </el-row>
      <el-card shadow="never">
        <t-sub-title :title="'资质信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="name" label="项目经理">
              <t-manager-select placeholder="选择一个项目经理" v-model="dataForm.name"
                                @selectedManager="getSelectedManager"></t-manager-select>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属单位">
              <el-input v-model="dataForm.proSubCompany" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proContactway" label="联系方式">
              <el-input v-model="dataForm.proContactway" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="constructorLevel" label="建造师等级">
              <t-dic-dropdown-select dicType="constructor_level" v-model="dataForm.constructorLevel"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
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
            <el-form-item prop="proStatue" label="是否在建">
              <el-input v-model="dataForm.proStatue" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="safeB" label="累计项目合同额">
              <el-input v-model="dataForm.safeB" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="在建项目名称">
              <el-input v-model="dataForm.proName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="项目开工日期">
              <el-input v-model="dataForm.proRealStartDate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="项目合同额">
              <el-input v-model="dataForm.proWinAmount" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="在建项目名称">
              <el-input v-model="dataForm.proName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="项目开工日期">
              <el-input v-model="dataForm.proRealStartDate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="项目合同额">
              <el-input v-model="dataForm.proWinAmount" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="在建项目名称">
              <el-input v-model="dataForm.proName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="项目开工日期">
              <el-input v-model="dataForm.proRealStartDate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="safeB" label="项目合同额">
              <el-input v-model="dataForm.proWinAmount" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="remark" label="备注">
              <t-input type="textarea" :rows="3" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-col :span="8">
          <el-form-item prop="createuser" label="登记人">
            <span>{{dataForm.createuser}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createtime" label="登记时间">
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

  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        submitDialogVisible: false,
        dataForm: {
          pmId: '',
          constructorLevel: '',
          constructorCode: '',
          safeB: '',
          proContactway: '',
          proStatue: '',
          proName: '',
          proRealStartDate: '',
          proWinAmount: '',
          proSubCompany: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          name: ''
        },
        dataRule: {
          name: [
            {required: false, message: '项目经理不能为空', trigger: 'blur'}
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
        currentUser: state => state.app.user,
      })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["rule"].resetFields()
            if (this.dataForm.id) {
              let self = this
              tapp.services.tBaseinfoPmQualification.get(id).then(function (result) {
                slef.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
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
        console.log('this.dataForm', this.dataForm)
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
            title: '错误',
            message: '保存失败！'
          });
          return false;
        });
      },
      getSelectedManager(manager) {
        console.log('current charge', manager)
        this.dataForm.pmId = manager.id
        this.getUserWithDepartments(manager.id)
        this.dataForm.proContactway = manager.proContactway//联系方式
        this.dataForm.proStatue = manager.proStatue        //是否在建
        this.dataForm.CountProWinAmount = manager.CountProWinAmount  //累计项目合同额
        this.dataForm.proName = manager.proName            //在建项目名称
        this.dataForm.proRealStartDate = manager.proRealStartDate//项目开工日期
        this.dataForm.proWinAmount = manager.proWinAmount//项目合同额
        // tapp.services.proInfo.getPagedList().then(result => {
        //   console.log('result', result)
        // })
      },
      getUserWithDepartments(id) {
        tapp.services.base_User.getUserWithDepartments(id).then(result => {
          if(result) {
            console.log('result', result)
            this.dataForm.proSubCompany = result.departmentlist[0] && result.departmentlist[0].value ? result.departmentlist[0].value : '' 
          }
        })
      },
    }
  }
</script>
