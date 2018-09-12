module.exports = {
  title: 'vue开发记录',
  description: 'Just playing around',
  dest: './docs/',
  base: '/exam-system-fe/',
  themeConfig: {
    nav: [
      { text: 'vue文档', link: 'https://cn.vuejs.org/v2/guide/' },
      { text: 'vuex文档', link: 'https://vuex.vuejs.org/zh/installation.html' },
      { text: 'vue-router', link: 'https://router.vuejs.org/zh/' },
    ],
    sidebar: [
      '',
      ['./markdown/01-用户登录状态管理.md', '用户登录状态管理.' ],
      ['./markdown/02-设置网页title.md', '设置网页title.' ],
      ['./markdown/03-样式私有化.md', '样式私有化.' ],
      ['./markdown/04-vuex状态管理.md', 'vuex状态管理.' ],
      ['./markdown/05-vue全局公用函数.md', 'vue全局公用函数.' ],
      ['./markdown/05-webpack项目开发环境访问时提示：Invalid Host header.md', 'webpack项目开发环境访问时提示：Invalid Host header.' ],
      ['./markdown/06-Vue点击button使input获取焦点.md', 'Vue 点击 button 使 input 获取焦点.' ],
      ['./markdown/07-axios 封装.md', 'axios 封装.' ],
      ['./markdown/08-本地存储数据方案分析.md', '本地存储数据方案分析.' ],
      ['./markdown/09-vuex 状态持久化.md', 'vuex 状态持久化' ],
      ['./markdown/10-webpack打包优化.md', 'webpack打包优化.' ],
      ['./markdown/11-键盘弹起优化.md', '键盘弹起优化.' ],
    ],
  },
}
