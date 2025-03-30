import Mock from 'mockjs';
import homeApi from './mockData/home';
import userApi from './mockData/user';
import menuApi from './mockData/permission';
//1.拦截路径  2.方法  3.制造的假数据
//相当于我的后端
Mock.mock(/api\/home\/getTable/, "get", homeApi.getTableData);
Mock.mock(/api\/home\/getCount/, "get", homeApi.getCountData);
Mock.mock(/api\/home\/getChart/, "get", homeApi.getChartData);
Mock.mock(/api\/user\/getUser/, "get", userApi.getUserList);
Mock.mock(/api\/user\/deleteUser/, "get", userApi.deleteUser);
Mock.mock(/api\/user\/addUser/, "post", userApi.createUser);
Mock.mock(/api\/user\/editUser/, "post", userApi.updateUser);
Mock.mock(/api\/permission\/getMenu/, "post", menuApi.getMenu);