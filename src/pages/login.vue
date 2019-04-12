<template>
  <div class="login">
     <vue-particles
         style="width:100%"
         color="#dedede"
        :particleOpacity="1"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>
    <div class="main">
      <div class="form">
        <span class="title">{{ $store.state.users.meta.appName }}</span>
        <el-form :model="form" status-icon :rules="rules" ref="loginForm" class="">
                <el-form-item label="" prop="username">
                  <el-input placeholder="账号" v-model.trim="form.username"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                  <el-input placeholder="密码" type="password" v-model.trim="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="code">
                  <div class="code">
                      <el-input placeholder="验证码" v-model.trim="form.code" auto-complete="off" @keyup.enter.native="login" width="70%"></el-input>
                      <span class="codeitem">{{code}}</span>
                      <span class="txt" @click="changeCode">换一张</span>
                  </div>

                </el-form-item>
                <el-form-item>
                  <el-button class="login-button" @click="login" :loading="loading" size="medium">登录</el-button>
                </el-form-item>
        </el-form>
      </div>
  </div>
</div>

</template>

<script>
import {CodeValidator} from 'code-validator'

export default {
  layout: 'login',
  name: 'login',
  components: {},
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: '',
        code: '',
        cv: null
      },
      code: '',
      rules: {
        username: [{required: true, message: '请输入账号', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    getCode() {
      this.cv = new CodeValidator({
        width: 160,
        height: 50,
        length: 5
      })
      this.code = this.cv.random().value
    },
    changeCode() {
      this.code = this.cv.random().value
    },
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.code.toUpperCase() !== this.form.code.toUpperCase()) {
            this.$notify.info({
              title: '提示',
              message: '验证码输入错误'
            })
            return
          }
          this.loading = true

          this.$store
            .dispatch('login', this.form)
            .then(() => {
              this.loading = false
              this.$router.replace('/')
            })
            .catch(e => {
              // TODO 异常处理
              this.loading = false
              console.log(e)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.login{
  display flex
  justify-content center
  align-items center
  background url('../assets/images/bg.jpg')
  width: 100vw
	height: 100vh
	position: relative
	background-position: 50% 50%
	background-size: cover
	background-repeat: no-repeat
	margin-left: auto
	margin-right: auto
}
.form{
  z-index: 2;
  position:absolute;
  padding 100px 30px
  width: 350px;
  border-radius: 5px;
  height: 500px;
  background: white;
  box-shadow: 0px 0px 5px #333333;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -175px;
  transition: all 1s;-moz-transition: all 1s;	/* Firefox 4 */-webkit-transition: all 1s;	/* Safari 和 Chrome */-o-transition: all 1s;	/* Opera */}
.login-button{
  cursor: pointer;
  width: 290px;
  text-align: center;
  height: 40px;
  line-height: 20px;
  background-color: dodgerblue;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 20px;
  color: white;
  }
  .code .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    flex: 1;
    margin-right: 10px;

}
.code{
  display :flex;
  justify-content space-around
}
.codeitem{
 background:#A2F0DF
 display :block;
 width 60px;
 height 37px;
 text-align center;
}
.txt{
  color:#A2F0DF
 display :block;
 width 60px;
 height 37px;
 text-align center;
 cursor pointer
}
.title{
  width:100%;
  height:23px;
  font-size:1rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(8,5,5,1);
  text-align :center;
  line-height: 23px;
  display :block;
  margin-bottom :35px
}



</style>
