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
                            <el-form-item prop="pId" label="项目id">
                                <el-input v-model="dataForm.pId"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="cId" label="主合同id">
                                <el-input v-model="dataForm.cId"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conCode" label="备案合同编号">
                                <el-input v-model="dataForm.conCode"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conName" label="备案合同名称">
                                <el-input v-model="dataForm.conName"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conModality" label="备案合同形式（字典表）">
                                <el-input v-model="dataForm.conModality"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conStartDate" label="备案合同开始日期">
                                <el-input v-model="dataForm.conStartDate"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="conEndDate" label="备案合同结束日期">
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
                            <el-form-item prop="conTotal" label="备案合同额">
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
                                                                                                                                                    pId: '',                                                                                                                                                            cId: '',                                                                                                                                                            conCode: '',                                                                                                                                                            conName: '',                                                                                                                                                            conModality: '',                                                                                                                                                            conStartDate: '',                                                                                                                                                            conEndDate: '',                                                                                                                                                            conSigningDate: '',                                                                                                                                                            conPayWay: '',                                                                                                                                                            otherPayWay: '',                                                                                                                                                            conTotal: '',                                                                                                                                                            conSelfProportion: '',                                                                                                                                                            conOtherProportion: '',                                                                                                                                                            conPayStandard: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
                dataRule: {
                                                                                                                                                    pId: [
                                { required: true, message: '项目id不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            cId: [
                                { required: true, message: '主合同id不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conCode: [
                                { required: true, message: '备案合同编号不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conName: [
                                { required: true, message: '备案合同名称不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conModality: [
                                { required: true, message: '备案合同形式（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conStartDate: [
                                { required: true, message: '备案合同开始日期不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            conEndDate: [
                                { required: true, message: '备案合同结束日期不能为空', trigger: 'blur' }
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
                                { required: true, message: '备案合同额不能为空', trigger: 'blur' }
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
                            tapp.services.tContBranchInfo.get(id).then(function(result) {
                                self.$util.deepObjectAssign({}, self.dataForm, result)
                                                                                                                                                                                this.dataForm.pId = result.tContBranchInfo.pId
                                                                                                                                                this.dataForm.cId = result.tContBranchInfo.cId
                                                                                                                                                this.dataForm.conCode = result.tContBranchInfo.conCode
                                                                                                                                                this.dataForm.conName = result.tContBranchInfo.conName
                                                                                                                                                this.dataForm.conModality = result.tContBranchInfo.conModality
                                                                                                                                                this.dataForm.conStartDate = result.tContBranchInfo.conStartDate
                                                                                                                                                this.dataForm.conEndDate = result.tContBranchInfo.conEndDate
                                                                                                                                                this.dataForm.conSigningDate = result.tContBranchInfo.conSigningDate
                                                                                                                                                this.dataForm.conPayWay = result.tContBranchInfo.conPayWay
                                                                                                                                                this.dataForm.otherPayWay = result.tContBranchInfo.otherPayWay
                                                                                                                                                this.dataForm.conTotal = result.tContBranchInfo.conTotal
                                                                                                                                                this.dataForm.conSelfProportion = result.tContBranchInfo.conSelfProportion
                                                                                                                                                this.dataForm.conOtherProportion = result.tContBranchInfo.conOtherProportion
                                                                                                                                                this.dataForm.conPayStandard = result.tContBranchInfo.conPayStandard
                                                                                                                                                this.dataForm.createtime = result.tContBranchInfo.createtime
                                                                                                                                                this.dataForm.updatetime = result.tContBranchInfo.updatetime
                                                                                                                                                this.dataForm.createuser = result.tContBranchInfo.createuser
                                                                                                                                                this.dataForm.updateuser = result.tContBranchInfo.updateuser
                                                                                                                                                this.dataForm.datastatus = result.tContBranchInfo.datastatus
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
                    tapp.services.tContBranchInfo.save(model).then(function(result) {
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
