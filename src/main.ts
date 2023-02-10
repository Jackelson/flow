import { createApp } from 'vue';
import router from "./router";
import { ElCarousel, ElCarouselItem, ElMenu, ElMenuItem, ElImage, ElIcon } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/styles/common.css';
import './assets/font.css' // 引入YouSheBiaoTiHei-2字体
import './assets/styles/zhijiang.css';
import App from './App.vue'
import "./mock/index.js";
const app = createApp(App);

app.use(router);

/**
 * 按需引入组件类
 */
app.component(ElCarousel.name, ElCarousel);
app.component(ElCarouselItem.name, ElCarouselItem);
app.component(ElMenu.name, ElMenu);
app.component(ElMenuItem.name, ElMenuItem);
app.component(ElImage.name, ElImage);
app.component(ElIcon.name, ElIcon);



app.mount('#app');
