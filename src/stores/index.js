import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';

function initState() {
    return {
        isCollapse: false,
        tags: [
            { path: "/home", name: "home", label: "首页", icon: "home" },
        ],
        currentMenu: null,
        menuList: [],//后端的传的侧边栏菜单，也是子路由
        token: "",
        routerList: [],//接入menuList生成的路由和一些信息
    };
}
export const useAllDateStore = defineStore('allDate', () => {
    //ref 相当于 state
    //computed 相当于 getters 
    //function 相当于 actions

    const state = ref(initState());//这样就像是vuex的返回方式
    watch(//持久化存储，不太会！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        state, (newObj) => {
            if (!newObj.token) {
                return
            }
            localStorage.setItem('store', JSON.stringify(newObj));
        },
        { deep: true }
    );


    function selectMenu(val) {
        if (val.name === "home") {
            state.value.currentMenu = null;
        } else {
            state.value.currentMenu = val;
            let index = state.value.tags.findIndex((item) => {
                return item.name === val.name;
            });
            index === -1 ? state.value.tags.push(val) : "";
        }
    }

    function closeTag(val) {
        let index = state.value.tags.findIndex((item) => {
            return item.name === val.name;
        });
        state.value.tags.splice(index, 1);
    }

    function selectMenuList(val, token) {
        state.value.menuList = val;
        state.value.token = token;
    }

    // 动态添加路由的方法
    function addMenu(router, type) {
        if (type === "refresh") {
            if (JSON.parse(localStorage.getItem('store'))) {
                state.value = JSON.parse(localStorage.getItem('store'));
                //
                state.value.routerList = [];
            } else {
                return;
            }
        }
        // 取出保存的菜单列表（后台返回的菜单数据）
        const menu = state.value.menuList;
        // 动态引入 views 文件夹下所有 .vue 组件，返回一个对象，key 是文件路径，value 是组件
        const module = import.meta.glob('../views/**/*.vue');
        // 存放动态生成的路由数组
        const routeArr = [];

        // 遍历菜单数组，生成路由对象
        menu.forEach((item) => {
            if (item.children) { // 如果有子菜单
                item.children.forEach((val) => {
                    // 构造子菜单组件文件的路径
                    let url = `../views/${val.url}.vue`;
                    // 通过模块对象找到对应的组件，并赋值给组件字段
                    val.component = module[url];
                    // 将所有子菜单项添加到路由数组中（注意这里使用了展开运算符，将整个子数组加入）
                    routeArr.push(...item.children);
                });
            } else {
                // 对于没有子菜单的情况，同样构造组件路径并绑定组件
                let url = `../views/${item.url}.vue`;
                item.component = module[url];
                routeArr.push(item);
            }
        });
        state.value.routerList = [];//用来保存没个路由的卸载函数，用于退出登录
        let routers = router.getRoutes();
        // console.log(router.getRoutes());
        // 遍历生成的路由数组，将每个路由添加到路由实例中，保证传入前只有根路由和404，要清空上一次的子路由
        routers.forEach((item) => {
            if (item.name === "main" || item.name === "login" || item.name === "404") {
                return;
            } else {
                router.removeRoute(item.name);
            }
        });

        //整理好合格的路由形式存储在routeArr中，然后添加到路由中
        routeArr.forEach((item) => {
            // 在名为 "main" 的父路由下添加新的路由，并将返回值（添加成功的路由）保存到 routerList 中
            //且在你的 addMenu() 函数中，添加路由后会将返回值（卸载函数）存入 state.value.routerList 数组中：
            state.value.routerList.push(router.addRoute("main", item));

        });
        // console.log(router.getRoutes());
    }

    function clean() {
        state.value.routerList.forEach((item) => {
            if(item) item();
        });
        state.value = initState();
        localStorage.removeItem('store');
    }


    return {
        state,
        selectMenu,
        closeTag,
        selectMenuList,
        addMenu,
        clean,
    };
})