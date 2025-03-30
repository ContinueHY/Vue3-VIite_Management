<template>
  <div class="tags">
    <!--closable是否有关闭按钮,hoem标签不能关闭所以为false
			effect主题，找到当前路由对应的tab，设置'dark'高亮主题
		-->
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAllDateStore } from "@/stores";

const store = useAllDateStore();
const route = useRoute();
const router = useRouter();

const tags = computed(() => store.state.tags);

const changeMenu = (tag) => {
  //单击tab时，加入面包屑
  store.selectMenu(tag);
  //跳转对应页面
  router.push(tag.name);
};

//关闭tab时触发
const handleClose = (tag, index) => {
  //如果关闭的不是当前tag，则直接关闭
  if (tag.name !== route.name) {
    store.closeTag(tag);
    return;
  } else {
    //如果关闭的是当前tag，则跳转前一个tag
    //如果关闭的是最后一个tab，则跳转前一个tab
    if (index === store.state.tags.length - 1) {
      store.selectMenu(tags.value[index - 1]);
      //跳转对应页面
      router.push(tags.value[index - 1].name);
      //关闭当前tag
      store.closeTag(tag);
      return;
      //如果关闭的是不是最后一个tag，则跳转后一个tag
    } else {
      store.selectMenu(tags.value[index + 1]);
      //跳转对应页面
      router.push(tags.value[index + 1].name);
      store.closeTag(tag);
      return;
    }
  }
};
</script>



<style lang="less" scoped>
.tags {
  margin: 20px 0 0 20px;
}
.el-tag {
  margin-right: 10px;
}
</style>