<template lang="html">
  <div class="pay-weixin-callback">
    <p v-if="hasPayResult">支付{{payResult}}</p>
    <p v-else>正在支付中...</p>
  </div>
</template>

<script src="@/assets/js/payWeixinCallback.js"></script>
