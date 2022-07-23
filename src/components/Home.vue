<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/logo.png" class="home-logo" alt="" />
        <span> 电商后台管理系统 </span>
      </div>

      <el-button @click="logout" type="info"> 退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->

      <el-aside :width="isCollapse ? '4rem' : '12.5rem'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 菜单区 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activeIndex"
        >
          <!-- 一级菜单母版区域 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + node.path"
              v-for="node in item.children"
              :key="node.id"
            >
              <i class="el-icon-menu"></i>
              <template slot="title">{{ node.authName }}</template>
            </el-menu-item>
          </el-submenu>
        </el-menu></el-aside
      >

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      // 是否折叠
      isCollapse: false,
      activeIndex: '/users',
    };
  },

  created() {
    this.getMenulist();

    this.activeIndex = this.$route.path;
  },

  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
    // 获取菜单
    async getMenulist() {
      const { data: res } = await this.$http.get('menus');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
    },
    // 点击按钮切换菜单折叠展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.home-logo {
  height: 3.125rem;
}

.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  padding-left: 0;
  justify-content: space-between;
  background-color: #373d41;
  align-items: center;
  color: #fff;
  font-size: 1.25rem;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 0.9375em;
    }
  }
}
.el-aside {
  position: relative;
  background-color: #333744;
  overflow: inherit;
  .el-menu {
    border-right: 0;
  }
  .toggle-button {
    position: absolute;
    z-index: 999;
    top: 50%;
    right: -16px;
  }
}

.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  text-align: center;
  line-height: 1.5rem;
  font-size: 0.625rem;
  color: #fff;
  background-color: #4a5064;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
