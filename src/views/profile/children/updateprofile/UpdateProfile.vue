<template>
  <div class="container">

    <update-profile-nav-bar></update-profile-nav-bar>
    <van-form @submit="onSubmit">

      <van-field name="userImage" label="头像">
        <template #input>
          <van-uploader v-model="avatar"  multiple :max-count="1" :after-read="afterRead" accept="image/*"/>
        </template>
      </van-field>

      <van-field
        v-model="uid"
        name="uid"
        label="用户ID"
        readonly
      />

      <van-field
        v-model="userName"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="男" checked-color="#ff8198">男</van-radio>
            <van-radio name="女" checked-color="#ff8198">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!--<van-field-->
        <!--v-model="password"-->
        <!--type="password"-->
        <!--name="密码"-->
        <!--label="密码"-->
        <!--placeholder="密码"-->
        <!--:rules="[{ required: true, message: '请填写密码' }]"-->
      <!--/>-->
      <div style="height: 15px;background-color: #f6f6f6"></div>

       <!--<van-field-->
        <!--v-model="idcard"-->
        <!--name="idcard"-->
        <!--label="身份证号"-->
        <!--placeholder="身份证号"-->
      <!--/>-->

      <van-field
        v-model="tel"
        type="tel"
        name="tel"
        label="手机号"
        placeholder="手机号"
        readonly
      />

      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
      />


      <div style="margin: 16px">
        <van-button round block native-type="submit" style="background-color: #ff8198;color: white">
          提交
        </van-button>
      </div>

    </van-form>
  </div>
</template>

<script>
import UpdateProfileNavBar from './childcomponents/UpdateProfileNavBar'
import {updateUserInfo,uploadImage} from 'network/profile'
import { mapState , mapActions} from 'vuex'
export default {
  data() {
    return {
      uid:'',
      userName: '',
      tel: '',
      sex: '',
      avatar: [{url: '',isImage: true}],
      email: ''
    }
  },
  created() {
    this.uid = this.userInfo.uid
    this.userName = this.userInfo.userName
    this.tel = this.userInfo.phoneNumber
    this.sex =  this.userInfo.sex
    this.avatar[0].url = this.userInfo.userImage
  },
  computed: {
    ...mapState(['userInfo']),
  },
  components: {
    UpdateProfileNavBar
  },
  methods: {
    ...mapActions(['saveUserInfo']),
    afterRead(file) {
      // console.log(file)
      let avatarBase64 = file.content.replace(/data:image\/.*;base64,/, '')
      let info = file.file
      uploadImage({
        imgBase64: avatarBase64,
        imgName: info.name
      }).then(res => {
        this.avatar[0].url = res.imgUrl
      })

    },
    onSubmit(values) {
      // let updateInfo = {
      //   userImage: values.userImage[0].content,
      //   ...values
      // }
      // console.log(values.userImage[0].file);
      // let img = values.userImage[0].file
      // let user = new FormData();
      // user.append('userImage', img)
      // user.append('uid', values.uid)
      // user.append('userName', values.userName)
      // user.append('sex', values.sex)
      // user.append('tel', values.tel)
      // user.append('email', values.email)

      values.userImage = this.avatar[0].url
      updateUserInfo(values).then(res => {
        if(res.state===0) {
          //更新vuex和本地信息，实际上只能更新四个信息
          this.userInfo.userImage = this.avatar[0].url
          this.userInfo.userName = this.userName
          this.userInfo.sex = this.sex
          this.userInfo.email = this.email
          this.saveUserInfo(this.userInfo)
          this.$toast.show('修改成功',1000)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
