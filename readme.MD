## 初音ミク「マジカルミライ 2021」プログラミング・コンテスト

#### 作品名: バブルバス

対象楽曲: [密かなる交信曲 - 濁茶 さん](https://rikahei.github.io/mm_procon_2021_production/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCh4RQPG1Tmo)

作品のプログラムは審査希望曲以外でも動作します

推奨環境: Chrome

#### 作品のアピールポイント: 

* TextAliveとP5.jsを利用して、作成するカジュアルゲームです。
* バブル全体をはずみます。
* クリックタイミングはchorusに決定します。
* クリックタイミングが合えば、近いバブルを消すことができます。
* 消す範囲はクリックタイミングに影響します。
* テーマ色はValenceArousal値に決定します。
* 一部Android / iOSデバイスを対応します。

## About this app

This is a Web application for 初音ミク「マジカルミライ 2021」プログラミング・コンテスト.
https://magicalmirai.com/2021/procon/

The AIM of this application is to use TextAlive API to build a relax & casual game.

The design theme is `bath bubbles` 

* Lyrics bubbles will rebounce all over the screen 
* Users are able to click the bubble and clean out near bubbles
* Click timing is according to music chorus
* Color theme decided by ValenceArousal value
* Compatible with some Android / iOS devices.

![Screenshot](https://github.com/Rikahei/miku_procon_2021/blob/master/assets/demo_1.gif "click demo")

![Screenshot](https://github.com/Rikahei/miku_procon_2021/blob/master/assets/demo_2.gif "mobile demo")
![Screenshot](https://github.com/Rikahei/miku_procon_2021/blob/master/assets/demo_3.gif "bubble demo")

[Demo song: 密かなる交信曲 - 濁茶 さん](https://rikahei.github.io/mm_procon_2021_production/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCh4RQPG1Tmo)

[Demo song: 嘘も本当も君だから - 真島ゆろ さん](https://rikahei.github.io/mm_procon_2021_production/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DSe89rQPp5tk)

[Demo song: First Note - blues さん](https://rikahei.github.io/mm_procon_2021_production/)

Recommend browser: Chrome Version 94.0.4606.61 (Official Build) (64-bit)

#### Song url
Place song url at `ta_song_url={song URL}` can access the song you like

Supported song url can be find in [TextAlive API web page](https://textalive.jp/songs).
#### Develop environment setup

With node.js installed, run below commends to build dev environment in local.

```sh
npm install
npm run dev
```

! Recommend nodejs version v14.17.4, version 16 or later may cause build failure in my experience.

! You may also reference for building dev environment [TextAlive API example](https://github.com/TextAliveJp/textalive-app-p5js).

## Build for production

Run below command can build production files at /docs

```sh
npm run build
```

## Information from TextAlive App API

TextAlive App API is the JavaScript API for developing "lyric apps" (cf. lyric videos) that show lyrics synchronized with the music playback.

For more details on the TextAlive App API, please visit the website [TextAlive for Developers](https://developer.textalive.jp/).

## License

#### Sound effect

bubble-9.wav by Glaneur de sons

https://freesound.org/people/Glaneur%20de%20sons/sounds/104948/

Attribution 3.0 Unported (CC BY 3.0)

#### Sketch library

https://p5js.org/