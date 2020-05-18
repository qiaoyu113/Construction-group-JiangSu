<template>
  <div>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button class="demo-button" type="primary" plain icon="el-icon-s-data" @click="">
        审批流程图
      </el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px" label-position="right">
      <el-card shadow="never">
      <t-sub-title :title="'项目信息'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="proName" label="项目名称">
            <t-input v-model="dataForm.proName" placeholder="项目选择">
              <el-button slot="append" type="text" icon="el-icon-search" @click="dialogFormVisible = true"></el-button>
            </t-input>
          </el-form-item>
          <el-dialog title="项目选择" :visible.sync="dialogFormVisible" width='80%'>
            <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
              <el-row :gutter="10" class="search-top-operate">
                <el-button type="success" @click="proChoose()">
                  确定
                </el-button>
                <el-button type="info" @click="">
                  取消
                </el-button>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="项目名称">
                    <el-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                              placeholder="项目名称" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="建设单位">
                    <el-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proConstructCompany"
                              placeholder="建设单位" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="工程类别">
                    <el-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proType"
                              placeholder="工程类别" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="经营方式">
                    <el-input @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.proRunMode"
                              placeholder="经营方式" clearable></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
                <el-col :span="12">
                  <el-form-item>
                    <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
                    <el-button icon="el-icon-download" @click="doReset()">
                      <i class="fa fa-lg fa-level-down"></i>清空
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </t-form>
            <t-grid ref="searchReulstList" :options="gridOptions">
            </t-grid>
          </el-dialog>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proCode" label="项目编号">
            <el-input v-model="dataForm.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="remark" label="申请事项">
            <el-input type="textarea" v-model="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="sign" label="经办人">
            <span>{{dataForm.sign}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="signTime" label="经办时间">
            <span>{{dataForm.signTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'帐户信息（帐户开立申请通过后填写）'"></t-sub-title>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="bankName" label="开户行名称">
            <el-input readonly v-model="dataForm.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAddress" label="开户网点">
            <el-input readonly v-model="dataForm.bankAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccountName" label="银行帐户名称">
            <el-input readonly v-model="dataForm.bankAccountName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="bankAccount" label="银行帐号">
            <el-input readonly v-model="dataForm.bankAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="openTime" label="开户时间">
            <el-date-picker type="datetime" readonly v-model="dataForm.openTime"></el-date-picker>
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
  import moment from 'moment'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.proInfo.getPagedList,
            serviceInstanceInputParameters: {
              searchKey: null,
              processDefinationKey: null,
              dateRange: ''
            }
          },
          grid: {
            offsetHeight: 125, //125:查询部分高度
            mutiSelect: false,
            columns: [{
              prop: 'proCode',
              label: '项目备案编号',
              sortable: true
            },
              {
                prop: 'proName',
                label: '项目名称',
                sortable: true
              },
              {
                prop: 'proConstructCompany',
                label: '备案单位',
                sortable: true
              },
              {
                prop: 'proType',
                label: '工程类别',
                sortable: true
              },
              {
                prop: 'proTotalInvestment',
                label: '投资金额',
                sortable: true
              },

              {
                prop: 'proSubType',
                label: '类别子项',
                sortable: true
              },
              {
                prop: 'proBuildUnit',
                label: '建设单位',
                sortable: true
              },
              {
                prop: 'proBuildArea',
                label: '项目地址',
                sortable: true
              },
              {
                prop: 'proRunMode',
                label: '经营方式',
                sortable: true
              },
              {
                prop: 'proManager',
                label: '项目跟踪人',
                sortable: true
              },
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            },
          }
        },
        dialogFormVisible: false,
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          proName: '',
          proCode: '',
          bId: '',
          actTaskKey: '',
          pId: '',
          bankName: '',
          bankAddress: '',
          bankAccountName: '',
          bankAccount: '',
          openTime: '',
          approvalStatus: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          remark: ''
        },
        dataRule: {
          proCode: [
            { required: true, message: '项目编码不能为空', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '开户行名称不能为空', trigger: 'blur' }
          ],
          bankAddress: [
            { required: true, message: '开户网点不能为空', trigger: 'blur' }
          ],
          bankAccountName: [
            { required: true, message: '银行帐户名称不能为空', trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '银行帐号不能为空', trigger: 'blur' }
          ],
          openTime: [
            { required: true, message: '开户时间不能为空', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '执行人不能为空', trigger: 'blur' }
          ],
          signTime: [
            { required: true, message: '执行时间不能为空', trigger: 'blur' }
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
      // 搜索条件重置
      doRefresh() {
        this.$refs.searchReulstList.refresh();
      },
      // 初始化 编辑和新增 2种情况
      init (id) {
        if(id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.finaFwaccounapproval.get(id).then(function(result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.bId = result.finaFwaccounapproval.bId
                this.dataForm.actTaskKey = result.finaFwaccounapproval.actTaskKey
                this.dataForm.pId = result.finaFwaccounapproval.pId
                this.dataForm.bankName = result.finaFwaccounapproval.bankName
                this.dataForm.bankAddress = result.finaFwaccounapproval.bankAddress
                this.dataForm.bankAccountName = result.finaFwaccounapproval.bankAccountName
                this.dataForm.bankAccount = result.finaFwaccounapproval.bankAccount
                this.dataForm.openTime = result.finaFwaccounapproval.openTime
                this.dataForm.approvalStatus = result.finaFwaccounapproval.approvalStatus
                this.dataForm.sign = result.finaFwaccounapproval.sign
                this.dataForm.signTime = result.finaFwaccounapproval.signTime
                this.dataForm.propose = result.finaFwaccounapproval.propose
                this.dataForm.result = result.finaFwaccounapproval.result
                this.dataForm.createtime = result.finaFwaccounapproval.createtime
                this.dataForm.updatetime = result.finaFwaccounapproval.updatetime
                this.dataForm.createuser = result.finaFwaccounapproval.createuser
                this.dataForm.updateuser = result.finaFwaccounapproval.updateuser
                this.dataForm.datastatus = result.finaFwaccounapproval.datastatus
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
          tapp.services.finaFwaccounapproval.save(model).then(function(result) {
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
      },
      proChoose() {
        //传送到父组件
        this.formInfo = this.$refs.multipleTable.selection;
        this.$emit('formInfo', this.formInfo);
        this.dataForm.proName = this.formInfo.proName;
      },
      doReset () {
        this.hasQuery = false
        // data恢复初始化数据
        this.queryCondition = util.deepObjectAssign({}, this.$options.data().queryCondition)
      },
    }
  }
</script>
