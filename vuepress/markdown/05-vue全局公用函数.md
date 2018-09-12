如果你需要让一个工具函数在每个组件可用，可以把方法挂载到 Vue.prototype上。

## 注册

> 一般建议函数名使用 $ 前缀。像 vue-router 的 $route 和 $router。

入口文件 `main.js` 或者 `index.js` 中：

```js
Vue.prototype.$method = function () {}
```

## 使用

在组件中使用：

```js
export default {
  created () {
    this.$method()
  }
}
```

## 说明

挂载到 `prototype` 上是为了方便组件内直接用 `this.$method` 来使用，你也可以直接用 `Vue.prototype.method`，这样同样可以全局使用，不过在组件内就需要再 `import` 一次 `Vue` 了。


*来源：[vue 全局公用函数](https://doc.vux.li/zh-CN/development/vue-global-method.html)*