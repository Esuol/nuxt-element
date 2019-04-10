/**
 * Created by berlin on 2019/3/19.
 */
export default async function({store, app}) {
  // if (process.server) return

  if (!store.state.meta.appName) {
    try {
      await store.dispatch('fetchMetaInfo')
    } catch (e) {
      console.log('meta error: ', e)
    }

    let meta = store.state.meta

    let head = app.head

    let headLinks = head.link
    let link = {}

    // 为了支持IE。。。
    for (let i = 0; i < headLinks.length; i++) {
      if (headLinks[i].rel == 'icon') {
        link = headLinks[i]
        break
      }
    }

    head.title = meta.htmlTitle
    link.href = meta.favicon
  }
}
