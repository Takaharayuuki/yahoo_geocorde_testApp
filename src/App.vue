<template>
  <form>
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
  <button @click="onGetGeocode">GetGeoCode</button>

  <h3>検索する場所</h3>
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
    <button @click="onGoogleMapView()">
      入力した住所のGoogleMapを表示する
    </button>
    <button @click="onGoogleMapStreetView()">
      入力した住所のStreetViewを表示する
    </button>
  </div>
  <HelloWorld msg="Get GoogleMap StreetView" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { defineComponent } from "vue";
import { reactive } from "@vue/reactivity";
import axios from "axios";
import { prefectureOptions } from "./data/index";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const formData = reactive({
      userPref: "",
      userAddr: "",
      userAddr2: "",
      userBld: "",
    });

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
      console.log("ok");
      const request = {
        query:
          formData.userPref +
          formData.userAddr +
          formData.userAddr2 +
          formData.userBld,
      };
      console.log(request);
      const setUrl = apiData.url + apiData.apiKey + "&query=" + request.query;
      console.log(setUrl);
      axios
        .get(setUrl)
        .then((response) => {
          const res = response.data.Feature[0].Geometry.Coordinates;
          let resultArray = res.split(",");
          console.log(resultArray);
          getData.set = resultArray;
          console.log(getData.set);
          getData.long = getData.set[0];
          getData.lat = getData.set[1];
        })
        .catch((err) => console.log(err));
    }
    // googleMapの表示
    function onGoogleMapView() {
      console.log("Mapview: ok");
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
      console.log("streetview: ok");
      window.open(
        `https://www.google.com/maps/@?api=1&map_action=pano&parameters&viewpoint=${
          getData.lat + "," + getData.long
        }`,
        "_blank"
      );
    }
    return {
      //データ
      formData,
      apiData,
      getData,
      prefectureOptions,
      //関数
      onGetGeocode,
      onGoogleMapView,
      onGoogleMapStreetView,
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
