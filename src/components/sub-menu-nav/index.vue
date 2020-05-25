<template>
  <el-submenu v-if="subMenus && subMenus.length >= 1" :data-idx="menuNav.self.id + ''" :index="menuNav.self.name + ''" :id="menuNav.self.id + ''">
    <template slot="title">
      <icon-svg :name="menuNav.self.icon" class="site-sidebar__menu-icon" v-if="menuNav.self.icon"></icon-svg>
      <span :style="{'padding-left':menuNav.self.icon? '0': '18px'}">{{ menuNav.self.title }}</span>
    </template>
    <sub-menu-nav v-for="item in subMenus" :key="item.self.id" :menu-nav="item"></sub-menu-nav>
  </el-submenu>
  <el-menu-item :class="{'t-sub-menu-item':menuNav.level>1}" v-else :index="menuNav.self.name" :data-idx="menuNav.self.id + ''" :id="menuNav.self.id + ''" @click="gotoRouteHandle(menuNav)">
    <icon-svg :name="menuNav.self.icon" class="site-sidebar__menu-icon" v-if="menuNav.self.icon"></icon-svg>
    <span :style="{'padding-left':menuNav.self.icon? '0': '8px'}">{{ menuNav.self.title }}</span>
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
<style>
.t-sub-menu-item {
  /* padding-left: 52px !important; */
  /* height: 42px !important;
  line-height: 42px !important; */
  background: rgba(36, 51, 85, 1) !important;
}
.site-sidebar__menu-icon{
  width:24px;
}
</style>
