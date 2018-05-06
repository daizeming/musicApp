import originJsonp from 'jsonp'

// 将jsonp 二次封装为promise形式
// params   (Object)
//  url     (string)
//  data    (Object)
//  options (Object)

export default function jsonp(params) {
    let { url, data, options } = params;
    console.log(url, data, options)
    url += url.indexOf('?')  === -1 ? '?' : '&';
    url +=  urlParams(data);

    return new Promise((resolve, reject) => {
        originJsonp(url, options, (err, data) => {
            if (err) {
                reject(err);
            }else {
                resolve(data);
            }
        })
    })
}

// 将data数据拼接到url里
function urlParams(data) {
    let url = '';
    for (let k in data) {
        let val = data[k];
        url += `&${k}=${val}`;
    }
    url = url.slice(1);
    return url;
}

