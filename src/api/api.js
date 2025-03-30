/* 
整个项目api的统一管理
*/
import request from './request'
//请求首页左侧表格的数据

export default {
    getTableData1: () => {//这个函数在Home.vue中调用
        return request({
            url: '/home/getTable',//这个路径如果没数据会被拦截器拦截，因为我们没后端，我们这次就用mock拦截
            method: 'get',
            mock: false,//控制是否用线上mock
        });
    },
    getCountData1(){
        return request({
            url: '/home/getCount',
            method: 'get',
            mock: false,//控制是否用线上mock
        });
    },
    getChartData1(){
        return request({
            url: '/home/getChart',
            method: 'get',
            mock: false,//控制是否用线上mock
        });
    },
    getUserData1(data1){
        return request({
            url: '/user/getUser',
            method: 'get',
            mock: false,//控制是否用线上mock
            data: data1,
        }); 
    },
    deleteUser1(data){
        return request({
            url: '/user/deleteUser',
            method: 'get',
            mock: false,//控制是否用线上mock
            data,
        }); 
    },
    addUser1(data){
        return request({
            url: '/user/addUser',
            method: 'post',
            mock: false,//控制是否用线上mock
            data,
        });
    },
    editUser1(data){
        return request({
            url: '/user/editUser',
            method: 'post',
            mock: false,//控制是否用线上mock
            data,
        });
    },
    getMenu1(params) {
        return request({
          url: '/permission/getMenu',
          method: 'post',
          data: params
        })
    }

};