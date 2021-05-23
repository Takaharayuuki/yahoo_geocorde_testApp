import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp"; // JSONPを取り扱うためのアダプター

export default {
  /* 郵便番号API */
  zipcloud: async function searchAddress(zipcode) {
    console.log(zipcode);
    return axios
      .get("https://zipcloud.ibsnet.co.jp/api/search", {
        params: { zipcode },
        adapter: axiosJsonpAdapter,
      })
      .then((response) => response.data.results[0]);
  },
  /*緯度、経度取得API */
  yahooGeoCoder: async function getGeodode(setUrl) {
    return axios
      .get(setUrl)
      .then((response) => {
        return response.data.Feature[0].Geometry.Coordinates;
      })
      .catch((err) => console.log(err));
  },
};
