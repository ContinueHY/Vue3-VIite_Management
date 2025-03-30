<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" class="user" />
          <div class="user-info">
            <p class="user-info-admin">Admin</p>
            <p class="user-infor-p">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <div class="login-info-timeorip">
            <p>登录时间</p>
            <span>2023-05-18</span>
          </div>
          <div class="login-info-timeorip">
            <p>登录IP</p>
            <span>127.0.0.1</span>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="user-table">
        <el-table :data="tableData">
          <!-- key是vue中渲染项目用的，prop是根据tableLabel的key找tableData的数据，label是接tableLabel的表头 -->
          <!-- 这里for循环循环的是表头 -->
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            :is="item.icon"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="top-echart">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card>
          <div ref="userEchart" style="height: 240px"></div>
        </el-card>
        <el-card>
          <div ref="videoEchart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>


<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import axios from "axios";
import * as echarts from "echarts";

const { proxy } = getCurrentInstance();

const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};

//这个是折线图和柱状图 两个图表共用的公共配置，这是形式上的配置，内容上的配置home.js
const xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  legend: {},
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});

//这个tableData是假数据，等会我们使用axios请求mock数据
const tableData = ref([
  {
    name: "Java",
    todayBuy: 100,
    monthBuy: 200,
    totalBuy: 300,
  },
  {
    name: "Python",
    todayBuy: 100,
    monthBuy: 200,
    totalBuy: 300,
  },
]);
const tableLabel = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
});

//get后用code==200被拦截，Mock生成了假数据
// axios({
//   url: "/api/home/getTableData",
//   method: 'get',
// }).then((res) => {
//   console.log(res.data.data.tableData);
//   if (res.data.code === 200) {
//     tableData.value = res.data.data.tableData
//   }
// })

const getTableData = async () => {
  const data = await proxy.$api.getTableData1();
  // console.log(data);
  tableData.value = data.tableData;
};

const countData = ref([]);
const getCountData = async () => {
  const data = await proxy.$api.getCountData1();
  // console.log(data);
  countData.value = data;
};

const chartData = ref([]);
const getChartData = async () => {
  const { orderData, userData, videoData } = await proxy.$api.getChartData1();
  // console.log(orderData.data[0]);
  chartData.value = orderData;

  //第一个折线图
  //xOptions配置折线图的x轴和配置，为实例的生成做准备
  xOptions.xAxis.data = orderData.date;
  //Object.keys(orderData.data[0])表示获取所有信息的键，成为一个数组，
  //map() 是一个常用的 JavaScript 数组方法，它会对数组中的每个元素执行一个指定的函数，并返回一个新的数组。map() 不会修改原始数组，而是返回一个包含每次回调结果的新数组。
  //这里的val就是Object.keys(orderData.data[0])返回的数组的每一个元素，也就是键，
  xOptions.series = Object.keys(orderData.data[0]).map((val) => ({
    name: val,
    data: orderData.data.map((item) => item[val]),
    type: "line",
  }));

  //echarts.init方法初始化ECharts实例，需要传入dom对象选择图标在的位置
  const OneEcharts = echarts.init(proxy.$refs["echart"]);

  //setOption方法应用xOptions配置实例
  OneEcharts.setOption(xOptions);

  //第二个柱状图
  xOptions.xAxis.data = userData.map((item) => item.date);
  xOptions.series = [
    {
      name: "新用户",
      data: userData.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userData.map((item) => item.active),
      type: "bar",
    },
  ];
  const twoEcharts = echarts.init(proxy.$refs["userEchart"]);
  twoEcharts.setOption(xOptions);

  //第三个饼状图
  pieOptions.series = [
    {
     data:videoData,
      type: "pie",
    }  
  ];
  const threeEcharts = echarts.init(proxy.$refs["videoEchart"]);
  threeEcharts.setOption(pieOptions);

  // 监听窗口大小变化
  const observer = ref(null);
  observer.value = new ResizeObserver(() => {
    OneEcharts.resize();
    twoEcharts.resize();
    threeEcharts.resize();
  });
  //容器存在
  if(proxy.$refs["echart"]){
    observer.value.observe(proxy.$refs["echart"]); 
  }
};

onMounted(() => {
  getTableData();
  getCountData();
  getChartData();
});
</script>

<style scoped lang="less">
.home {
  height: 100%;
  overflow: hidden;
  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .user-info {
    p {
      line-height: 40px;
    }
    .user-infor-p {
      color: #999;
      font-size: 18px;
    }
    .user-info-admin {
      font-size: 40px;
    }
  }
  .login-info {
    .login-info-timeorip {
      margin-left: 20px;
      margin-right: 20px;
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      align-items: center;
      p {
        line-height: 30px;
        font-size: 18px;
      }
      span {
        color: #999;
        font-size: 18px;
      }
    }
  }
  .user-table {
    margin-top: 20px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px; /* detail区域与左侧元素间隔15px */
      display: flex; /* 使用flex布局 */
      flex-direction: column; /* 将子元素垂直排列 */
      justify-content: center; /* 在主轴（垂直方向）上使子元素居中对齐 */
      align-items: center; /* 在交叉轴（水平方向）上使子元素居中对齐 */
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between; 
    flex-direction: row; /* 将子元素垂直排列 */
    .el-card {
      width: 48%;
      height: 260px;
    }
  }
}
</style>
