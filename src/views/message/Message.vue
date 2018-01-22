<template lang="html">
  <div class="message">
    <div class="view-content view-content-notop">
      <swiper-scroll :fetch="getList" ref="dScroll">
        <div class="list-main">
          <ul class="item-list">
            <li class="items items-icon-right" v-for="i in 10" @click="toDetail(1)">
              <div class="item-infos">
                <p class="mess-title">消息标题</p>
                <p class="mess-content">消息内容fasdf，时代峰峻垃圾几十块大家反馈数据库砥砺奋进阿里九分裤时间到了</p>
              </div>
              <i class="iconfont icon-arrow-right"></i>
            </li>
          </ul>
        </div>
        <!-- <none-data v-else></none-data> -->
      </swiper-scroll>
    </div>

    <view-footer mtype="Message"></view-footer>
  </div>
</template>

<script>
import NoneData from '@/components/common/NoneData'
import ViewFooter from '@/components/common/ViewFooter'
import SwiperScroll from '@/components/swiper/SwiperScroll'

export default {
  name: 'message',
  data () {
    return {
      list: []
    }
  },
  components: {
    NoneData,
    ViewFooter,
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

  .mess-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mess-content{
    height: .6rem;
    line-height: .3rem;
    color: $gray;
    font-size: .24rem;
  }
}
</style>
