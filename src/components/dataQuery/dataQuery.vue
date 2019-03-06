<template>
  <div class="headposition">
    <header class="myheader">
      <a class="left" href="" @click.prevent="back">
        <img src="../../style/mudh/images/back.png" alt="">
      </a>
      <span style="padding-right: 0.7rem;">查询</span>
    </header>
    <div>
        <div @click.prevent="entrustQuery" class="firstSelect">
            <p>委托查询</p><img src="../../style/zs/images/right.png">
        </div>
        <div @click.prevent="tradeQuery" class="secSelect">
            <p>成交查询</p><img src="../../style/zs/images/right.png">
        </div>
        <div @click.prevent="contractQuery" class="secSelect">
            <p>合同查询</p><img src="../../style/zs/images/right.png">
        </div>
    </div>
    <div class="sec-Div">
        <div class="secSelect" @click.prevent="orderQuery">
            <p>挂单查询</p><img src="../../style/zs/images/right.png">
        </div>
        <div  class="secSelect">
            <p>提货单查询</p><img src="../../style/zs/images/right.png">
        </div>
        <div  class="secSelect">
            <p>验收单查询</p><img src="../../style/zs/images/right.png">
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    entrustQuery(){
      this.$router.push({
        path: '/entrustQuery'
      });
    },
    tradeQuery(){
      this.$router.push({
        path: '/tradeQuery'
      });
    },
    contractQuery(){
      this.$router.push({
        path: '/contractQuery'
      });
    },
    orderQuery(){
        this.$router.push({
        path: '/restingOrder'
    });
    }
  }
}
</script>
<style>
 @import "../../style/zs/css/zs.css";

</style>
