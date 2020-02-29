import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
  //不能直接将Toast的模板放在body里面。main.js执行install的时候Toast还没挂载到el上
  // document.body.appendChild(Toast.$el)

  //1.创建构造器
  const toastConstructor = Vue.extend(Toast)
  //2.创建组件对象
  const toast = new toastConstructor()
  //3.手动挂载组件对象到某个元素上面
  toast.$mount(document.createElement('div'))
  // 4.toast对应的el就是div,此时将其写入body
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
