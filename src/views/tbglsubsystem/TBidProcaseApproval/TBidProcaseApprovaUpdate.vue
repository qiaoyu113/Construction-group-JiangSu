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
                                                                                                <el-col :span="8">
                            <el-form-item prop="bId" label="流程业务id">
                                <el-input v-model="dataForm.bId"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="actTaskKey" label="activiti执行任务key">
                                <el-input v-model="dataForm.actTaskKey"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proCode" label="项目备案编号">
                                <el-input v-model="dataForm.proCode"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proSubCompany" label="所属分公司">
                                <el-input v-model="dataForm.proSubCompany"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proBusDept" label="所属事业部">
                                <el-input v-model="dataForm.proBusDept"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proName" label="拟建项目名称">
                                <el-input v-model="dataForm.proName"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proIntroduce" label="项目简介">
                                <el-input v-model="dataForm.proIntroduce"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proAddressProvince" label="项目地址-省（字典表）">
                                <el-input v-model="dataForm.proAddressProvince"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proAddressCity" label="项目地址-市（字典表）">
                                <el-input v-model="dataForm.proAddressCity"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proAddressDetail" label="项目地址-详细">
                                <el-input v-model="dataForm.proAddressDetail"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proConstructCompany" label="建设单位">
                                <el-input v-model="dataForm.proConstructCompany"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proConstructCompanyAttr" label="单位性质（字典表）">
                                <el-input v-model="dataForm.proConstructCompanyAttr"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proTotalInvestment" label="项目总投资-元">
                                <el-input v-model="dataForm.proTotalInvestment"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proType" label="工程类别（字典表）">
                                <el-input v-model="dataForm.proType"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proContractAttr" label="计划合同模式（字典表）">
                                <el-input v-model="dataForm.proContractAttr"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proRunMode" label="计划经营方式（字典表）">
                                <el-input v-model="dataForm.proRunMode"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proUnionCompany" label="联营公司">
                                <el-input v-model="dataForm.proUnionCompany"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proBuildArea" label="计划项目规模-建筑面积-平方米">
                                <el-input v-model="dataForm.proBuildArea"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="planBidDate" label="计划投标日期">
                                <el-input v-model="dataForm.planBidDate"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proTracker" label="项目跟踪人标识">
                                <el-input v-model="dataForm.proTracker"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="contactNum" label="联系方式">
                                <el-input v-model="dataForm.contactNum"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="bidResult" label="最后一次投标结果（字典表）">
                                <el-input v-model="dataForm.bidResult"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="bidCount" label="投标次数">
                                <el-input v-model="dataForm.bidCount"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="brUser" label="投标结果登记人">
                                <el-input v-model="dataForm.brUser"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="brTime" label="投标结果登记时间">
                                <el-input v-model="dataForm.brTime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="brRemark" label="投标结果备注">
                                <el-input v-model="dataForm.brRemark"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="sign" label="执行人、备案人">
                                <el-input v-model="dataForm.sign"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="signTime" label="执行时间、备案时间">
                                <el-input v-model="dataForm.signTime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="approvalStatus" label="审批状态（字典表）">
                                <el-input v-model="dataForm.approvalStatus"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="propose" label="审核意见">
                                <el-input v-model="dataForm.propose"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="result" label="审核结果">
                                <el-input v-model="dataForm.result"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="createtime" label="创建时间">
                                <el-input v-model="dataForm.createtime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="updatetime" label="更新时间">
                                <el-input v-model="dataForm.updatetime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="createuser" label="创建人">
                                <el-input v-model="dataForm.createuser"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="updateuser" label="更新人">
                                <el-input v-model="dataForm.updateuser"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="datastatus" label="数据有效性 1有效 0无效">
                                <el-input v-model="dataForm.datastatus"></el-input>
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
                                                                                                                                                    bId: '',                                                                                                                                                            actTaskKey: '',                                                                                                                                                            proCode: '',                                                                                                                                                            proSubCompany: '',                                                                                                                                                            proBusDept: '',                                                                                                                                                            proName: '',                                                                                                                                                            proIntroduce: '',                                                                                                                                                            proAddressProvince: '',                                                                                                                                                            proAddressCity: '',                                                                                                                                                            proAddressDetail: '',                                                                                                                                                            proConstructCompany: '',                                                                                                                                                            proConstructCompanyAttr: '',                                                                                                                                                            proTotalInvestment: '',                                                                                                                                                            proType: '',                                                                                                                                                            proContractAttr: '',                                                                                                                                                            proRunMode: '',                                                                                                                                                            proUnionCompany: '',                                                                                                                                                            proBuildArea: '',                                                                                                                                                            planBidDate: '',                                                                                                                                                            proTracker: '',                                                                                                                                                            contactNum: '',                                                                                                                                                            bidResult: '',                                                                                                                                                            bidCount: '',                                                                                                                                                            brUser: '',                                                                                                                                                            brTime: '',                                                                                                                                                            brRemark: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            approvalStatus: '',                                                                                                                                                            propose: '',                                                                                                                                                            result: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
                dataRule: {
                                                                                                                                                    bId: [
                                { required: true, message: '流程业务id不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            actTaskKey: [
                                { required: true, message: 'activiti执行任务key不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proCode: [
                                { required: true, message: '项目备案编号不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proSubCompany: [
                                { required: true, message: '所属分公司不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proBusDept: [
                                { required: true, message: '所属事业部不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proName: [
                                { required: true, message: '拟建项目名称不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proIntroduce: [
                                { required: true, message: '项目简介不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proAddressProvince: [
                                { required: true, message: '项目地址-省（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proAddressCity: [
                                { required: true, message: '项目地址-市（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proAddressDetail: [
                                { required: true, message: '项目地址-详细不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proConstructCompany: [
                                { required: true, message: '建设单位不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proConstructCompanyAttr: [
                                { required: true, message: '单位性质（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proTotalInvestment: [
                                { required: true, message: '项目总投资-元不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proType: [
                                { required: true, message: '工程类别（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proContractAttr: [
                                { required: true, message: '计划合同模式（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proRunMode: [
                                { required: true, message: '计划经营方式（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proUnionCompany: [
                                { required: true, message: '联营公司不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proBuildArea: [
                                { required: true, message: '计划项目规模-建筑面积-平方米不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            planBidDate: [
                                { required: true, message: '计划投标日期不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proTracker: [
                                { required: true, message: '项目跟踪人标识不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            contactNum: [
                                { required: true, message: '联系方式不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            bidResult: [
                                { required: true, message: '最后一次投标结果（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            bidCount: [
                                { required: true, message: '投标次数不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            brUser: [
                                { required: true, message: '投标结果登记人不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            brTime: [
                                { required: true, message: '投标结果登记时间不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            brRemark: [
                                { required: true, message: '投标结果备注不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            sign: [
                                { required: true, message: '执行人、备案人不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            signTime: [
                                { required: true, message: '执行时间、备案时间不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            approvalStatus: [
                                { required: true, message: '审批状态（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            propose: [
                                { required: true, message: '审核意见不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            result: [
                                { required: true, message: '审核结果不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            createtime: [
                                { required: true, message: '创建时间不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            updatetime: [
                                { required: true, message: '更新时间不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            createuser: [
                                { required: true, message: '创建人不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            updateuser: [
                                { required: true, message: '更新人不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            datastatus: [
                                { required: true, message: '数据有效性 1有效 0无效不能为空', trigger: 'blur' }
                            ]
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
                            tapp.services.tBidProcaseApproval.get(id).then(function(result) {
                                self.$util.deepObjectAssign({}, self.dataForm, result)
                                                                                                                                                                                this.dataForm.bId = result.tBidProcaseApproval.bId
                                                                                                                                                this.dataForm.actTaskKey = result.tBidProcaseApproval.actTaskKey
                                                                                                                                                this.dataForm.proCode = result.tBidProcaseApproval.proCode
                                                                                                                                                this.dataForm.proSubCompany = result.tBidProcaseApproval.proSubCompany
                                                                                                                                                this.dataForm.proBusDept = result.tBidProcaseApproval.proBusDept
                                                                                                                                                this.dataForm.proName = result.tBidProcaseApproval.proName
                                                                                                                                                this.dataForm.proIntroduce = result.tBidProcaseApproval.proIntroduce
                                                                                                                                                this.dataForm.proAddressProvince = result.tBidProcaseApproval.proAddressProvince
                                                                                                                                                this.dataForm.proAddressCity = result.tBidProcaseApproval.proAddressCity
                                                                                                                                                this.dataForm.proAddressDetail = result.tBidProcaseApproval.proAddressDetail
                                                                                                                                                this.dataForm.proConstructCompany = result.tBidProcaseApproval.proConstructCompany
                                                                                                                                                this.dataForm.proConstructCompanyAttr = result.tBidProcaseApproval.proConstructCompanyAttr
                                                                                                                                                this.dataForm.proTotalInvestment = result.tBidProcaseApproval.proTotalInvestment
                                                                                                                                                this.dataForm.proType = result.tBidProcaseApproval.proType
                                                                                                                                                this.dataForm.proContractAttr = result.tBidProcaseApproval.proContractAttr
                                                                                                                                                this.dataForm.proRunMode = result.tBidProcaseApproval.proRunMode
                                                                                                                                                this.dataForm.proUnionCompany = result.tBidProcaseApproval.proUnionCompany
                                                                                                                                                this.dataForm.proBuildArea = result.tBidProcaseApproval.proBuildArea
                                                                                                                                                this.dataForm.planBidDate = result.tBidProcaseApproval.planBidDate
                                                                                                                                                this.dataForm.proTracker = result.tBidProcaseApproval.proTracker
                                                                                                                                                this.dataForm.contactNum = result.tBidProcaseApproval.contactNum
                                                                                                                                                this.dataForm.bidResult = result.tBidProcaseApproval.bidResult
                                                                                                                                                this.dataForm.bidCount = result.tBidProcaseApproval.bidCount
                                                                                                                                                this.dataForm.brUser = result.tBidProcaseApproval.brUser
                                                                                                                                                this.dataForm.brTime = result.tBidProcaseApproval.brTime
                                                                                                                                                this.dataForm.brRemark = result.tBidProcaseApproval.brRemark
                                                                                                                                                this.dataForm.sign = result.tBidProcaseApproval.sign
                                                                                                                                                this.dataForm.signTime = result.tBidProcaseApproval.signTime
                                                                                                                                                this.dataForm.approvalStatus = result.tBidProcaseApproval.approvalStatus
                                                                                                                                                this.dataForm.propose = result.tBidProcaseApproval.propose
                                                                                                                                                this.dataForm.result = result.tBidProcaseApproval.result
                                                                                                                                                this.dataForm.createtime = result.tBidProcaseApproval.createtime
                                                                                                                                                this.dataForm.updatetime = result.tBidProcaseApproval.updatetime
                                                                                                                                                this.dataForm.createuser = result.tBidProcaseApproval.createuser
                                                                                                                                                this.dataForm.updateuser = result.tBidProcaseApproval.updateuser
                                                                                                                                                this.dataForm.datastatus = result.tBidProcaseApproval.datastatus
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
                    tapp.services.tBidProcaseApproval.save(model).then(function(result) {
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
