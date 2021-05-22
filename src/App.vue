<template>
  <form>
    <div>
      <label for="userPref">
        都道府県：
        <input name="userPref" type="text" v-model="formData.userPref" />
      </label>
    </div>
    <div>
      <label for="userAddr">
        市・区・町村：
        <input name="userAddr" type="text" v-model="formData.userAddr" />
      </label>
    </div>
    <div>
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

  <div>
    都道府県：
    <p>{{ formData.userPref }}</p>
  </div>
  <div>
    市・区・町村：
    <p>{{ formData.userAddr }}</p>
  </div>
  <div>
    番地：
    <p>{{ formData.userAddr2 }}</p>
  </div>
  <div>
    建物名：
    <p>{{ formData.userBld }}</p>
  </div>

  <div>
    <button @click="onGoogleMapView()">
      入力した住所のGoogleMapを表示する
    </button>
  </div>
  <HelloWorld msg="Get GoogleMap StreetView" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { defineComponent } from "vue";
import { reactive } from "@vue/reactivity";

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

    // 入力した住所データを、緯度、軽度に変換する
    function onGetGeocode() {
      console.log("ok");
    }

    // googleMapの表示
    function onGoogleMapView() {
      console.log("Mapview: ok");
    }
    //googlemapStreetViewの表示
    function onGoogleMapStreetView() {
      console.log("streetview: ok");
    }
    return {
      //データ
      formData,
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
