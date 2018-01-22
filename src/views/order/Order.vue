<template lang="html">
  <div class="order">
    <div class="view-header">
      <div class="ind-menu">
        <ul>
          <li v-for="(item, index) in menus" :class="{'act': menuIndex === index}" @click="switchMenu(index)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="view-content">
      <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="IndexSwiper">
        <swiper-slide v-for="(item, index) in menus" :key="item.index">
          <order-list :vstatus="item.status" :ref="item.ref"></order-list>
        </swiper-slide>
      </swiper>
    </div>

    <view-footer mtype="Order"></view-footer>
  </div>
</template>

<script>
import ViewFooter from '@/components/common/ViewFooter'
import OrderList from '@/components/order/OrderList'

export default {
  name: 'order',
  data () {
    return {
      menuIndex: 0,
      menus: [
        {
          name: '全部',
          status: 0,
          ref: 'slide0'
        },
        {
          name: '未支付',
          status: 1,
          ref: 'slide1'
        },
        {
          name: '已支付',
          status: 2,
          ref: 'slide2'
        },
        {
          name: '退款',
          status: 3,
          ref: 'slide3'
        }
      ],
      notNextTick: true,
      swiperOption: {
        setWrapperSize: true,
        slidesPerView: 1
      },
      firstLoadedItem: []
    }
  },
  components: {
    ViewFooter,
    OrderList
  },
  mounted () {
    let that = this
    that.$refs.IndexSwiper.swiper.on('slideChangeEnd', (swiper) => {
      that.switchMenu(swiper.realIndex, 'swiper')
    })
    that.switchMenu(0)
  },
  methods: {
    switchMenu (index, type = 'default') {
      let that = this
      that.menuIndex = index
      if (that.firstLoadedItem.indexOf(index) < 0) {
        that.firstLoadedItem.push(index)
        // that.$refs['slide' + index].refresh()
      }
      if (type === 'default') {
        that.$refs.IndexSwiper.swiper.slideTo(index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ind-menu{
  height: .8rem;
  ul{
    overflow: hidden;
  }
  li{
    width: 25%;
    float: left;
    line-height: .8rem;
    text-align: center;
    color: $gray;
  }
  li.act{
    color: $pbrown;
  }
}
</style>
