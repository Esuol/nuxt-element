import Vue from 'vue'
import cookie from 'js-cookie'

export default function(context) {
  let {$axios, store, app, redirect} = context

  $axios.onRequest(config => {
    let url = config.url

    url += url.indexOf('?') > -1 ? '&' : '?'
    url += `token=${store.state.token}`

    config.url = url

    return config
  })

  $axios.onError(error => {
    if (process.client) {
      // axios 数据结构
      let resp = error.response
      let data = resp.data

      let title = '提示'

      if (resp.status >= 500) {
        Vue.$notify.error({
          title,
          message: '网络异常，请稍后再试!'
        })
      } else if (resp.status == 401 || resp.status == 403) {
        Vue.$notify.info({
          title,
          message: '会话超时, 请重新登录'
        })

        let path = app.router.options.base
        cookie.remove('token', {path})
        cookie.remove('userId', {path})
        redirect('/login')
      } else {
        Vue.$notify.info({
          title,
          message: data.payload || data.msg
        })
      }
    }
    // TODO asyncData 的错误 需要日志监控
    else console.log('error', error)
  })
}
