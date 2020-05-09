<template>
  <div>
    <el-button type="primary">提交审批</el-button>
    <el-button>审批流程图</el-button>
    <el-form :model="seal" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="100px" label-position="right">
      <el-card class="box-card" :body-style="{ padding: '0 10px' }">
  <!--      <div slot="header" class="card-title">-->
  <!--        <span>项目刻章</span>-->
  <!--      </div>-->
        <el-row :gutter="20">
          <el-col>
            <h4>项目信息</h4>
            <hr class="el-row-hr" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="proName">
              <el-input v-model="seal.proName" readonly>
                <el-button slot="append" icon="el-icon-search" @click="queryDialogVisible=true"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分公司" prop="proSubCompany">
              <el-input v-model="seal.proSubCompany" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属事业部" prop="proBusDept">
              <el-input v-model="seal.proBusDept" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="建设单位" prop="proConstructCompany">
              <el-input v-model="seal.proConstructCompany" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同模式" prop="proContractAttr">
              <el-input v-model="seal.proContractAttr" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投资金额" prop="proTotalInvestment">
              <el-input v-model="seal.proTotalInvestment" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="工程类别" prop="proType">
              <el-input v-model="seal.proType" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营方式" prop="proRunMode">
              <el-input v-model="seal.proRunMode" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目规模" prop="proBuildArea">
              <el-input v-model="seal.proBuildArea" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <h4>办理信息</h4>
            <hr class="el-row-hr" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目章内容" prop="sealContent">
              <el-input v-model="seal.sealContent" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保管人" prop="sealCustodian">
              <el-input v-model="seal.sealCustodian" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="false">
          <el-col :span="12">
            <el-form-item label="经办人" prop="sign">
              <el-input v-model="seal.sign" readOnly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办时间" prop="signTime">
              <el-input v-model="seal.signTime" readOnly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="propose">
              <el-input type="textarea" :rows="2" v-model="seal.propose"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <h4>附件上传</h4>
            <hr class="el-row-hr" />
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <el-dialog title="项目选择" :visible.sync="queryDialogVisible" width="70%">
      <el-button type="primary" size="small">确定</el-button><el-button size="small">取消</el-button>
      <t-grid ref="searchProList" :options="proGridOptions">
      </t-grid>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        queryDialogVisible: false,
        seal: {
          pId: '',
          proName: '',
          proSubCompany: '',
          proBusDept: '',
          proConstructCompany: '',
          proContractAttr: '',
          proTotalInvestment: '',
          proType: '',
          proRunMode: '',
          proBuildArea: '',
          sealContent: '',
          sealCustodian: '',
          sign: '',
          signTime: '',
          propose: ''
        },
        proGridOptions: {
          dataSource: {
            serviceInstance: tapp.services.pL_LoanEnter.getPagedList,
            serviceInstanceInputParameters: {
              searchKey: null
            }
          },
          grid: {
            mutiSelect: false,
            columns: [{
              prop: 'proCode',
              label: '项目编号',
              sortable: true,
              fixed: 'left',
              width: 120
            },
            {
              prop: 'proName',
              label: '项目名称',
              sortable: true,
              fixed: 'left',
              width: 100
            },
            {
              prop: 'proSubCompany',
              label: '所属分公司',
              sortable: true,
              width: 170
            },
            {
              prop: 'proBusDept',
              label: '所属事业部',
              sortable: true,
              width: 170
            },
            {
              prop: 'proType',
              label: '工程类别',
              sortable: true,
              width: 170
            },
            {
              prop: 'proConstructCompany',
              label: '建设单位',
              sortable: true,
              width: 170
            },
            {
              prop: 'proAddressAll',
              label: '项目地址',
              sortable: true,
              width: 170
            },
            {
              prop: 'proRunMode',
              label: '经营方式',
              sortable: true,
              width: 170
            },
            {
              prop: 'proManager',
              label: '项目经理',
              sortable: true,
              width: 170
            }
            ]
          }
        }
      }
    },
    methods: {
      doSave () {

      }
    }
  }
</script>

<style scoped>
.el-card{
  margin: 10px 0;
  height: 100%;
}
.card-title {
  text-align: center;
  font-size: 20px;
}
</style>
