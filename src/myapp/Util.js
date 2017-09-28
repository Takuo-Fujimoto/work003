export function generateRandomCoordinate(count) {
    // randomは0.0以上1.0未満までのランダムな浮動小数点を得る
    let randomValue = Math.random();
    // 乱数を、横か縦のマスの数に変換する
    // 具体的には0.0～0.99999…をマスの数で分割するイメージ　実際には乱数にマス数をかけて切り上げる
    return Math.ceil(randomValue * count);
}