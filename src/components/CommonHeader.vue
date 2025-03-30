<template>
  <div class="header">
  <div class="l-content">
    <!-- 这个点击事件是控制菜单组件的收缩的-->
    <el-button size="small" @click="handleCollapse">
      <component class="icons" :is="menu"></component>
    </el-button>

    <!-- 面包屑，separator是分隔符-->
    <el-breadcrumb separator="/" class="bread">
      <!-- 首页是一定存在的所以直接写死 -->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <!-- if判断一定要加-->
      <el-breadcrumb-item v-if="current" :to="current.path" >{{
        current.label
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="r-content">
     <el-dropdown>
    <span class="el-dropdown-link">
       <!--我们定义一个URl对象地址，这里是传入图片的名称-->
      <img :src="getImageUrl('user')"  class="user" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";  // 引入ref和computed
import {useAllDateStore} from '@/stores'
import {useRouter} from 'vue-router'

const router = useRouter();


const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};

//点击事件控制伸缩
const store = useAllDateStore()
const isCollapse = computed(() => store.state.isCollapse)
const handleCollapse = () => {
  store.state.isCollapse = !store.state.isCollapse;//跨组件的全局数值管理，用pinia
};

//退出登录
const handleOut = () => {
    store.clean();
    router.push('/login');
}

const current = computed(() => store.state.currentMenu);
</script>



<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;//相对于父容器垂直居中
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons{
    width: 20px;
    height: 20px;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>