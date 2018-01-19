<template lang="html">
  <div class="refund">
    <div class="b-top">
      <p>报警手机号：18912345678</p>
      <span>广告机编号：A02</span>
    </div>
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
            <p><span>手环编号：</span><span>{{item.code}}</span></p>
          </div>
          <span class="li-select" :class="{'icon-selected': item.isSelect, 'icon-unselected': !item.isSelect}" @click="item.isSelect = !item.isSelect"></span>
        </li>
      </ul>
    </div>
    <div class="b-bot">
      <div class="b-select" @click="selectAll">
        <span class="select-icon" :class="{'icon-selected': allisSelected, 'icon-unselected': !allisSelected}"></span>
        <span class="select-font"></span>
      </div>
      <div class="btn-refund-deposit"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'refund',
  data () {
    return {
      list: [
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
      allisSelected: false
    }
  },
  methods: {
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
.b-top{
  padding: .4rem 0 .3rem;
  text-align: center;
  p{
    color: $brown;
    margin-bottom: .2rem;
  }
  span{
    display: block;
    margin: 0 auto;
    border-radius: .5rem;
    width: 3rem;
    height: .5rem;
    line-height: .5rem;
    background-color: $pbrown;
    color: #fff;
    font-size: .24rem;
  }
}
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
