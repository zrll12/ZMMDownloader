import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import DownloadPage from "@/views/DownloadPage.vue";
import SettingsPage from "@/views/SettingsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/download'
  },
  {
    path: '/download',
    name: 'Download',
    component: DownloadPage
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
