<template lang="html">
  <div class="home-detail comps-container">
    <swiper-scroll ref="dScroll">
      <div class="w-items w-infos">
        <ul class="item-list">
          <li class="items ">手环编号： <span>H-003</span></li>
          <li class="items ">录入时间： <span>2018-01-12</span></li>
          <li class="items ">手环状态： <span>在线（已绑定人员）</span></li>
          <li class="items ">借出时间： <span>2018-02-02</span></li>
          <li class="items ">触发时间： <span>2018-02-02</span></li>
          <li class="items ">报警类型： <span>离开监控区域</span></li>
          <li class="items ">描述： <span>南二门</span></li>
        </ul>
      </div>
      <div class="w-items w-bind">
        <ul class="item-list">
          <li class="items items-avatar"><i>绑定人头像：</i> <img src="/static/images/avatar.png" alt=""></li>
          <li class="items ">绑定人电话： <span>18512345678</span></li>
        </ul>
      </div>
      <div class="w-items w-bind">
        <ul class="item-list">
          <li class="items ">管理员： <span>王先生</span></li>
          <li class="items ">管理员电话： <span>18512345678</span></li>
        </ul>
      </div>
      <div class="view-btn view-btn-act">
        <span>归还手环</span>
      </div>
    </swiper-scroll>
  </div>
</template>

<script>
import SwiperScroll from '@/components/swiper/SwiperScroll'

export default {
  name: 'home-detail',
  data () {
    return {
      wristId: this.$route.params.wristId
    }
  },
  components: {
    SwiperScroll
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      console.log(this.wristId)
    }
  }
}
</script>

<style lang="scss" scoped>
.home-detail{
  position: absolute;
  width: 100%;
  background: $background;
}
.w-items{
  background: #fff;
  margin-bottom: .2rem;
}
</style>
