import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import "@/assets/less/index.less"
import router from "./router"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from "pinia";
import "@/api/mock.js"
import api from "@/api/api";
import { useAllDateStore } from "@/stores";


//getRoutes获得所有路由记录的完整列表。
//这个方法判断要跳转的路由是否存在
function isRoute(to) {
  //注意store中每次登陆router会清除404，所以取不出404页面的跳转，得补上
  return router.getRoutes().filter(item => item.path === to.path).length > 0
}
router.beforeEach((to, from) => {
  //如果要跳转的不是login,且token不存在(可以通过不存在token判断出用户未登录)
  if (to.path !== '/login' && !store.state.token) {//不是登录页面且没有token说明没登录
    //跳转到login
    return { name: 'login' }
  }
  //如果路由记录不存在
  if (!isRoute(to)) {//有token说明登录了
    //跳转到404界面
    return { name: "404" }
  }
})


const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$api = api;//全局注册api
app.use(pinia);
app.use(ElementPlus);
const store = useAllDateStore();
store.addMenu(router, "refresh");


app.use(router).mount('#app');
// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
