import { createApp } from "vue";
import BootstrapVue3 from "bootstrap-vue-3";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import App from "./App.vue";
const app = createApp(App);

//design
app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
app.mount("#app");
