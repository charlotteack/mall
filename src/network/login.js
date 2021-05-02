import {require} from "./require";
//获取手机验证码
export function getPhoneCaptcha() {
  return require({
    url: '/login/captcha',
  })
}
//手机号注册
export function registerByPhone(phoneNumber, pwd) {
  return require({
    url: '/login/add',
    params: {
      phoneNumber,
      pwd,
    }
  })
}

//手机号登录
export function loginByPhone(phoneNumber, pwd) {
  return require({
    url: '/login',
    params: {
      phoneNumber,
      pwd,
    }
  })
}
