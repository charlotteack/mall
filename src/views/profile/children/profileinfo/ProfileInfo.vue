<template>
  <div id="profileinfo">
    <nav-bar class="profile-nav"><div slot="center">个人中心</div></nav-bar>

    <user-info :username='username' :sex='sex' :createTime='createTime'>

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
  import {getUserInfo} from 'network/profile'
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
        username: 'xuezhongsongtan',
        avatur: '',
        sex: '女',
        createTime: '2020年5月23日'
      }

    },
    methods: {
      getUserInfo() {
        getUserInfo().then(res => {
          this.username = res.data.username,
            this.avatur = res.data.avatur,
            this.sex = res.data.sex,
            this.createTime = res.data.createTime
        })
      }
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
