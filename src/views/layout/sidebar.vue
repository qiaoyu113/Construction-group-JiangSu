<template>
<aside class="site-sidebar" :class="sidebarClasses">
  <div class="sidebar-search">
    <t-input placeholder="搜索" v-if="!$store.state.ui.sidebarCollapse">
      <i slot="suffix" class="el-input__icon el-icon-search"></i>
    </t-input>
    <div class="icon" @click="handleCollsapse()" :style="{'width': !$store.state.ui.sidebarCollapse ? '15%': '100%'}">
      <i v-if="!$store.state.ui.sidebarCollapse" class="el-icon-s-fold"></i>
      <i v-if="$store.state.ui.sidebarCollapse" class="el-icon-s-unfold"></i>
    </div>
  </div>
  <div class="site-sidebar__inner">
    <el-menu :default-active="menuNavActiveName" @open="handleOpen" unique-opened text-color="#ffffff" background-color="#20335D" active-text-color="#357EF7" :collapse="$store.state.ui.sidebarCollapse" :collapse-transition="false" class="site-sidebar__menu">
      <sub-menu-nav v-for="menuNav in menuNavList" :key="menuNav.self.id" :menu-nav="menuNav">
      </sub-menu-nav>
    </el-menu>
  </div>
</aside>
</template>

<script>
import SubMenuNav from '@/components/sub-menu-nav'

import {
  mapMutations,
  mapState
} from 'vuex'
import {
  getRouteNameByUrl
} from '@/util'
import isEmpty from 'lodash/isEmpty'
import appRouterHelper from '@/router/appRouterHelper'
import router from '@/router'

export default {
  data () {
    return {
      menuNavActiveName: null,
      menuNavList: []
    }
  },
  components: {
    SubMenuNav
  },
  computed: {
    ...mapState({
      path: state => state.route.path
    }),
    sidebarClasses () {
      let skin = this.$store.state.ui.sidebarLayoutSkin
      return [!/\S/.test(skin) || skin === 'light' ? '' : `site-sidebar--${skin}`]
    }
  },
  watch: {
    $route: 'routeHandle'
  },
  mounted () {

  },
  created () {
    this.getUserSystemInfo()
  },
  methods: {
    // 获取菜单导航列表 / 权限
    getUserSystemInfo () {
      let self = this
      self.$http.post('/authapi/base_Account/getUserSystemInfo', {}).then(function (response) {
        let {
            authoritiyNavigationTree,
            notificationCount,
            permissions
          } = response
        self.menuNavList = authoritiyNavigationTree || []
        self.routeHandle(self.$route)
        self.$store.commit('setNotificationNum', notificationCount)
        self.$store.commit('setPermissions', permissions)
      })
        .catch(function (error) {
          window.console && console.log(error)
          // self.$message.error(error);
        })
    },
    // 路由操作
    routeHandle (route) {
      if (route.meta && route.meta.isTab) {
        let tab = {
          id: route.name,
          name: route.name,
          title: route.meta.title,
          type: (window.SITE_CONFIG.nestIframeRouteNameList || []).indexOf(route.name) !== -1 ? 'iframe' : 'module',
          url: route.fullPath,
          show: route.meta.show
        }
        this.ADD_CONTENT_TAB(tab)

        this.menuNavActiveName = route.name
        this.UPDATE_CONTENT_TABS_ACTIVE_NAME({
          name: route.name
        })
      }
    },

    handleOpen(key, keyPath) {
      console.log('key, path', key, keyPath);
    },
    handleCollsapse() {
      // types.SWITCH_SIDEBAR_COLLAPSE
      this.SWITCH_SIDEBAR_COLLAPSE({collapse: !this.$store.state.ui.sidebarCollapse})
    },
    
    ...mapMutations(['ADD_CONTENT_TAB', 'UPDATE_CONTENT_TABS_ACTIVE_NAME', 'SWITCH_SIDEBAR_COLLAPSE'])
  }
}
</script>
<style lang="scss" scoped>
#driver-highlighted-element-stage {
  opacity: 0.1;
}
</style>
