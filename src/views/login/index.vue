<template>
  <div class="login-container">
    <!--el-form组件： elementUI插件里面的一个组件，经常展示表单元素  model： 用于收集表单数据 rules： 表单验证规则-->
    <el-form
      ref="loginForm"
      :model="loginFrom"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          ref="username"
          v-model="loginFrom.username"
          placeholder="ID"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input
          ref="password"
          v-model="loginFrom.password"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          show-password
        />
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="login"
      >登录</el-button>
      <router-link to="/register" class="reg">没有账号去注册</router-link>
    </el-form>
  </div>
</template>

<script>
// import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginFrom: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      console.log(this.loginFrom.password)
      const a = await this.$http.post('/login?id=' + parseInt(this.loginFrom.username) + '&password=' + this.loginFrom.password)
      // const a = await this.$http.post('/login', {
      //   id: parseInt(this.loginFrom.username),
      //   password: this.loginFrom.password
      // })
      console.log(a)
      if (a.data.flag) {
        localStorage.setItem('token', this.loginFrom.username)
        // setToken(this.loginFrom.username)
        // console.log(1)
        this.$router.push('/home')
      } else {
        localStorage.removeItem('token')
        alert('账号或密码错误！')
      }
    }
  }
}
// import { validUsername } from "@/utils/validate";
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      //-webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;

  span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.reg {
  color: #fff;
}
</style>
