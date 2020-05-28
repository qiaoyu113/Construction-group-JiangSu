<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">子合同登记</div>
      </el-col>
    </el-row>
    <el-row v-if="showButton" :gutter="10" class="search-top-operate">
      <el-button type="primary" icon="el-icon-s-check" @click="doSave()">
        提交审批
      </el-button>
      <el-button type="primary" plain icon="el-icon-s-data" @click="dialogVisible = true">
        审批流程图
      </el-button>
      <el-dialog title="审批流程图" :visible.sync="dialogVisible" width="70%">
        <!-- businessKey值请修改当前流程的key值 -->
        <t-workflow-map businessKey="t_cont_key_subcontract_approval"></t-workflow-map>
        <div slot="footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-form :model="dataForm" :rules="dataRule" ref="ruleForm" @submit.native.prevent
             label-width="120px" label-position="right">
      <el-card shadow="never">
        <t-sub-title :title="'项目基本信息'"></t-sub-title>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="项目名称：" prop="pId">
              <t-project-select  placeholder="选择一个项目" v-model="dataForm.pId" @selectedProject="getSelectedProject"></t-project-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proCode" label="项目编号：">
              <el-input v-model="dataForm.proCode" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="proConstructCompany" label="建设单位：">
              <el-input  v-model="dataForm.proConstructCompany" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proConstructCompanyAttr" label="单位性质：">
              <t-dic-dropdown-select dicType="unit_nature" v-model="dataForm.proConstructCompanyAttr"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="项目地址：" prop="proAddress">
              <el-row type="flex" justify="space-between" :gutter="2">
                <el-col :span="8">
                  <t-region-s-picker :province.sync="dataForm.proAddressProvince" :city.sync="dataForm.proAddressCity" :disabled="true"></t-region-s-picker>
                </el-col>
                <el-col :span="16">
                  <el-form-item prop="proAddressDetail">
                    <el-input v-model="dataForm.proAddressDetail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proTotalInvestment" label="项目总投资：">
              <el-input v-model="dataForm.proTotalInvestment" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="proSubCompany" label="所属分公司：">
              <el-input v-model="dataForm.proSubCompany" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proBusDept" label="所属事业部：">
              <el-input v-model="dataForm.proBusDept" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proDriveSubject" label="实施主体：">
              <t-dic-dropdown-select dicType="ss_zt" v-model="dataForm.proDriveSubject"
                                     disabled></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="计划开工日期：" prop="proPlanStartDate" class="is-required">
              <t-datetime-picker v-model="dataForm.proPlanStartDate" type="date" disabled>
              </t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划完工日期：" prop="proPlanEndDate">
              <t-datetime-picker v-model="dataForm.proPlanEndDate" type="date" disabled>
              </t-datetime-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="proLimitTime" label="工程工期：">
              <el-input v-model="dataForm.proLimitTime" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
      <t-sub-title :title="'主合同基本信息'"></t-sub-title>
        <el-row :gutter="20">
         <el-col :span="16">
           <el-form-item prop="conName" label="主合同名称：">
             <el-input v-model="dataForm.conName" disabled></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="conCode" label="主合同编号：">
             <el-input v-model="dataForm.conCode" disabled></el-input>
           </el-form-item>
         </el-col>
        </el-row>
        <el-row :gutter="20">
         <el-col :span="8">
           <el-form-item label="合同开始日期：" prop="conStartDate"  class="is-required">
             <t-datetime-picker v-model="dataForm.conStartDate" type="date" disabled>
             </t-datetime-picker></el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item label="合同结束日期：" prop="conEndDate"  class="is-required">
             <t-datetime-picker v-model="dataForm.conEndDate" type="date" disabled>
             </t-datetime-picker></el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="bId" label="总合同额">
             <el-input v-model="dataForm.conBcxyTotal" disabled>
               <span slot="append">万元</span>
             </el-input>
           </el-form-item>
         </el-col>
       </el-row>
      </el-card>
      <el-card shadow="never">
       <t-sub-title :title="'子合同基本信息'"></t-sub-title>
       <el-row :gutter="20">
         <el-col :span="16">
           <el-form-item prop="conName" label="子合同名称：">
             <el-input v-model="dataForm.conName"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-row>
           <el-col :span="showOtherType ? 8 : 24">
             <el-form-item prop="conType" label="子合同类型：">
               <t-dic-dropdown-select dicType="con_type" v-model="dataForm.conType"></t-dic-dropdown-select>
             </el-form-item>
           </el-col>
           <el-col v-if="showOtherType" :span="16" sytle="padding-left: 2px;">
             <el-form-item prop="	otherConType" label="其他子合同类型：">
               <el-input v-model="dataForm.otherConType"></el-input>
             </el-form-item>
           </el-col>
       </el-row>
         </el-col>
       </el-row>
         <el-row :gutter="20">
         <el-col :span="8">
           <el-form-item prop="conCode" label="子合同编号 ：">
             <el-input v-model="dataForm.conCode" disabled></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item label="合同开始日期：" prop="conStartDate"  class="is-required">
             <t-datetime-picker v-model="dataForm.conStartDate" type="date" disabled>
             </t-datetime-picker>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item label="合同结束日期：" prop="conEndDate"  class="is-required">
             <t-datetime-picker v-model="dataForm.conEndDate" type="date" disabled>
             </t-datetime-picker>
           </el-form-item>
         </el-col>
         </el-row>
        <el-row :gutter="20">
         <el-col :span="8">
           <el-form-item prop="conPartya" label="甲方单位：">
             <el-input v-model="dataForm.conPartya"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="signatorya" label="签订人：">
             <el-input v-model="dataForm.signatorya"></el-input>
           </el-form-item>
         </el-col>
        </el-row>
        <el-row :gutter="20">
         <el-col :span="8">
           <el-form-item prop="conPartyb" label="乙方单位：">
             <el-input v-model="dataForm.conPartyb"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-form-item prop="signatoryb" label="签订人：">
             <el-input v-model="dataForm.signatoryb"></el-input>
           </el-form-item>
         </el-col>
        </el-row>
        <el-row :gutter="20">
         <el-col :span="8">
           <el-form-item prop="conModality" label="子合同形式：">
             <t-dic-dropdown-select dicType="con_modality" v-model="dataForm.conModality"
                                    disabled></t-dic-dropdown-select>
           </el-form-item>
         </el-col>
         <el-col :span="8">
           <el-row>
             <el-col :span="showOtherWay ? 8 : 24">
               <el-form-item prop="conPayWay" label="付款方式：">
                 <t-dic-dropdown-select dicType="con_pay_way" v-model="dataForm.conPayWay"></t-dic-dropdown-select>
               </el-form-item>
             </el-col>
             <el-col v-if="showOtherWay" :span="16" sytle="padding-left: 2px;">
               <el-form-item prop="otherPayWay" label="其他付款方式：">
                 <el-input v-model="dataForm.otherPayWay"></el-input>
               </el-form-item>
             </el-col>
           </el-row>
         </el-col>
         <el-col :span="8">
           <el-form-item label="签订日期：" prop="conSigningDate"  class="is-required">
             <t-datetime-picker v-model="dataForm.conSigningDate" type="date" >
             </t-datetime-picker>
           </el-form-item>
         </el-col>
        </el-row>
        <el-row :gutter="20">
         <el-col :span="8">
           <el-form-item prop="conTotal" label="子合同额">
             <el-input v-model="dataForm.conTotal">
               <span slot="append">万元</span>
             </el-input>
           </el-form-item>
         </el-col>
          <el-col :span="8">
          <el-form-item prop="bId" label="金额大写：">
            <span>{{$util.moneyArabiaToChinese(dataForm.conTotal)}}</span>
          </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
          <el-form-item prop="bId" class="is-required">
            <span>合同价格审核：</span>
            </el-form-item></el-col>
              <el-col :span="8">
           <el-form-item prop="isExceedTotal" label="总价是否超预算：">
             <t-dic-radio-select dicType="y_or_n" v-model="dataForm.isExceedTotal"></t-dic-radio-select>
           </el-form-item>
         </el-col>
          <el-col :span="8">
            <el-form-item prop="isExceed" label="单价是否超预算：">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.	isExceed"></t-dic-radio-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="isRunProcedure" label="是否经招标程序：">
              <t-dic-radio-select dicType="y_or_n" v-model="dataForm.isRunProcedure"></t-dic-radio-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
           <el-col :span="24">
             <el-form-item label="备注：" prop="remarks">
               <el-input type="textarea" :rows="2" v-model="dataForm.remarks"></el-input>
             </el-form-item>
         </el-col>
       </el-row>
      </el-card>
      <el-card shadow="never">
       <t-sub-title :title="'付款条件'"></t-sub-title>
        <el-col :span="24">
          <el-form-item  prop="remark">
            <el-input type="textarea" :rows="2" v-model="dataForm.remark"></el-input>
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
  export default {
    data() {
      return {
        assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
        docId: '',
        readOnly: false,
        showOtherWay: false,
        showOtherType: false,
        showButton: true,
        dialogVisible: false,
        dataForm: {
          pId: '',
          proCode: '',
          proConstructCompany: '',
          proConstructCompanyAttr: '',
          proAddress: '',
          proTotalInvestment: '',
          proSubCompany: '',
          proBusDept: '',
          proDriveSubject: '',
          proPlanStartDate: '',
          proPlanEndDate: '',
          proLimitTime: '',
          bId: '',
          actTaskKey: '',
          conCode: '',
          conName: '',
          conModality: '',
          conType: '',
          conStartDate: '',
          conEndDate: '',
          conSigningDate: '',
          conPayWay: '',
          otherConType: '',
          otherPayWay: '',
          conPartya: '',
          signatorya: '',
          conPartyb: '',
          signatoryb: '',
          isExceedTotal: '',
          isExceed: '',
          isRunProcedure: '',
          remarks: '',
          conPayStandard: '',
          conStatus: '',
          approvalStatus: '',
          sign: '',
          signTime: '',
          propose: '',
          result: '',
          createtime: '',
          updatetime: '',
          createuser: '',
          updateuser: '',
          datastatus: '',
          province: '',
          city: '',
          conBcxyTotal: '',
          conTotal: '',
        },
        dataRule: {
          //项目信息
          pId:[{required: true, message: '项目名称不能为空', trigger: 'change'}],
          proCode: [{required: true, message: '项目编号不能为空', trigger: 'change'}],
          proConstructCompany: [{required: true, message: '建设单位不能为空', trigger: 'change'}],
          proConstructCompanyAttr: [{required: true, message: '单位性质不能为空', trigger: 'change'}],
          proAddress: [{required: true, message: '项目地址不能为空', trigger: 'change'}],
          proTotalInvestment: [{required: true, message: '项目总投资不能为空', trigger: 'change'}],
          proSubCompany: [{required: true, message: '所属分公司不能为空', trigger: 'change'}],
          //proBusDept: [{required: true, message: '子合同类型不能为空', trigger: 'change'}],
          proDriveSubject: [{required: true, message: '实施主体不能为空', trigger: 'change'}],
          proPlanStartDate: [{required: true, message: '计划开工日期不能为空', trigger: 'change'}],
          proPlanEndDate: [{required: true, message: '计划完工日期不能为空', trigger: 'change'}],
          proLimitTime: [{required: true, message: '工程工期不能为空', trigger: 'change'}],

          otherPayWay: [{validator: this.isOtherPayWayEmpty, trigger: 'blur'}],
          conPayWay: [{required: true, message: '付款方式不能为空', trigger: 'change'}],
          otherConType: [{validator: this.isOtherPayWayTypeEmpty, trigger: 'blur'}],
          conType: [{required: true, message: '子合同类型不能为空', trigger: 'change'}],
          conTotal:[{validator: this.isNotmorebigMainContMoney, trigger: 'blur'}],
          pId: [
            {required: true, message: '项目id不能为空', trigger: 'blur'}
          ],
          conCode: [
            {required: true, message: '子合同编号不能为空', trigger: 'blur'}
          ],
          conName: [
            {required: true, message: '子合同名称不能为空', trigger: 'blur'}
          ],
          conModality: [
            {required: true, message: '子合同形式（字典表）不能为空', trigger: 'blur'}
          ],
          conStartDate: [
            {required: true, message: '子合同开始日期不能为空', trigger: 'blur'}
          ],
          conEndDate: [
            {required: true, message: '子合同结束日期不能为空', trigger: 'blur'}
          ],
          conSigningDate: [
            {required: true, message: '签订日期不能为空', trigger: 'blur'}
          ],
          conPartya: [
            {required: true, message: '甲方不能为空', trigger: 'blur'}
          ],
          conPartyb: [
            {required: true, message: '乙方不能为空', trigger: 'blur'}
          ],
          isExceedTotal: [
            {required: true, message: '总价是否超预算（字典表）不能为空', trigger: 'blur'}
          ],
          isExceed: [
            {required: true, message: '单价是否超预算（字典表）不能为空', trigger: 'blur'}
          ],
          isRunProcedure: [
            {required: true, message: '是否经招标程序（字典表）不能为空', trigger: 'blur'}
          ],
          conPayStandard: [
            {required: true, message: '合同收款条件不能为空', trigger: 'blur'}
          ],
          conStatus: [
            {required: true, message: '合同状态（字典表）不能为空', trigger: 'blur'}
          ]
        }
      }
    },

    created() {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    activated() {
      const currentQuery = this.$route.query
      this.readOnly = (currentQuery.readonly == 'true') || this.readOnly
      this.showButton = !(currentQuery.readonly == 'true')
      this.init(currentQuery.businessId)
    },
    watch: {
      'dataForm.conPayWay': {
        handler: function(val) {
          if(val == 'other_pay_way') {
            this.showOtherWay = true
          } else {
            this.showOtherWay = false
          }
        },
        deep: true
      },
      'dataForm.conType': {
        handler: function(val) {
          if(val == 'other_con_type') {
            this.showOtherType = true
          } else {
            this.showOtherType = false
          }
        },
        deep: true
      },
    },
    methods: {
      // 初始化 编辑和新增 2种情况
      init(id) {
        if (id) {
          this.dataForm.id = id || 0
          this.$nextTick(() => {
            this.$refs["ruleForm"].resetFields()
            if (this.dataForm.id) {
              let self = this;
              tapp.services.tContSubcontractApproval.get(id).then(function (result) {
                self.$util.deepObjectAssign({}, self.dataForm, result)
                self.dataForm.bId = result.bId
                self.dataForm.actTaskKey = result.actTaskKey
                self.dataForm.pId = result.pId
                self.dataForm.conCode = result.conCode
                self.dataForm.conName = result.conName
                self.dataForm.conModality = result.conModality
                self.dataForm.conType = result.conType
                self.dataForm.otherConType = result.otherConType
                self.dataForm.conStartDate = result.conStartDate
                self.dataForm.conEndDate = result.conEndDate
                self.dataForm.conSigningDate = result.conSigningDate
                self.dataForm.conPayWay = result.conPayWay
                self.dataForm.otherPayWay = result.otherPayWay
                self.dataForm.conTotal = result.conTotal
                self.dataForm.conPartya = result.conPartya
                self.dataForm.signatorya = result.signatorya
                self.dataForm.conPartyb = result.conPartyb
                self.dataForm.signatoryb = result.signatoryb
                self.dataForm.isExceedTotal = result.isExceedTotal
                self.dataForm.isExceed = result.isExceed
                self.dataForm.isRunProcedure = result.isRunProcedure
                self.dataForm.remarks = result.remarks
                self.dataForm.conPayStandard = result.conPayStandard
                self.dataForm.conStatus = result.conStatus
                self.dataForm.approvalStatus = result.approvalStatus
                self.dataForm.sign = result.sign
                self.dataForm.signTime = result.signTime
                self.dataForm.propose = result.propose
                self.dataForm.result = result.result
                self.dataForm.createtime = result.createtime
                self.dataForm.updatetime = result.updatetime
                self.dataForm.createuser = result.createuser
                self.dataForm.updateuser = result.updateuser
                self.dataForm.datastatus = result.datastatus
                self.dataForm.conName = result.conName
              })
            }
          })
        } else {
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          })
        }
      },
      getSelectedProject(project) {
        this.dataForm.proSubCompany = project.proSubCompany;
        this.dataForm.proCode = project.proCode;
        this.dataForm.proAddressProvince = project.proAddressProvince;
        this.dataForm.proAddressDetail = project.proAddressDetail;
        this.dataForm.proManager = project.proManager;
        this.dataForm.proFundSource = project.proFundSource;
        this.dataForm.proBusDept = project.proBusDept;
        this.dataForm.proSubType = project.proSubType;
        this.dataForm.proConstructCompany = project.proConstructCompany;
        this.dataForm.proContractAttr = project.proContractAttr;
        this.dataForm.proTotalInvestment = project.proTotalInvestment;
        this.dataForm.proType = project.proType;
        this.dataForm.proRunMode = project.proRunMode;
        this.dataForm.proBuildArea = project.proBuildArea;
        this.dataForm.proRealStartDate = project.proRealStartDate;
        this.dataForm.proPlanEndDate = project.proPlanEndDate;
        this.proPlanStartDate = project.proPlanStartDate;
        this.dataForm.proUnionCompanyMerate = project.proUnionCompanyMerate;
        this.dataForm.proProfitRate = project.proProfitRate;
        this.dataForm.proContacter = project.proContacter;
        this.dataForm.proContactway = project.proContactway;
        this.dataForm.proSpan = project.proSpan;
        this.dataForm.proLayer = project.proLayer;
        this.dataForm.proBlock = project.proBlock;
        this.dataForm.proBasementArea = project.proBasementArea;
        this.dataForm.proIsFitout = project.proIsFitout;
        this.dataForm.proFitoutRate = project.proFitoutRate;
        this.dataForm.proUnionCompany = project.proUnionCompany;
        this.dataForm.proIsBim = project.proIsBim;
        this.dataForm.conTotal = project.conTotal;
        this.dataForm.conName = project.conName;
        this.proDriveSubject = project.proDriveSubject;
        this.proLimitTime = project.proLimitTime;
        this.proConstructCompanyAttr = project.proConstructCompanyAttr;
        this.conCode = project.conCode;
        this.conStartDate = project.conStartDate;
        this.conEndDate = project.conEndDate;
        this.conBcxyTotal=project.conBcxyTotal;
        this.pId=project.id;
      },
      // 表单提交
      doSave() {
        let self = this;
        let validPromises = self.$refs['ruleForm'].validate();
        Promise.all([validPromises]).then(resultList => {
          let model = {...self.dataForm};

          tapp.services.tContSubcontractApproval.save(model).then(function (result) {
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
      },

      isOtherPayWayEmpty (rule, value, cb) {
        if(!this.dataForm.conPayWay || (this.dataForm.conPayWay && this.dataForm.conPayWay !== 'other_pay_way')) return cb()
        if(this.dataForm.conPayWay && this.dataForm.conPayWay === 'other_pay_way') {
          if (this.dataForm.otherPayWay == null || this.dataForm.otherPayWay.length == 0 || this.dataForm.otherPayWay == '') {
            return cb(new Error('其他付款方式不能为空'))
          }
        }
        return cb()
      },

      isOtherPayWayTypeEmpty (rule, value, cb) {
        if(!this.dataForm.conType || (this.dataForm.conType && this.dataForm.conType !== 'other_con_type')) return cb()
        if(this.dataForm.conType && this.dataForm.conType === 'other_con_type') {
          if (this.dataForm.otherConType == null || this.dataForm.otherConType.length == 0 || this.dataForm.otherConType == '') {
            return cb(new Error('其他合同类型不能为空'))
          }
        }
        return cb()
      },
      isNotmorebigMainContMoney(rule, value, cb) {
        if(this.dataForm.conTotal > this.dataForm.conBcxyTotal) {
          return cb(new Error('子合同额必须小于总合同额'))
        }
        if(this.dataForm.proRunMode == 'proprietary'){
          if(this.dataForm.conType && this.dataForm.conType == 'pro_investigate' ||
            this.dataForm.conType && this.dataForm.conType == 'pro_supervision' ||
            this.dataForm.conType && this.dataForm.conType == 'pro_design' ||
            this.dataForm.conType && this.dataForm.conType == 'pro_detection') {
            //勘察、设计、监理、检测  子合同额在25万以上；
            if(this.dataForm.conTotal <= 25){
              return cb(new Error('子合同额必须在25万以上'))
            }
          }if(this.dataForm.conType && this.dataForm.conType == 'material_proc' || this.dataForm.conType && this.dataForm.conType == 'equipment_proc') {
            //材料、设备采购  子合同额在50万以上
            if(this.dataForm.conTotal <= 50){
              return cb(new Error('子合同额必须在50万以上'))
            }
          }if(this.dataForm.conType && this.dataForm.conType == 'subcontract_type') {
            //分包  子合同额在100万以上
            if(this.dataForm.conTotal <= 100){
              return cb(new Error('子合同额必须在100万以上'))
            }
          }
        }
        return cb()
      },
  /*    isCyusuanMusNotNull(rule, value, cb) {
        if(this.dataForm.isExceedTotal == 'yes' || this.dataForm.isExceed == 'yes') {
          if(this.dataForm.remarks.length ==0 ){
            return cb(new Error('请填写原因'))
          }
        }
        return cb()
      },*/
    }
  }
</script>
