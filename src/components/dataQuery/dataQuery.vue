<template>
  <div class="headposition">
    <header class="myheader">
      <a class="left" href="" @click.prevent="back">
        <img src="../../style/mudh/images/back.png" alt="">
      </a>
      <span style="padding-right: 0.7rem;">查询</span>
    </header>
    <div>
        <div @click.prevent="entrustSelect" class="firstSelect">
            <p>委托查询</p><img src="../../style/zs/images/right.png">
        </div>
        <div @click.prevent="tradeSelect" class="secSelect">
            <p>成交查询</p><img src="../../style/zs/images/right.png">
        </div>
        <div @click.prevent="contractSelect" class="secSelect">
            <p>合同查询</p><img src="../../style/zs/images/right.png">
        </div>
    </div>
    <div class="sec-Div">
        <div class="secSelect">
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
    entrustSelect(){
      this.$router.push({
        path: '/entrustSelect'
      });
    },
    tradeSelect(){
      this.$router.push({
        path: '/tradeSelect'
      });
    },
    contractSelect(){
      this.$router.push({
        path: '/contractSelect'
      });
    }
  }
}
</script>
<style>
 @import "../../style/zs/css/zs.css";

</style>
