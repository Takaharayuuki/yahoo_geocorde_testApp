# geocode-test

## YahooジオコーダAPIのテストアプリ
- デプロイ
```
https://geocode-getmap.netlify.app/
```
- Web API通信の設計方法をRepositoryFactoryを参考にする
```
https://qiita.com/07JP27/items/0923cbe3b6435c19d761
```
- 入力もしくは保存されたユーザデータの住所からGoogleMap、GoogleStreetViewの表示機能
```
https://qiita.com/hiron2225/items/8d5cd1b6728b4d63434b#display-a-street-view-panorama%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%88%E3%83%93%E3%83%A5%E3%83%BC%E8%A1%A8%E7%A4%BA
```
- 郵便番号から自動で住所入力機能
```
郵便番号データ配信サービスzipcloud
http://zipcloud.ibsnet.co.jp/doc/api
```
- 住所データを元に緯度、経度を取得
```
Yahoo!ジオコーダAPI
https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/geocoder.html#response
```
- vue-cli 開発 環境変数設定
```
https://qiita.com/go6887/items/2e254d31b5a4af42f813
```
- Netlifyへの自動デプロイ
```
https://cr-vue.mio3io.com/tutorials/netlify.html#netlify-%E3%81%A8%E3%81%AF%EF%BC%9F
```
- Netlify 本番 環境変数設定
```
https://docs.netlify.com/configure-builds/environment-variables/?_ga=2.183326118.1636900594.1621681337-2001869349.1621681337
```
- CORSエラー対処参考
```
https://qiita.com/sohhprog/items/845cfa02f87111653bb2
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
