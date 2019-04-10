const pkg = require('./package')

require('dotenv').config()

const MODE = process.env.MODE

const gateway = process.env.API_SERVER || ''

const publicPath = process.env.PUBLIC_PATH || ''

let PUBLIC_VAR = process.env.PUBLIC_VAR || ''

const config = {
  env: {
    staging: {
      '/test': 'http://http://39.98.178.108/'
    },
    dev: {
      test: 'http://39.98.178.108'
    }
  }
}

let axios = {
  proxy: true
}

if (MODE === 'prod') {
  axios = {
    proxy: false,
    baseURL: process.env.API_SERVER
  }
}

let context =
  process.env.CONTEXT && process.env.CONTEXT.length > 1
    ? `/${process.env.CONTEXT}/`
    : '/'

module.exports = {
  mode: 'universal',

  env: {
    PUBLIC_VAR
  },

  srcDir: 'src/',

  proxy: {...config.env[MODE]},

  router: {
    middleware: ['meta'],
    mode: 'hash'
  },

  head: {
    title: 'nuxt-demo',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {'http-equiv': 'x-ua-compatible', content: 'IE=edge, chrome=1'}
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: context + 'logo.png'
      }
    ]
  },

  loading: {
    color: '#1890ff'
  },

  css: [
    {
      src: '~assets/global.css'
    }
  ],

  build: {
    publicPath,
    extractCSS: true,
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  plugins: [
    {
      src: '~/plugins/axios'
    },
    {
      src: '~/plugins/element'
    }
  ],

  modules: ['@nuxtjs/axios'],

  axios
}
