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
                                                                                                <el-col :span="8">
                            <el-form-item prop="cId" label="合同id">
                                <el-input v-model="dataForm.cId"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="opType" label="操作类型（字典表）">
                                <el-input v-model="dataForm.opType"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="cType" label="合同类型（字典表）">
                                <el-input v-model="dataForm.cType"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="createtime" label="创建时间">
                                <el-input v-model="dataForm.createtime"></el-input>
                            </el-form-item>
                        </el-col>
                                                                                <el-col :span="8">
                            <el-form-item prop="createuser" label="创建人">
                                <el-input v-model="dataForm.createuser"></el-input>
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
    export default {
        data () {
            return {
                assetCategoryClassifications: ['proma_demoform'], // 附件的分类标识 此处为示例
                docId: '',
                dataForm: {
                                                                                                                                                    cId: '',                                                                                                                                                            opType: '',                                                                                                                                                            cType: '',                                                                                                                                                            createtime: '',                                                                                                                                                            createuser: ''                                                                                        },
                dataRule: {
                                                                                                                                                    cId: [
                                { required: true, message: '合同id不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            opType: [
                                { required: true, message: '操作类型（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            cType: [
                                { required: true, message: '合同类型（字典表）不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            createtime: [
                                { required: true, message: '创建时间不能为空', trigger: 'blur' }
                            ],
                                                                                                                                                            createuser: [
                                { required: true, message: '创建人不能为空', trigger: 'blur' }
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
                            tapp.services.tContCancelLog.get(id).then(function(result) {
                                self.$util.deepObjectAssign({}, self.dataForm, result)
                                                                                                                                                                                this.dataForm.cId = result.tContCancelLog.cId
                                                                                                                                                this.dataForm.opType = result.tContCancelLog.opType
                                                                                                                                                this.dataForm.cType = result.tContCancelLog.cType
                                                                                                                                                this.dataForm.createtime = result.tContCancelLog.createtime
                                                                                                                                                this.dataForm.createuser = result.tContCancelLog.createuser
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
                    tapp.services.tContCancelLog.save(model).then(function(result) {
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
