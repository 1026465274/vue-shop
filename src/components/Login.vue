<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src=".././assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <!-- <el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input name="name"></el-input>
        </el-form-item>
      </el-form> -->
    </div>
  </div>
</template>

<script>
export default {};
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
</style>
