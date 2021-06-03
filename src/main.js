import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/all.css'

import axios from 'axios'

import {
  Breadcrumb, BreadcrumbItem,
  Card, Input, Button, Table,
  TableColumn, Row, Col, Pagination,
  Switch, Tooltip, Loading, Message,
  Dialog, Form, FormItem, MessageBox,
  Avatar, Container, Header, Aside, Main,
  Menu, Submenu, MenuItem, MenuItemGroup, Tag
} from 'element-ui'
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$messagebox = MessageBox

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Avatar)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tag)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
