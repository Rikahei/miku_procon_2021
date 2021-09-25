## 初音ミク「マジカルミライ 2021」プログラミング・コンテスト

初音ミク「マジカルミライ 2021」プログラミング・コンテストの応募作品です。

### 作品名: バブルバス

対象楽曲: [密かなる交信曲 - 濁茶 さん](https://rikahei.github.io/mm_procon_2021_production/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCh4RQPG1Tmo)

作品のプログラムは審査希望曲以外でも動作します

推奨環境: Chrome

### 作品のアピールポイント: 

---

TBC

## About this app

This is a Web application for 初音ミク「マジカルミライ 2021」プログラミング・コンテスト.
https://magicalmirai.com/2021/procon/

The AIM of this application is to use TextAlive API to build a relax, funny mini animation plus reaction.

The design theme is `bath bubbles` 

* Lyrics bubbles will go all over the screen 
* Users are able to click the bubble and wipe off near bubbles
* Click timing is according to music chorus
* Color theme base on ValenceArousal value

[Demo](https://rikahei.github.io/mm_procon_2021_production/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCh4RQPG1Tmo)

# Song url
Place song url at `ta_song_url={song URL}` can access the song you like

Supported song url can be find in [TextAlive API web page](https://textalive.jp/songs).
## Develop environment setup

With node.js installed, run below commends to build dev environment in local.

```sh
npm install
npm run dev
```

## Build for production

Run below command can build production files at /docs

```sh
npm run build
```

## Information from TextAlive App API

TextAlive App API is the JavaScript API for developing "lyric apps" (cf. lyric videos) that show lyrics synchronized with the music playback.

For more details on the TextAlive App API, please visit the website [TextAlive for Developers](https://developer.textalive.jp/).