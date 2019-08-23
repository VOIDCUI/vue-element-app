<template>
  <div class="login">
    <section class="form-container">
      <div class="header">
        <span class="head-title">后台管理系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="loginForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="submitForm('loginForm')">登陆</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>
            还没有账号?现在
            <router-link to="register">注册</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";

export default {
  name: "login",
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不对",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在6到20个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("api/users/login", this.loginUser).then(res => {
            //token
            const { token } = res.data;
            localStorage.setItem("eleToken", token);

            //解析token
            const decode = jwt_decode(token);

            //token储存到vuex
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);

            this.$router.push("/index");
          });
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>



<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../assets/images/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}
.form-container {
  width: 40%;
  min-width:370px;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-70%);
  
  
}
.head-title {
  font-weight: bold;
  font-size: 1.5em;
  color: #fff;
}
.loginForm {
  height:220px;
  margin-top: 30px;
  background-color: #fff;
  padding: 60px 40px 20px 0px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #cccc;
}
.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>




