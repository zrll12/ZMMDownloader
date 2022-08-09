<template>
  <ion-page>
    <van-nav-bar title="设置" safe-area-inset-top/>

    <van-cell-group style="margin: 10px;" title="请求设置" inset>
      <van-field v-model="requestLocation" label="请求地址" placeholder="https://api.injahow.cn/bparse/"/>
      <van-field v-model="requestMethod" is-link readonly label="请求方法" placeholder="自动判断" @click="showMethodSelect = true"/>
      <van-popup v-model:show="showMethodSelect" round position="bottom">
        <van-picker :columns="requestMethods" @cancel="showMethodSelect = false"  @confirm="confirmMethod"/>
      </van-popup>
    </van-cell-group>

    <van-cell-group style="margin: 10px;" title="下载设置" inset>
      <van-field v-model="videoType" is-link readonly label="视频格式" placeholder="FLV" @click="showTypeSelect = true"/>
      <van-popup v-model:show="showTypeSelect" round position="bottom">
        <van-picker :columns="videoTypes" @cancel="showTypeSelect = false"  @confirm="confirmType"/>
      </van-popup>

      <van-field v-model="CDN" is-link readonly label="CDN" placeholder="默认" @click="showCDNSelect = true"/>
      <van-popup v-model:show="showCDNSelect" round position="bottom">
        <van-picker :columns="CDNs" @cancel="showCDNSelect = false"  @confirm="confirmCDN"/>
      </van-popup>
    </van-cell-group>

    <van-cell-group style="margin: 10px;" inset>
      <van-cell title="保存设置" is-link @click="saveConfig"/>
      <van-cell title="还原为默认" is-link @click="reset"/>
    </van-cell-group>

    <van-cell-group style="margin: 10px;" title="测试" inset>
      <van-cell title="生成测试文件" label="文件存放在 内部存储/Documents/ZMMDownload" is-link
                @click="writeSecretFile"/>
      <van-cell title="读取测试文件" is-link @click="readSecretFile"/>
      <van-cell title="删除测试文件" is-link @click="deleteSecretFile"/>
    </van-cell-group>
  </ion-page>
</template>

<script>
import {defineComponent, ref} from "vue";
import {IonPage} from '@ionic/vue';
import {showToast} from 'vant';
import {Filesystem, Directory, Encoding} from '@capacitor/filesystem';


var requestLocation = ref("https://api.injahow.cn/bparse/");
var requestMethod = ref("自动判断");
var showMethodSelect = ref(false);

var videoType = ref("FLV");
var videoTypeValue = "flv";
var showTypeSelect = ref(false);

var CDN = ref("默认");
var CDNValue = "default";
var showCDNSelect = ref(false);

async function saveConfig(){
  var config = {};
  if (requestLocation.value !== "https://api.injahow.cn/bparse/"){
    config.requestLocation = requestLocation.value;
  }
  if (requestMethod.value !== "自动判断"){
    if (requestMethod.value === "远程请求"){
      config.requestMethod = "remote";
    } else {
      config.requestMethod = "local";
    }
    config.requestMethodName = requestMethod.value;
  }

  if (videoTypeValue !== "flv"){
    config.videoType = videoTypeValue;
  }
  if (CDNValue !== "default"){
    config.CDN = CDNValue;
    config.CDNName = CDN.value;
  }

  console.log(JSON.stringify(config));

  try {
    await Filesystem.writeFile({
      path: 'ZMMDownload/config.json',
      data: JSON.stringify(config),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
      recursive: true
    });
    history.go(0)
  } catch (e) {
    showToast('error: ' + e.message);
  }
}

async function reset() {
  try {
    await Filesystem.deleteFile({
      path: 'ZMMDownload/config.json',
      directory: Directory.Data,
    });
    history.go(0)
  } catch (e) {
    if (e.message === "File does not exist."){
      showToast('error: 没有已保存的设置');
      history.go(0)
    } else {
      showToast('error: ' + e.message);
    }
  }
}

(async ()=>{
  var contents;
  try {
    contents = await Filesystem.readFile({
      path: 'ZMMDownload/config.json',
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  } catch (e) {
    console.log("error: " + e.message);
    return;
  }
  var config = JSON.parse(contents.data);
  console.log(config);
  if (config === undefined){
    return;
  }
  if (config.requestLocation !== undefined){
    requestLocation.value = config.requestLocation;
  }
  if (config.requestMethod !== undefined){
    requestMethod.value = config.requestMethodName;
  }
  if (config.videoType !== undefined){
    videoType.value = config.videoType.toUpperCase();
    videoTypeValue = config.videoType;
  }
  if (config.CDN !== undefined){
    CDN.value = config.CDNName;
    CDNValue = config.CDN;
  }
})()

export default defineComponent({
  name: "SettingsPage",
  components: {IonPage},
  data() {
    return {
      requestLocation,
      requestMethod, showMethodSelect,
      videoType, showTypeSelect,
      CDN, CDNValue, showCDNSelect,
      saveConfig, reset,
      requestMethods: [{text: "自动判断", value: "auto"},
        {text: "远程请求", value: "remote"},
        {text: "本地请求", value: "local"}],
      videoTypes: [{text: "FLV", value: "flv"}, {text: "DASH", value: "dash"}, {text: "MP4(仅Video支持)", value: "mp4"}],
      CDNs: [{value: "default", text: "默认"},
        {value: "ks3", text: "upos-sz-mirrorks3.bilivideo.com"},
        {value: "ks3b", text : "upos-sz-mirrorks3b.bilivideo.com"},
        {value: "ks3c", text: "upos-sz-mirrorks3c.bilivideo.com"},
        {value: "ks32", text: "upos-sz-mirrorks32.bilivideo.com"},
        {value: "kodo", text: "upos-sz-mirrorkodo.bilivideo.com"},
        {value: "kodob", text: "upos-sz-mirrorkodob.bilivideo.com"},
        {value: "cos", text: "upos-sz-mirrorcos.bilivideo.com"},
        {value: "cosb", text: "upos-sz-mirrorcosb.bilivideo.com"},
        {value: "bos", text: "upos-sz-mirrorbos.bilivideo.com"},
        {value: "wcs", text: "upos-sz-mirrorwcs.bilivideo.com"},
        {value: "wcsb", text: "upos-sz-mirrorwcsb.bilivideo.com"},
        {value: "hw", text: "upos-sz-mirrorhw.bilivideo.com"},
        {value: "hwb", text: "upos-sz-mirrorhwb.bilivideo.com"},
        {value: "upbda2", text: "upos-sz-upcdnbda2.bilivideo.com"},
        {value: "upws", text: "upos-sz-upcdnws.bilivideo.com"},
        {value: "uptx", text: "upos-sz-upcdntx.bilivideo.com"},
        {value: "uphw", text: "upos-sz-upcdnhw.bilivideo.com"},
        {value: "js", text: "upos-tf-all-js.bilivideo.com"},
        {value: "hk", text: "cn-hk-eq-bcache-01.bilivideo.com"},
        {value: "akamai", text: "upos-hz-mirrorakam.akamaized.net"}]
    }
  },
  methods: {
    writeSecretFile: async () => {
      try {
        await Filesystem.writeFile({
          path: 'ZMMDownload/text.txt',
          data: "This is a test.",
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
          recursive: true
        });
      } catch (e) {
        showToast('error: ' + e.message);
      }
    },
    readSecretFile: async () => {
      try {
        const contents = await Filesystem.readFile({
          path: 'ZMMDownload/text.txt',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });

        console.log('secrets:', contents.data);
        showToast('secrets: ' + contents.data);
      } catch (e) {
        showToast('error: ' + e.message);
      }
    },
    deleteSecretFile: async () => {
      try {
        await Filesystem.deleteFile({
          path: 'ZMMDownload/text.txt',
          directory: Directory.Documents,
        });
      } catch (e) {
        showToast('error: ' + e.message);
      }
    },
    confirmMethod: ({selectedOptions}) => {
      showMethodSelect.value = false;
      requestMethod.value = selectedOptions[0].text;
    },
    confirmType: ({selectedOptions}) => {
      showTypeSelect.value = false;
      videoType.value = selectedOptions[0].text;
      videoTypeValue = selectedOptions[0].value;
    },
    confirmCDN: ({selectedOptions}) => {
      showCDNSelect.value = false;
      CDN.value = selectedOptions[0].text;
      CDNValue = selectedOptions[0].value;
    }
  }
})
</script>

<style scoped>

</style>