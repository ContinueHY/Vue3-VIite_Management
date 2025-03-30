const env = import.meta.env.MODE || "prod";

const EnvConfig = {
    development: {
        baseApi: "/api",//可以看做线上或者本地mock
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",//线上mock
    },
    test: {
        baseApi: "//test.com./api",
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
    }
};
export default {
    env,
    ...EnvConfig[env],
    mock: false,//总的mock开关
}