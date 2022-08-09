<template>
  <ion-app>
      <ion-router-outlet />

      <van-tabbar v-model="active" safe-area-inset-bottom>
        <van-tabbar-item replace to="/download" icon="down">下载</van-tabbar-item>
        <van-tabbar-item replace to="/settings" icon="setting-o">设置</van-tabbar-item>
      </van-tabbar>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  data() {
    return {
      active: 0
    }
  }
});
</script>

<style>
body {
  font-size: 16px;
  background-color: #F1F0F5;
  -webkit-font-smoothing: antialiased;
}
</style>