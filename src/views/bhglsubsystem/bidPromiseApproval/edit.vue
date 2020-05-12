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
                            <el-form-item prop="pcId" label="项目备案id">
                                <el-input v-model="dataForm.pcId"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="promiseWay" label="保证方式（字典表）">
                                <el-input v-model="dataForm.promiseWay"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="amount" label="金额">
                                <el-input v-model="dataForm.amount"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="isCash" label="是否现金缴纳（字典表）">
                                <el-input v-model="dataForm.isCash"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="generateBank" label="开立银行">
                                <el-input v-model="dataForm.generateBank"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="generateTime" label="开立时间">
                                <el-input v-model="dataForm.generateTime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="invalidTime" label="到期时间">
                                <el-input v-model="dataForm.invalidTime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="plCode" label="保函编号">
                                <el-input v-model="dataForm.plCode"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="remark" label="备注">
                                <el-input v-model="dataForm.remark"></el-input>
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
                                                                                                                                                    bId: '',                                                                                                                                                            actTaskKey: '',                                                                                                                                                            pcId: '',                                                                                                                                                            promiseWay: '',                                                                                                                                                            amount: '',                                                                                                                                                            isCash: '',                                                                                                                                                            generateBank: '',                                                                                                                                                            generateTime: '',                                                                                                                                                            invalidTime: '',                                                                                                                                                            plCode: '',                                                                                                                                                            remark: '',                                                                                                                                                            sign: '',                                                                                                                                                            signTime: '',                                                                                                                                                            approvalStatus: '',                                                                                                                                                            propose: '',                                                                                                                                                            result: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
                dataRule: {
                                                                                                                                                    bId: [
                                { required: true, message: '流程业务id不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            actTaskKey: [
                                { required: true, message: 'activiti执行任务key不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            pcId: [
                                { required: true, message: '项目备案id不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            promiseWay: [
                                { required: true, message: '保证方式（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            amount: [
                                { required: true, message: '金额不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            isCash: [
                                { required: true, message: '是否现金缴纳（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            generateBank: [
                                { required: true, message: '开立银行不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            generateTime: [
                                { required: true, message: '开立时间不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            invalidTime: [
                                { required: true, message: '到期时间不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            plCode: [
                                { required: true, message: '保函编号不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            remark: [
                                { required: true, message: '备注不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            sign: [
                                { required: true, message: '执行人不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            signTime: [
                                { required: true, message: '执行时间不能为空', trigger: 'blur' }
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
                            tapp.services.bidPromiseApproval.get(id).then(function(result) {
                                self.$util.deepObjectAssign({}, self.dataForm, result)
                                                                                                                                                                                this.dataForm.bId = result.bidPromiseApproval.bId
                                                                                                                                                this.dataForm.actTaskKey = result.bidPromiseApproval.actTaskKey
                                                                                                                                                this.dataForm.pcId = result.bidPromiseApproval.pcId
                                                                                                                                                this.dataForm.promiseWay = result.bidPromiseApproval.promiseWay
                                                                                                                                                this.dataForm.amount = result.bidPromiseApproval.amount
                                                                                                                                                this.dataForm.isCash = result.bidPromiseApproval.isCash
                                                                                                                                                this.dataForm.generateBank = result.bidPromiseApproval.generateBank
                                                                                                                                                this.dataForm.generateTime = result.bidPromiseApproval.generateTime
                                                                                                                                                this.dataForm.invalidTime = result.bidPromiseApproval.invalidTime
                                                                                                                                                this.dataForm.plCode = result.bidPromiseApproval.plCode
                                                                                                                                                this.dataForm.remark = result.bidPromiseApproval.remark
                                                                                                                                                this.dataForm.sign = result.bidPromiseApproval.sign
                                                                                                                                                this.dataForm.signTime = result.bidPromiseApproval.signTime
                                                                                                                                                this.dataForm.approvalStatus = result.bidPromiseApproval.approvalStatus
                                                                                                                                                this.dataForm.propose = result.bidPromiseApproval.propose
                                                                                                                                                this.dataForm.result = result.bidPromiseApproval.result
                                                                                                                                                this.dataForm.createtime = result.bidPromiseApproval.createtime
                                                                                                                                                this.dataForm.updatetime = result.bidPromiseApproval.updatetime
                                                                                                                                                this.dataForm.createuser = result.bidPromiseApproval.createuser
                                                                                                                                                this.dataForm.updateuser = result.bidPromiseApproval.updateuser
                                                                                                                                                this.dataForm.datastatus = result.bidPromiseApproval.datastatus
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
                    tapp.services.bidPromiseApproval.save(model).then(function(result) {
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
