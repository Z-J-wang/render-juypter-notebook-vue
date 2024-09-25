import { createApp } from 'vue-demi';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/css/main.css';

createApp(App).use(router).use(ElementPlus).mount('#app');
