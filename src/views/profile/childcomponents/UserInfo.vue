<template>
  <div id="userinfo">
    <!-- 用户头像 -->
    <van-image
      :src="avatur" 
      round
      width="4rem"
      height="4rem">
    </van-image>
    <!-- 基本信息展示 -->
    <div class="userInfoContent">
      <h3>{{username}}</h3>
      <img src="@/assets/img/profile/man.svg" alt="" v-if="sex==='男'">
      <img src="@/assets/img/profile/woman.svg" alt="" v-else>
      <van-button id="updateBtn" @click="updateProfile">编辑资料</van-button>
      <p>注册时间:{{createTime}}</p>
    </div>
    
  </div>

</template>

<script>
  import { Image as VanImage ,Button as VanButton} from 'vant';
  export default {
    name: "UserInfo",
    components: {
      VanImage,
      VanButton
    },
    data() {
      return {
        
      };
    },
    props: {
      avatur: {
        type: String,
        default: require('@/assets/img/profile/userlogo.jpg')
      },
      username: {
        type: String,
        required: true,
        default: '暂未登录'
      },
      sex: {
        type: String,
        default: '男'
      },
      createTime: {
        type: String,
      }
    },
    methods: {
      updateProfile() {
        this.$router.push('/updateprofile')
      }
    }
   
  }
</script>

<style scoped>
#userinfo{
  padding: 10px 0 10px;
}
.userInfoContent {
  display: inline-block;
  width: calc(100% - 4rem);
  padding: 0 0 10px 10px;
}
.userInfoContent h3{
  display: inline-block;
  height: 40px;
}
.userInfoContent img{
  height: 16px;
  width: 16px;
}
#updateBtn{
  width: 100px;
  height: 30px;
  position: absolute;
  right: 16px;
  background-color: #ff8198;
  color: white;
}
p{
  font-size: 13px;
  color: #aaa;
}
</style>
