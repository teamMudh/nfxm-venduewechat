<template>
    <div class="content">
        <header class="myheader">
            <img @click.prevent="back" src="../../../style/mudh/images/back.png" alt="">
            <span>挂单查询</span>
        </header>
        <div id="main" class="main">
            <div class="nodata"  v-if="REC.length==0">
                <div class="nofound">
                    <img src="../../../style/zs/images/select.png">
                </div>
                <div class="nofoundp">
                    <p>很抱歉，没有找到相关信息</p>
                </div>
            </div>
            <div v-if="REC.length!=0" v-for="(item,index) in REC" class="info_item" :key="index">
                <div class="info_item_top">
                    <div class="info_item_top_left">
                        <span class="span_name">标的代码</span>
                        <span class="span_value">{{item.C}}</span>
                    </div>
                    <div class="info_item_top_mid">
                        <span class="span_name">标的名称</span>
                        <span class="span_value">{{item.N}}</span>
                    </div>
                    <div class="info_item_top_right">
                        <span class="span_name">标的数量</span>
                        <span class="span_value">{{item.Q}}</span>
                    </div>
                </div>
                <div class="info_item_top">
                    <div class="info_item_top_left">
                        <span class="span_name">交易状态</span>
                        <span class="status">{{SMAP[item.S]}}</span>
                    </div>
                    <div class="info_item_top_mid">
                        <span class="span_name">交易权限</span>
                        <span class="span_value">{{AMAP[item.A]}}</span>
                    </div>
                    <div class="info_item_top_right">
                        <span class="span_name">流拍量</span>
                        <span class="span_value">{{item.PQ}}</span>
                    </div>
                </div>
                <div class="info_item_bottom">
                    <div class="info_item_bottom_">
                        <span class="span_name">第一次挂标日期</span>
                        <span class="span_value">{{item.CT | formatDate}}</span>
                    </div>
                    <div class="info_item_bottom_">
                        <span class="span_name">创建时间</span>
                        <span class="span_value">{{item.CT | formatDates}}</span>
                    </div>
                    <div class="info_item_bottom_button">
                        <button @click.prevent="nav(index)">查看</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'restingOrder',
        computed:{
            ...mapState(['firmId','isLogin','sessionId'])
        },
        data(){
            return{
                REC:[],
                SMAP:{//交易状态
                    1:'未成交',
                    2:'全部成交',
                    3:'部分成交',
                    4:'已流拍'
                },
                AMAP:{//权限
                    0:'全权',
                    1:'指定客户有权',
                    2:'指定客户无权'
                }
            }
        },
        mounted: function () {
            //原生获取屏幕高度
            var orderHight = document.body.clientHeight
            console.log(document.getElementById('main'))
            document.getElementById('main').style.height = orderHight-50 + 'px'
        },
        methods: {
            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/'})
                    return false
                } else {
                    this.$router.push({path: '/dataQuery'})
                }
            },
            getRestingOrder(){
                var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="pending_query"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI><PID>-1</PID></REQ></GNNT>'
                this.$ajax.post('',data)
                .then(resp => {
                    //将服务器获取的xml格式转化为json对象
                    var jsonObj = this.$x2js.xml2js(resp.data)
                    this.REC=jsonObj.GNNT.REP.RESULTLIST.REC;
                }).catch(error => {
                    return;
                })
            },
            nav(id) {
                this.$router.push({name:'restingOrderDetail',params:{PID:this.REC[id].PID,C:this.REC[id].C}});
            }
        },
        filters:{
            formatDate: function (value) {
                let date = new Date(parseInt(value));
                console.log(date)
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + MM + '-' + d;
            },
            formatDates: function (value) {
                let date = new Date(parseInt(value));
                console.log(date)
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '/' + MM + '/' + d + '    ' + h + ':' + m + ':' + s;
            }
        },
        created(){
            console.log("登录状态"+this.isLogin)
            if (!this.isLogin) {
                this.$router.push({path: '/'})
            }
            this.getRestingOrder();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../../style/mudh/css/common.css";
    @import "../../../style/user/css/common.css";

    /*.info_{*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        /*color: rgb(218,216,216);*/
    /*}*/
    /*.info_img{*/
        /*width: 20%;*/
        /*height: 12%;*/
        /*display: flex;*/
        /*margin-top: 40%;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*border-radius: 100%;*/
        /*background: rgb(218,216,216);*/
        /*margin-bottom: 3%;*/
    /*}*/
    /*.info_img img{*/
        /*height: 50%;*/
        /*width: 50%;*/
    /*}*/
    .nofound{

        background-color: #DAD8D9;
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
        color: #FFFFFF;
        height: 100%;
    }
    .nofoundp{
        margin-top: 3%;
        position: absolute;
        top: 50%;
        left: 25%;
        font-size: 17px;
        color: rgb(163, 160, 160);
    }
    .info_item{
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 4px solid rgb(239, 239, 239);
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
        width: 33%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .info_item_bottom_button{
        width: 33%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .info_item_bottom_button button{
        width: 50%;
        height: 40%;
        text-align: center;
        color: rgb(241,145,56);
        border: 2px solid rgb(241,145,56);
        border-radius: 9px;
        background: rgb(255,255,255);
    }
</style>
