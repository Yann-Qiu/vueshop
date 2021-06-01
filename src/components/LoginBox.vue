<template>
    <div class="loginBox">
        <div class="avatar">
            <el-avatar :size="130" :src="defalutImg" fit="fill"></el-avatar>
        </div>
        <el-form ref="form" :rules="rules" :model="form" class="form">
            <el-form-item class="inputBox" prop="username">
                <el-input
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user-solid"
                    v-model="form.username">
                </el-input>
            </el-form-item>
            <el-form-item class="inputBox" prop="password">
                <el-input
                    placeholder="请输入密码"
                    prefix-icon="el-icon-s-goods"
                    v-model="form.password"
                    type="password">
                </el-input>
            </el-form-item>
            <div class="butttonLine">
                <el-button type="primary" @click="loginValidate" :plain="true">登录</el-button>
                <el-button type="info" @click="resetForm" :plain="true">重置</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import Vue from 'vue'
import { Avatar, Form, FormItem, Input, Button, Message } from 'element-ui'
import logo from '../assets/logo.png'

Vue.use(Avatar)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

export default {
  data: function () {
    return {
      defalutImg: logo,
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.form.resetFields()
    },
    loginValidate () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { data } = await this.$http.post('login', this.form)
          if (data.meta.status !== 200) {
            Message({
              message: 'login fail',
              type: 'error'
            })
            return false
          } else {
            window.sessionStorage.setItem('token', data.data.token)
            Message({
              message: 'login sucess',
              type: 'success'
            })
            this.$router.push('/home')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .loginBox{
        width: 30vw;
        height: 45vh;
        background-color: #fff;
    }
    .avatar{
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 150px;
        height: 150px;
        margin: 10px;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ebe6e6;
        box-shadow: 0 0 2px;
    }
    .form{
        margin-top: 130px;
    }
    .inputBox{
        padding: 0 15px;
    }
    .butttonLine{
        display: flex;
        justify-content: flex-end;
        margin-right: 30px;
    }
</style>
