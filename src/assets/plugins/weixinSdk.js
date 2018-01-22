import GLOBAL from '@/config'
import wx from 'weixin-js-sdk'
import home from '@/apis/home'
import VueLocalStorage from 'vue-ls'

export default {
  install (Vue, option) {
    let ua = window.navigator.userAgent.toLowerCase()
    let isWeixin = ua.indexOf('micromessenger') > -1

    Vue.prototype.$isWeixin = isWeixin
    if (!isWeixin) return
    Vue.mixin({
      methods: {
        registScanQRCode (scanSuccess) {
          let datas = {
            url: window.location.href.split('#')[0]
          }
          Vue.http.post(GLOBAL.domain + '/weixin/getJsApiParameter', datas).then((rep) => {
            let data = rep.data
            if (data.code === 200) {
              const wxApiList = ['scanQRCode']
              wx.config({
                debug: false,
                appId: data.data.appId,
                timestamp: parseInt(data.data.timestamp),
                nonceStr: data.data.nonceStr,
                signature: data.data.signature,
                jsApiList: wxApiList
              })
              wx.ready(function () {
                wx.scanQRCode({
                  needResult: 1,
                  scanType: ['qrCode'],
                  success (res) {
                    let result = res.resultStr
                    if (typeof scanSuccess === 'function') scanSuccess(result)
                  }
                })
              })
            } else {
              alert('params数据错误！')
            }
          })
        },
        toGetWxCode () {
          let redirectUri = window.location.href
          window.location.href = GLOBAL.domain + '/weixin/redirectOAuth2Url?url=' + encodeURIComponent(redirectUri)
        },
        getOpenid (datas, success) {
          home.wxAccessToken(datas, (rep) => {
            let data = rep.data
            if (data.code === 200 && data.data) {
              VueLocalStorage.set('openid', data.data.openid, 7 * 24 * 60 * 60)
              if (typeof success === 'function') success(data.data.openid)
            }
          })
        }
      }
    })
  }
}
