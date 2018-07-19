# vue_cli_raas

> A Vue.js project

主要技术：vue + vux + vuex + axios

## 依赖

+ [vue@2.5.11](https://cn.vuejs.org/v2/guide/)
+ [vue-router@3.0.1](https://router.vuejs.org/zh/)
+ [vuex@3.0.1](https://vuex.vuejs.org/zh/installation.html)
+ [axios@0.17.1](https://github.com/axios/axios)

## Build Setup

``` bash
# 获取代码
git clone https://github.com/Awesome-FE/exam-system-fe.git

# 切换到代码根目录
cd exam-system-fe

# 安装依赖，可以使用 cnpm
npm install

# 启动开发环境服务器，在 localhost:8080 查看
npm run dev

# 打包出部署文件
npm run build
```

## 目录结构
```
├── public
│   └── favicon.ico          # Favicon
├── webpack
|   ├── webpack.common.js        # webpack 公共配置
|   ├── webpack.dev.js           # webpack 开发配置
│   └── webpack.prod.js          # webpack 打包配置
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── pages                # 业务页面入口和常用模板
│   ├── router               # 路由入口
│   ├── util                 # 工具库
│   ├── store                # 状态
│   ├── template             # HTML 入口模板
│   ├── App.vue              
│   ├── main.js              # 应用入口
│   └── mock.js              # 本地模拟数据
│
├── note                     # 开发笔记
├── README.md
└── package.json
```

实践的过程中会做一些记录：

+ [权限管理](./note/Auth.md)
