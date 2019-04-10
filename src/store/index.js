import cookie from 'js-cookie'

export const state = () => ({
  meta: {},
  user: {},
  token: ''
})

const getCookiePath = that => {
  let path = that.$router.options.base
  return path.slice(-1) === '/' ? path.slice(0, -1) : path
}

// mutations
export const mutations = {
  login(state, res) {
    ;(state.token = res.token), (state.user = res.user)
    //保存到cookie
    let path = getCookiePath(this)
    cookie.set('token', token, {path})
    cookie.set('userId', user.userId, {path})
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
}

//actions
export const actions = {
  async login(context) {
    let {commit, dispatch} = context
    let resp = await this.$axios.$get(config)
    commit('login', resp)
    dispatch('isHaveMember', resp.userId)
  },
  //验证有无这个用户
  async isHaveMember({commit}, {userId}) {
    // let user = await this.$axios.$get(userId)
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
