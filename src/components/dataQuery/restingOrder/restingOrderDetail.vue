<template>
    <div class="content">
        <header class="myheader">
            <img @click.prevent="back" src="../../../style/mudh/images/back.png" alt="">
            <span>挂单详情</span>
        </header>
        <div id="main" class="main">
            <div class="content_title">
                <span>基本信息</span>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.C}}</span>
                    <span class="span_value">标的代码</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{RESULT.N}}</span>
                    <span class="span_value">标的名称</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.BID}}</span>
                    <span class="span_value">品种代码</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{RESULT.BN}}</span>
                    <span class="span_value">品种名称</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.Q|numFilter}}</span>
                    <span class="span_value">标的数量</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{RESULT.BP}}</span>
                    <span class="span_value">起拍价</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.AP}}</span>
                    <span class="span_value">报警价</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{RESULT.SP}}</span>
                    <span class="span_value">加价幅度</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.MXSP}}</span>
                    <span class="span_value">最高加价幅度</span>
                </div>
            </div>
            <div class="content_title">
                <span>费用信息</span>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.MAA==1?'百分比':'数量'}}</span>
                    <span class="span_value">交易保证金算法</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.MAB|numFilter}}</span>
                    <span class="span_value">交易买保证金系数</span>
                </div>
                <div class="content_line_item_right" style="border-top: 1px solid rgb(239, 239, 237);">
                    <span>{{RESULT.MAS|numFilter}}</span>
                    <span class="span_value">交易卖保证金系数</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.FEA==1?'百分比':'数量'}}</span>
                    <span class="span_value">交易手续费算法</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.FEB|numFilter}}</span>
                    <span class="span_value">交易买手续费系数</span>
                </div>
                <div class="content_line_item_right" style="border-top: 1px solid rgb(239, 239, 237);">
                    <span>{{RESULT.FES|numFilter}}</span>
                    <span class="span_value">交易卖手续费系数</span>
                </div>
            </div>
            <div class="content_title" v-if="DP.length>0">
                <span>标的交收属性</span>
            </div>
            <div class="content_line" v-for="(item,index) in DP" v-if="item.PV!=null&&item.PV!=''&&item.PN!=null&&item.PN!=''">
                <div class="content_line_item_single">
                    <span>{{item.PV}}</span>
                    <span class="span_value">{{item.PN}}</span>
                </div>
            </div>
            <div class="content_title">
                <span>其他信息</span>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.QP}}</span>
                    <span class="span_value">数量精度</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{RESULT.TU|numFilter}}</span>
                    <span class="span_value">交易数量</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.MIQ|numFilter}}</span>
                    <span class="span_value">最小报单数量</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{RESULT.MXQ|numFilter}}</span>
                    <span class="span_value">最大报单数量</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.PQA==1?'百分比':'数量'}}</span>
                    <span class="span_value">流拍量算法</span>
                </div>
                <div class="content_line_item_right">
                    <span>{{RESULT.PQR|numFilter}}</span>
                    <span class="span_value">流拍量比例</span>
                </div>
            </div>
            <div class="content_line">
                <div class="content_line_item_left">
                    <span>{{RESULT.BS==1?'买':'卖'}}</span>
                    <span class="span_value">买卖方向</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'restingOrderDetail',
        computed:{
            firmId(){
                return window.localStorage.getItem('firmId')
            },
            sessionId(){
                return window.localStorage.getItem('sessionId')
            },
            isLogin(){
                return window.localStorage.getItem('isLogin')
            }
        },
        data(){
            return{
                RESULT:"",
                DP:""
            }
        },
        methods: {
            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/'})
                    return false
                } else {
                    this.$router.push({path: '/restingOrder'})
                }
            },
            getDetail(PID,C){
                var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="pending_detail"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI><PID>'+PID+'</PID><C>'+C+'</C></REQ></GNNT>'
                this.$ajax.post('',data)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        this.RESULT=jsonObj.GNNT.REP.RESULT;
                        this.DP=JSON.parse(this.RESULT.DP);
                    }).catch(error => {
                    return;
                })
            }
        },
        filters:{
            numFilter(value) {
                // 截取当前数据到小数点后两位
                let realVal = parseFloat(value).toFixed(2)
                // num.toFixed(2)获取的是字符串
                return parseFloat(realVal)

            }
        },
        created(){
            if (!this.isLogin) {
                this.$router.push({path: '/'})
            }
            if (window.sessionStorage.getItem('PID')==null){
                window.sessionStorage.setItem('PID',this.$route.params.PID)
                window.sessionStorage.setItem('C',this.$route.params.C)
                this.getDetail(this.$route.params.PID,this.$route.params.C)
            } else {
                this.getDetail(window.sessionStorage.getItem('PID'),window.sessionStorage.getItem('C'))
            }
        },
        mounted: function () {
            //原生获取屏幕高度
            var orderHight = document.body.clientHeight
            document.getElementById('main').style.height = orderHight-50 + 'px'
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../../style/mudh/css/common.css";
    @import "../../../style/user/css/common.css";

    .content_title{
        margin: 0 auto;
        width: 94%;
        height: 7%;
        display: flex;
        align-items: center;
    }
    .content_line {
        height: 10%;
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
