//事件防抖函数;节流throttle
export function deBounce(func,delay = 100) {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}


/**
 * 时间戳转换为时间格式化字符串
 * @param date  毫秒时间戳
 * @param fmt   时间格式化的展示形式
 * @returns {*}
 */
export function formatDate(date, fmt) {
  //1.获取年份。假设对于 2019
  // yyyy  =>2019
  // yy    => 19
  //y      => 9
  //yyy    => 019
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取 月/日/时/分/秒
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}


//金钱单位转换：分转元
const toDecimal2 = (x) => {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

export const regFenToYuan = (fen) =>{
  let num = fen;
  num = fen*0.01;
  num += '';
  let reg = num.indexOf('.') >-1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
  num = num.replace(reg,'$1');
  num = toDecimal2(num)
  return num
};
