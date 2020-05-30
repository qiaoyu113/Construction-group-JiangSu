<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目信息登记</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" icon="el-icon-upload2" @click="doSave()">保存</el-button>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="130px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="name" label="项目名称：">
              <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="currencyCode" label="货币类型：">
             <t-dic-dropdown-select dicType="currency_type" v-model="dataForm.currencyCode" :readOnly="readOnly">
             </t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="code" label="项目编号：">
              <el-input v-model="dataForm.code" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="address" label="项目地址：">
              <el-input v-model="dataForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="constructCompany" label="建设单位：">
              <el-input v-model="dataForm.constructCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="totalInvestment" label="项目总投资：">
              <el-input v-model="dataForm.totalInvestment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="subCompany" label="所属分公司：">
              <el-input v-model="dataForm.subCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="contractAttr" label="承包形式：">
              <!--<t-dic-dropdown-select dicType="contract_model" v-model="dataForm.contractAttr"
                                     :readOnly="readOnly"></t-dic-dropdown-select>-->
              <el-input v-model="dataForm.contractAttr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="respCompany" label="总包单位：">
              <t-dic-dropdown-select dicType="pro_type" v-model="dataForm.respCompany"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proType" label="项目类别：">
              <el-input v-model="dataForm.proType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="enginType" label="工程类别：">
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.enginType" :readOnly="readOnly">
              </t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proSubType" label="类别子项：">
              <t-dic-dropdown-select dicType="category_child" v-model="dataForm.proSubType" :readOnly="readOnly">
              </t-dic-dropdown-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'合同信息 增加合同信息'"></t-sub-title>
            <el-table :data="dataForm.getPartnerAchievements" border style="width: 100%" max-height="220">
              <el-table-column prop="name" label="合同名称" min-width="180"></el-table-column>
              <el-table-column prop="buildDate" label="开工日期" width="180"></el-table-column>
              <el-table-column prop="completeDate" label="竣工日期" width="180"></el-table-column>
              <el-table-column prop="totalAmount" label="合同额" width="180"></el-table-column>
              <el-table-column prop="monthComplete" label="本月完成产值" min-width="180"></el-table-column>
              <el-table-column prop="totalComplete" label="由开工累计完成产值" min-width="180"></el-table-column>
              <el-table-column prop="totalReceived" label="已回收工程款" min-width="180"></el-table-column>
            </el-table>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'合同详细信息（子合同详细信息）'"></t-sub-title>
            <el-row :gutter="20">
                <el-col :span="16">
                  <el-form-item prop="name" label="项目名称：">
                    <el-input v-model="dataForm.name"  :readOnly="readOnly"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="code" label="合同编号：">
                    <el-input v-model="dataForm.code" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="totalAmount" label="合同总额：">
                      <el-input v-model="dataForm.totalAmount"   :readOnly="readOnly"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="currencyCode" label="使用货币：">
                   <t-dic-dropdown-select dicType="currency_type" v-model="dataForm.currencyCode" :readOnly="readOnly">
                   </t-dic-dropdown-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="manager" label="项目经理：">
                      <el-input v-model="dataForm.manager"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="companyName" label="甲方单位名称：">
                      <el-input v-model="dataForm.companyName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="contact" label="联系人：">
                      <el-input v-model="dataForm.contact"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="contactWay" label="联系方式：">
                      <el-input v-model="dataForm.contactWay"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item  label="合同起止日期：">
                         <el-col :span="11">
                             <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.date1" style="width: 100%;"></el-date-picker>
                         </el-col>
                         <el-col :span="1">~</el-col>
                         <el-col :span="11">
                             <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.date1" style="width: 100%;"></el-date-picker>
                         </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="priceWay" label="合同价格方式：">
                      <t-dic-dropdown-select dicType="con_pay_way" v-model="dataForm.priceWay" :readOnly="readOnly">
                      </t-dic-dropdown-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="payWay" label="付款方式：">
                      <t-dic-dropdown-select dicType="con_pay_way" v-model="dataForm.payWay" :readOnly="readOnly">
                      </t-dic-dropdown-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="signDate" label="签订日期：">
                     <t-datetime-picker v-model="dataForm.proPlanStartDate" type="date" :readOnly="readOnly">
                     </t-datetime-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="buildDate" label="开工日期：">
                     <t-datetime-picker v-model="dataForm.proPlanStartDate" type="date" :readOnly="readOnly">
                     </t-datetime-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item prop="completeDate" label="竣工日期：">
                      <t-datetime-picker v-model="dataForm.proPlanStartDate" type="date" :readOnly="readOnly">
                      </t-datetime-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                   <h5>合同清单</h5>
                   <el-link href="#" target="_blank">增加行</el-link>
                   <el-table>
                      <el-table-column label="操作" min-width="180">
                          <el-button><i class="el-icon-delete"></i></el-button>
                      </el-table-column>
                      <el-table-column prop="itemCode"  label="合同序号" min-width="180">
                          <el-input prop="itemCode"></el-input>
                      </el-table-column>
                      <el-table-column prop="itemDesc"  label="合同清单描述" min-width="180">
                          <el-input prop="itemDesc"></el-input>
                      </el-table-column>
                      <el-table-column prop="process"  label="关键工序" min-width="180">
                      </el-table-column>
                      <el-table-column label="单位" min-width="180">
                      </el-table-column>
                      <el-table-column prop="unitPrice"  label="单价" min-width="180">
                          <el-input prop="unitPrice"></el-input>
                      </el-table-column>
                   </el-table>
                </el-col>
                <el-row :gutter="24">
                      <el-col :span="6">
                         <el-form-item prop="retentionMoney" label="质保金：">
                            <el-input v-model="dataForm.retentionMoney"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                         <el-form-item prop="returnAgree" label="质保金返还约定:">
                            <el-input v-model="dataForm.returnAgree"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item prop="performanceBond" label="履约保函：">
                             <el-input v-model="dataForm.performanceBond"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item prop="taxes" label="税金：">
                             <el-input v-model="dataForm.taxes"></el-input>
                          </el-form-item>
                      </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item prop="chineseCount" label="计划用人数(中国):">
                           <el-input v-model="dataForm.chineseCount"></el-input>
                         </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="foreignerCount" label="计划用人数(外籍):" >
                           <el-input v-model="dataForm.foreignerCount"></el-input>
                         </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="visaCount" label="计划办理签证数:">
                           <el-input v-model="dataForm.contact"></el-input>
                         </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="ptCount" label="计划办理机票数:">
                           <el-input v-model="dataForm.ptCount"></el-input>
                         </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'办理信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proRegister" label="登记人：">
              <span>{{dataForm.proRegister}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记时间：" prop="proRegisterTime">
              <span>{{dataForm.proRegisterTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :rows="2" v-model="dataForm.remark"></el-input>
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
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        dataForm: {
          code: '',
          name: '',
          address: '',
          constructCompany: '',
          totalInvestment: '',
          subCompany: '',
          contractAttr: '',
          respCompany: '',
          proType: '',
          enginType: '',
          proSubType: '',
          currencyCode: '',
          proRegister: '',
          proRegisterTime: '',
          remark: '',
          proStatue: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
        dataRule: {
          code: [
            {required: true, message: '项目编号不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '项目地址不能为空', trigger: 'blur'}
          ],
          constructCompany: [
            {required: true, message: '建设单位不能为空', trigger: 'blur'}
          ],
          totalInvestment: [
            {required: true, message: '项目总投资不能为空', trigger: 'blur'}
          ],
          subCompany: [
            {required: true, message: '所属分公司不能为空', trigger: 'blur'}
          ],
          contractAttr: [
            {required: true, message: '承包形式不能为空', trigger: 'blur'}
          ],
          respCompany: [
            {required: true, message: '总包单位不能为空', trigger: 'blur'}
          ],
          proType: [
            {required: true, message: '项目类别不能为空', trigger: 'blur'}
          ],
          enginType: [
            {required: true, message: '工程类别不能为空', trigger: 'blur'}
          ],
          proSubType: [
            {required: true, message: '类别子项不能为空', trigger: 'blur'}
          ],
          currencyCode: [
            {required: true, message: '货币代码不能为空', trigger: 'blur'}
          ],
          proRegister: [
            {required: true, message: '登记人不能为空', trigger: 'blur'}
          ],
          proRegisterTime: [
            {required: true, message: '登记时间不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '备注不能为空', trigger: 'blur'}
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
            this.$refs["dataForm"].resetFields()
            if (this.dataForm.id) {
              tapp.services.osProInfo.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                this.dataForm.code = result.osProInfo.code
                this.dataForm.name = result.osProInfo.name
                this.dataForm.address = result.osProInfo.address
                this.dataForm.constructCompany = result.osProInfo.constructCompany
                this.dataForm.totalInvestment = result.osProInfo.totalInvestment
                this.dataForm.subCompany = result.osProInfo.subCompany
                this.dataForm.contractAttr = result.osProInfo.contractAttr
                this.dataForm.respCompany = result.osProInfo.respCompany
                this.dataForm.proType = result.osProInfo.proType
                this.dataForm.enginType = result.osProInfo.enginType
                this.dataForm.proSubType = result.osProInfo.proSubType
                this.dataForm.currencyCode = result.osProInfo.currencyCode
                this.dataForm.proRegister = result.osProInfo.proRegister
                this.dataForm.proRegisterTime = result.osProInfo.proRegisterTime
                this.dataForm.remark = result.osProInfo.remark
                this.dataForm.proStatue = result.osProInfo.proStatue
                this.dataForm.createtime = result.osProInfo.createtime
                this.dataForm.updatetime = result.osProInfo.updatetime
                this.dataForm.createuser = result.osProInfo.createuser
                this.dataForm.updateuser = result.osProInfo.updateuser
                this.dataForm.datastatus = result.osProInfo.datastatus
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
            this.dataForm.proRegister = this.currentUser.userDisplayName
            this.dataForm.proRegisterTime = this.$util.datetimeFormat(moment())
          })
        }
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = [self.$refs['ruleForm'].validate()];
        Promise.all(validPromises).then(resultList => {
          let model = {...self.dataForm};
          tapp.services.osProInfo.save(model).then(function (result) {
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
