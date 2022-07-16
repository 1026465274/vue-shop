<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
import login from "./components/Login";

export default {
  name: "App",
  components: {
    login,
  },
};
</script>

<style></style>
