<template>
  <el-submenu v-if="subMenus && subMenus.length >= 1" :data-idx="menuNav.self.id + ''" :index="menuNav.self.name + ''" :id="menuNav.self.id + ''" :class="{'sub-menus': menuNav.level == 2}">
    <template slot="title">
      <icon-svg :name="menuNav.self.icon" class="site-sidebar__menu-icon" v-if="menuNav.self.icon"></icon-svg>
      <span :style="{'padding-left':menuNav.level == 1 ? '0': '18px', 'font-size': menuNav.level == 1 ? '16px': '15px'}">{{ menuNav.self.title }}</span>
    </template>
    <sub-menu-nav v-for="item in subMenus" :key="item.self.id" :menu-nav="item"></sub-menu-nav>
  </el-submenu>
  <el-menu-item :class="{'t-sub-menu-item':menuNav.level == 2, 't-sub-3-menu-item':menuNav.level == 3}" v-else :index="menuNav.self.name" :data-idx="menuNav.self.id + ''" :id="menuNav.self.id + ''" @click="gotoRouteHandle(menuNav)">
    <icon-svg :name="menuNav.self.icon" class="site-sidebar__menu-icon" v-if="menuNav.self.icon"></icon-svg>
    <span :style="{'padding-left':menuNav.level == 3 ? '12px': (menuNav.level == 2 ? '18px' : '0'), 'font-size': menuNav.level == 3 ? '14px': (menuNav.level == 2 ? '15px' : '16px')}">{{ menuNav.self.title }}</span>
  </el-menu-item>
</template>

<script>
import appRouterHelper from '@/router/appRouterHelper'

import SubMenuNav from '../sub-menu-nav'

export default {
  name: 'sub-menu-nav',
  props: {
    menuNav: Object,
    required: true
  },
  components: {
    SubMenuNav
  },
  computed: {
    subMenus () {
      let subMenus = this.menuNav.items
      return subMenus
    }
  },
  methods: {
    // 跳转到菜单导航对应路由
    gotoRouteHandle (menuNav) {
      let url = menuNav.self.path
      let routeName = menuNav.self.name
      this.$router.push({
        path: url
      })
    }
  }
}
</script>
<style lang="scss">
.t-sub-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  background: rgba(21, 69, 145, 0.8) !important;
}
.t-sub-3-menu-item {
  /* padding-left: 52px !important; */
  height: 35px !important;
  line-height: 35px !important;
  background: rgba(39, 78, 137, 0.6) !important;
}
.site-sidebar__menu-icon{
  width:15px;
  margin-right: 11px;
}
.sub-menus {
  .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
    background: rgba(21, 69, 145, 0.8) !important;
  }
}
</style>
