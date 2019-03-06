<template>
  <div class="notFounds">
      <header class="myheader">
      <a class="left" href="" @click.prevent="back">
        <img src="../../../style/mudh/images/back.png" alt="">
      </a>
      <span style="padding-right: 0.7rem;">成交查询</span>
    </header>
    <div class="nodata"  v-if="isdisplay">
        <div class="nofound">
        <img src="../../../style/zs/images/select.png">
        </div>
        <div class="nofoundp">
        <p>很抱歉，没有找到相关信息</p>
        </div>
    </div>
    <div class="content" v-else>
      <p class="padtop1"></p>
      <section class="entrustContract" v-for="(item,index ) in tradeList ">
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
                <p  style="width: 150%;">{{item.T|formatDateTime}}</p>
            </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['firmId','isLogin','sessionId'])
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
            // },{
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
    methods:{
        getTradeList(){
            var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="trade_query"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI><PID>1</PID><LTI>0</LTI><RECCNT>1</RECCNT></REQ></GNNT>'
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
        margin-top: 10px;
    }
    .entrustContract p{
        font-size: 15px;
    }
    .titleContract{
        display: flex;
        width: 100%;
    }
    .cantitle{
        display: flex;
        border-bottom:1px solid #B8B8B8;
        width: 100%;
    }
    .canTimetitle{
        display: flex;
        width: 100%;
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
