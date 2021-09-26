## 初音ミク「マジカルミライ 2021」プログラミング・コンテスト

初音ミク「マジカルミライ 2021」プログラミング・コンテストの応募作品です。

### 作品名: バブルバス

対象楽曲: [密かなる交信曲 - 濁茶 さん](https://rikahei.github.io/mm_procon_2021_production/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCh4RQPG1Tmo)

作品のプログラムは審査希望曲以外でも動作します

推奨環境: Chrome

### 作品のアピールポイント: 

* TextAliveとP5.jsを利用して、カジュアルゲームです。
* バブルは全体にぶつかります。
* クリックタイミングはchorusに決定します。
* クリックタイミングが合えば、近いバブルを消すことができます。
* 消す範囲はクリックタイミングに影響します。
* テーマ色はValenceArousal値に決定します。

## About this app

This is a Web application for 初音ミク「マジカルミライ 2021」プログラミング・コンテスト.
https://magicalmirai.com/2021/procon/

The AIM of this application is to use TextAlive API to build a relax & casual game.

The design theme is `bath bubbles` 

* Lyrics bubbles will rebounce all over the screen 
* Users are able to click the bubble and clean out near bubbles
* Click timing is according to music chorus
* Color theme decided by ValenceArousal value

[Demo song: 密かなる交信曲 - 濁茶 さん](https://rikahei.github.io/mm_procon_2021_production/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCh4RQPG1Tmo)

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

## License

### Sound effect

bubble-9.wav

https://freesound.org/people/Glaneur%20de%20sons/sounds/104948/

Attribution 3.0 Unported (CC BY 3.0)

### Sketch library

https://p5js.org/