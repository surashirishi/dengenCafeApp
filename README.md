# dengenCafeApp

## 5月23日（土）〜24日（日）にて、飲食店API（ぐるなびAPI）を利用した、近くの電源カフェ（Wifi環境があるカフェ）を一覧するアプリケーションをnuxtで作成致しました。

### メインのコンポーネント
- pages/cafe/index.vue
【一覧表示画面】
ファーストビューにて、Geolocation APIから現在地の「緯度」・「経度」を取得し、ぐるなびAPIに渡すことで現在地近くの電源カフェを取得。
一方、ぐるなびAPIの仕様上、「緯度」「経度」の該当範囲が狭いため、ヘッダー左上より都内２３区に限って、手動による検索が可能。
APIの取得〜データの持ち回しを行うためにvuexを利用しています。
API取得時のCORS対策としては、nuxtのプロキシ機能を利用することにより対応しました。

- components/Modal.vue
【詳細表示画面】
- ダイアログの表示はトップレベルコンポーネントである、layouts/default.vueより呼び出しを行うため、vuexを用いて表示/非表示を切り分けている。
- 一覧表示画面より、選択された店舗のIDをパラメータに、店舗詳細情報をぐるなびAPIより取得・反映。

その他、scssを使用しており、特に色味ついては統一感・保守性を意識して積極的に変数化を行っております。


> Nuxt.js project
## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
