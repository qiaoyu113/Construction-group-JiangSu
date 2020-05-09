'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

/**
 * 开发环境
 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ServerUrl:'"http://localhost:8082"', //后端服务路径：注意是http://
  // ServerUrl:'"http://47.94.229.181:81/jrtech"', //后端服务路径：注意是http://
  WebDomain:'"/"',// 网站虚拟目录，从域名后的第一个“/”开始到最后一个“/”为止
  WebCDNUrl:'"/"',// 网站本地js路径
  AppName:'"苏建工程管理平台"',// 网站名称
  AppShortName:'"SJ"',// 网站点击折叠后显示名称
  OPEN_PROXY: true // 是否开启代理, 重置后需重启vue-cli
})
