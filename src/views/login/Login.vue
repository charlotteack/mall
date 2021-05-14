<template>
  <div id="login">
    <div class="loginBox">
      <div class="auth-form">
        <!--小熊猫图标-->
        <div class="pandaImageBox">
          <img :src="pandaImageUrl"
               alt="">
        </div>
        <!-- 关闭按钮 -->
        <van-icon name="close" class="closeButton" @click="close" />

        <van-tabs v-model="active" animated>

          <van-tab title="登录">
            <van-cell-group style="margin-top: 15px">
              <van-field v-model="login_phoneNumber" class="loginField"
                         required clearable
                         maxlength="11"
                         label="手机号" placeholder="请输入手机号"
                         :error-message="phoneNumberRight?'':'请输入正确的手机号'" />
              <van-field v-model="login_pwd" class="loginField"
                         type="password"
                         label="密码" placeholder="请输入密码"
                         required />
            </van-cell-group>

            <van-button type="info"
                        style="margin-top:1rem"
                        @click='login'>登录</van-button>
          </van-tab>

          <!-- 注册 -->
          <van-tab title="注册">
            <van-cell-group style="margin-top: 15px">
              <van-field v-model="register_phoneNumber" class="loginField"
                         clearable required
                         maxlength="11"
                         label="手机号" placeholder="请输入手机号"
                         :error-message="phoneNumberRight?'':'请输入正确的手机号'"/>
              <van-field v-model="register_pwd" class="loginField"
                         type="password"
                         label="密码" placeholder="请输入密码"
                         required />
              <van-field center clearable required class="loginField"
                         label="验证码"
                         maxlength="6"
                         v-model="smsCaptcha"
                         placeholder="请输入验证码">
                <van-button slot="button"
                            size="small"
                            type="primary"
                            v-if="!countDown"
                            :disabled="captchaDisable"
                            @click="sendVerifyCode">发送验证码</van-button>
                <van-button slot="button"
                            size="small"
                            type="primary"
                            disabled=""
                            v-model="smsCaptcha"
                            v-else>倒计时{{countDown}}s</van-button>
              </van-field>
            </van-cell-group>

            <van-button type="info"
                        style="margin-top:1rem"
                        @click='register'>注册</van-button>
          </van-tab>

        </van-tabs>


        <!-- 第三方登录 -->
        <van-divider class="loginDivider">
          其他登录方式
        </van-divider>
        <van-grid :column-num="2" :border=false>
          <van-grid-item @click="thirdLogin(0)">
            <img src="~assets/img/login/wx.png" style="width: 20px;height: 20px"/>
            <div class="title">微信登录</div>
          </van-grid-item>
          <van-grid-item @click="thirdLogin(1)">
            <img src="~/assets/img/login/qq.png" style="width: 20px;height: 20px"/>
            <div class="title">QQ登录</div>
          </van-grid-item>
        </van-grid>
        <!-- 底部声明 -->
        <p class="agreement">
          温馨提示：<br>未注册的手机号，登录时将自动注册，且代表同意
          <a @click.stop="agreement(0)" class="agreement-box">用户协议</a>、
          <a @click.stop=agreement(1) class="agreement-box">隐私策略</a>
        </p>


      </div>

    </div>
  </div>
</template>

<script>
  import {getPhoneCaptcha, registerByPhone, loginByPhone} from 'network/login'
  import { Dialog } from 'vant'
  import { mapActions, mapMutations} from 'vuex'
  import {getAllOrder} from 'network/order'
  export default {
    name: "Login",
    data() {
      return {
        pandaImageUrl: require('assets/img/login/normal.png'),
        countDown: 0,// 倒计时
        active: 0,//当前tab
        login_pwd: '',
        login_phoneNumber: '',

        register_phoneNumber: '',
        register_pwd: '',
        smsCaptcha: '',//验证码
        smsCaptchaResult:''
      }
    },
    computed: {
      // 手机号码验证
      phoneNumberRight () {
        //判断是登录哈市注册
        let value = this.active ===0 ? this.login_phoneNumber :this.register_phoneNumber
        //上面限制了最多只能输入11位
        if (value.length > 10) {
          return /[1][3,4,5,6,7,8][0-9]{9}$/.test(value);
        } else {
          return true;
        }
      },
      // 发送验证码按钮显示
      captchaDisable () {
        return !(this.register_phoneNumber.length > 10 && this.phoneNumberRight);
      }
    },
    methods: {
      ...mapActions(['saveUserInfo']),
      ...mapMutations(['update_order_list']),
      //关闭按钮
      close () {
        this.$router.back();
      },
      //获取手机验证码
      sendVerifyCode () {
        this.countDown = 60;
        this.timeIntervalID = setInterval(() => {
          this.countDown--;
          //如果减到0 则清除定时器
          if (this.countDown === 0) {
            clearInterval(this.timeIntervalID);
          }
        }, 1000)
        //获取短信验证码
        getPhoneCaptcha().then(res => {
          this.smsCaptchaResult = res.code;
          //获取验证码成功
          Dialog.alert({
            message: '欢迎注册，您的验证码为' + res.code,
          });
        })
      },
      //登录
      login() {
        if (!this.phoneNumberRight) {
          this.$toast.show('手机号格式不正确',1000)
        } else {
          loginByPhone(this.login_phoneNumber, this.login_pwd).then(res => {
            if(res.state === 0) {
              //保存用户基本信息
              this.saveUserInfo({
                phoneNumber: this.login_phoneNumber,
                userName: res.userInfo.userName,
                sex: res.userInfo.sex,
                uid: res.userInfo.uid,
                userImage: res.userInfo.userImage
              })
              //获取后台订单信息，存到vuex里面
              getAllOrder(this.login_phoneNumber).then(res => {
                this.update_order_list(res.userOrderList)
                //返回
                this.$router.back();
              })
            } else if(res.state ===1) {
              this.$toast.show('该手机号未注册，请先完成注册',1000)
            } else if(res.state ===2) {
              this.$toast.show('密码错误',1000)
            }
          })
        }
      },
      //注册
      register() {
        if (!this.phoneNumberRight) {
          this.$toast.show('手机号格式不正确',1000)
        } else if (this.register_pwd.length < 6) {
            this.$toast.show('密码至少6位',1000)
        } else if(this.smsCaptchaResult !== this.smsCaptcha) {
            this.$toast.show('验证码错误',1000)
        } else {
            registerByPhone(this.register_phoneNumber, this.register_pwd).then(res => {
              if (res.state === 0) {
                //设置userInfo 保存到vuex和本地
                this.saveUserInfo({
                  uid: res.uid,
                  userName: 'mall' + this.register_phoneNumber,
                  phoneNumber: this.register_phoneNumber,
                  sex: '男',
                  userImage: res.userImage
                })
                Dialog.alert({
                  title: '温馨提示',
                  message: '恭喜您注册成功，您的账号为' + res.uid + '，祝您购物愉快~',
                }).then(() => {
                  this.$router.back();
                })
              }else {
                Dialog.alert({
                  title: '温馨提示',
                  message: '抱歉，手机号已注册',
                }).then(() => {
                })
              }


            })
        }
      },
      thirdLogin(type) {

      },
      agreement(type) {

      }
    }
  }
</script>

<style scoped>
  #login {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../../assets/img/login/loginbackground.jpeg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    z-index: 666;
  }
  .loginBox {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 888;
  }
  .auth-form {
    opacity: 0.8;
    position: relative;
    padding: 2rem;
    width: 26.5rem;
    max-width: 90%;
    font-size: 1.167rem;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    z-index: 889;
  }

  .pandaImageBox img {
    position: absolute;
    top: 1rem;
    left: 50%;
    width: 4rem;
    transform: translate(-50%, -70%);
    z-index: 889;
    @media screen and (max-width: 320px) {
      top: 0.5rem;
      transform: translate(-50%, -40%);
      width: 5rem;
    }
  }

  .closeButton {
    position: absolute;
    right: 1rem;
    top: 0.4rem;
  }

  /*>>>操作符可以修改样式*/
  >>> .loginField .van-field__label {
    width: 3.5rem;
  }

  .van-button--normal {
    margin: 0 5%;
    width: 90%;
  }

  .loginDivider {
    color: #1989fa;
    border-color: #1989fa;
    padding: 0 5px;
  }
  .title {
    padding: 0.5rem;
    font-size: 0.5rem;
    color: grey;
  }
  .agreement {
    line-height: 1rem;
    color: #767676;
    font-size: 0.867rem;
  }
  .agreement-box {
    color: blue;
  }
</style>
