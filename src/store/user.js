import cookie from 'js-cookie'

const getCookiePath = that => {
  let path = that.$router.options.base
  if (path.slice(-1) === '/') {
    path = path.slice(0, -1)
  }
  return path
}

export default {
  state: {
    meta: {},
    user: {},
    token: ''
  },
  mutations: {
    login(state, res) {
      state.token = res.userId
      state.user = res.id
      //保存到cookie
      let path = getCookiePath(this)
      console.log(path)
      cookie.set('token', state.token, {path})
      cookie.set('userId', state.user, {path})
    },
    logout(state) {
      state.token = ''
      state.user = {}

      let path = getCookiePath(this)
      cookie.remove('token', {path})
      cookie.remove('userId', {path})
    },
    update(state, res) {
      Object.keys(res).forEach(k => {
        state[k] = res[k]
      })
    }
  },
  actions: {
    async login(context) {
      let {commit, dispatch} = context
      let resp = await this.$axios.$get(
        'https://jsonplaceholder.typicode.com/todos/1'
      )
      // console.log(resp)
      commit('login', resp)
      // dispatch('isHaveMember', resp.userId)
    },
    //验证有无这个用户
    async isHaveMember({commit}, {userId}) {
      let user = await this.$axios.$get(userId)
      if (!user.resp) {
        console.log('用户不存在')
        commit('logout')
        return
      }
    },
    async fetchMetaInfo({commit}) {
      // let resp = await this.$axios.$get(config)
      let meta = {
        appName: 'nuxt-demo',
        copyright: 'nuxt-demo-title-standard',
        favicon:
          'http://viclau-eshop.oss-cn-beijing.aliyuncs.com/builtin/favicon.ico',
        homePageImg:
          'https://ws1.sinaimg.cn/large/66d5bb1dgy1furiz5cwwnj21hc0qogut.jpg',
        htmlTitle: 'nuxt-demo-title',
        loginBgImg:
          'https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg',
        logo: 'http://viclau-eshop.oss-cn-beijing.aliyuncs.com/builtin/logo.png'
      }
      commit('update', {meta})
    }
  }
}
