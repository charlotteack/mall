<template>
  <div id="profileinfo">
    <nav-bar class="profile-nav"><div slot="center">个人中心</div></nav-bar>

    <user-info :username='this.userInfo.userName' :sex='this.userInfo.sex' :createTime='createTime' :avatur="this.userInfo.userImage">

    </user-info>

    <user-good-state></user-good-state>

    <user-service></user-service>


  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import UserInfo from './childcomponents/UserInfo'
  import UserGoodState from './childcomponents/UserGoodState'
  import UserService from './childcomponents/UserService'
  import { mapState } from 'vuex'
  import {formatDate} from "@/common/utils";

  export default {
    name: "ProfileInfo",
    components: {
      NavBar,
      UserInfo,
      UserGoodState,
      UserService
    },
    data() {
      return {
        // username: 'xuezhongsongtan',
        // avatur: '',
        // sex: '女',
        // createTime: '2021年4月23日'
      }

    },
    computed: {
      ...mapState(['userInfo']),
      createTime() {
        if(Object.keys(this.userInfo).length !== 0){
          let date =new Date(this.userInfo.uid)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        }else{
          return '无'
        }
      }
    },
    methods: {
      // getUserInfo() {
      //   getUserInfo().then(res => {
      //     this.username = res.data.username,
      //       this.avatur = res.data.avatur,
      //       this.sex = res.data.sex,
      //       this.createTime = res.data.createTime
      //   })
      // }

      getCurrentAllOrders(phone) {
        //拿到后台数据更新Vuex

      },
    }
  }
</script>

<style scoped>
  #profileinfo {
    height: 100vh;
    position: relative;
  }
  .profile-nav {
    background-color: var(--color-tint);
    color: white;

  }
</style>
