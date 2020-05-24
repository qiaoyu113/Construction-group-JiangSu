// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import store from '@/store' // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie' // api: https://github.com/alfhen/vue-cookie
import ElementUI from 'element-ui'
import ElementUIVerify from 'element-ui-verify'
import '@/icons' // api: http://www.iconfont.cn/
import '@/assets/scss/index.scss'
import '@/assets/global.scss'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

import Vuex from 'vuex'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueLazyload from 'vue-lazyload'
import VCharts from 'v-charts'
import {
  MakingForm,
  GenerateForm
} from '@/components/form-designer'

Vue.use(ElementUI, {size: 'medium'})

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(VueLazyload, {

  　　 // 设置默认显示的图片

  loading: require('./assets/img/loading.gif'),
  error: require('./assets/img/error.jpg')
})

Vue.use(VCharts)

Vue.component('t-form-designer', MakingForm)
Vue.component('t-extend-form', GenerateForm)

// https://github.com/aweiu/element-ui-verify
/*
length: 校验文本长度
minLength: 校验文本最短长度
gt: 校验数字要大于某数
gte: 校验数字要大于等于某数
lt: 校验数字要小于某数
lte: 校验数字要小于等于某数
maxDecimalLength: 校验数字最大小数位
number: 校验是否为数字
int: 校验是否为整数
phone: 校验是否为手机号（随着号段的增加，未来可能需要更新）
email: 校验是否为电子邮件地址
verifyCode: 校验是否为6位数字验证码

*/
Vue.use(ElementUIVerify, {})

Vue.use(VueCookie)

Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    zIndex: 9999,
    'inline': true,
    'button': true,
    'navbar': false,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': false,
    'keyboard': true,
    'url': 'data-source'
  }
})

Vue.config.productionTip = false

import router from '@/router' // api: https://github.com/vuejs/vue-router
import VueRouter from 'vue-router'
import {
  sync
} from 'vuex-router-sync'

import http from './http'
import util from './util'

Vue.prototype.$http = http
Vue.prototype.$util = util

import TGrid from './components/TGrid.vue'
import TEditGrid from './components/TEditGrid.vue'
import TEditGridColumn from './components/TEditGridColumn.vue'
import TDicCategoryCascader from './components/TDicCategoryCascader.vue'
import TDicDropdownSelect from './components/TDicDropdownSelect.vue'
import TDicRadioSelect from './components/TDicRadioSelect.vue'
import TDicCheckBoxSelect from './components/TDicCheckBoxSelect.vue'
import TDicTreeSelect from './components/TDicTreeSelect.vue'
import TDicMultiTreeSelect from './components/TDicMultiTreeSelect.vue'
import TCascader from './components/TCascader.vue'
import TExcelImport from './components/TExcelImport.vue'
import TTree from './components/TTree.vue'
import TInput from './components/TInput.vue'
import TNumberInput from './components/TNumberInput.vue'
import TNumberRangeInput from './components/TNumberRangeInput.vue'
import TCurrencyInput from './components/TCurrencyInput.vue'
import TCurrencyRangeInput from './components/TCurrencyRangeInput.vue'
import TPercentInput from './components/TPercentInput.vue'
import TPercentRangeInput from './components/TPercentRangeInput.vue'
import TIntInput from './components/TIntInput.vue'
import TIntRangeInput from './components/TIntRangeInput.vue'
import TDicAutoComplete from './components/TDicAutoComplete.vue'
import TDateTimePicker from './components/TDateTimePicker.vue'
import TDataTimeView from './components/TDateTimeView.vue'
import TDateTimeRangePicker from './components/TDateTimeRangePicker.vue'
import TTimePicker from './components/TTimePicker.vue'
import THtmlPanel from './components/THtmlPanel.vue'
import TPopoverHyperlink from './components/TPopoverHyperlink.vue'
import TEditor from './components/TEditor.vue'
import TSwitch from './components/TSwitch.vue'
import THignlightView from './components/THignlightView.vue'
import userSelect from './views/publicsubsystem/components/userSelect.vue'
import userMultiSelect from './views/publicsubsystem/components/userMultiSelect.vue'
import organizationSelect from './views/publicsubsystem/components/organizationSelect.vue'
import wfProcessTrack from './views/publicsubsystem/components/wfProcessTrack.vue'
import wfTaskInfo from './views/publicsubsystem/processinst/wfTaskInfo.vue'
import assetMultiManagement from './views/publicsubsystem/components/assetMultiManagement.vue'
import assetSingleManagement from './views/publicsubsystem/components/assetSingleManagement.vue'
import imageAssetManagement from './views/publicsubsystem/components/imageAssetManagement.vue'
import exportTemplate from './views/publicsubsystem/components/exportTemplate.vue'
import TQrCode from './components/TQrCode.vue'
import TForm from './components/TForm.vue'
import SJUpload from './components/SJupload.vue'
import TTextInput from './components/text-input/index.vue'
import TSubTitle from './components/sub-title/index.vue'
import TRegionPicker from './components/regions/region-picker.vue'
import TWorkflowMap from './components/workflow-map/index.vue'
import TProjectSelect from './components/popup/project-select.vue'
import TBankSelect from './components/popup/bank-select.vue'
import TBankProjectSelect from './components/popup/bank-project-select.vue'
import TProjectCtaxaApproval from './components/popup/projcet-ctaxa-approval'
import THandlerSelect from './components/popup/handler-select.vue'
import TPartnerSelect from './components/popup/partner-select.vue'
import TMainChargeSelect from './components/popup/maincharge-select.vue'
import TManagerSelect from './components/popup/manager-select.vue'
import TRecordSelect from './components/popup/record-select.vue'
import TFirstParty from './components/two-party/first-party.vue'
import TSecondParty from './components/two-party/second-party.vue'
Vue.component('t-grid', TGrid)
Vue.component('t-edit-grid', TEditGrid)
Vue.component('t-edit-grid-column', TEditGridColumn)
Vue.component('t-excel-import', TExcelImport)
Vue.component('t-dic-category-cascader', TDicCategoryCascader)
Vue.component('t-dic-dropdown-select', TDicDropdownSelect)
Vue.component('t-dic-radio-select', TDicRadioSelect)
Vue.component('t-dic-checkbox-select', TDicCheckBoxSelect)
Vue.component('t-dic-tree-select', TDicTreeSelect)
Vue.component('t-dic-multi-tree-select', TDicMultiTreeSelect)
Vue.component('sj-upload', SJUpload)
Vue.component('t-text-input', TTextInput)
Vue.component('t-sub-title', TSubTitle)
Vue.component('t-region-picker', TRegionPicker)
Vue.component('t-workflow-map', TWorkflowMap)
Vue.component('t-project-select', TProjectSelect)
Vue.component('t-bank-select', TBankSelect)
Vue.component('t-bank-project-select', TBankProjectSelect)
Vue.component('t-projcet-ctaxa-select', TProjectCtaxaApproval)
Vue.component('t-handler-select', THandlerSelect)
Vue.component('t-partner-select', TPartnerSelect)
Vue.component('t-maincharge-select', TMainChargeSelect)
Vue.component('t-manager-select', TManagerSelect)
Vue.component('t-record-select', TRecordSelect)
Vue.component('t-first-party', TFirstParty)
Vue.component('t-second-party', TSecondParty)

Vue.component('t-cascader', TCascader)
Vue.component('t-tree', TTree)
Vue.component('t-input', TInput)
Vue.component('t-number-input', TNumberInput)
Vue.component('t-number-range-input', TNumberRangeInput)
Vue.component('t-currency-input', TCurrencyInput)
Vue.component('t-currency-range-input', TCurrencyRangeInput)
Vue.component('t-percent-input', TPercentInput)
Vue.component('t-percent-range-input', TPercentRangeInput)
Vue.component('t-int-input', TIntInput)
Vue.component('t-int-range-input', TIntRangeInput)
Vue.component('t-datetime-picker', TDateTimePicker)
Vue.component('t-datetime-view', TDataTimeView)
Vue.component('t-datetime-range-picker', TDateTimeRangePicker)
Vue.component('t-time-picker', TTimePicker)
Vue.component('t-html-panel', THtmlPanel)
Vue.component('t-popover-hyperlink', TPopoverHyperlink)
Vue.component('t-editor', TEditor)
Vue.component('t-switch', TSwitch)
Vue.component('t-highlight-view', THignlightView)
Vue.component('base-user-select', userSelect)
Vue.component('base-user-multi-select', userMultiSelect)

Vue.component('base-organization-select', organizationSelect)
Vue.component('base-asset-multi-management', assetMultiManagement)
Vue.component('base-asset-single-management', assetSingleManagement)
Vue.component('base-asset-image-management', imageAssetManagement)
Vue.component('base-export-template', exportTemplate)
Vue.component('wf-processtrack', wfProcessTrack)
Vue.component('wf-taskinfo', wfTaskInfo)
Vue.component('t-qr-code', TQrCode)
Vue.component('t-form', TForm)

sync(store, router)

import verifyrules from '@/verifyRule'

verifyrules.forEach(item => {
  ElementUIVerify.addRule(item.rule, item.ruleMethod)
})
import * as filters from './filters/index.js'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import appRouterHelper from '@/router/appRouterHelper'

router.beforeEach(function (to, from, next) {
  store.commit('startLoading')
  store.commit('clearAxiosPromiseCancel')

  util.ui.title(to.meta && to.meta.title ? to.meta.title : '')

  if (to.name == 'login') {
    next()
    return
  }
  if (to.matched.some(record => !record.meta || !record.meta.requiresAuth)) {
    next()
    return
  }
  let innerStore = store.state
  if (!innerStore.app.user || !innerStore.app.user.userId) {
    store.commit('endLoading')
    next({
      path: '/login?to=' + to.fullPath
    })
    return
  }
  if (!to.path || !to.name && !to.name == '/') {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

router.afterEach(function (to, from) {
  store.commit('endLoading')
  window.scrollTo(0, 0)
})

function initVue () {
  return new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}

let vueInst = initVue()

if (window && !window.vue) {
  window.vue = vueInst
}
export default vue
