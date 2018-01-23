<template lang="html">
  <div class="view-footer">
    <ul>
      <li v-for="m in menus" :class="{'footer-li-act':mtype==m.type}" @click="switchMenu(m)">
        <i class="iconfont" :class="m.icon"></i>
        <span>{{m.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'view-footer',
  props: ['mtype'],
  data () {
    return {
      menus: [
        {
          type: 'Home',
          name: '管理',
          icon: 'icon-createtask'
        },
        {
          type: '',
          name: '扫一扫',
          icon: 'icon-scan'
        },
        {
          type: 'Order',
          name: '订单',
          icon: 'icon-order'
        },
        {
          type: 'Message',
          name: '消息',
          icon: 'icon-notice'
        }
      ]
    }
  },
  methods: {
    switchMenu (item) {
      if (item.type) {
        this.$router.push({name: item.type})
      } else {
        if (this.$isWeixin) {
          this.registScanQRCode((res) => {
            alert(res)
          })
        } else {
          this.$layout.msg('这是扫一扫')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view-footer{

  li{
    width: 25%;
    float: left;
    height: 100%;
    text-align: center;
    color: $gray;
  }
  .iconfont{
    display: block;
    font-size: .4rem;
    height: .6rem;
    line-height: .6rem;
  }
  span{
    display: block;
    font-size: .22rem;
  }
  li.footer-li-act{
    color: $pbrown;
  }
}
</style>
