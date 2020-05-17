<template>
  <div class="home-list">
    <el-row>
      <div v-if="list" v-for="item in list.slice(0, 6)" :key="item.id">
        <div class="list-item" @click="handleItemClick(item)">
          <el-tag v-if="showTag" effect="plain" size="small">{{
            item.type
          }}</el-tag>
          <div v-if="doneStatus">
            <div v-if="item.status" class="done"></div>
            <div v-else class="doing"></div>
          </div>
          <div
            class="list-item-title"
            :class="{ 'margin-left-15': showTag || doneStatus }"
          >
            {{ item.title }}
          </div>
          <div class="list-item-brief margin-left-15">{{ item.brief }}</div>
        </div>
        <el-divider></el-divider>
      </div>
      <div
        v-if="notifications"
        v-for="item in notifications.slice(0, 6)"
        :key="item.id"
      >
        <div class="list-notifications-item" @click="handleItemClick(item)">
          <div class="list-notifications-item-img">
            <img v-if="item.showIcon" src="~@/assets/img/zhiding.png" alt="" />
          </div>
          <div class="list-notifications-item-title margin-left-15">
            {{ item.title }}
          </div>
          <div class="list-notifications-item-time margin-left-15">
            {{ item.time }}
          </div>
        </div>
        <el-divider></el-divider>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    type: {
      type: String || Number,
      default: '1',
      required: false,
    },
    showTag: {
      type: Boolean,
      default: false,
      required: false,
    },
    doneStatus: {
      type: Boolean,
      default: false,
      required: false,
    },
    list: {
      type: Array,
      default: () => [],
      required: false,
    },
    notifications: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      // showTag: true,
      // list: [
      //   { id: '1', type: '项目备案管理', title: '重大危险源文件审批', brief: 'xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人xxxxx项目-发起部门-发起时间-发起人'},
      //   { id: '2', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
      //   { id: '3', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
      //   { id: '4', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
      //   { id: '5', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
      //   { id: '6', type: '项目备案管理', title: '项目备案登记', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
      //   { id: '7', type: '项目备案管理', title: '重大危险源文件审批', brief: 'xxxxx项目-发起部门-发起时间-发起人'},
      // ]
    };
  },
  watch: {},
  created() {
    console.log("this.showTag", this.showTag);
    console.log("this.list", this.list);
  },
  mounted() {},
  computed: {},
  methods: {
    handleItemClick(item) {
      this.$emit("item-click", item);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";
.home-list {
  color: #333;
}
.margin-left-15 {
  margin-left: 15px;
}
.list-item {
  width: 100%;
  display: flex;
  align-items: center;
  height: 24px;
  &-title {
    font-weight: 500;
    width: fit-content;
    white-space: nowrap;
  }
  &-brief {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.list-notifications-item {
  width: 100%;
  display: flex;
  align-items: center;
  height: 24px;
  justify-content: flex-start;
  &-img {
    width: 24px;
  }
  &-title {
    font-weight: 500;
    width: calc(100% - 124px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }
  &-time {
    min-width: 100px;
    text-align: right;
  }
}
.el-divider--horizontal {
  // background-color: #707070;
  opacity: 0.67;
  height: 0.5px;
  margin: 12px 0;
}
.el-tag {
  border-radius: 25px;
}
.done {
  width: 10px;
  height: 10px;
  background: rgba(248, 178, 132, 0.98);
  border-radius: 50%;
}
.doing {
  width: 10px;
  height: 10px;
  background: rgba(41, 146, 69, 0.67);
  border-radius: 50%;
}
</style>
