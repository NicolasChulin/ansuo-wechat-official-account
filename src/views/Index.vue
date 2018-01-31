<template lang="html">
  <div class="index">
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
          <home-list :vstatus="item.status" :ref="item.ref"></home-list>
        </swiper-slide>
      </swiper>
    </div>
    <view-footer mtype="Home"></view-footer>
  </div>
</template>

<script>
import ViewFooter from '@/components/common/ViewFooter'
import HomeList from '@/components/home/HomeList'

export default {
  name: 'index',
  data () {
    return {
      menuIndex: 0,
      menus: [
        {
          name: '报警',
          status: 1,
          ref: 'slide1'
        },
        {
          name: '离线',
          status: 2,
          ref: 'slide2'
        },
        {
          name: '在线',
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
    HomeList
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
    width: 33.33%;
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
