<template>
  <div class="register">
    <section class="form-container">
      <div class="header">
        <span class="head-title">后台管理系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="registerForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="registerUser.checkPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="registerUser.identity" placeholdder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        checkPassword: "",
        identity: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 30,
            message: "长度在2到30个字符之间",
            trigger: "blur"
          }
        ],
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
        ],
        checkPassword: [
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
          },
          {
            validator: validatePass2,
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
          this.$axios
            .post("api/users/register", this.registerUser)
            .then(res => {
              this.$message({
                message: "账号注册成功!",
                type: "success"
              });
            });
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>



<style scoped>
.register {
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
  transform: translate(-50%,-60%);
}
.head-title {
  font-weight: bold;
  font-size: 1.5em;
  color: #fff;
}
.registerForm {
  margin-top: 30px;
  background-color: #fff;
  padding: 60px 40px 20px 0px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #cccc;
}
.submit-btn {
  width: 100%;
}
</style>




