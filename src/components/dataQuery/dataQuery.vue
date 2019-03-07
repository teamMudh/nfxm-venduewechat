<template>
  <div class="content_dataQuery">
    <header class="myheader">
      <img @click.prevent="back" src="../../style/mudh/images/back.png" alt="">
      <span style="padding-right: 0.7rem;">查询</span>
    </header>
    <div id="main" class="main">
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
          <div  class="secSelect" @click.prevent="billApplyList" >
              <p>提货单查询</p><img src="../../style/zs/images/right.png">
          </div>
          <div  class="secSelect" @click.prevent="acceptanceList">
              <p>验收单查询</p><img src="../../style/zs/images/right.png">
          </div>
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
   mounted: function () {
        //原生获取屏幕高度
        var orderHight = document.body.clientHeight
        console.log(document.getElementById('main'))
        document.getElementById('main').style.height = orderHight-50 + 'px'
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
    },
    billApplyList(){
      this.$router.push({
        path: '/billApplyList'
    });
    },
    acceptanceList(){
      this.$router.push({
        path: '/acceptanceList'
    });
    },
    back(){
      this.$router.push({
        path: '/index'
    });
    }
  }
}
</script>
<style>
 @import "../../style/zs/css/zs.css";

</style>
