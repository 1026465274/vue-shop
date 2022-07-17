<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src=".././assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        label-width="80px"
        :model="form"
        class="login_form"
      >
        <el-form-item prop="username" label-width="0px">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" label-width="0px">
          <el-input
            type="password"
            v-model="form.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },

    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const result = await this.$http.post("login", this.form);
        debugger;
        if (!result.status == 200 || !result.data.meta.status == 200)
          return this.$message.error(
            result.data ? result.data.meta.msg : "登录失败！"
          );

        this.$message.success(result.data.meta.msg);

        window.sessionStorage.setItem("token", result.data.token);

        this.$router.push("./home");
      });
    },
  },

  created() {},
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) this.login();
    });
  },
};
</script>

<style lang="less" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #2b4b6b;
}
.login_box {
  position: relative;
  width: 28.125rem;
  height: 18.75rem;
  background-color: #fff;
  border-radius: 0.1875rem;
  .avatar_box {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 8.125rem;
    width: 8.125rem;
    border: 0.0625rem #eee;
    border-radius: 50%;
    padding: 0.625rem;
    box-shadow: 0 0 0.625rem #ddd;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  box-sizing: border-box;
  position: absolute;
  padding: 0 1.25rem;
  width: 100%;
  bottom: 0;
}
</style>
