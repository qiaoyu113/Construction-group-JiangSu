<template>
<aside class="site-sidebar" :class="sidebarClasses">
  <div class="sidebar-search">
    <t-input placeholder="搜索">
      <i slot="suffix" class="el-input__icon el-icon-search"></i>
    </t-input>
    <div class="icon" @click="handleCollsapse()">
      <i v-if="!$store.state.ui.sidebarSpread" class="el-icon-s-fold"></i>
      <i v-if="$store.state.ui.sidebarSpread" class="el-icon-s-unfold"></i>
    </div>
  </div>
  <div class="site-sidebar__inner">
    <el-menu :default-active="menuNavActiveName" @open="handleOpen" :default-openeds="defaultOpends" text-color="#ffffff" background-color="#20335D" active-text-color="#357EF7" :collapse-transition="false" class="site-sidebar__menu">
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
      menuNavList: [],
      defaultOpends: [],
      menuIds: [],
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
        self.menuNavList.map((item) => {
          self.menuIds.push(item.self.id)
          if(item.hasChildren) {
            item.items.map(_item => {
              self.menuIds.push(_item.self.id)
              if(_item.hasChildren) {
                _item.items.map(__item => {
                  self.menuIds.push(__item.self.id)
                })
              }
            })
          }
        })
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
      // console.log('key, path', key, keyPath);
    },
    handleCollsapse() {
      if(!this.$store.state.ui.sidebarSpread) {
        this.defaultOpends = this.menuIds
      } else {
        this.defaultOpends = []
      }
      this.SWITCH_SIDEBAR_SPREAD({spread: !this.$store.state.ui.sidebarSpread})
    },
    
    ...mapMutations(['ADD_CONTENT_TAB', 'UPDATE_CONTENT_TABS_ACTIVE_NAME', 'SWITCH_SIDEBAR_SPREAD'])
  }
}
</script>
<style lang="scss" scoped>
#driver-highlighted-element-stage {
  opacity: 0.1;
}
</style>
