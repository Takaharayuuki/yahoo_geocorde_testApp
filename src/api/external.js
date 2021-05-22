import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp"; // JSONPを取り扱うためのアダプター

export default {
  zipcloud: async function searchAddress(zipcode) {
    console.log(zipcode);
    return axios
      .get("http://zipcloud.ibsnet.co.jp/api/search", {
        params: { zipcode },
        adapter: axiosJsonpAdapter,
      })
      .then((response) => response.data.results[0]);
  },
};
