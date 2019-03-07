<template>
    <div>
        <header class="myheader">
            <a class="left" href="" @click.prevent="back">
                <img src="../../../style/mudh/images/back.png" alt="">
            </a>
            <span style="padding-right: 0.7rem;">提货单详情</span>
        </header>
        <div class="cont">
            <div class="info_header" >
                <span class="span_value">基本信息</span>
            </div>
            <div class="info_item" >
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.I}}</span>
                        <span class="span_td">合同编号</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.CI}}</span>
                        <span class="span_td">标的号</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.QTY}}</span>
                        <span class="span_td">提货数量</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th" >{{billapply.AD | formatDateTime}}</span>
                        <span class="span_td" >提货时间</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{billapply.DP | formatNull}}</span>
                        <span class="span_td" >交收地点</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{billapply.RC | formatNull }}</span>
                        <span class="span_td" >提货码</span>
                    </div>
                </div>
            </div>

            <div class="info_header" >
                <span class="span_value">买方信息</span>
            </div>
            <div class="info_item" >
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.BB | formatNull }}</span>
                        <span class="span_td">买方会员</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.BF | formatNull }}</span>
                        <span class="span_td">交易代码</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{billapply.BN | formatNull }}</span>
                        <span class="span_td" >联系人</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.BM | formatNull }}</span>
                        <span class="span_td">联系电话</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{billapply.BC | formatNull }}</span>
                        <span class="span_td" >身份证编号</span>
                    </div>
                </div>
            </div>

           <div class="info_header" >
                <span class="span_value">卖方信息</span>
            </div>
            <div class="info_item" >
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.SB | formatNull }}</span>
                        <span class="span_td">卖方会员</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.SF | formatNull }}</span>
                        <span class="span_td">交易代码</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{billapply.SN | formatNull }}</span>
                        <span class="span_td" >联系人</span>
                    </div>
                    <div class="info_item_td">
                        <span class="span_th">{{billapply.SM | formatNull }}</span>
                        <span class="span_td">联系电话</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_td">
                        <span class="span_th" >{{billapply.SC | formatNull }}</span>
                        <span class="span_td" >身份证编号</span>
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
        name: "billApplyDetail",
        computed:{
            ...mapState(['firmId','isLogin','sessionId'])
        },
        data(){
            return {
                billapply:{},
            }
        },
        methods:{
            billapplyDetail(billApplyId){
                var xml = '<?xml version="1.0" encoding = "GB2312"?><GNNT><REQ name="billlading_detail"><U>'+
                    this.firmId+'</U><SI>'+this.sessionId+'</SI><BK>'+billApplyId+'</BK></REQ></GNNT>'
                this.$ajax.post('',xml)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        if(jsonObj.GNNT.REP.RESULT.RETCODE == 0){
                            this.billapply = jsonObj.GNNT.REP.RESULT
                        }
                        console.log(this.billapply )
                    }).catch(error => {

                    return;
                })

            },
            back(){
                this.$router.push('billApplyList');
            }
        },
        created(){
            if (!this.isLogin) {
                this.$router.push({path: '/'})
            }
            this.billapplyDetail(this.$route.query.billApplyId);
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