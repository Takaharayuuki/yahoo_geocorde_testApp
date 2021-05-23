<template>
  <HelloWorld msg="Get GoogleMap StreetView" />
  <p>1,住所を入力し、GetGeoCordeを押す</p>
  <p>2,その後、それぞれの見たいマップを選択する</p>
  <form>
    <div>
      <span style="font-size: 12px; color: red">必須</span>
      <label for="userZip">
        郵便番号(ハイフン無し)：<input
          name="userZip"
          type="text"
          v-model="formData.userZip"
        />
      </label>
    </div>
    <button @click.prevent.stop="onSearchAddress">
      郵便番号から住所を検索する
    </button>
    <div>
      <span style="font-size: 12px; color: red">必須</span>
      <label for="userPref">
        都道府県：
        <select v-model="formData.userPref">
          <option v-for="pref in prefectureOptions" :key="pref.id">
            {{ pref.value }}
          </option>
        </select>
      </label>
    </div>
    <div>
      <span style="font-size: 12px; color: red">必須</span>
      <label for="userAddr">
        市・区・町村：
        <input name="userAddr" type="text" v-model="formData.userAddr" />
      </label>
    </div>
    <div>
      <span style="font-size: 12px; color: red">必須</span>
      <label for="userAddr2">
        番地：
        <input name="userAddr2" type="text" v-model="formData.userAddr2" />
      </label>
    </div>
    <div>
      <label for="userBld">
        建物名：
        <input name="userBld" type="text" v-model="formData.userBld" />
      </label>
    </div>
  </form>
  <div>
    <button @click="onGetGeocode">GetGeoCode</button>
    <h3 v-if="!isGet" style="color: red">OK!</h3>
  </div>

  <h3>検索する場所</h3>
  <div>
    郵便番号：
    <span style="font-weight: bold; font-size: 16px">{{
      formData.userZip
    }}</span>
  </div>
  <div>
    都道府県：
    <span style="font-weight: bold; font-size: 16px">{{
      formData.userPref
    }}</span>
  </div>
  <div>
    市・区・町村：
    <span style="font-weight: bold; font-size: 16px">{{
      formData.userAddr
    }}</span>
  </div>
  <div>
    番地：
    <span style="font-weight: bold; font-size: 16px">{{
      formData.userAddr2
    }}</span>
  </div>
  <div>
    建物名：
    <span style="font-weight: bold; font-size: 16px">{{
      formData.userBld
    }}</span>
  </div>

  <div>
    <button
      :disabled="isGet"
      @click="onGoogleMapView()"
      style="margin-right: 12px"
    >
      入力した住所のGoogleMapを表示する
    </button>
    <button :disabled="isGet" @click="onGoogleMapStreetView()">
      入力した住所のStreetViewを表示する
    </button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { defineComponent, ref, reactive, computed } from "vue";
import { prefectureOptions } from "./data/index";
import api from "./api/index";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const formData = reactive({
      userZip: "",
      userPref: "",
      userAddr: "",
      userAddr2: "",
      userBld: "",
    });

    const isGet = ref(true);

    const apiData = reactive({
      apiKey: process.env.VUE_APP_API_KEY,
      url:
        "https://map.yahooapis.jp/geocode/V1/geoCoder?output=json&recursive=true&appid=",
    });

    const getData = reactive({
      set: "",
      // 緯度
      lat: "",
      // 経度
      long: "",
    });
    // 入力した住所データを、緯度、軽度に変換する
    function onGetGeocode() {
      if (
        formData.userZip !== "" &&
        formData.userPref !== "" &&
        formData.userAddr !== "" &&
        formData.userAddr2 !== ""
      ) {
        const setZip = formData.userZip.replace("-", "");
        const request = {
          query:
            setZip +
            formData.userPref +
            formData.userAddr +
            formData.userAddr2 +
            formData.userBld,
        };
        const setUrl = apiData.url + apiData.apiKey + "&query=" + request.query;
        api.external.yahooGeoCoder(setUrl).then((data) => {
          isGet.value = false;
          let resultArray = data.split(",");
          getData.set = resultArray;
          getData.long = getData.set[0];
          getData.lat = getData.set[1];
        });
      } else {
        alert("必須項目を入力してください");
      }
    }
    // googleMapの表示
    function onGoogleMapView() {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${
          formData.userPref +
          formData.userAddr +
          formData.userAddr2 +
          formData.userBld
        }`,
        "_blank"
      );
    }
    //googlemapStreetViewの表示
    function onGoogleMapStreetView() {
      window.open(
        `https://www.google.com/maps/@?api=1&map_action=pano&parameters&viewpoint=${
          getData.lat + "," + getData.long
        }`,
        "_blank"
      );
    }
    /* 郵便番号から住所を自動入力 */
    function onSearchAddress() {
      api.external
        .zipcloud(formData.userZip)
        .then((data) => {
          formData.userPref = data.address1;
          formData.userAddr = data.address2 + data.address3;
        })
        .catch((error) => alert(error));
    }
    return {
      //フラグ
      isGet,
      //データ
      formData,
      apiData,
      getData,
      prefectureOptions,
      //関数
      onGetGeocode,
      onGoogleMapView,
      onGoogleMapStreetView,
      onSearchAddress,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
