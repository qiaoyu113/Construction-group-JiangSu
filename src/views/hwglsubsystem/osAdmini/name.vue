<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">项目信息登记</div>
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
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
          <t-workflow-map businessKey="t_baseinfo_key_approval_process"></t-workflow-map>
            <div slot="footer">
              <el-button type="primary" @click="dialogVisible=false">确定</el-button>
            </div>
          
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="name" label="项目名称：">
              <!-- <el-input v-model="dataForm.name">
                
              </el-input> -->
              <t-project-select placeholder="选择一个项目"
             v-model="dataForm.pId" @selectedProject="getSelectedProject" :readOnly="readOnly"></t-project-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="code" label="项目编号：" >
              <el-input v-model="dataForm.code"  disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="address" label="项目地址：" >
              <el-input v-model="dataForm.address" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="constructCompany" label="总包单位：" >
              <el-input v-model="dataForm.constructCompany" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="totalInvestment" label="所属分公司：" >
              <el-input v-model="dataForm.totalInvestment" disabled></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item prop="proType" label="项目类别：" >
              <el-input v-model="dataForm.proType" disabled></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item prop="enginType" label="工程类别：" >
              <t-dic-dropdown-select dicType="engineering_type" v-model="dataForm.enginType" :readOnly="readOnly" disabled>
              </t-dic-dropdown-select>
            </el-form-item>
          </el-col>
 <el-col :span="8">
            <el-form-item prop="proSubType" label="类别子项：" >
              <t-dic-dropdown-select dicType="category_child" v-model="dataForm.proSubType" :readOnly="readOnly"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item prop="subCompany" label="开工日期：">
              <el-input v-model="dataForm.subCompany" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="contractAttr" label="竣工日期：">
              <!--<t-dic-dropdown-select dicType="contract_model" v-model="dataForm.contractAttr"
                                     :readOnly="readOnly"></t-dic-dropdown-select>-->
              <el-input v-model="dataForm.contractAttr" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="respCompany" label="项目经理：">
              <!-- <t-dic-dropdown-select dicType="pro_type" v-model="dataForm.respCompany"
                                     :readOnly="readOnly"></t-dic-dropdown-select> -->
                <el-input v-model="dataForm.respCompany" disabled></el-input>
            </el-form-item>
          </el-col>
         


        
         
        </el-row>
      </el-card>
      <el-card shadow="never">
        <t-sub-title :title="'日报信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="subCompany" label="施月份：">
              <el-input v-model="dataForm.subCompany" ></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item prop="subCompant" label="项目累计完成产值："   label-width="150px">
              <el-input v-model="dataForm.subCompant" disabled></el-input>
            </el-form-item>
          </el-col>
          
           

        </el-row >
         <el-form-item label="质量情况：" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"  resize="none" :autosize="autosize"></el-input>
            </el-form-item>
            <el-form-item label="安全隐患：" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desd"  resize="none" :autosize="autosize"></el-input>
            </el-form-item>
            <el-row type='flex' :gutter="20" class="namea">
                <div :span="6">
                    <span  :span="6" style="width:100px;">※6 本月应收工程款（※1-※4）</span>
                    <span  :span="10" style=" color: #FF0000;">{{amount.funds}}</span>
                </div>
                <div :span="6">
                    <span   style="width:100px;" >每工日产值（※6/总工日）</span>
                    <span>{{amount.nissan}}</span>
                </div>
                <div :span="6">
                    <span style="width:100px;">※7 本月施工成本（※2+※3）</span>
                    <span>{{amount.constr}}</span>
                </div>
                <div :span="6">
                    <span style="width:100px;">本月项目收益（※6-※7）</span>
                    <span>{{amount.project}}</span>
                </div>
            </el-row>
      </el-card>
        
      <el-card shadow="never">
        <t-sub-title :title="'登记信息'"></t-sub-title>
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
          
          amount:{
              //安全隐患下面工程款的值
             funds:'1111111',
             nissan:'',
             constr:'',
             project:''

          },

          autosize:true,
          ruleForm:{
              desc:'',
              desd:''
          },
              tableData:[{
                  date: '2016-05-02',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
              }],



      
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        showButton:true,
        readOnly:false,
        dialogVisible:false,
        dataForm: {
          subCompant:'',
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
          proStatue: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: ''
        },
       

        dataRule: {
          
          name: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          subCompany:[{
            required: true, message: '项目名称不能为空', trigger: 'blur'
          }],
          subCompant:[
            {
            required: true, message: '内容不能为空', trigger: 'blur'
          }
          ]
        }
      }
    },
    created () {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    activated () {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    computed: {
      ...mapState({
        currentUser: state => state.app.user,
      })
    },
    methods: {

  

         getSelectedProject(project) {
        this.$nextTick(() => {
          this.dataForm.proCode = project.proCode;
          this.dataForm.proSubCompany = project.proSubCompany;
          this.dataForm.proBusDept = project.proBusDept;
          this.dataForm.proConstructCompany = project.proConstructCompany;
          this.dataForm.proConstructCompanyAttr = project.proConstructCompanyAttr;
          this.dataForm.proAddressCity = project.proAddressCity;
          this.dataForm.proAddressDetail = project.proAddressDetail;
          this.dataForm.proAddressProvince = project.proAddressProvince;
          this.dataForm.proRunMode = project.proRunMode;
          this.dataForm.proPlanStartDate = project.proPlanStartDate;
          this.dataForm.proPlanEndDate = project.proPlanEndDate;
          this.dataForm.proLimitTime = project.proLimitTime;
          this.dataForm.proUnionCompanyMerate = project.proUnionCompanyMerate;
          this.dataForm.proProfitRate = project.proProfitRate;
          this.dataForm.proCompanyHeader = project.proCompanyHeader;
          this.dataForm.proContacter = project.proContacter;
          this.dataForm.proContactway = project.proContactway;
          this.dataForm.proDriveSubject = project.proDriveSubject;
          this.dataForm.proContractAttr = project.proContractAttr;
          this.dataForm.proTotalInvestment = project.proTotalInvestment;
          this.dataForm.proUnionCompany = project.proUnionCompany;
          this.dataForm.proType = project.proType;
          this.dataForm.proBuildArea = project.proBuildArea;
          this.dataForm.proName = project.proName;
          this.dataForm.pcId = project.pcId;

          this.showProprietaryPool = this.dataForm.proRunMode == 'proprietary_pool' ? true : false
          this.showDepositInfo = (this.dataForm.proRunMode == 'proprietary_pool' || this.dataForm.proRunMode == 'pool') ? true : false

          let self = this;
          tapp.services.tBaseinfoPartnerApproval.get(project.proUnionCompany).then(function (result) {
            console.log('result',result)
            self.dataForm.companyName = result.companyName;
            self.dataForm.unionCompany = result.id;
          })
        })
      },


      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self =this
              tapp.services.osProInfo.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                
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
          tapp.services.osIncomeApproval.save(model).then(function (result) {
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
<style>
.namea div:nth-child(1){
    padding-left: 50px;
   
}
.namea div{
    display:flex;
    padding-right: 50px;
}

</style>
