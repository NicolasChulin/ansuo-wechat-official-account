<template lang="html">
  <div class="pay-weixin-callback">
    <div v-if="hasPayResult">
      <div class="b-none" v-if="payResult === 'success'">
        <img class="h-auto" src="/static/images/tips-pay-success.png" alt="支付成功">
      </div>
      <div class="b-none" v-else>
        支付失败
      </div>
    </div>
    <div v-else>正在支付中...</div>
  </div>
</template>

<script src="@/assets/js/payWeixinCallback.js"></script>

<style lang="scss" scoped>
.b-none{
  padding-top: 100px;
  width: 60%;
  margin: 0 auto;
}
</style>
