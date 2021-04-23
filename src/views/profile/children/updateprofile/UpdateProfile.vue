<template>
  <div class="container">

    <update-profile-nav-bar></update-profile-nav-bar>
    <van-form @submit="onSubmit">

      <van-field name="uploader" label="头像">
        <template #input>
          <van-uploader v-model="avatar"  multiple :max-count="1"/>
        </template>
      </van-field>

      <van-field
        v-model="username"
        name="用户名"
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

       <van-field
        v-model="idcard"
        name="身份证号"
        label="身份证号"
        placeholder="身份证号"
        :rules="[{ required: true, message: '请填写身份证号' }]"
      />

      <van-field
        v-model="tel"
        type="tel"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />

      <van-field
        v-model="tel"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
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
export default {
  data() {
    return {
      username: '',
      password: '',
      idcard: '',
      tel: '',
      sex: '男',
      avatar: [{url: '',isImage: true}]

    }
  },
  components: {
    UpdateProfileNavBar
  },
  methods: {
    onSubmit(values) {

    }
  }
}
</script>

<style scoped>

</style>
