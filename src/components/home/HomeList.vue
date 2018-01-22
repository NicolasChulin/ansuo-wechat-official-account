<template lang="html">
  <div class="home-list comps-container">
    <swiper-scroll :fetch="getList" ref="dScroll">
      <div class="list-main">
        <ul class="item-list">
          <li class="items items-icon-right" v-for="i in 10" @click="toDetail(1)">
            <div class="item-infos">
              <p><span>手环编号：</span><span>H-003</span></p>
              <p><span>录入时间：</span><span>2018-01-02</span></p>
              <p><span>手环状态：</span><span>在线（已绑定人员）</span></p>
            </div>
            <i class="iconfont icon-arrow-right"></i>
          </li>
        </ul>
      </div>
      <!-- <none-data v-else></none-data> -->
    </swiper-scroll>
  </div>
</template>

<script>
import NoneData from '@/components/common/NoneData'
import SwiperScroll from '@/components/swiper/SwiperScroll'

export default {
  name: 'home-list',
  props: ['vstatus'],
  data () {
    return {
      list: []
    }
  },
  components: {
    NoneData,
    SwiperScroll
  },
  methods: {
    getList () {
      console.log('11')
    },
    toDetail (id) {
      this.$router.push({
        name: 'HomeDetail',
        params: {
          wristId: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-infos{
  p{
    height: .4rem;
    line-height: .4rem;
    span{
      display: block;
    }
    span:first-child{
      width: 1.5rem;
      float: left;
    }
    span:last-child{
      margin-left: 1.5rem;
    }
  }
}
</style>
