(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{147:function(t,e,s){"use strict";s.r(e);var i=s(0),_=Object(i.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),s("p",[t._v("有时候为了存储一些数据，比如用户信息，需要用到浏览器的存储能力。")]),t._v(" "),t._m(1),t._v(" "),s("p",[t._v("下面分别是这三者的特点。")]),t._v(" "),t._m(2),t._v(" "),s("ul",[s("li",[t._v("几乎支持所有浏览器")]),t._v(" "),s("li",[t._v("存储数据大小不能超过 4 k")]),t._v(" "),s("li",[t._v("cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭")]),t._v(" "),s("li",[t._v("cookie 会被附加到每个 HTTP 请求头中，如果使用cookie保存过多数据会带来性能问题")]),t._v(" "),s("li",[t._v("需自行封装操作 cookie 的方法（ vux 提供了"),s("a",{attrs:{href:"https://doc.vux.li/zh-CN/tools/cookie.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("操作 cookie 的方法"),s("OutboundLink")],1),t._v("）")])]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16),t._v(" "),t._m(17),t._v(" "),s("p",[t._v("todo: 考试题目的 ids 和 每个题目信息 以及用户的答案数据 是否需要本地储存呢？")])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"浏览器本地存储"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器本地存储","aria-hidden":"true"}},[this._v("#")]),this._v(" 浏览器本地存储")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("浏览器本地存储数据有三种方案："),e("code",[this._v("cookie")]),this._v("、"),e("code",[this._v("localStorage")]),this._v(" 和 "),e("code",[this._v("sessionStorage")]),this._v("。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"cookie"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cookie","aria-hidden":"true"}},[this._v("#")]),this._v(" "),e("code",[this._v("cookie")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"web-storage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#web-storage","aria-hidden":"true"}},[this._v("#")]),this._v(" "),e("code",[this._v("web storage")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[t._v("支持 IE8+，可以放心使用")]),t._v(" "),s("li",[t._v("储存数据大小在 5M 左右，如果储存超过最大容量，会弹出请求更多储存空间的对话框")]),t._v(" "),s("li",[s("code",[t._v("localStorage")]),t._v(" 没有时间限制的数据存储，本地离线储存，关闭浏览器之后数据不丢失，"),s("code",[t._v("sessionStorage")]),t._v(" 针对一个session进行数据存储。当用户关闭浏览器后数据会被删除")]),t._v(" "),s("li",[t._v("仅在客户端（即浏览器）中保存，不参与和服务器的通信")]),t._v(" "),s("li",[t._v("拥有 "),s("code",[t._v("setItem")]),t._v(", "),s("code",[t._v("getItem")]),t._v(", "),s("code",[t._v("removeItem")]),t._v(", "),s("code",[t._v("clear")]),t._v(" 等操作方法")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("强调一点，就是 "),e("code",[this._v("localStorage")]),this._v(" 和 "),e("code",[this._v("sessionStorage")]),this._v(" 的区别：")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("sessionStorage")]),this._v(" 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此 "),e("code",[this._v("sessionStorage")]),this._v(" 不是一种持久化的本地存储，仅仅是会话级别的存储。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("而 "),e("code",[this._v("localStorage")]),this._v(" 用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"项目实际需求分析"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#项目实际需求分析","aria-hidden":"true"}},[this._v("#")]),this._v(" 项目实际需求分析")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"token-和-userid"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#token-和-userid","aria-hidden":"true"}},[this._v("#")]),this._v(" "),e("code",[this._v("token")]),this._v(" 和 "),e("code",[this._v("userId")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("登录成功，返回两个字段 "),e("code",[this._v("token")]),this._v(" 和 "),e("code",[this._v("userId")]),this._v("。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("在接下来的每次请求中，都需要将 "),e("code",[this._v("token")]),this._v(" 添加到请求头中，否则无法成功请求数据。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("userId")]),this._v(" 在“我”页面获取用户信息时作为参数向后台传递。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("为保证页面刷新之后仍然保持登录状态并且能够请求用户信息，这两个字段需进行本地储存（"),e("code",[this._v("cookie")]),this._v("）")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"data"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#data","aria-hidden":"true"}},[this._v("#")]),this._v(" "),e("code",[this._v("data")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("用户以扫描二维码形式获取页面链接，链接中有 "),e("code",[this._v("data")]),this._v(" 字段。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("data")]),this._v(" 字段用来获取考试信息，因此，"),e("code",[this._v("data")]),this._v(" 字段也需要进行本地储存。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"其他"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他","aria-hidden":"true"}},[this._v("#")]),this._v(" 其他")])}],!1,null,null,null);_.options.__file="08-本地存储数据方案分析.md";e.default=_.exports}}]);