<template lang="html">
  <div class="login">

    <div class="view-content">
      <swiper-free-scroll>
        <div class="header">
          <h1>登录</h1>
        </div>
        <div class="main">
          <div class="main-cont">
            <div class="main-cont-item">
              <div class="main-cont-input">
                <input type="text" name="mobile" v-model.trim="mobile" placeholder="输入手机号">
              </div>
              <div class="main-cont-input">
                <input type="password" name="password" v-model.trim="password" @input="mobile = mobile.slice(0,11)" placeholder="输入密码">
                <span class="password-see" :class="{'password-nosee':!is_showpswd}" @click.stop="showPswd"></span>
              </div>
            </div>

          </div>
          <div class="main-foot">
            <div class="main-foot-submit" :class="{'main-submit-act':checkOk}" @click="login">登录</div>
            <!-- <div class="main-foot-link">
              <span @click="toRouter('ForgetPswd')">忘记密码？</span>
              <span @click="toRouter('Register')">没有账号？ <i>注册</i></span>
            </div> -->
          </div>
        </div>
      </swiper-free-scroll>
    </div>

  </div>
</template>

<script>
// import Rsaes from '@/assets/plugins/rsa.aes'
// import BuouUtil from '@/assets/plugins/buouUtil'
import SwiperFreeScroll from '@/components/swiper/SwiperFreeScroll'

export default {
  name: 'login',
  data () {
    return {
      is_logining: false,
      is_showpswd: false,
      mobile: '',
      password: ''
    }
  },
  components: {
    SwiperFreeScroll
  },
  computed: {
    checkOk () {
      if (this.is_logining) return false
      if (/^1[1|3|4|5|7|8]\d{9}$/.test(this.mobile)) {
        return /[a-zA-Z0-9]{6,30}/.test(this.password)
      }
      return false
    }
  },
  methods: {
    showPswd (event) {
      this.is_showpswd = !this.is_showpswd
      let input = event.target.previousSibling.previousSibling
      let type = input.getAttribute('type')
      input.setAttribute('type', type === 'password' ? 'text' : 'password')
    },
    checkPhone () {
      return /^1[1|3|4|5|7|8]\d{9}$/.test(this.mobile)
    },
    getPassword (password) {
      return password
      // let content = {password: password, timestamp: new Date().getTime()}
      // return Rsaes.rsaContent(JSON.stringify(content))
    },
    login () {
      let that = this
      if (!that.checkOk) return
      if (that.is_logining) return
      let datas = {
        mobile: that.mobile,
        password: encodeURI(that.getPassword(that.password))
      }
      that.is_logining = true
      that.$http.post('/v2/login/byPassword', datas).then((rep) => {
        let data = rep.data
        if (data.code === 200) {
          let mdata = data.data
          that.setStorage('memberToken', mdata.memberToken)
          // that.setStorage('uinfos', {
          //   avatar: BuouUtil.getResizeImgUrl(mdata.avatar, 'avatar'),
          //   memberId: mdata.memberId,
          //   nickname: mdata.nickname,
          //   mobile: mdata.mobile,
          // })
          that.$layout.msg('登陆成功', 1000)
          that.back()
        } else {
          that.$layout.msg(data.msg)
        }
        that.is_logining = false
      }, (rep) => {
        that.is_logining = false
        that.$layout.msg('网络错误！', 1000)
      })
    },
    setStorage (key, value) {
      let expireTime = this.$isWeixin ? 7 * 24 * 60 * 60 : this.GLOBAL.tokenExpireTime
      this.$ls.set(key, value, expireTime)
    },
    toRouter (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style src="@/assets/scss/login/login.scss" lang="scss" scoped></style>
