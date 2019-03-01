<template>
    <div class="content">
        <header class="myheader">
            <a class="left" href="" @click.prevent="back">
                <img src="../../../style/mudh/images/back.png" alt="">
            </a>
            <span style="padding-right: 0.7rem;">挂单详情</span>
        </header>
        <div class="main">
            <div class="info_item">
                <div class="info_item_top">
                    <div class="info_item_top_left">
                        <span class="span_name">标的代码</span>
                        <span class="span_value">123133</span>
                    </div>
                    <div class="info_item_top_mid">
                        <span class="span_name">标的名称</span>
                        <span class="span_value">混合</span>
                    </div>
                    <div class="info_item_top_right">
                        <span class="span_name">标的数量</span>
                        <span class="span_value">3000</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_top_left">
                        <span class="span_name">交易状态</span>
                        <span class="status">成功</span>
                    </div>
                    <div class="info_item_top_mid">
                        <span class="span_name">交易权限</span>
                        <span class="span_value">全权</span>
                    </div>
                    <div class="info_item_top_right">
                        <span class="span_name">流拍量</span>
                        <span class="span_value">13214500</span>
                    </div>
                </div>
                <div class="info_item_bottom">
                    <div class="info_item_bottom_">
                        <span class="span_name">第一次挂标日期</span>
                        <span class="span_value">13214500</span>
                    </div>
                    <div class="info_item_bottom_">
                        <span class="span_name">创建时间</span>
                        <span class="span_value">2019/2/26&nbsp;&nbsp;08:00:00</span>
                    </div>
                    <div class="info_item_bottom_button">
                        <button>查看{{this.$route.params.id}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'restingOrder',
        methods: {
            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/'})
                    return false
                } else {
                    this.$router.push({path: '/user'})
                }
            }
        },
        create(){
            console.log(this.$route.params.id)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../../style/mudh/css/common.css";
    @import "../../../style/user/css/common.css";

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
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .info_item_top_mid{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .info_item_top_right{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .info_item_bottom{
        width: 95%;
        height: 33%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .info_item_bottom_{
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .info_item_bottom_button{
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .info_item_bottom_button button{
        width: 80%;
        height: 40%;
        text-align: center;
        color: rgb(241,145,56);
        border: 2px solid rgb(241,145,56);
        border-radius: 9px;
        background: rgb(255,255,255);
    }
</style>
