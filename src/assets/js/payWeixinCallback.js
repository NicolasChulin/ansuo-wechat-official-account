import homeApi from '@/apis/home'

export default {
  name: 'pay-weixin-callback',
  data () {
    return {
      code: this.$route.query.code,
      state: this.$route.query.state,
      orderNumber: this.$route.query.orderNumber,
      wxPayConf: {},
      hasPayResult: false,
      payResult: ''
    }
  },
  mounted () {
    this.getOpenid()
  },
  methods: {
    getOpenid () {
      let that = this
      let datas = {
        code: that.code,
        state: that.state
      }
      homeApi.getOAuth2AccessToken(datas, (rep) => {
        let data = rep.data
        if (data.code === 200 && data.data) {
          that.topay(data.data.openId)
        } else {
          that.$layout.msg('openid数据错误！')
        }
      })
    },
    topay (openId) {
      let that = this
      let datas = {
        orderNumber: that.orderNumber
      }
      homeApi.getJSSDKPayInfo(datas, (rep) => {
        let data = rep.data
        if (data.code === 200 && data.data) {
          that.wxPayConf = JSON.parse(data.data)

          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady)
            }
          } else {
            that.onBridgeReady()
          }
        } else {
          that.$layout.msg('wxconf数据错误！', 1000)
        }
      })
    },
    onBridgeReady () {
      let that = this
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
        appId: that.wxPayConf.appId,
        timeStamp: that.wxPayConf.timeStamp,
        nonceStr: that.wxPayConf.nonceStr,
        package: that.wxPayConf.package,
        signType: that.wxPayConf.signType,
        paySign: that.wxPayConf.paySign
      }, function (res) {
        that.checkPay()
      })
    },
    checkPay () {
      let that = this
      let datas = {
        orderNum: that.orderNumber
      }
      homeApi.findPayResult(datas, (rep) => {
        let data = rep.data
        that.hasPayResult = true
        if (data.code === 200 && data.data) {
          that.showResult('success')
        } else {
          that.showResult('fail')
        }
      })
    },
    showResult (type) {
      let that = this
      if (type === 'success') {
        that.payResult = '成功'
      } else {
        that.payResult = '失败'
      }
    }
  }
}
