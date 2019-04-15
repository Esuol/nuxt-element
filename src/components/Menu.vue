<template>
  <el-menu :collapse="trueCollapse" class="aside-menu"
             :default-active="$route.path" router
             :background-color="backgroundColor"
             :text-color="textColor"
             active-text-color="#409eff"
    >
      <div class="logo">
        <nuxt-link to="/">
          <!--<img class="logo-img" :src="$store.state.meta.logo" alt="logo">-->
          <h1 class="logo-text">{{$store.state.users.meta.appName}}</h1>
        </nuxt-link>
      </div>
      <!-- handleItem 为自定义事件，监听外链点击事件 -->
      <!-- link-style 为外链样式-->
      <menu-item @handleItem="handleItem" :link-style="{color: textColor, backgroundColor: bgColor}" :collapse="collapse"></menu-item>
    </el-menu>
</template>

<script>
import MenuItem from '@/components/MenuItem.vue'

export default {
  components: {
    MenuItem
  },
  data() {
    return {
      bgColor: '#001529'
    }
  },
  props: {
    collapse: {
      type: Boolean
    },

    backgroundColor: {
      default: '',
      type: String
    },

    textColor: {
      default: '',
      type: String
    }
  },
  computed: {
    trueCollapse() {
      return this.$store.state.menu.showBigMenu ? !this.collapse : this.collapse
    }
  },
  methods: {
    handleItem(url) {
      let {token, userId, user} = this.$store.state
      let prefix = url.slice(-1) === '?' ? '&' : '?'
      let query = `${prefix}token=${token}&projectNo=${
        user.projectNo
      }&userId=${userId}`

      window.open(`${url}${query}`, '_blank')
    }
  }
}
</script>
