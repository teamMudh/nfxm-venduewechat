<template>
  <div class="content">
    <header class="myheader">
        <img @click.prevent="back" src="../../../style/mudh/images/back.png" alt="">
        <span style="padding-right: 0.7rem;">成交查询</span>
    </header>
    <div id="main" class="main">
        <div class="nodata"  v-if="isdisplay">
            <div class="nofound">
            <img src="../../../style/zs/images/select.png">
            </div>
            <div class="nofoundp">
            <p>很抱歉，没有找到相关信息</p>
            </div>
        </div>
        <div v-else>
        <section class="entrustContract" v-for="(item,index ) in tradeList " :key="index">
            <div class="titleContract">
                <div class="title_div" style="margin-left: 10px;">
                    <p>标的代码</p>
                </div>
                <div class="title_div">
                    <p>成交价</p>
                </div>
                <div class="title_div">
                    <p>成交数量</p>
                </div>
            </div>
            <div class="cantitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p>{{item.CI}}</p>
                </div>
                <div class="content_div">
                    <p>{{item.P}}</p>
                </div>
                <div class="content_div">
                    <p>{{item.Q}}</p>
                </div>
            </div>
            <div class="titleContract">
                <div class="title_div" style="margin-left: 10px;">
                    <p>保证金</p>
                </div>
                <div class="title_div">
                    <p>手续费</p>
                </div>
                <div class="title_div">
                    <p>对方用户代码</p>
                </div>
            </div>
            <div class="cantitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p>{{item.MA}}</p>
                </div>
                <div class="content_div">
                    <p>{{item.FE}}</p>
                </div>
                <div class="content_div">
                    <p>{{item.OB}}</p>
                </div>
            </div>
            <div class="titleContract">
                <div class="title_div" style="margin-left: 10px;">
                    <p>委托单号</p>
                </div>
                <div class="title_div">
                    <p>交易节代码</p>
                </div>
                <div class="title_div">
                    <p>对方用户类型</p>
                </div>
            </div>
            <div class="cantitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p>{{item.ON}}</p>
                </div>
                <div class="content_div">
                    <p>{{item.SID}}</p>
                </div>
                <div class="content_div">
                    <p v-if="item.OBT==0">客户</p>
                    <p v-if="item.OBT==1">会员</p>
                    <p v-if="item.OBT==2">经纪人</p>
                </div>
            </div>
            <div class="titleContract">
                <div class="title_div" style="margin-left: 10px;">
                    <p>成交号</p>
                </div>
                <div class="title_div">
                    <p>成交时间</p>
                </div>
            </div>
            <div class="canTimetitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p>{{item.TN}}</p>
                </div>
                <div class="content_div">
                    <p  style="width: 150%;">{{item.T}}</p>
                </div>
            </div>
            <p class="buttomp"></p>
        </section>
        </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['firmId','isLogin','sessionId','pid'])
    },
    data () {
        return {
            isdisplay:false,
            tradeList:[
            //     {
            //    'TN':105,
            //    'ON':10,
            //    'SID':5,
            //    'C':16,
            //    'CI':1005,
            //    'P':50,
            //    'Q':501,
            //    'T':'2016-05-01 10.20.11',
            //    'MA':1.55,
            //    'FE':10.05,
            //    'OB':10016,
            //    'OBT':'经纪人',
            // }, {
            //    'TN':105,
            //    'ON':10,
            //    'SID':5,
            //    'C':16,
            //    'CI':1005,
            //    'P':50,
            //    'Q':501,
            //    'T':'2016-05-01 10.20.11',
            //    'MA':1.55,
            //    'FE':10.05,
            //    'OB':10016,
            //    'OBT':'经纪人',
            // }, {
            //    'TN':105,
            //    'ON':10,
            //    'SID':5,
            //    'C':16,
            //    'CI':1005,
            //    'P':50,
            //    'Q':501,
            //    'T':'2016-05-01 10.20.11',
            //    'MA':1.55,
            //    'FE':10.05,
            //    'OB':10016,
            //    'OBT':'经纪人',
            // }, {
            //    'TN':105,
            //    'ON':10,
            //    'SID':5,
            //    'C':16,
            //    'CI':1005,
            //    'P':50,
            //    'Q':501,
            //    'T':'2016-05-01 10.20.11',
            //    'MA':1.55,
            //    'FE':10.05,
            //    'OB':10016,
            //    'OBT':'经纪人',
            // }, {
            //    'TN':105,
            //    'ON':10,
            //    'SID':5,
            //    'C':16,
            //    'CI':1005,
            //    'P':50,
            //    'Q':501,
            //    'T':'2016-05-01 10.20.11',
            //    'MA':1.55,
            //    'FE':10.05,
            //    'OB':10016,
            //    'OBT':'经纪人',
            // }
            ],
        }
    },
    mounted: function () {
        //原生获取屏幕高度
        var orderHight = document.body.clientHeight
        console.log(document.getElementById('main'))
        document.getElementById('main').style.height = orderHight-50 + 'px'
    },
    methods:{
        getTradeList(){
            var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="trade_query"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI><PID>'+this.pid+'</PID><LTI>0</LTI><RECCNT>1</RECCNT></REQ></GNNT>'
            this.$ajax.post('',data).then(resp => {
                //将服务器获取的xml格式转化为json对象
                var jsonObj = this.$x2js.xml2js(resp.data)
                // console.log(jsonObj)
                var retcode = jsonObj.GNNT.REP.RESULT.RETCODE;
                if(retcode < 0 ||jsonObj.GNNT.REP.RESULTLIST == ''){
                    this.isdisplay = true;
                }
                this.tradeList = jsonObj.GNNT.REP.RESULTLIST.REC;
                if(this.tradeList.length <= 0 ||this.tradeList ==undefined || this.tradeList == ''){
                    this.isdisplay = true;
                }
              }).catch(error => {
            return;
            })
        }, 
        back() {
        history.go(-1);
      },
    },
    created() {
        if (!this.isLogin) {
            this.$router.push({path: '/'})
        }
      this.getTradeList();
    }
}
</script>

<style>
    
 @import "../../../style/zs/css/zs.css";
    .padtop1 {
        width: 100%;
        padding-top: 1rem;
    }
    .entrustContract{
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 5px solid rgb(239, 239, 239);
    }
    .entrustContract p{
        font-size: 0.25rem;
        line-height: 0.6rem;
    }
    .titleContract{
        display: flex;
        width: 95%;
        height: 0.5rem;
    }
    .cantitle{
        display: flex;
        border-bottom:1px solid #B8B8B8;
        width: 95%;
        height: 0.5rem;
    }
    .canTimetitle{
        display: flex;
        width: 95%;
    }
    .title_div{
        width: 33%;
        color: #ABABAB;
    }
    .content_div{
        width: 33%;
        color: #383838;
    }
    .title_date{
        width: 4rem;
    }
 
</style>
