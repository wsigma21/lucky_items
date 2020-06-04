'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment')
const resultArea = document.getElementById('result-area')
const tweetArea = document.getElementById('tweet-area');

/**
 * 指定した要素に子要素があったら削除する関数
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        return;
    }


    //診断結果の表示
    removeAllChildren(resultArea);
    const title = "診断結果"
    const header = document.createElement('h2');
    header.innerHTML = title;
    resultArea.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultArea.appendChild(paragraph);

    //ツイートエリアの作成
    removeAllChildren(tweetArea)
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('今日のラッキーアイテム') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #今日のラッキーアイテム';
    tweetArea.appendChild(anchor);

    //widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetArea.appendChild(script);
}

document.getElementById('user-name').onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}

const answer = '{ userName }のラッキーアイテムは{ itemColor }の{ itemName }です。いってらっしゃい♪'

const itemColor = [
    '薄紅色',
    '紅色',
    '赤',
    '紅樺色',
    '朱色',
    '赤茶色',
    '茶色',
    '焦茶色',
    'だいだい色（橙色）',
    '蜜柑色',
    '土色',
    '黄土色',
    '朽葉色',
    '山吹色',
    'たまご色（卵色）',
    '黄色',
    'レモン色',
    '黄緑',
    '松葉色',
    '灰緑',
    '緑',
    'エメラルドグリーン',
    '深緑',
    '常磐色',
    '青磁色',
    '薄青緑',
    '青緑',
    '納戸色',
    '水色',
    '薄青',
    '青',
    '藍色',
    '薄群青色',
    '群青色',
    '藤色',
    '藤紫',
    '菫色',
    '薄紫',
    '紫',
    '赤紫',
    '濃赤紫',
    '桃色',
    '白',
    'ねずみ色（鼠色）',
    '灰色',
    '黒',
    '金色',
    '銀色',
]

const itemName = [
    'エプロン',
    'カサ（雨傘）',
    'カバン（スポーツ）',
    '靴',
    '靴下',
    '財布',
    'サンダル',
    'ジャケット',
    'シャツ（下着）',
    'スカート',
    'ズボン',
    'スリッパ',
    'セーター',
    'ティーシャツ',
    '手袋',
    '長靴',
    'ネクタイ',
    'ネックレス',
    'ハイヒール',
    'パジャマ',
    'ハンカチ',
    'パンツ（下着）',
    'ハンドバッグ',
    '傘（日傘）',
    'ブーツ',
    '衣服',
    'ブラウス',
    'ベルト',
    '帽子（縁のある）',
    'マフラー',
    '眼鏡',
    '野球帽',
    '指輪',
    'リュックサック',
    '合羽',
]


/** 
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }
    // 今日の日付を取得
    let now = new Date();
    let date = now.getMonth() + 1 + now.getDate();
    //console.log("date=", date)

    // 文字のコード番号の合計を解答の数で割って添え字の数値を求める
    const colorIndex = Math.floor((sumOfCharCode + date) % itemColor.length);
    const nameIndex = Math.floor((sumOfCharCode + date) % itemName.length);
    //console.log("itemColor.length:", itemColor.length, "itemName.length:", itemName.length);
    //console.log("colorIndex=", colorIndex)
    //console.log("nameIndex=", nameIndex)

    // answerの各部分の置換
    let result = answer
    result = result.replace(/\{ userName \}/g, userName);
    result = result.replace(/\{ itemColor \}/g, itemColor[colorIndex]);
    result = result.replace(/\{ itemName \}/g, itemName[nameIndex]);
    return result;
}

console.assert(
    assessment('太郎').indexOf('undefined') === -1,
    "診断結果の文言の特定部分を名前に置き換える処理が正しくありません"

);

console.assert(
    assessment('太郎') === assessment('太郎'),
    "入力が同じなら同じ診断結果を出力する処理が正しくありません"
);



