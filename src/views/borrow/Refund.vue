<template lang="html">
  <div class="refund">

    <div class="b-main" v-if="list.length > 0">
      <ul class="b-list" v-for="item in list">
        <li class="li-title">订单号：{{item.orderId}}</li>
        <li v-for="elem in item.bracelets">
          <div class="li-avatar">
            <img class="cover" :src="elem.avatar" :alt="elem.nickname">
          </div>
          <div class="li-infos">
            <p><span>图片编号：</span>{{elem.imageId}}</p>
            <p><span>图片信息：</span>{{elem.nickname}}</p>
            <p><span>绑定时间：</span>{{elem.createTime}}</p>
            <p><span>手环编号：</span>{{elem.braceletId}}</p>
          </div>
          <span class="li-select" :class="{'icon-selected': elem.isSelect, 'icon-unselected': !elem.isSelect}" @click="selectElem(item, elem)"></span>
        </li>
      </ul>
      <div class="b-bot">
        <!-- <div class="b-select" @click="selectAll">
          <span class="select-icon" :class="{'icon-selected': allisSelected, 'icon-unselected': !allisSelected}"></span>
          <span class="select-font"></span>
        </div> -->
        <div class="btn-refund-deposit" @click="applyRefund"></div>
      </div>
    </div>
    <div class="b-none" v-else>
      <img class="h-auto" src="/static/images/tips-return.png" alt="提示">
    </div>

  </div>
</template>

<script>
import borrowApi from '@/apis/borrow'
import NoneData from '@/components/common/NoneData'

export default {
  name: 'refund',
  data () {
    return {
      openId: '',
      list: [],
      allisSelected: false,
      selectIds: [],
      selectOrder: ''
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
    },
    getList () {
      let that = this
      let datas = {
        openId: that.openId
      }
      borrowApi.refundList(datas, (rep) => {
        let data = rep.data
        if (data.code === 200 && data.data) {
          let list = []
          data.data.forEach((item) => {
            let bracelets = []
            item.pictureVos.forEach((elem) => {
              bracelets.push({
                imageId: elem.imageId,
                avatar: that.GLOBAL.imgDomain + '/' + elem.imageUrl,
                nickname: that.getNickname(elem),
                createTime: item.createTime,
                braceletId: elem.braceletId,
                braceletLogId: elem.braceletLogId,
                isSelect: false
              })
            })

            list.push({
              orderId: item.orderId,
              createTime: item.createTime,
              bracelets
            })
          })
          that.list = list
        }
      })
    },
    getNickname (item) {
      return item.age + '岁  ' + (item.sex ? '男' : '女 ')
    },
    applyRefund () {
      let that = this
      if (!that.selectIds.length) {
        that.$layout.msg('请选择要申请退款的手环')
        return
      }
      let datas = {
        braceletLogIds: that.selectIds.join(),
        orderId: that.selectOrder
      }
      borrowApi.refund(datas, (rep) => {
        let data = rep.data
        if (data.code === 200 && data.data) {
          that.$router.push({
            name: 'RefundSuccess'
          })
        } else {
          that.$layout.msg(data.message || '申请已经提交有误，请重新提交')
        }
      })
    },
    selectElem (item, elem) {
      if (this.selectOrder && item.orderId !== this.selectOrder) {
        this.$layout.msg('很抱歉！一次只能退还同一个订单的手环')
        return
      }
      this.selectOrder = item.orderId
      if (elem.isSelect) {
        let index = this.selectIds.indexOf(elem.braceletLogId)
        this.selectIds.splice(index, 1)
      } else {
        this.selectIds.push(elem.braceletLogId)
      }
      elem.isSelect = !elem.isSelect
      if (!this.selectIds.length) this.selectOrder = ''
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
.icon-unselected{
  background-image: url('/static/images/icon-unselected.png');
  background-size: 100% 100%;
}
.icon-selected{
  background-image: url('/static/images/icon-selected.png');
  background-size: 100% 100%;
}
.b-list{
  padding: .2rem;
  border-bottom:  1px solid $borderGray;

  li{
    margin-bottom: .15rem;
    box-shadow: 0 0 10px #c7e0e2;
    border-radius: .3rem;
    position: relative;
    padding: .4rem 1rem .4rem .2rem;
    height: 2.4rem;
  }
  li.li-title{
    height: .8rem;
    line-height: .8rem;
    box-shadow: none;
    padding: 0;
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
      font-size: .24rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span{
        display: inline-block;
        vertical-align: middle;
        color: $gbrown;
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
.b-list:last-of-type{
  border: 0;
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
.b-none{
  padding-top: 100px;
  width: 60%;
  margin: 0 auto;

}
</style>
