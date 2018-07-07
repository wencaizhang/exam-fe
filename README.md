# vue_cli_raas

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 目录结构
```
├── public
│   └── favicon.ico          # Favicon
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
├── webpack.common.js        # webpack 公共配置
├── webpack.dev.js           # webpack 开发配置
├── webpack.prod.js          # webpack 打包配置
├── README.md
└── package.json
```