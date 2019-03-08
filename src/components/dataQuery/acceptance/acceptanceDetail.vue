<template>
    <div>
        <header class="myheader">
            <img src="../../../style/mudh/images/back.png" alt=""  @click.prevent="back">
            <span style="padding-right: 0.7rem;">验收单详情</span>
        </header>
        <div class="cont">
            <div class="info_header" >
                <span class="span_value">基本信息</span>
            </div>
            <div class="info_item" >
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.AC}}</span>
                        <span class="span_td">合同编号</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.CI}}</span>
                        <span class="span_td">标的号</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.BD}}</span>
                        <span class="span_td">品种</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.CQTY}}</span>
                        <span class="span_td">合同数量</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.TP}}</span>
                        <span class="span_td" >成交价格</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.P}}</span>
                        <span class="span_td" >金额</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.AQTY}}</span>
                        <span class="span_td" >验收数量</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.AP}}</span>
                        <span class="span_td" >验收价格</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.AA}}</span>
                        <span class="span_td" >验收金额</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.DP | formatNull }}</span>
                        <span class="span_td" >交收地点</span>
                    </div>
                </div>
            </div>

            <div class="info_header" >
                <span class="span_value">买方信息</span>
            </div>
            <div class="info_item" >
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.BB | formatNull }}</span>
                        <span class="span_td">买方会员</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.BN | formatNull }}</span>
                        <span class="span_td" >联系人</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.BM | formatNull }}</span>
                        <span class="span_td">联系电话</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.BBS | formatNull }}</span>
                        <span class="span_td">开户行</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.BA | formatNull }}</span>
                        <span class="span_td" >开户行账号</span>
                    </div>
                </div>
            </div>


           <div class="info_header" >
                <span class="span_value">卖方信息</span>
            </div>
            <div class="info_item" >
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.SB | formatNull }}</span>
                        <span class="span_td">卖方会员</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.SN | formatNull }}</span>
                        <span class="span_td" >联系人</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.SM | formatNull }}</span>
                        <span class="span_td">联系电话</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{acceptance.SBS | formatNull }}</span>
                        <span class="span_td">开户行</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{acceptance.SA | formatNull }}</span>
                        <span class="span_td" >开户行账号</span>
                    </div>
                </div>
            </div>

            <div class="info_header" >
            </div>
        </div>
    </div>
    
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "acceptanceDetail",
        computed:{
            ...mapState(['firmId','isLogin','sessionId'])
        },
        data(){
            return {
                acceptance:{},
            }
        },
        methods:{
            acceptanceDetail(id){
                var xml = '<?xml version="1.0" encoding = "GB2312"?><GNNT><REQ name="acceptance_detail"><U>'+
                    this.firmId+'</U><SI>'+this.sessionId+'</SI><AS>'+id+'</AS></REQ></GNNT>'
                this.$ajax.post('',xml)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        if(jsonObj.GNNT.REP.RESULT.RETCODE == 0){
                            this.acceptance = jsonObj.GNNT.REP.RESULT
                        }
                        console.log(this.acceptance )
                    }).catch(error => {

                    return;
                })

            },
            back(){
                this.$router.push('acceptanceList');
            }
        },
        created(){
            if (!this.isLogin) {
                this.$router.push({path: '/'})
            }
            this.acceptanceDetail(this.$route.query.id);
        }
    }
</script>

<style scoped>
    @import "../../../style/mudh/css/common.css";
    @import "../../../style/user/css/common.css";

    .info_header{
        height: 0.9rem;
        font-size: 0.35rem;
        line-height: 0.9rem;
        padding-left: 0.3rem;
        padding-top: 0.1rem;
        text-align: left;
    }

    .cont {
        margin-top: 0.9rem;
        bottom: 0;
        width: 100%;
        align-items: center;
        background: rgb(239, 239, 239);
        font-size: 0.3rem;
    }

    .info_item{
        width: 96%;
        margin-top: 0.08rem;
        margin-left: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid rgb(239, 239, 239);
        background: rgb(255,255,255);
        font-size: 0.25rem;
        line-height: 0.45rem;
        text-align: center;
    }
    .info_item_top{
        width: 100%;
        height: 1.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgb(239, 239, 239);
    }


    .info_item_td{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid rgb(239, 239, 239);
    }

    .span_th{
        padding-top: 0.1rem;
        color: black;
    }

    .span_td{
        color: rgb(125, 131, 147);
    }

</style>