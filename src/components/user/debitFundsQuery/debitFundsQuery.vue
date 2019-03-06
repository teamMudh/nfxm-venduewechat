<template>
    <div class="content">
        <header class="myheader">
            <a class="left" href="" @click.prevent="back">
                <img src="../../../style/mudh/images/back.png" alt="">
            </a>
            <span style="padding-right: 0.7rem;">出入金查询</span>
        </header>
        <div class="main">
            <div class="info_item">
                <div class="info_item_top">
                    <div class="info_item_top_left">
                        <span class="span_name">银行</span>
                        <span class="span_value">工行</span>
                    </div>
                    <div class="info_item_top_mid">
                        <span class="span_name">出/入金</span>
                        <span class="span_value">出金</span>
                    </div>
                    <div class="info_item_top_right">
                        <span class="span_name">金额</span>
                        <span class="span_value">3000</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_top_left">
                        <span class="span_name">状态</span>
                        <span class="span_value">成功</span>
                    </div>
                    <div class="info_item_top_mid">
                        <span class="span_name">执行时间</span>
                        <span class="span_value">2019/2/26&nbsp;&nbsp;08:00:00</span>
                    </div>
                    <div class="info_item_top_right">
                        <span class="span_name">市场流水号</span>
                        <span class="span_value">13214500</span>
                    </div>
                </div>
                <div class="info_item_bottom">
                    <span class="span_name">银行流水号</span>
                    <span class="span_value">98246132652</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'debitFundsQuery',
        computed:{
            ...mapState(['firmId','isLogin','sessionId'])
        },
        methods: {
            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/'})
                    return false
                } else {
                    this.$router.push({path: '/user'})
                }
            },
            getDebitFunds(){
                var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="fund_info_query"><U>11222222222211</U><SI>11222222222211</SI></REQ></GNNT>'
                this.$ajax.post('',data)
                    .then(resp => {
                        console.log(resp)
                        console.log(resp.data)
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        console.log(jsonObj)
                        console.log(jsonObj)

                    }).catch(error => {
                    return;
                })
            }
        },
        created() {
            if (!this.isLogin) {
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../../style/mudh/css/common.css";
    @import "../../../style/user/css/common.css";

    span{
        margin-bottom:4px
    }
    .info_item{
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid rgb(239, 239, 239);
        background: rgb(255,255,255);
        font-size: 0.25rem;
    }
    .info_item_top{
        width: 95%;
        height: 33%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgb(239, 239, 239);
    }
    .info_item_top_left{
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .info_item_top_mid{
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .info_item_top_right{
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .info_item_bottom{
        width: 95%;
        height: 33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 3%;
    }
</style>
