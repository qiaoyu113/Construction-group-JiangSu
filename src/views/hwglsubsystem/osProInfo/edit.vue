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
                            <el-form-item prop="code" label="项目编号：">
                                <el-input v-model="dataForm.code"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="name" label="项目名称：">
                                <el-input v-model="dataForm.name"></el-input>
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
                            <el-form-item prop="contractAttr" label="承包形式（字典表）：">
                                <el-input v-model="dataForm.contractAttr"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="respCompany" label="总包单位：">
                                <el-input v-model="dataForm.respCompany"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proType" label="项目类别（字典表）：">
                                <el-input v-model="dataForm.proType"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="enginType" label="工程类别（字典表）：">
                                <el-input v-model="dataForm.enginType"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proSubType" label="类别子项（字典表）：">
                                <el-input v-model="dataForm.proSubType"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="currencyCode" label="货币代码（字典表）：">
                                <el-input v-model="dataForm.currencyCode"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proRegister" label="登记人：">
                                <el-input v-model="dataForm.proRegister"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proRegisterTime" label="登记时间：">
                                <el-input v-model="dataForm.proRegisterTime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="remark" label="备注：">
                                <el-input v-model="dataForm.remark"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="proStatue" label="项目状态（字典表）：">
                                <el-input v-model="dataForm.proStatue"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="createtime" label="创建时间：">
                                <el-input v-model="dataForm.createtime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="updatetime" label="更新时间：">
                                <el-input v-model="dataForm.updatetime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="createuser" label="创建人：">
                                <el-input v-model="dataForm.createuser"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="updateuser" label="更新人：">
                                <el-input v-model="dataForm.updateuser"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="datastatus" label="数据有效性 1有效 0无效：">
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
                                                                                                                                                    code: '',                                                                                                                                                            name: '',                                                                                                                                                            address: '',                                                                                                                                                            constructCompany: '',                                                                                                                                                            totalInvestment: '',                                                                                                                                                            subCompany: '',                                                                                                                                                            contractAttr: '',                                                                                                                                                            respCompany: '',                                                                                                                                                            proType: '',                                                                                                                                                            enginType: '',                                                                                                                                                            proSubType: '',                                                                                                                                                            currencyCode: '',                                                                                                                                                            proRegister: '',                                                                                                                                                            proRegisterTime: '',                                                                                                                                                            remark: '',                                                                                                                                                            proStatue: '',                                                                                                                                                            createtime: '',                                                                                                                                                            updatetime: '',                                                                                                                                                            createuser: '',                                                                                                                                                            updateuser: '',                                                                                                                                                            datastatus: ''                                                                                        },
                dataRule: {
                                                                                                                                                    code: [
                                { required: true, message: '项目编号不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            name: [
                                { required: true, message: '项目名称不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            address: [
                                { required: true, message: '项目地址不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            constructCompany: [
                                { required: true, message: '建设单位不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            totalInvestment: [
                                { required: true, message: '项目总投资不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            subCompany: [
                                { required: true, message: '所属分公司不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            contractAttr: [
                                { required: true, message: '承包形式（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            respCompany: [
                                { required: true, message: '总包单位不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proType: [
                                { required: true, message: '项目类别（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            enginType: [
                                { required: true, message: '工程类别（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proSubType: [
                                { required: true, message: '类别子项（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            currencyCode: [
                                { required: true, message: '货币代码（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proRegister: [
                                { required: true, message: '登记人不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proRegisterTime: [
                                { required: true, message: '登记时间不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            remark: [
                                { required: true, message: '备注不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            proStatue: [
                                { required: true, message: '项目状态（字典表）不能为空', trigger: 'blur' }
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
                            tapp.services.osProInfo.get(id).then(function(result) {
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
                    })
                }
            },
            // 表单提交
            doSave () {
                let self = this;
                let validPromises = [self.$refs['ruleForm'].validate()];
                Promise.all(validPromises).then(resultList => {
                    let model = { ...self.dataForm };
                    tapp.services.osProInfo.save(model).then(function(result) {
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
