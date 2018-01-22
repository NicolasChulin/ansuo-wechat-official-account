<template lang="html">
  <div class="borrow-list">
    <div class="b-list">
      <ul>
        <li v-for="item in list">
          <div class="li-avatar">
            <img class="cover" :src="item.avatar" :alt="item.name">
          </div>
          <div class="li-infos">
            <p><span>图片编号：</span><span>{{item.imgNumber}}</span></p>
            <p><span>图片信息：</span><span>{{item.name}}</span></p>
            <p><span>关联手机：</span><span>{{item.mobile}}</span></p>
            <p v-if="item.code"><span>手环编号：</span><span>{{item.code}}</span></p>
            <p class="btn-bind" v-else>绑定手环</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="b-bot">
      <i class="icon-weixin"></i>
      <div class="btn-to-pay" @click="topay"></div>
    </div>

    <transition name="fade">
      <tips v-if="tipIsShow" :tip-class="tipClass" @close="topay"></tips>
    </transition>

  </div>
</template>

<script>
import Tips from '@/components/common/Tips'

export default {
  name: 'borrow-list',
  data () {
    return {
      list: [
        {
          avatar: '/static/images/avatar.png',
          imgNumber: 'A01-121245643545',
          name: '小美女',
          mobile: '18512345678',
          code: '',
          isSelect: false
        },
        {
          avatar: '/static/images/avatar.png',
          imgNumber: 'A01-121245643545',
          name: '小美女',
          mobile: '18512345678',
          code: 'H-01-001',
          isSelect: false
        },
        {
          avatar: '/static/images/avatar.png',
          imgNumber: 'A01-121245643545',
          name: '小美女',
          mobile: '18512345678',
          code: 'H-01-001',
          isSelect: false
        }
      ],
      allisSelected: false,
      tipIsShow: false,
      tipClass: 'tips-pay-success'
    }
  },
  components: {
    Tips
  },
  mounted () {
    this.initOpenid()
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
      console.log(this.openid)
    },
    selectAll () {
      let that = this
      that.allisSelected = !that.allisSelected
      that.list.forEach((item) => {
        item.isSelect = that.allisSelected
      })
    },
    topay () {
      this.tipIsShow = !this.tipIsShow
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
    // box-shadow: 5px 0px 20px #000;
  }
  .li-infos{
    margin-left: 2.5rem;

    p{
      height: .5rem;
      line-height: .3rem;
      padding: .1rem 0;
      font-size: 0;
      color: $gbrown;
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
