<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">过程文件审批</div>
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
    </el-row>
    <!-- dialogVisible控制显示和隐藏的变量，需要在data函数中定义 -->
    <el-dialog title="过程文件审批流程图" :visible.sync="dialogVisible" width="60%" center>
      <!-- businessKey为当前流程的key值 -->
      <t-workflow-map businessKey="t_pro_process_file_approval_process_jyb" v-if="dataForm.processBranch === 'sales_dept'"></t-workflow-map>
      <t-workflow-map businessKey="t_pro_process_file_approval_process_zab" v-if="dataForm.processBranch === 'za_dept'"></t-workflow-map>
      <t-workflow-map businessKey="t_pro_process_file_approval_process_hwb" v-if="dataForm.processBranch === 'overseas_dept'"></t-workflow-map>
      <t-workflow-map businessKey="t_pro_process_file_approval_process_all" v-if="dataForm.processBranch === 'all_dept'"></t-workflow-map>
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
            <t-project-select  placeholder="选择一个项目" v-model="dataForm.pId" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分公司：" prop="proSubCompany">
            <el-input v-model="dataForm.proSubCompany" :readOnly="readOnly" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属事业部：" prop="proBusDept">
            <el-input v-model="dataForm.proBusDept" :readOnly="readOnly" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位：" prop="proConstructCompany">
            <el-input v-model="dataForm.proConstructCompany" :readOnly="readOnly" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同模式：" prop="proContractAttr">
            <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资金额：" prop="proTotalInvestment">
            <el-input v-model="dataForm.proTotalInvestment" :readOnly="readOnly" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工程类别：" prop="proType">
            <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营方式：" prop="proRunMode">
            <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模：" prop="proBuildArea">
            <el-input v-model="dataForm.proBuildArea" :readOnly="readOnly" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'办理信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="processFileType" label="文件类型：">
            <t-dic-dropdown-select dicType="file_type" v-model="dataForm.processFileType" :readOnly="readOnly"></t-dic-dropdown-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="processBranch" label="流程选择：">
            <t-dic-dropdown-select :dataisgood="processBranchList" v-model="dataForm.processBranch" :readOnly="readOnly"></t-dic-dropdown-select>
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
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :rows="2" v-model="dataForm.remark" :readOnly="readOnly"></el-input>
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
  import { mapState } from 'vuex'
  export default {
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      },
    },
    data () {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        // 需要再定义一个流程类别的数组 对应 海外项目
        processBranchList:[{ id: 'sales_dept', name: ' 经经营部' }, { id: 'za_dept', name: '经质安部' }, { id: 'all_dept', name: '全流程（所有部门可选）' }],
        docId: '',
        showButton:true,
        readOnly: false,
        dialogVisible: false,
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          processFileType: '',
          processBranch: 'sales_dept',
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
          pId: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          processFileType: [
            {required: true, message: '文件类型不能为空', trigger: 'blur'}
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
      ...mapState({
        currentUser: state => state.app.user,  })
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
              tapp.services.proProcessFileApproval.get(id).then(function (result) {
                console.log('result', result);
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result);
                let params = {
                  filters: {},
                  maxResultCount: 20,
                  skipCount: 1,
                  sorting: "id descending",
                  id: result.pId
                };
                tapp.services.proInfo.getPagedList(params).then(_result => {
                  console.log('_result', _result)
                  if(_result && _result.items && _result.items.length > 0) self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, _result.items[0])
                })
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
        this.dataForm.conTotal = project.conTotal;
        this.dataForm.conBcxyTotal = project.conBcxyTotal;
      },
      // 表单提交
      doSave () {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.proProcessFileApproval.save(model).then(function (result) {
            self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result)
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
      }
    }
  }
</script>
