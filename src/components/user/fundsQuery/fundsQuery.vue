<template>
    <div class="content">
        <header class="myheader">
            <img @click.prevent="back" src="../../../style/mudh/images/back.png" alt="">
            <span style="padding-right: 0.7rem;">资金查询</span>
        </header>
        <div id="main" class="main">
            <div class="username">交易商代码&nbsp;&nbsp;&nbsp;&nbsp;{{result.B}}</div>
            <div class="contentc">
                <div class="content_top">
                    <div class="content_top_title">
                        <div class="content_top_title_img"><img src="../../../style/user/images/funds.png" alt=""></div>
                        <div class="content_top_title_info">
                            <div class="content_top_title_info_item" style="color:rgb(188,30,45)">{{result.EQT}}</div>
                            <div class="content_top_title_info_item">当前权益</div>
                        </div>
                    </div>
                    <div class="content_top_body">
                        <div class="content_line">
                            <div class="content_line_item">
                                <span>{{result.IF}}</span>
                                <span>期初余额</span>
                            </div>
                            <div class="content_line_item" style="border-right:0">
                                <span>{{result.UF}}</span>
                                <span>当前可用资金</span>
                            </div>
                        </div>
                        <div class="content_line">
                            <div class="content_line_item" style="border-bottom:0">
                                <span>{{result.IQT}}</span>
                                <span>期初权益</span>
                            </div>
                            <div class="content_line_item" style="border-right:0;border-bottom:0">
                                <span style="color:rgb(187,110,108)">{{result.EF}}</span>
                                <span>当前余额</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content_bottom">
                    <div class="content_line">
                        <div class="content_line_item">
                            <span style="color:rgb(187,110,108)">{{result.TI}}</span>
                            <span>划入资金</span>
                        </div>
                        <div class="content_line_item" style="border-right:0">
                            <span style="color:rgb(188,30,45)">{{result.TO}}</span>
                            <span>划出资金</span>
                        </div>
                    </div>
                    <div class="content_line">
                        <div class="content_line_item">
                            <span>{{result.FF}}</span>
                            <span>冻结手续费</span>
                        </div>
                        <div class="content_line_item" style="border-right:0">
                            <span>{{result.FM}}</span>
                            <span>冻结保证金</span>
                        </div>
                    </div>
                    <div class="content_line">
                        <div class="content_line_item">
                            <span>{{result.CM}}</span>
                            <span>上日保证金</span>
                        </div>
                        <div class="content_line_item" style="border-right:0">
                            <span>{{result.RM}}</span>
                            <span>当日保证金</span>
                        </div>
                    </div>
                    <div class="content_line">
                        <div class="content_line_item">
                            <span>{{result.RB}}</span>
                            <span>当日违约金</span>
                        </div>
                        <div class="content_line_item" style="border-right:0">
                            <span>{{result.TF}}</span>
                            <span>当日交易手续费</span>
                        </div>
                    </div>
                    <div class="content_line">
                        <div class="content_line_item" style="border-bottom:0">
                            <span>{{result.PI}}</span>
                            <span>贷款收入</span>
                        </div>
                        <div class="content_line_item" style="border-right:0;border-bottom:0">
                            <span>{{result.PO}}</span>
                            <span>贷款支出</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'fundsQuery',
        computed:{
            ...mapState(['firmId','isLogin','sessionId'])
        },
        data(){
            return{
                result:''
            }
        },
        mounted: function () {
            //原生获取屏幕高度
            var orderHight = document.body.clientHeight
            document.getElementById('main').style.height = orderHight-50 + 'px'
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
            getFunds(){
                var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="fund_info_query"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI></REQ></GNNT>'
                this.$ajax.post('',data)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        this.result=jsonObj.GNNT.REP.RESULT;
                    }).catch(error => {
                    return;
                })
            }
        },
        created(){
            if (!this.isLogin) {
                this.$router.push({path: '/'})
            }
            this.getFunds();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../../style/mudh/css/common.css";
    @import "../../../style/user/css/common.css";

    .username {
        width: 95%;
        height: 8%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        background: rgb(255, 255, 253);
        padding-left: 5%;
    }

    .contentc {
        margin-top: 3%;
        width: 100%;
        height: 87%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content_top {
        height: 30%;
        width: 96%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgb(255, 255, 253);
    }

    .content_top_title {
        height: 30%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid rgb(239, 239, 237);
    }

    .content_top_title_img {
        width: 15%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .content_top_title_img img {
        width: 75%;
        height: 80%;
    }

    .content_top_title_info {
        height: 100%;
        width: 82%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .content_top_title_info_item {
        height: 50%;
        width: 100%;
        text-align: left;
    }

    .content_top_body {
        width: 96%;
        height: 66%;
        padding: 2% 2%;
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

    .content_bottom {
        width: 94%;
        margin-top: 2%;
        height: 48%;
        display: flex;
        padding: 2% 1%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgb(255, 255, 253);
    }
</style>
