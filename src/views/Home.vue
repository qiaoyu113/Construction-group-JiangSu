<template>
<div class="container home">
  <div class="content has-text-centered">
    <!-- <div>
      <h2 id="-b">技术说明</h2>
      <hr>
      <ul>
        <li>java版本:jdk1.8</li>
        <li>spring boot:2.0.1</li>
        <li>数据库：mysql-5.7.14</li>
        <li>工作流：activiti-5.22.0</li>
        <li>前端：vue-2.6.11</li>
        <li>前端 element ui：2.13.0</li>
      </ul>
    </div> -->
    <el-row :gutter="0">
      <el-col :span="12">
          <div class="title">
            <el-badge :value="12" class="item first-card">
              我的待办
            </el-badge>
          </div>
        <el-card shadow="never">
          <div slot="header">
            <div class="header-line" @click="handleMore('1')">更多<icon-svg name="more" style="width: 11px;margin: 0 2px;"></icon-svg></div>
          </div>
          <div>
            <home-list type="1" showTag :list="list"></home-list>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <div class="title">到期提醒</div>
        <el-card shadow="never">
          <div slot="header">
            <div class="header-line" @click="handleMessage()">
              <el-badge :value="12" class="item">
                <!-- <i class="el-icon-message" width="30"></i> -->
                <icon-svg name="mail" style="width: 26px;"></icon-svg>
              </el-badge>
            </div>
          </div>
          <div>
            <home-list type="2" :list="list"></home-list>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="12">
        <div class="title">公告栏</div>
        <el-card shadow="never">
          <div slot="header">
            <div class="header-line" @click="handleMore('3')">更多<icon-svg name="more" style="width: 11px;margin: 0 2px;"></icon-svg></div>
          </div>
          <div>
            <home-list type="3" :notifications="notifications"></home-list>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <div class="title">我的已办</div>
        <el-card shadow="never">
          <div slot="header">
            <div class="header-line" @click="handleMore('4')">
              <div style="color: #333;margin-right: 15px;display: flex;align-items:center;"><div class="doing"></div>审批中</div>
              <div style="color: #333;margin-right: 40px;display: flex;align-items:center;"><div class="done"></div>已审批</div>
              更多<icon-svg name="more" style="width: 11px;margin: 0 2px;"></icon-svg>
            </div>
          </div>
          <div>
            <home-list type="4" doneStatus :list="doneList"></home-list>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import HomeList from '@/components/home-list/index.vue'
export default {
  components: {HomeList},
  data () {
    return {
      showTag: true,
      list: [
        { id: '1', type: '项目备案管理', title: '重大危险源文件审批', brief: 'xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人'},
        { id: '2', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '3', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '4', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '5', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '6', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '7', type: '项目备案管理', title: '重大危险源文件审批', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
      ],
      doneList: [
        { id: '1', status: true, type: '项目备案管理', title: '重大危险源文件审批', brief: 'xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人'},
        { id: '2', status: true, type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '3', status: false, type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '4', status: true, type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '5', status: false, type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '6', status: true, type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
        { id: '7', status: false, type: '项目备案管理', title: '重大危险源文件审批', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
      ],
      notifications: [
        { id: '1', showIcon: true, title: '重大危险源文件审批重大危险源文件审批重大危险源文件审批重大危险源文件审批重大危险源文件审批重大危险源文件审批重大危险源文件审批', time: '2020-05-22'},
        { id: '2', showIcon: true, title: '项目备案登记', time: '2020-05-22'},
        { id: '3', showIcon: true, title: '项目备案登记', time: '2020-05-22'},
        { id: '4', showIcon: false, title: '项目备案登记', time: '2020-05-22'},
        { id: '5', showIcon: false, title: '项目备案登记', time: '2020-05-22'},
        { id: '6', showIcon: false, title: '项目备案登记', time: '2020-05-22'},
        { id: '7', showIcon: false, title: '重大危险源文件审批', time: '2020-05-22'},
      ]
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init() {

    },
    handleMessage() {

    },
    handleMore(type) {

    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  .header-line {
    width: 100%;
    color: #357EF7;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 15px;
  }
  .title {
    background: #357EF7 url("~@/assets/img/wave.png");
    background-size: cover;
    padding: 14px 28px;
    height: fit-content;
    width: fit-content;
    color: #fff;
    font-size: 18px;
    border-top-left-radius: 18px;
    border-bottom-right-radius: 18px;
    box-shadow:0px 8px 6px rgba(0,0,0,0.16);
    margin-bottom: -42px;
    margin-left: 9px;
    z-index: 100;
    position: relative;
    font-weight: 500;
  }
  .el-icon-message:before {
    font-size: 20px;
  }
  .done {
    width:10px;
    height:10px;
    background:rgba(248,178,132,0.98);
    border-radius:50%;
    margin: 0 5px;
  }
  .doing {
    width:10px;
    height:10px;
    background:rgba(41,146,69,0.67);
    border-radius:50%;
    margin: 0 5px;
  }
}
</style>

