<script setup>
import { reactive,getCurrentInstance} from "vue";
import {useRoute, useRouter} from 'vue-router'
import { useAllDateStore } from "@/stores";

const loginForm = reactive({
  username: "",
  password: "",
});

const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const store = useAllDateStore();
//点击登录拿数据
const handleLogin = async () => {
  const res = await proxy.$api.getMenu1(loginForm);//利用响应式特性的值传输input框中的账号和密码
  // console.log(res);
  store.selectMenuList(res.menuList,res.token);
  // store.state.menuList = res.menuList;
  console.log(router);
  store.addMenu(router)
  router.push("/home");
}
</script>

<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h3>欢迎登录</h3>
      <el-form-item>
        <el-input
          type="input"
          placeholder="请输入账号"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>

      <el-form-item>
          <div class="dl">
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.body-login {
  width: 100%;
  height: 100vw;
  background-image: url("../assets/images/background.png");
  background-size: 100%;
  overflow: hidden;
  .login-container {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 180px auto;
    h3 {
      text-align: center;
      margin-bottom: 20px;
      color: #505450;
    }
    .dl {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
