import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.css";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";

// 配置请求根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";

Vue.prototype.$http = axios;

Vue.prototype.$message = ElementUI.Message;
Vue.config.productionTip = false;

Vue.use(ElementUI);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
