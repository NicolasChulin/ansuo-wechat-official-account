<template lang="html">
  <div class="tips" @click="close">
    <span class="tips-icon" :class="tipClass"></span>
  </div>
</template>

<script>
export default {
  name: 'tips',
  props: ['tipClass'],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.tips{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(255, 255, 255, .8);
}
.tips-icon{
  display: block;
  position: absolute;
  width: 5.36rem;
  height: 3.5rem;
  top: 3.6rem;
  left: 50%;
  transform: translateX(-50%);
  background-size: 100% 100%;
}
.tips-pay-success{
  background-image: url('/static/images/tips-pay-success.png');
}
.tips-refund-success{
  background-image: url('/static/images/tips-refund-success.png');
}
.tips-return{
  background-image: url('/static/images/tips-return.png');
}
</style>
