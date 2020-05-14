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
                            <el-form-item prop="pId" label="项目id">
                                <el-input v-model="dataForm.pId"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conCode" label="合同编号">
                                <el-input v-model="dataForm.conCode"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conName" label="合同名称">
                                <el-input v-model="dataForm.conName"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conModality" label="合同形式（字典表）">
                                <el-input v-model="dataForm.conModality"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conStartDate" label="合同开始日期">
                                <el-input v-model="dataForm.conStartDate"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conEndDate" label="合同结束日期">
                                <el-input v-model="dataForm.conEndDate"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conSigningDate" label="签订日期">
                                <el-input v-model="dataForm.conSigningDate"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conPayWay" label="付款方式（字典表）">
                                <el-input v-model="dataForm.conPayWay"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="otherPayWay" label="其他付款方式">
                                <el-input v-model="dataForm.otherPayWay"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conTotal" label="合同总额">
                                <el-input v-model="dataForm.conTotal"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conSelfProportion" label="自营占比">
                                <el-input v-model="dataForm.conSelfProportion"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conOtherProportion" label="联营占比">
                                <el-input v-model="dataForm.conOtherProportion"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conPayStandard" label="合同收款条件">
                                <el-input v-model="dataForm.conPayStandard"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conStatus" label="合同状态（字典表）">
                                <el-input v-model="dataForm.conStatus"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="approvalStatus" label="审批状态（字典表）">
                                <el-input v-model="dataForm.approvalStatus"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="sign" label="执行人">
                                <el-input v-model="dataForm.sign"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="signTime" label="执行时间">
                                <el-input v-model="dataForm.signTime"></el-input>
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
                                                                                                                                                    bId: '',                                                                                                                                                            actTaskKey: '',                                                                                                                                                            pId: '',                                                                                                                                                            conCode: '',                                                                                                                                                            conName: '',                                                                                                                                                            conModality: '',                                                                                                                                                            conStartDate: '',                                                                                                                                                            conEndDate: '',                                                                                                                                                            conSigningDate: '',                                                                                                                                                            conPayWay: '',                                                                                                                                                            otherPayWay: '',                                                                                                                                                            conTotal: '',                                                                                                                                                            conSelfProportion: '',                                                                                                                                                            conOtherProportion: '',                                                                                                                                                            conPayStandard: '',                                                                                                                                                            conStatus: '',                                                                                                                                                            approvalStatus: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            propose: '',                                                                                                                                                            result: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
                dataRule: {
                                                                                                                                                    bId: [
                                { required: true, message: '流程业务id不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            actTaskKey: [
                                { required: true, message: 'activiti执行任务key不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            pId: [
                                { required: true, message: '项目id不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conCode: [
                                { required: true, message: '合同编号不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conName: [
                                { required: true, message: '合同名称不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conModality: [
                                { required: true, message: '合同形式（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conStartDate: [
                                { required: true, message: '合同开始日期不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conEndDate: [
                                { required: true, message: '合同结束日期不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conSigningDate: [
                                { required: true, message: '签订日期不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conPayWay: [
                                { required: true, message: '付款方式（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            otherPayWay: [
                                { required: true, message: '其他付款方式不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conTotal: [
                                { required: true, message: '合同总额不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conSelfProportion: [
                                { required: true, message: '自营占比不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conOtherProportion: [
                                { required: true, message: '联营占比不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conPayStandard: [
                                { required: true, message: '合同收款条件不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conStatus: [
                                { required: true, message: '合同状态（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            approvalStatus: [
                                { required: true, message: '审批状态（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            sign: [
                                { required: true, message: '执行人不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            signTime: [
                                { required: true, message: '执行时间不能为空', trigger: 'blur' }
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
                            tapp.services.tContInfoApproval.get(id).then(function(result) {
                                self.$util.deepObjectAssign({}, self.dataForm, result)
                                                                                                                                                                                this.dataForm.bId = result.tContInfoApproval.bId
                                                                                                                                                this.dataForm.actTaskKey = result.tContInfoApproval.actTaskKey
                                                                                                                                                this.dataForm.pId = result.tContInfoApproval.pId
                                                                                                                                                this.dataForm.conCode = result.tContInfoApproval.conCode
                                                                                                                                                this.dataForm.conName = result.tContInfoApproval.conName
                                                                                                                                                this.dataForm.conModality = result.tContInfoApproval.conModality
                                                                                                                                                this.dataForm.conStartDate = result.tContInfoApproval.conStartDate
                                                                                                                                                this.dataForm.conEndDate = result.tContInfoApproval.conEndDate
                                                                                                                                                this.dataForm.conSigningDate = result.tContInfoApproval.conSigningDate
                                                                                                                                                this.dataForm.conPayWay = result.tContInfoApproval.conPayWay
                                                                                                                                                this.dataForm.otherPayWay = result.tContInfoApproval.otherPayWay
                                                                                                                                                this.dataForm.conTotal = result.tContInfoApproval.conTotal
                                                                                                                                                this.dataForm.conSelfProportion = result.tContInfoApproval.conSelfProportion
                                                                                                                                                this.dataForm.conOtherProportion = result.tContInfoApproval.conOtherProportion
                                                                                                                                                this.dataForm.conPayStandard = result.tContInfoApproval.conPayStandard
                                                                                                                                                this.dataForm.conStatus = result.tContInfoApproval.conStatus
                                                                                                                                                this.dataForm.approvalStatus = result.tContInfoApproval.approvalStatus
                                                                                                                                                this.dataForm.sign = result.tContInfoApproval.sign
                                                                                                                                                this.dataForm.signTime = result.tContInfoApproval.signTime
                                                                                                                                                this.dataForm.propose = result.tContInfoApproval.propose
                                                                                                                                                this.dataForm.result = result.tContInfoApproval.result
                                                                                                                                                this.dataForm.createtime = result.tContInfoApproval.createtime
                                                                                                                                                this.dataForm.updatetime = result.tContInfoApproval.updatetime
                                                                                                                                                this.dataForm.createuser = result.tContInfoApproval.createuser
                                                                                                                                                this.dataForm.updateuser = result.tContInfoApproval.updateuser
                                                                                                                                                this.dataForm.datastatus = result.tContInfoApproval.datastatus
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
                    tapp.services.tContInfoApproval.save(model).then(function(result) {
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
