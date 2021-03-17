/**
 * 转换弧度
 * @param d
 * @returns {number}
 */
function getRad(d) {
    let PI = Math.PI;
    return d * PI / 180.0;
}

function getDistanceByLocation(location1, location2) {

    let f = getRad((location1.latitude + location2.latitude) / 2);
    let g = getRad((location1.latitude - location2.latitude) / 2);
    let l = getRad((location1.longitude - location2.longitude) / 2);
    let sg = Math.sin(g);
    let sl = Math.sin(l);
    let sf = Math.sin(f);
    let s, c, w, r, d, h1, h2;
    let a = 6378137.0;//The Radius of eath in meter.
    let fl = 1 / 298.257;
    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;
    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;
    s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
    // if (s >= 1000 && s <= 99000) {
    if (s >= 1000) {
        let kilometer = s / 1000;
        s = kilometer.toFixed(1) + 'km';
    }
    // else if (s > 99000) {
    //     s = '>99km';
    // }
    else {
        s = Math.round(s) + 'm';
    }
    // s = s / 1000;
    // s = s.toFixed(2);//指定小数点后的位数。
    return s;
}

module.exports =  {
    getDistanceByLocation: getDistanceByLocation
}
