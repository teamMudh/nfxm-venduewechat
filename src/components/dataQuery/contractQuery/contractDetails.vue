<template>
    <div class="content">
        <header class="myheader">
            <img @click.prevent="back" src="../../../style/mudh/images/back.png" alt="">
            <span style="padding-right: 0.7rem;">合同详情</span>
        </header>
        <div id="main" class="main" style="width:100%;">
            <div class="content_title">
                <span>基本信息</span>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span style="color:red;">{{detailList.I}}</span>
                    <span class="span_value">合同编号</span> 
                </div>
                <div class="content_line_item_right">
                    <span  v-if="detailList.S==0">未处理</span>
                    <span  v-if="detailList.S==1">处理中</span>
                    <span  v-if="detailList.S==2">处理完成</span>
                    <span class="span_value">合同状态</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span v-if="detailList.R==0">履约</span>
                    <span v-if="detailList.R==1">买方违约</span>
                    <span v-if="detailList.R==2">卖方违约</span>
                    <span v-if="detailList.R==3">双方违约</span>
                    <span class="span_value">履约状态</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{detailList.MT|formatDateTime}}</span>
                    <span class="span_value">修改时间</span>
                </div>
            </div>
            <div class="content_title">
                <span>买方合同信息</span>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{detailList.BB}}</span>
                    <span class="span_value">买方用户代码</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{detailList.MB}}</span>
                    <span class="span_value">已收买方保证金</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{detailList.FB}}</span>
                    <span class="span_value">已收买方手续费</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{detailList.BMB}}</span>
                    <span class="span_value">已退买方保证金</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{detailList.RPB}}</span>
                    <span class="span_value">买方货款</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{detailList.PB}}</span>
                    <span class="span_value">已收买方货款</span>
                </div>
            </div>
            <div class="content_title">
                <span>卖方合同信息</span>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{detailList.BS}}</span>
                    <span class="span_value">卖方用户代码</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{detailList.MS}}</span>
                    <span class="span_value">已收卖方保证金</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{detailList.FS}}</span>
                    <span class="span_value">已收卖方手续费</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{detailList.BMS}}</span>
                    <span class="span_value">已退卖方保证金</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{detailList.RPS}}</span>
                    <span class="span_value">卖方货款</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{detailList.PS}}</span>
                    <span class="span_value">已收卖方货款</span>
                </div>
            </div>
            <div class="content_title">
                <span>成交信息</span>
            </div>
             <div class="content_line">
                <div class="content_line_item_left" style="width:25%;">
                    <span class="span_value">成交价格</span>
                    <span>{{td[0].P}}</span>
                </div>
                <div class="content_line_item_left" style="width:25%;">
                    <span class="span_value">成交数量</span>
                    <span>{{td[0].Q}}</span>
                </div>
                <div class="content_line_item_left" style="width:50%;">
                    <span class="span_value">成交时间</span>
                    <span>{{td[0].T|formatDateTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
           
<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['firmId','isLogin','sessionId'])
    },
    data(){
        return {
            detailList:"",
            id: '',
            td:'',
        }
    },
    mounted(){
        this.id=this.$route.query.ID;
        this.getDetail();
         //原生获取屏幕高度
        var orderHight = document.body.clientHeight
        console.log(document.getElementById('main'))
        document.getElementById('main').style.height = orderHight-50 + 'px'
    },
    methods: {
        getDetail(){
            var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="contract_detail"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI><PID>1</PID><I>'+this.id+'</I></REQ></GNNT>'
            this.$ajax.post('',data)
                .then(resp => {
                    //将服务器获取的xml格式转化为json对象
                    var jsonObj = this.$x2js.xml2js(resp.data)
                    // console.log(jsonObj)
                    this.detailList = jsonObj.GNNT.REP.RESULT;
                    this.td = JSON.parse(this.detailList.TD);
                    console.log(this.td)
                    // console.log(this.detailList);
                    // console.log(this.td);
                }).catch(error => {

                return;
            })
        },
        back() {
            history.go(-1);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../../style/zs/css/zs.css";
    .username {
        width: 100%;
        height: 6%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        padding-left: 5%;
    }

    .content {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content_top {
        height: 20%;
        width: 96%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgb(255, 255, 253);
    }

    .content_top_body {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content_line {
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .content_line_item {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid rgb(239, 239, 237);
        border-bottom: 1px solid rgb(239, 239, 237);
    }
    .content_bottom{
        height: 30%;
        width: 96%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgb(255, 255, 253);
    }
    .trade_Contract{
        display: flex; 
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .content_title{
        margin: 0 auto;
        width: 94%;
        height: 1rem;
        display: flex;
        align-items: center;
    }
    .content_line {
        height:1.2rem;
        width: 98%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        background: white;
        font-size: 0.29rem;
    }
    .content_line_item_single {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgb(239, 239, 237);
    }
    .content_line_item_left {
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid rgb(239, 239, 237);
        border-bottom: 1px solid rgb(239, 239, 237);
    }
    .content_line_item_right {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid rgb(239, 239, 237);
        border-bottom: 1px solid rgb(239, 239, 237);
    }

    .span_value{
        color: rgb(173, 173, 173);
        margin-top: 1%;
    }
</style>
