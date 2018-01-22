<template lang="html">
  <div class="none-data">
    <div class="none-back">
      <img class="h-auto" src="/static/images/none.png" :alt="nonetip">
    </div>
    <span>{{nonetip}}</span>
  </div>
</template>

<script>
export default {
  name: 'none-data',
  props: ['ntype'],
  data () {
    return {
      nonetip: '',
      noneTips: {
        product: '宝贝在外太空，还未到达地球',
        none: '目前没有任何数据'
      }
    }
  },
  mounted () {
    let ntype = this.ntype ? this.ntype : 'none'
    this.nonetip = this.noneTips[ntype]
  }
}
</script>

<style lang="scss" scoped>
.none-data{
  padding-top: 1.5rem;
  font-size: .28rem;

  .none-back{
    width: 2.7rem;
    margin: 0 auto;
  }
  span{
    display: block;
    text-align: center;
    margin-top: .28rem;
    color: $gray;
  }

}
</style>
