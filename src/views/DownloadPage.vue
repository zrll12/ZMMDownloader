<template>
  <ion-page>
    <van-nav-bar title="下载" safe-area-inset-top/>
    <van-cell-group style="margin: 10px;" inset title="基本设置">
      <van-field label="视频链接" placeholder="请输入视频链接" />
      <van-cell title="下载" is-link />
    </van-cell-group>

    <van-cell-group style="margin: 10px;" title="换源设置" inset>
      <van-cell center title="启用换源" label="使用请求到的视频地址在DPlayer进行播放，弹幕速度为弹幕滑过DPlayer的时间">
        <template #right-icon>
          <van-switch v-model="authorized"/>
        </template>
      </van-cell>

      <van-field label="弹幕速度(s)" type="number" v-model="dmSpeed" :disabled="!authorized"/>
      <van-field label="弹幕字号(px)" type="number" v-model="dmSize" :disabled="!authorized"/>

    </van-cell-group>
  </ion-page>
<!--    <van-field-->
<!--        v-model="definition"-->
<!--        is-link-->
<!--        readonly-->
<!--        label="清晰度"-->
<!--        placeholder="请选择清晰度"-->
<!--        @click="definitionPicker = true"-->
<!--    />-->
<!--    <van-popup v-model:show="definitionPicker" round position="bottom">-->
<!--      <van-picker-->
<!--          :columns="definitionColumns"-->
<!--          @cancel="definitionPicker = false"-->
<!--          @confirm="onConfirm"-->
<!--      />-->
<!--    </van-popup>-->
</template>

<script>
import {ref, defineComponent} from "vue";
import { IonPage } from '@ionic/vue';

export default defineComponent({
  name: 'DownloadPage',
  data() {
    var definition = ref('480P');
    var definitionPicker = ref(false);
    var authorized = ref(false);

    var dmSpeed = ref(15);
    var dmSize = ref(22);

    return {
      definition: definition,
      definitionPicker: definitionPicker,
      definitionColumns: [
        { text: '480P', value: '480P' },
        { text: '720P', value: '720P' },
        { text: '1080P', value: '1080P' },
        { text: '4K', value: '4K' },
        { text: '4K 60FPS', value: '4K60' },
      ],
      onConfirm: ({ selectedOptions }) => {
        definitionPicker.value = false;
        definition.value = selectedOptions[0].text;
      },
      authorized: authorized,
      dmSpeed: dmSpeed,
      dmSize: dmSize,
    }
  },
  components: {IonPage}
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
