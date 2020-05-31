<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目刻章申请</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">提交审批</el-button>
      <el-button type="primary" plain @click="dialogVisible = true">
                    <span style="display: flex;align-items:center;">
                      <v-icon name="sitemap"></v-icon>
                      <span style="margin-left: 5px;">审批流程图</span>
                    </span>
      </el-button>
      <el-dialog title="确定提交本次审批" :visible.sync="submitDialogVisible">
        <!-- businessKey值请修改当前流程的key值 -->
        <el-form ref="dialogForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="pType" label="用印类型：" class="is-required">
                <!-- <t-dic-dropdown-select dict_type="" v-model=""></t-dic-dropdown-select> -->
                <t-input v-model="pType" :readOnly="readOnly"></t-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="sealCount" label="用印数量：" class="is-required">
                <t-int-input v-model="sealCount" :readOnly="readOnly"></t-int-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button type="info" @click="submitDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-row :gutter="10" class="search-top-operate" v-if="isBackFill">
      <el-button type="primary" icon="el-icon-upload2" @click="doBackFillSave()">保存</el-button>
    </el-row>
    <!-- dialogVisible控制显示和隐藏的变量，需要在data函数中定义 -->
    <el-dialog title="项目刻章流程图" :visible.sync="dialogVisible" width="60%" center>
      <!-- businessKey为当前流程的key值 -->
      <t-workflow-map businessKey="t_pro_seal_approval_process"></t-workflow-map>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
    </el-dialog>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：" prop="pId">
            <t-project-select  placeholder="选择一个项目" v-model="dataForm.pName" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司：" prop="proSubCompany">
            <t-input v-model="dataForm.proSubCompany" :readOnly="true"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部：" prop="proBusDept">
            <t-input v-model="dataForm.proBusDept" :readOnly="true"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位：" prop="proConstructCompany">
            <t-input v-model="dataForm.proConstructCompany" :readOnly="true"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式：" prop="proContractAttr">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额：" prop="proTotalInvestment">
            <t-input v-model="dataForm.proTotalInvestment" :readOnly="true"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" disabled></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模：" prop="proBuildArea">
            <t-input v-model="dataForm.proBuildArea" :readOnly="true"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目章内容：" prop="sealContent">
            <t-input v-model="dataForm.sealContent" :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保管人：" prop="sealCustodian" :class="{'is-required': isBackFill}">
            <t-input v-model="dataForm.sealCustodian" :disabled="!isBackFill" placeholder="流程结束后回填"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="经办人：" prop="sign">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办时间：" prop="signTime">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <t-input type="textarea" :rows="2" v-model="dataForm.remark"  :readOnly="readOnly"></t-input>
          </el-form-item>
        </el-col>
      </el-row>
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
  import {
    mapMutations,
    mapState,
  } from 'vuex'
  export default {
    data () {
      var checkSealCustoDian = (rule, value, callback) => {
        if (this.isBackFill && (this.dataForm.sealCustodian == '' || this.dataForm.sealCustodian == undefined)) callback(new Error('保管人不能为空'));
        else callback();
      };
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        submitDialogVisible: false,
        isBackFill: false,
        pType: '',
        sealCount: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          sealContent: '',
          sealCustodian: '',
          remark: '',
          sign: '',
          signTime: '',
          approvalStatus: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          flag: '1',
          pName: '',
          conTotal: '',
          conBcxyTotal: ''
        },
        dataRule: {
          sealCustodian: [{validator: checkSealCustoDian, trigger: 'blur'}],
          pId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          sealContent: [
            {required: true, message: '项目章内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      const currentQuery = this.$route.query;
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly;
      this.showButton = !(currentQuery.readonly == 'true');
      this.isBackFill = currentQuery.status && (currentQuery.status == 1 || currentQuery.status == 2) ? true : false;
      this.init(currentQuery.businessId)
    },
    activated() {
      const currentQuery = this.$route.query;
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly;
      this.showButton = !(currentQuery.readonly == 'true')
      this.isBackFill = currentQuery.status && (currentQuery.status == 1 || currentQuery.status == 2) ? true : false;
      this.init(currentQuery.businessId)
    },
    computed: {
      navbarClasses() {
        let type = this.$store.state.ui.navbarLayoutType
        return [!/\S/.test(type) || type === 'default' ? '' : `site-navbar--${type}`]
      },
      ...mapState({
        path: state => state.route.path,
        user: state => state.app.user,
        notificationNum: state => state.ui.notificationNum,
        isLoading: state => state.ui.isLoading,
      }),
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init (id) {
        if (id) {
          this.dataForm.id = id || 0;
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields();
            if (this.dataForm.id) {
              let self = this;
              tapp.services.proSealApproval.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result);
                let params = {}
                if(/^\d$/.test(result.pId)) {
                  params = {
                    filters: {}, maxResultCount: 20, skipCount: 1, sorting: "id descending",
                    id: result.pId
                  } 
                } else {
                  params = {
                    filters: {}, maxResultCount: 20, skipCount: 1, sorting: "id descending",
                    proName: result.pId
                  } 
                }
                tapp.services.proInfo.getPagedList(params).then(_result => {
                  if(_result && _result.items && _result.items.length > 0) {
                    self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, _result.items[0])
                    self.dataForm.pName = self.dataForm.proName
                    self.dataForm.pId = self.dataForm.id
                  }
                })
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate()
            this.dataForm.sign = this.user.userDisplayName;
            this.dataForm.signTime = this.$util.datetimeFormat(moment())
          })
        }
      },
      getSelectedProject(project) {
        console.log('current project', project);
        this.dataForm.proSubCompany = project.proSubCompany;
        this.dataForm.proBusDept = project.proBusDept;
        this.dataForm.proConstructCompany = project.proConstructCompany;
        this.dataForm.proContractAttr = project.proContractAttr;
        this.dataForm.proTotalInvestment = project.proTotalInvestment;
        this.dataForm.proType = project.proType;
        this.dataForm.proRunMode = project.proRunMode;
        this.dataForm.proBuildArea = project.proBuildArea;
        this.dataForm.pName = project.proName;
        this.dataForm.pId = project.pId;
        this.dataForm.conTotal = project.conTotal;
        this.dataForm.conBcxyTotal = project.conBcxyTotal;
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          this.submitDialogVisible = true;
          // let model = {...self.dataForm}
          // tapp.services.proSealApproval.save(model).then(function (result) {
          //   self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
          //   self.$notify.success({
          //     title: '操作成功！',
          //     message: '保存成功！',
          //   })
          // })
        }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '保存失败！'
          })
          return false
        })
      },
      doBackFillSave() {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.proSealApproval.save(model).then(function (result) {
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！',
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
      submit()  {
        let self = this
        if(self.pType && self.sealCount) {
          let model = {...self.dataForm}
          tapp.services.proSealApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
            self.$notify.success({
              title: '操作成功！',
              message: '保存成功！',
            })
          })
          // 用印接口
          this.submitDialogVisible = false;
        } else {
          self.$notify.error({
            title: '错误',
            message: '请输入必填信息'
          })
        }
      },
    }
  }
</script>
