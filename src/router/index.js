import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Detail = () => import('views/detail/Detail')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const UpdateProfile = () => import('views/updateprofile/UpdateProfile')

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
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/updateprofile',
    component: UpdateProfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
