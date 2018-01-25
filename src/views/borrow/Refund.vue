<template lang="html">
  <div class="refund">
    <!-- <div class="b-top">
      <p>报警手机号：18912345678</p>
      <span>广告机编号：A02</span>
    </div> -->
    <div class="b-list">
      <ul v-if="list.length > 0">
        <li v-for="item in list">
          <div class="li-avatar">
            <img class="cover" :src="item.avatar" :alt="item.nickname">
          </div>
          <div class="li-infos">
            <p><span>图片编号：</span><span>{{item.imageId}}</span></p>
            <p><span>图片信息：</span><span>{{item.nickname}}</span></p>
            <p><span>绑定时间：</span><span>{{item.createTime}}</span></p>
            <p><span>手环编号：</span><span>{{item.braceletId}}</span></p>
          </div>
          <span class="li-select" :class="{'icon-selected': item.isSelect, 'icon-unselected': !item.isSelect}" @click="item.isSelect = !item.isSelect"></span>
        </li>
      </ul>
      <none-data v-else></none-data>
    </div>
    <div class="b-bot">
      <div class="b-select" @click="selectAll">
        <span class="select-icon" :class="{'icon-selected': allisSelected, 'icon-unselected': !allisSelected}"></span>
        <span class="select-font"></span>
      </div>
      <div class="btn-refund-deposit" @click="applyRefund"></div>
    </div>
  </div>
</template>

<script>
import borrowApi from '@/apis/borrow'
import BuouUtil from '@/assets/plugins/BuouUtil'
import NoneData from '@/components/common/NoneData'

export default {
  name: 'refund',
  data () {
    return {
      list: [],
      allisSelected: false
    }
  },
  components: {
    NoneData
  },
  mounted () {
    // this.initOpenid()
    this.getList()
  },
  methods: {
    initOpenid () {
      if (!this.$isWeixin) return
      this.openid = this.$ls.get('openid')
      if (!this.openid) {
        let code = this.$route.query.code
        let state = this.$route.query.state
        if (code && state) {
          this.getOpenid({
            code, state
          }, (openid) => {
            this.openid = openid
            this.getList()
          })
        } else {
          this.toGetWxCode()
        }
      }
    },
    getList () {
      let that = this
      that.openId = '021I3kwd1Gd4is0ccIvd1JZ7wd1I3kwr'
      let datas = {
        openId: that.openId
      }
      borrowApi.refundList(datas, (rep) => {
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
              braceletId: item.braceletId,
              isSelect: false
            })
          })
          that.list = list
        }
      })
    },
    applyRefund () {
      let that = this
      let braceletLogIds = []
      that.list.forEach((item) => {
        if (item.isSelect) braceletLogIds.push(item.braceletId)
      })
      let datas = {
        braceletLogIds: braceletLogIds.join(),
        orderId: ''
      }
      borrowApi.refund(datas, (rep) => {
        let data = rep.data
        if (data.code === 200 && data.data) {
          that.$layout.msg('申请已经提交，请等待管理员确认')
        } else {
          that.$layout.msg(data.message || '申请已经提交有误，请重新提交')
        }
      })
    },
    selectAll () {
      let that = this
      that.allisSelected = !that.allisSelected
      that.list.forEach((item) => {
        item.isSelect = that.allisSelected
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// .b-top{
//   padding: .4rem 0 .3rem;
//   text-align: center;
//   p{
//     color: $brown;
//     margin-bottom: .2rem;
//   }
//   span{
//     display: block;
//     margin: 0 auto;
//     border-radius: .5rem;
//     width: 3rem;
//     height: .5rem;
//     line-height: .5rem;
//     background-color: $pbrown;
//     color: #fff;
//     font-size: .24rem;
//   }
// }
.icon-unselected{
  background-image: url('/static/images/icon-unselected.png');
  background-size: 100% 100%;
}
.icon-selected{
  background-image: url('/static/images/icon-selected.png');
  background-size: 100% 100%;
}
.b-list{
  padding: 0 .2rem;

  li{
    margin-bottom: .15rem;
    box-shadow: 0 0 10px #c7e0e2;
    border-radius: .3rem;
    position: relative;
    padding: .4rem 1rem .4rem .2rem;
    height: 2.4rem;
  }
  .li-avatar{
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    overflow: hidden;
    background: $background;
    float: left;
  }
  .li-infos{
    margin-left: 1.9rem;

    p{
      height: .4rem;
      line-height: .4rem;
      font-size: 0;
      color: $gbrown;
      span{
        display: inline-block;
        vertical-align: middle;
        font-size: .24rem;
      }
      span:last-child{
        color: $pbrown;
      }
    }
  }
  .li-select{
    display: block;
    position: absolute;
    width: .6rem;
    height: .6rem;
    right: .2rem;
    top: 50%;
    margin-top: -.3rem;
  }
}
.b-bot{
  margin-top: .5rem;

  .b-select{
    width: 3rem;
    margin: 0 auto;
    font-size: 0;
    text-align: center;
    span{
      display: inline-block;
      vertical-align: middle;
      background-size: 100% 100%;
    }
    span:first-child{
      width: .6rem;
      height: .6rem;
      margin-right: .2rem;
    }
    span:last-child{
      width: 1rem;
      height: .6rem;
      background-image: url('/static/images/all-select.png');
    }
  }
  .btn-refund-deposit{
    margin: .2rem auto;
    width: 4.2rem;
    height: 1.2rem;
    background-image: url('/static/images/btn-refund-deposit.png');
    background-size: 100% 100%;
  }
}
</style>
