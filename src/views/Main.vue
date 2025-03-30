<script setup>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CommonTag from "@/components/CommonTag.vue";
</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 左侧自定义组件 -->
      <CommonAside />
      <!-- 或者写 <common-aside />-->
      <el-container>
        <el-header class="el-header">
          <!-- 头自定义组件 -->
          <common-header />
        </el-header>
        <CommonTag />

        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.common-layout,
.lay-container {
  height: 100vh;
}
.el-header {
  background-color: #333;
}
</style>
