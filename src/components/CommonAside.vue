<template>
  <!-- 左侧自定义组件和宽度 -->
  <el-aside :width="width">
    <el-menu
    background-color= "#545c64"
    text-color="#fff"
    :collapse="isCollapse"
    :collapse-transition="false"
    :default-active="activeMenu"
    >
      <h3 v-show="!isCollapse">通用后台管理系统</h3>
      <h3 v-show="isCollapse">后台</h3>
      <el-menu-item
        v-for="item in noChildren"
        :key="item.path"
        :index="item.path"
        @click="handleMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <el-sub-menu
        v-for="item in hasChildren"
        :key="item.path"
        :index="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subItem) in item.children"
            :key="subItem.path"
            :index="subItem.path"
            @click="handleMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, computed } from "vue";
import {useAllDateStore} from '@/stores';
import {useRoute, useRouter} from 'vue-router';
const store = useAllDateStore();

let list = ref([
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "house",
    url: "Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "video-play",
    url: "Mall",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "User",
  },
  {
    path: "other",
    label: "其他",
    icon: "location",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Page1",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Page2",
      },
    ],
  },
]);

list = computed(() => store.state.menuList);

console.log(store.state.menuList);


// const noChildren = computed(() => {
//   return list.value.filter((item) => !item.children); //没有children的ref返回
// });
// const hasChildren = computed(() => {
//   return list.value.filter((item) => item.children); //有children的ref返回
// });
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren =computed(() => list.value.filter(item => item.children))

const isCollapse = computed(() => store.state.isCollapse)

// width
const width = computed(() => {
  return store.state.isCollapse ? "64px" : "180px";
});

const router = useRouter()
const route = useRoute()

//当前路由
const activeMenu = computed(() => route.path)

//子路由的跳转
const handleMenu = (item) => {
  router.push({path: item.path});
  store.selectMenu(item);
}

</script>



<style lang="less" scoped>
  .icons {
    width:18x;
    height:18px;
    margin-right: 5px;
  }
  .el-menu {
    background-color: #545c64;
    border-right: none;
    h3{
        line-height: 48px;
        color:#fff;
        text-align: center;
    }
  }
  .el-aside {
     height: 100%;
     background-color: #545c64; 
  }
</style>