import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Detail = () => import('views/detail/Detail')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')

const Profile = () => import('views/profile/Profile')
const ProfileInfo = () => import('views/profile/children/profileinfo/ProfileInfo')
const UpdateProfile = () => import('views/profile/children/updateprofile/UpdateProfile')

const Order = () => import('views/order/Order')
const MyAddress = () => import('views/order/children/MyAddress');
const AddAddress = () => import('views/order/children/AddAddress');
const EditAddress = () => import('views/order/children/EditAddress');

const Login = () => import('views/login/Login')

// 解决多次点击重复路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    redirect: '/profile/info',
    children: [
      {
        path: 'info',
        component: ProfileInfo
      },
      {
        path: 'update',
        component: UpdateProfile,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    // 订单
    path: '/order',
    name: 'order',
    component: Order,
    meta: {
      requireAuth: true
    },
    children: [{
      // 我的地址
      path: 'myAddress',
      name: 'myAddress',
      component: MyAddress,
      meta: {
        requireAuth: true
      },
      children: [{
        // 添加地址
        path: 'addAddress',
        name: 'addAddress',
        component: AddAddress,
      }, {
        // 编辑地址
        path: 'editAddress',
        name: 'editAddress',
        component: EditAddress
      }]
    }
    ]
  },
  {
    path: '/login',
    component: Login
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
