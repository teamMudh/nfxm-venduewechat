<template>
    <div>
        <header class="myheader">
            <a class="left" href="" @click.prevent="back">
                <img src="../../../style/mudh/images/back.png" alt="">
            </a>
            <span style="padding-right: 0.7rem;">提货单列表</span>
        </header>
        <div class="cont">
            <div  v-show="showMsg">
                <div class="nofound">
                    <img src="../../../style/zs/images/select.png">
                </div>
                <div class="nofoundp">
                    <p>很抱歉，没有找到相关信息</p>
                </div>
            </div>
            <div class="info_item" v-for="(billlading,index) in billladingList" :key="billlading.BILL" >
                <div class="info_item_top">
                    <div class="info_item_top_left">
                        <span class="span_name">提货单号</span>
                        <span class="span_value">{{billlading.BILL}}</span>
                    </div>
                    <div class="info_item_top_mid">
                        <span class="span_name">申请数量</span>
                        <span class="span_value">{{billlading.QTY}}</span>
                    </div>
                    <div class="info_item_top_right">
                        <span class="span_name">申请人</span>
                        <span class="span_value">{{billlading.B}}</span>
                    </div>
                </div>
                <div class="info_item_bottom">
                    <div class="info_item_bottom_">
                        <span class="span_name" style=" padding-left: 1%;">审请状态</span>
                        <span class="status" style=" padding-left: 1%;">{{billlading.AS | formatStatusBilllading}}</span>
                    </div>

                    <div class="info_item_bottom_m">
                        <span class="span_name">申请时间</span>
                        <span class="span_value">{{ billlading.AD | formatDateTime }}</span>
                    </div>
                    <div class="info_item_bottom_button">
                        <button @click.prevent="toDetail(billlading.BILL)">查看</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'billApplyList',
        computed:{
            ...mapState(['firmId','isLogin','sessionId'])
        },
        data () {
            return {
                pid:-1,
                showMsg:false,
                billladingList: []
            }
        },
        methods: {
            back() {
                this.$router.push({path: '/dataQuery', query: {pid : this.pid}})
            },
            toDetail(id) {
                console.log(id)
                this.$router.push({ path: '/billApplyDetail', query: { billApplyId: id }});
            },
            billApplyQuery(){
                //var xml = '<?xml version="1.0" encoding = "GB2312"?><GNNT><REQ name="billlading_query"><U>'+this.user+'</U><SI>'+this.sessionId+'</SI><BK></BK></REQ></GNNT>'
                var xml = '<?xml version="1.0" encoding = "GB2312"?><GNNT><REQ name="billlading_query"><U>'+
                    this.firmId+'</U><SI>'+this.sessionId+'</SI><BK></BK></REQ></GNNT>'
                this.$ajax.post('',xml)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        console.log(jsonObj)
                        if(jsonObj.GNNT.REP.RESULT.TC == 1){
                            var arr = []
                            arr.push(jsonObj.GNNT.REP.RESULTLIST.REC)
                            this.billladingList = arr
                        }else{
                            this.billladingList =jsonObj.GNNT.REP.RESULTLIST.REC
                        }

                        if(jsonObj.GNNT.REP.RESULTLIST == ''){
                            this.showMsg = true
                        }

                    }).catch(error => {

                    return;
                })
            }
        },
        created(){
            if (!this.isLogin) {
                this.$router.push({path: '/'})
            }
            this.pid = this.$route.query.pid
            this.billApplyQuery();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../../style/mudh/css/common.css";
    @import "../../../style/user/css/common.css";

    .nofound{
        background-color: rgb(231, 231, 231);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        top: 35%;
        left: 35%;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
    .nofound img{
        width: 50px;
        height: 50px;
        margin-top: 20px;
    }
    .nofound p{
        height: 100%;
    }
    .nofoundp{
        position: absolute;
        top: 50%;
        left: 25%;
        font-size: 17px;
    }


    .cont {
        margin-top: 1.0rem;
        bottom: 0;
        height: 100%;
        width: 100%;
        align-items: center;
        background: rgb(239, 239, 239);
        font-size: 0.3rem;
    }

    .info_item{
        width: 100%;
        height: 2.4rem;
        margin-top: 0.08rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid rgb(239, 239, 239);
        background: rgb(255,255,255);
        font-size: 0.25rem;
        text-align: center;
    }
    .info_item_top{
        width: 95%;
        height: 50%;
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
        height: 50%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .info_item_bottom_{
        width: 32%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .info_item_bottom_m{
        width: 36%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .info_item_bottom_button{
        width: 32%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .info_item_bottom_button button{
        width: 50%;
        height: 50%;
        text-align: center;
        color: rgb(241,145,56);
        border: 2px solid rgb(241,145,56);
        border-radius: 9px;
        background: rgb(255,255,255);
    }
</style>
