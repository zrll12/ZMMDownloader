import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { Toast } from 'vant';
import 'vant/es/toast/style';

/* Theme variables */
import { ConfigProvider } from 'vant';

const app = createApp(App)
  .use(ConfigProvider)
  .use(Toast)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});