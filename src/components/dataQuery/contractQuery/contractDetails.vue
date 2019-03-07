<template>
    <div class="content">
        <header class="myheader">
            <img @click.prevent="back" src="../../../style/mudh/images/back.png" alt="">
            <span style="padding-right: 0.7rem;">合同详情</span>
        </header>
        <div class="main" style="width:100%;height:100%;">
                <div class="username">基本信息</div>
                <div class="content">
                    <div class="content_top">
                        <div class="content_top_body">
                            <div class="content_line">
                                <div class="content_line_item">
                                    <span style="color:rgb(187,110,108)">{{detailList.I}}</span>
                                    <span style="margin-top: 3%;">合同编号</span>
                                </div>
                                <div class="content_line_item" style="border-right:0">
                                    <span style="color:rgb(187,110,108)" v-if="detailList.S==0">未处理</span>
                                    <span style="color:rgb(187,110,108)" v-if="detailList.S==1">处理中</span>
                                    <span style="color:rgb(187,110,108)" v-if="detailList.S==2">处理完成</span>
                                    <span style="margin-top: 3%;">合同状态</span>
                                </div>
                            </div>
                            <div class="content_line">
                                <div class="content_line_item" style="border-bottom:0">
                                    <span style="color:rgb(187,110,108)" v-if="detailList.R==0">履约</span>
                                    <span style="color:rgb(187,110,108)" v-if="detailList.R==1">买方违约</span>
                                    <span style="color:rgb(187,110,108)" v-if="detailList.R==2">卖方违约</span>
                                    <span style="color:rgb(187,110,108)" v-if="detailList.R==3">双方违约</span>
                                    <span style="margin-top: 3%;">履约状态</span>
                                </div>
                                <div class="content_line_item" style="border-right:0;border-bottom:0">
                                    <span style="color:rgb(187,110,108)">{{detailList.MT|formatDateTime}}</span>
                                    <span style="margin-top: 3%;">修改时间</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="username">买方合同信息</div>
                    <div class="content_bottom">
                        <div class="content_top_body">
                            <div class="content_line">
                                <div class="content_line_item">
                                    <span style="color:rgb(187,110,108)">{{detailList.BB}}</span>
                                    <span style="margin-top: 3%;">买方用户代码</span>
                                </div>
                                <div class="content_line_item" style="border-right:0">
                                    <span style="color:rgb(187,110,108)">{{detailList.MB}}</span>
                                    <span style="margin-top: 3%;">已收买方保证金</span>
                                </div>
                            </div>
                            <div class="content_line">
                                <div class="content_line_item" >
                                    <span style="color:rgb(187,110,108)">{{detailList.FB}}</span>
                                    <span style="margin-top: 3%;">已收买方手续费</span>
                                </div>
                                <div class="content_line_item" style="border-right:0;">
                                    <span style="color:rgb(187,110,108)">{{detailList.BMB}}</span>
                                    <span style="margin-top: 3%;">已退买方保证金</span>
                                </div>
                            </div>
                            <div class="content_line">
                                <div class="content_line_item" style="border-bottom:0">
                                    <span style="color:rgb(187,110,108)">{{detailList.RPB}}</span>
                                    <span style="margin-top: 3%;">买方货款</span>
                                </div>
                                <div class="content_line_item" style="border-right:0;border-bottom:0">
                                    <span style="color:rgb(187,110,108)">{{detailList.PB}}</span>
                                    <span style="margin-top: 3%;">已收买方货款</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="username">卖方合同信息</div>
                    <div class="content_bottom">
                        <div class="content_top_body">
                            <div class="content_line">
                                <div class="content_line_item">
                                    <span style="color:rgb(187,110,108)">{{detailList.BS}}</span>
                                    <span style="margin-top: 3%;">卖方用户代码</span>
                                </div>
                                <div class="content_line_item" style="border-right:0">
                                    <span style="color:rgb(187,110,108)">{{detailList.MS}}</span>
                                    <span style="margin-top: 3%;">已收卖方保证金</span>
                                </div>
                            </div>
                            <div class="content_line">
                                <div class="content_line_item" >
                                    <span style="color:rgb(187,110,108)">{{detailList.FS}}</span>
                                    <span style="margin-top: 3%;">已收卖方手续费</span>
                                </div>
                                <div class="content_line_item" style="border-right:0;">
                                    <span style="color:rgb(187,110,108)">{{detailList.BMS}}</span>
                                    <span style="margin-top: 3%;">已退卖方保证金</span>
                                </div>
                            </div>
                            <div class="content_line">
                                <div class="content_line_item" style="border-bottom:0">
                                    <span style="color:rgb(187,110,108)">{{detailList.RPS}}</span>
                                    <span style="margin-top: 3%;">卖方货款</span>
                                </div>
                                <div class="content_line_item" style="border-right:0;border-bottom:0">
                                    <span style="color:rgb(187,110,108)">{{detailList.PS}}</span>
                                    <span style="margin-top: 3%;">已收卖方货款</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="username">成交信息</div>
            </div>
            <div class="content" style="height:11%;">
                <div class="trade_Contract" style=" border-bottom: 1px solid rgb(239, 239, 237);height:50%;width: 96%;background-color: white;">
                    <div class="trade_div" style="margin-left: 10px;width:25%;">
                        <p>成交价格</p>
                    </div>
                    <div class="trade_div" style="width:25%;">
                        <p>成交数量</p>
                    </div>
                    <div class="trade_div" style="width:50%;">
                        <p>成交时间</p>
                    </div>
                </div> 
                <div class="trade_Contract" style=" height:50%;width: 96%;background-color: white;">
                    <div class="trade_div" style="margin-left: 10px;width:25%;margin-top: 4px;">
                        <p>{{td[0].P}}</p>
                    </div>
                    <div class="trade_div" style="width:25%;margin-top: 4px;">
                        <p>{{td[0].Q}}</p>
                    </div>
                    <div class="trade_div" style="width:50%;margin-top: 4px;">
                        <p>{{td[0].T|formatDateTime}}</p>
                    </div>
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
    },
    mounted(){
        this.id=this.$route.query.ID;
        this.getDetail();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
</style>
