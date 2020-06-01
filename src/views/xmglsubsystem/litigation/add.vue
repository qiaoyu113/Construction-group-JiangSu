<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目诉讼登记</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-bell" @click="doSave()">保存并通知</el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-operation" @click="dialogVisible = true">
        通知流程图
      </el-button>
    </el-row>
    <!-- dialogVisible控制显示和隐藏的变量，需要在data函数中定义 -->
    <el-dialog title="项目诉讼资金冻结流程" :visible.sync="dialogVisible" width="60%" center>
      <!-- businessKey为当前流程的key值 -->
      <t-workflow-map businessKey="t_pro_litigation_process"></t-workflow-map>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
    </el-dialog>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="140px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称：" prop="pName">
              <t-project-select placeholder="选择一个项目" v-model="dataForm.pName" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分公司：" prop="proSubCompany">
              <t-input v-model="dataForm.proSubCompany" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属事业部：" prop="proBusDept">
              <t-input v-model="dataForm.proBusDept" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建设单位：" prop="proConstructCompany">
              <t-input v-model="dataForm.proConstructCompany" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同模式：" prop="proContractAttr">
              <t-dic-dropdown-select dicType="contract_model" v-model="dataForm.proContractAttr" disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投资金额：" prop="proTotalInvestment">
              <t-input v-model="dataForm.proTotalInvestment" readOnly></t-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工程类别：" prop="proType">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.proType" disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营方式：" prop="proRunMode">
              <t-dic-dropdown-select dicType="business_type" v-model="dataForm.proRunMode" disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目规模：" prop="proBuildArea">
              <t-input v-model="dataForm.proBuildArea" readOnly></t-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'已有诉讼信息'"></t-sub-title>
        <el-table :data="litigationData" border style="width: 100%">
          <el-table-column prop="litigationCode" label="诉讼编号" min-width="100"></el-table-column>
          <el-table-column prop="freezingAmount" label="冻结金额"></el-table-column>
          <el-table-column prop="sign" label="标记人"></el-table-column>
          <el-table-column prop="signTime" label="标记时间" width="180"></el-table-column>
          <el-table-column prop="owingtoUnionCompany" label="是否与联营单位有关" min-width="160">
            <template slot-scope="scope">
              <span>{{ $util.dataDicFormat('yes_or_no', scope.row.owingtoUnionCompany) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="说明"></el-table-column>
          <el-table-column prop="litigationStatus" label="当前状态" min-width="100">
            <template slot-scope="scope">
              <span>{{ $util.dataDicFormat('litigation_status', scope.row.litigationStatus) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cancelTime" label="取消时间" min-width="160"></el-table-column>
          <el-table-column align="center" min-width="100">
            <template slot-scope="scope">
              <!-- 标记中的状态才需要展示该按钮 -->
              <el-button v-if="scope.row.litigationStatus === 'marking'" size="mini" type="danger" @click="cancelLitigation(scope.row)" :disabled="readOnly">取消诉讼
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'新诉讼信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="isLitigation" label="标记诉讼：">
              <t-dic-dropdown-select dicType="y_or_n" v-model="dataForm.isLitigation"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="owingtoUnionCompany" label="与联营单位有关：">
              <t-dic-dropdown-select dicType="y_or_n" v-model="dataForm.owingtoUnionCompany"
                                     :disabled="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="冻结金额：" prop="freezingAmount">
              <t-currency-input v-model="dataForm.freezingAmount" :readOnly="readOnly">
                <span slot="append">元</span>
              </t-currency-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="sign" label="标记人：">
              <span>{{dataForm.sign}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="signTime" label="标记时间：">
              <span>{{dataForm.signTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明：" prop="remark">
              <t-input type="textarea" :rows="2" v-model="dataForm.remark" :readOnly="readOnly"></t-input>
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
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        showButton: true,
        readOnly: false,
        dialogVisible: false,
        docId: '',
        dataForm: {
          bId: '',
          actTaskKey: '',
          pId: '',
          isLitigation: '',
          owingtoUnionCompany: '',
          unionCompany: '',
          freezingAmount: '',
          remark: '',
          sign: '',
          signTime: '',
          litigationStatus: '',
          cancelTime: '',
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
          remark: [
            {required: true, message: '说明不能为空', trigger: 'blur'}
          ]
        },
        litigationData: []
      }
    },
    created () {
      const currentQuery = this.$route.query;
      this.readOnly = (currentQuery.readOnly == 'true') || this.readOnly;
      this.showButton = !(currentQuery.readOnly == 'true');
      this.init(currentQuery.businessId)
    },
    activated() {
      const currentQuery = this.$route.query;
      this.readOnly = (currentQuery.readOnly == 'true') || this.readOnly;
      this.showButton = !(currentQuery.readOnly == 'true')
      this.init(currentQuery.businessId)
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user
      })
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.proLitigation.get(id).then(function (result) {
                self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, result);
                let params = {}
                if(/^[0-9]*$/.test(result.pId)) {
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
                    let item;
                    item = find(_result.items, {id: result.pId})
                    if(!item) item = find(_result.items, {proName: result.pId})
                    self.dataForm = self.$util.deepObjectAssign({}, self.dataForm, item)
                    self.dataForm.pName = item.proName
                    self.dataForm.pId = item.id
                    self.getLitigationList(item.id)
                  }
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
        this.dataForm.pId = project.id;
        this.dataForm.conTotal = project.conTotal;
        this.dataForm.conBcxyTotal = project.conBcxyTotal;
        this.getLitigationList(project.id)
      },
      // 表单提交
      doSave() {
        let self = this
        let validPromises = [self.$refs['ruleForm'].validate()]
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm}
          tapp.services.proLitigation.save(model).then(function (result) {
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
      // 获取诉讼信息
      getLitigationList(value) {
        const params = {
          pId: value
        };
        tapp.services.proLitigation.getList(params).then(res => {
          console.log('获取诉讼信息', res);
          this.litigationData = res
        }).catch(err => {
          console.log('获取诉讼信息 错误', err)
        })
      },
      // 取消诉讼
      cancelLitigation(row) {
        console.log('取消诉讼', row)
        // 如果是标记中状态，则可以取消
        if (row.litigationStatus === 'marking') {

        }
      }
    }
  }
</script>
