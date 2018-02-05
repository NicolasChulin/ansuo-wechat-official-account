<template lang="html">
  <div class="borrow-list">
    <div v-if="list.length > 0">
      <ul class="b-list">
        <li v-for="item in list">
          <div class="li-avatar">
            <img class="cover" :src="item.avatar" :alt="item.nickname">
          </div>
          <div class="li-infos">
            <p><span>图片编号：</span><span>{{item.imageId}}</span></p>
            <p><span>图片信息：</span><span>{{item.nickname}}</span></p>
            <p><span>生成时间：</span><span>{{item.createTime}}</span></p>
            <p v-if="item.braceletId"><span>手环编号：</span><span>{{item.braceletId}}</span></p>
            <p class="btn-bind" @click="binding(item)" v-else>绑定手环</p>
          </div>
        </li>
      </ul>
      <div class="b-bot">
        <i class="icon-weixin"></i>
        <div class="btn-to-pay" @click="toPay"></div>
        <!-- <router-link to="Refund">Refund</router-link> -->
      </div>
    </div>
    <none-data v-else></none-data>


  </div>
</template>

<script>
import borrowApi from '@/apis/borrow'
import BuouUtil from '@/assets/plugins/BuouUtil'
import NoneData from '@/components/common/NoneData'

export default {
  name: 'borrow-list',
  data () {
    return {
      openId: '',
      list: [],
      newBindIds: []
    }
  },
  components: {
    NoneData
  },
  mounted () {
    this.initOpenid()
    // this.getList()
  },
  methods: {
    initOpenid () {
      if (!this.$isWeixin) return
      this.openId = window.localStorage.getItem('openId')
      if (this.openId) this.getList()
      // if (!this.openId) {
      //   let code = this.$route.query.code
      //   let state = this.$route.query.state
      //   if (code && state) {
      //     this.getOpenid({
      //       code, state
      //     }, (openId) => {
      //       this.openId = openId
      //       this.getList()
      //     })
      //   } else {
      //     this.toGetWxCode()
      //   }
      // }
    },
    getList () {
      let that = this
      let datas = {
        openId: that.openId
      }
      borrowApi.borrowList(datas, (rep) => {
        let data = rep.data
        if (data.code === 200 && data.data) {
          let list = []
          data.data.forEach((item) => {
            list.push({
              id: item.id,
              avatar: BuouUtil.getResizeImgUrl(item.imageUrl, 'sm'),
              imageId: item.imageId,
              nickname: item.nickName,
              createTime: BuouUtil.timeFomate(item.createTime, 's'),
              braceletId: item.braceletId
            })
          })
          that.list = list
        }
      })
    },
    binding (item) {
      let that = this
      that.registScanQRCode((braceletId) => {
        let datas = {
          braceletId: braceletId,
          pictureId: item.id
        }
        borrowApi.binding(datas, (rep) => {
          let data = rep.data
          if (data.code === 200 && data.data) {
            item.braceletId = braceletId
            that.newBindIds.push(data.data)
            that.$layout.msg('绑定成功！')
          } else {
            that.$layout.msg(data.message || '绑定失败，请重新尝试')
          }
        })
      })
    },
    toPay () {
      let that = this
      if (that.newBindIds.length === 0) {
        that.$layout.msg('请先绑定手环')
        return
      }
      let datas = {
        openId: that.openId,
        braceletLogIds: that.newBindIds.join()
      }
      borrowApi.makeOrder(datas, (rep) => {
        let data = rep.data
        if (data.code === 200 && data.data) {
          alert(data.data)
          let domain = 'http://image.buoumall.com'
          let redirectUri = domain + '/payCallback.html?orderNum=' + data.data
          // let redirectUri = document.location.origin + '/pay/weixinCallback?orderNumber=' + data.data
          window.location.href = that.GLOBAL.domain + '/redirectOAuth2Url?url=' + encodeURIComponent(redirectUri)
        } else {
          that.$layout.msg(data.message || '绑定失败，请重新尝试')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.b-list{
  padding: .2rem;

  li{
    margin-bottom: .15rem;
    box-shadow: 0 0 10px #c7e0e2;
    border-radius: .3rem;
    padding: .2rem;
    height: 2.4rem;
  }
  .li-avatar{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
    background: $background;
    float: left;
    box-shadow: 5px 0px 15px rgba(135, 171, 208, .3);
  }
  .li-infos{
    margin-left: 2.3rem;

    p{
      height: .5rem;
      line-height: .4rem;
      padding: .05rem 0;
      font-size: 0;
      color: $gbrown;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span{
        display: inline-block;
        vertical-align: middle;
        font-size: .24rem;
      }
      span:last-child{
        padding: 0 .1rem;
        color: $pbrown;
        background: $borderGray;
      }
    }
    .btn-bind{
      font-size: .24rem;
      width: 3rem;
      text-align: center;
      background: #ffc922;
      color: #fff;
      border-radius: .5rem;
      letter-spacing: 1px;
    }
  }
}
.b-bot{
  margin-top: .5rem;

  .icon-weixin{
    display: block;
    width: 1rem;
    height: .8rem;
    margin: 0 auto;
    background-image: url('/static/images/icon-weixin.png');
    background-size: 100% 100%;
  }
  .btn-to-pay{
    margin: .2rem auto;
    width: 4.2rem;
    height: 1.2rem;
    background-image: url('/static/images/btn-to-pay.png');
    background-size: 100% 100%;
  }
}
</style>
