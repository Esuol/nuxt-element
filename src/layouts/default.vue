<template>
  <el-container style="background: #f0f2f5;">

    <Menu :collapse="collapse"  v-if="isShowBigMenu" />

    <el-container  ref="mainpager">
      <el-header>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col v-if="$store.state.menu.showBigMenu">
            <el-button @click="collapse = !collapse"><i class="el-icon-sort"></i></el-button>
          </el-col>
          <el-col style="text-align: right">
            <el-dropdown @command="handleDropdown">
            <span class="el-dropdown-link">
              {{$store.state.users.fullname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>

      <el-main class="nuxt-main">
        <nuxt></nuxt>
      </el-main>

      <el-footer >
        <CopyRight />
      </el-footer>

    </el-container>

    <div>
      <a-drawer
        title=""
        placement="left"
        :closable="false"
        :visible="$store.state.menu.showsmallMenu"
        @close="onClose">
        <div class="SiderMenus">
          <Menu :collapse="collapse" />
        </div>

        <a-icon
          v-if="$store.state.menu.showsmallMenu"
          class="icons-copy"
          :type="$store.state.menu.showsmallMenu ? 'close':'bars'"
          @click="hideSmall" />
      </a-drawer>
    </div>

    <div
      v-if="!$store.state.menu.showBigMenu">
      <a-icon
        class="icons"
        type="bars"
        @click="showSmall" />
    </div>


  </el-container>
</template>

<script>
import Menu from '@/components/Menu.vue'
import CopyRight from '@/components/CopyRight.vue'
import {mapState} from 'vuex'
const move = require('move-js')

export default {
  components: {
    CopyRight,
    Menu
  },
  data() {
    return {
      collapse: false,
      textColor: '#fff',
      bgColor: '#001529',
      currentClientWidth: 0,
      isShowBigMenu: true
    }
  },
  watch: {
    currentClientWidth(newVal, oldVal) {
      this.modifyMenu()
    },
    '$store.state.menu.showsmallMenu'(newVal, old) {
      if (!newVal) {
        move(this.$refs['mainpager'].$el)
          .to(0, 0)
          .end()
      }
    }
  },
  mounted() {
    this.initProject()
  },
  methods: {
    handleDropdown(action) {
      this.$store.commit(action)
      this.$router.replace('/login')
    },
    initProject() {
      console.log(document.body.clientWidth)
      if (document.body.clientWidth === 0) {
        setTimeout(() => {
          //console.log(document.body.clientWidth)
          this.currentClientWidth = document.body.clientWidth
          this.watchWidth()
        }, 1000)
      } else {
        this.currentClientWidth = document.body.clientWidth
        this.watchWidth()
      }
    },
    modifyMenu() {
      if (this.currentClientWidth < 768) {
        this.isShowBigMenu = false
        this.$store.commit('menu/update', false)
      } else {
        this.$store.commit('menu/updateSmall', false)
        this.$store.commit('menu/update', true)
      }
    },
    watchWidth() {
      let timer = null
      window.onresize = () => {
        if (timer) clearTimeout(this.timmer)

        timer = setTimeout(() => {
          this.currentClientWidth = document.body.clientWidth
        }, 1000)
      }
      this.modifyMenu()
    },
    onClose() {
      this.$store.commit('menu/updateSmall', false)
    },
    showSmall() {
      this.$store.commit('menu/updateSmall', true)
      move(this.$refs['mainpager'].$el)
        .to(256, 0)
        .end()
    },
    hideSmall() {
      this.$store.commit('menu/updateSmall', false)
      move(this.$refs['mainpager'].$el)
        .to(0, 0)
        .end()
    }
  }
}
</script>

<style lang="stylus">
#__nuxt {

.el-icon-sort {
  transform: rotate(-90deg)
}


.logo {
  position: relative;
  height: 60px;
  line-height: 60px;
  padding-left: 18px;
  background: #002140;
  overflow: hidden;

  .logo-img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }

  .logo-text {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-weight: 400;
    opacity: 1;
  }
}

// 折叠
.aside-menu.el-menu--collapse {
  /*width: 80px;*/
  min-width: 64px;

  .logo-text {
    opacity: 0;
  }

  // 没有子菜单
   .el-tooltip {
     margin-left: 4px;

    [class*='icon'] {
      font-size: 16px;
      margin: 0;
    }
  }

  // 有子菜单
  .el-submenu__title {
     margin-left: 4px;

    .sub-menu-title,
    .el-submenu__icon-arrow {
      display: none;
    }

    [class*='icon'] {
      font-size: 16px;
      margin: 0;
    }
  }
}

// 子菜单
.el-menu--vertical {
  .el-menu-item,
  .el-submenu__title {
    height: menuHeight;
    line-height: menuHeight;
  }

  .iconfont {
    display: none;
  }
}


// 未折叠
.aside-menu:not(.el-menu--collapse) {
  min-width: 256px;
  max-width: @min-width;

  [class*='icon'] {
    font-size: 14px;
    margin-right: 5px;
  }
}


menuBg = #001529
submenuBg = #000c17
mainColor = #1890ff
// antd menu 高度
menuHeight = 40px

.aside-menu {
  min-height: 100vh;
  border-right: none;
  font-weight: 300;
  background: menuBg;
  /*transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);*/
  /*transition-duration: .3s;*/
  box-shadow: 2px 0 6px rgba(0,21,41,.35);

    .el-submenu__title {
      height: menuHeight;
      line-height: menuHeight;
    }

   .el-submenu {
     margin: 8px 0;

     &.is-active {
       margin-bottom: 8px;
     }
   }

  .el-menu-item {
    height: menuHeight;
    line-height: menuHeight;
    margin: 8px 0;

    &:hover {
      color: #fff !important;
      /*background: menuBg;*/
    }

    &.is-active {
       color: #fff;
       background: mainColor !important;
     }
  }
}


// header
.el-header {
  padding: 10px 20px;
  /*height: 60px !important;*/
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: #fff;
}

// main
.nuxt-main {
  margin: 24px 24px 0;
  padding: 24px;
  background: #fff;
}

// dropdown
.el-dropdown-link {
 cursor: pointer;
 color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

}
.icons{
  position: fixed;
  top: 14px;
  left: 0px;
  width: 40px;
  height: 40px;
  padding-top: 12px;
  box-shadow: 0px 0px 10px 0 #999;
  z-index: 100;
}
</style>
