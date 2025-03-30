import { createRouter, createWebHashHistory } from "vue-router";

//指定路由
const routes = [
    {
        path: "/",
        name: "main",
        redirect: "/login",
        component: () => import("@/views/Main.vue"),
        children: [
            // {
            //     path: "/home",
            //     name: "home",
            //     component: () => import("@/views/Home.vue"),
            // },
            // {
            //     path: "/user",
            //     name: "user",
            //     component: () => import("@/views/User.vue"), 
            // },
            // {
            //     path: "/mall",
            //     name: "mall",
            //     component: () => import("@/views/Mall.vue"), 
            // }
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login.vue"), 
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
      }

];


//设置路由模式
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;