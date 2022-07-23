<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              @click="getUserList"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="dialogVisible = true">
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <template>
        <el-table :data="userList" style="width: 100%">
          <el-table-column prop="role_name" label="用户" width="180">
          </el-table-column>
          <el-table-column prop="username" label="账号" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 1.857rem">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </template>
      <!-- 卡片视图 -->
    </el-card>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <formVue ref="formData"></formVue>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserData"> 确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formVue from '@/conmmon/Form.vue';

export default {
  data() {
    return {
      // 获取用户列表对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      userList: [],
      total: 0,
      dialogVisible: false,
    };
  },

  methods: {
    //获取用户信息
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo,
      });
      console.log(res);
      if (res && res.meta.status !== 200)
        return this.$message.error(res.meta ? res.meta.msg : '获取数据失败！');
      this.userList = res.data.users;
      this.total = res.data.total;
    },

    // 添加修改用户信息
    async addOrUpdateUserInfo(data) {
      if (data.id) {
        // 修改
      } else {
        // 添加
        data.id = Number(new Date());
        const res = await this.$http.post('users', data);
        if (res.data && res.date.meta.status !== 201)
          return this.$message.error(
            res.date.meta ? res.date.meta.msg : '新增失败'
          );

        this.$message.info(res.date.meta ? res.date.meta.msg : '新增成功');
        getUserList();
      }
    },

    handleSizeChange(size) {
      console.log(size);
    },
    handleCurrentChange(data) {
      console.log(data);
    },

    // 添加按钮弹窗点击确定方法
    addUserData() {
      debugger;
      this.dialogVisible = false;
      const formData = this.$refs.formData._data.ruleForm;
      this.addOrUpdateUserInfo(formData);
    },
  },

  components: {
    formVue,
  },

  created() {
    this.getUserList();
  },
};
</script>

<style scoped></style>
