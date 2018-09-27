(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{152:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("p",[t._v("我们在建设网站时总会遇到这样的问题：在大部分的页面我们需要显示 header 和 footer，分别用于展示网站 logo、顶部导航和底部版权信息等内容。")]),t._v(" "),a("p",[t._v("在 vue 项目中我们可以将 header 和 footer 单独抽取为两个组件，然后在每个路由对应的组件中分别引入 header 和 footer 。")]),t._v(" "),a("p",[t._v("这种方法相对来说已经很简洁了，但是仍然存在一些问题，即重复代码太多（需要重复的引入 header 和 footer，然后在 template 中进行渲染）。")]),t._v(" "),t._m(0),t._v(" "),a("p",[t._v("这里有另外一种更加简单的方式，其关键思路是利用 vue-router 的命名视图来解决这个问题。（vue-router 命名视图："),a("a",{attrs:{href:"https://router.vuejs.org/zh/guide/essentials/named-views.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文档地址"),a("OutboundLink")],1),t._v("）")]),t._v(" "),a("p",[t._v("下面是一个简单示例：")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("Don't repeat youself.")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在 App.vue 中创建三个视图（"),s("code",[this._v("router-view")]),this._v(")，它们有不同的 "),s("code",[this._v("name")]),this._v(" 属性，如果没有则默认为 "),s("code",[this._v("default")]),this._v("。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("app"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("router-view")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("header"),a("span",{attrs:{class:"token punctuation"}},[t._v("'")])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("router-view")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("router-view")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("router-view")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("router-view")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("name")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("footer"),a("span",{attrs:{class:"token punctuation"}},[t._v("'")])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("router-view")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在路由文件 router.js 中进行路由设置，在 "),s("code",[this._v("components")]),this._v(" 属性中分别为上面三个视图传入不同的组件。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("components")]),this._v(" 是一个 Object，它的每个键分别对应着 App.vue 中的三个视图的 "),s("code",[this._v("name")]),this._v(" 值，它的属性值是一个组件，会被渲染到相应的视图中。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("例如在路由 home 下，三个路由视图分别由 "),s("code",[this._v("Header")]),this._v(" ，"),s("code",[this._v("Home")]),this._v(" ， "),s("code",[this._v("Footer")]),this._v(" 三个组件渲染。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("如果某个页面不需要渲染 header 和 footer ，则无需理会 header 视图和 footer 视图，也就是说不需要给 "),a("code",[t._v("components")]),t._v(" 的 "),a("code",[t._v("header")]),t._v(" 属性和 "),a("code",[t._v("footer")]),t._v(" 属性设置属性值。甚至可以用更简洁的写法，使用 "),a("code",[t._v("component")]),t._v(" 替换掉 "),a("code",[t._v("components")]),t._v(" （注意 "),a("code",[t._v("s")]),t._v(" ）。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("例如路由 login 中的 "),s("code",[this._v("component: Login")]),this._v(" 。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Header "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"../components/Header"')]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Footer "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"../components/Footer"')]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Home "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"../pages/Home"')]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Login "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"../pages/Login"')]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    path"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'/home'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'home'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    components"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Home"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      header"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Header"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      footer"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Footer\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    path"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'/login'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'login'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    component"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Login"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])])}],!1,null,null,null);e.options.__file="13-header-and-footer组件化.md";s.default=e.exports}}]);