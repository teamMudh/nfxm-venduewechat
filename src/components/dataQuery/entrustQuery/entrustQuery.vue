<template>
  <div class="content">
    <header class="myheader">
        <img @click.prevent="back" src="../../../style/mudh/images/back.png" alt="">
        <span style="padding-right: 0.7rem;">委托查询</span>
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
        <div  v-else>
        <section class="entrustContract" v-for="(item,index ) in entrustList ">
            <div class="titleContract">
                <div class="title_div" style="margin-left: 10px;">
                    <p>标的代码</p>
                </div>
                <div class="title_div">
                    <p>委托价格</p>
                </div>
                <div class="title_div">
                    <p>委托数量</p>
                </div>
            </div>
            <div class="cantitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p>{{item.C}}</p>
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
                    <p>冻结保证金</p>
                </div>
                <div class="title_div">
                    <p>释放保证金</p>
                </div>
                <div class="title_div">
                    <p>有效数量</p>
                </div>
            </div>
            <div class="cantitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p>{{item.FM}}</p>
                </div>
                <div class="content_div">
                    <p>{{item.RM}}</p>
                </div>
                <div class="content_div">
                    <p>{{item.Q}}</p>
                </div>
            </div>
            <div class="titleContract">
                <div class="title_div" style="margin-left: 10px;">
                    <p>冻结手续费</p>
                </div>
                <div class="title_div">
                    <p>释放手续费</p>
                </div>
                <div class="title_div">
                    <p>状态</p>
                </div>
            </div>
            <div class="cantitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p>{{item.FF}}</p>
                </div>
                <div class="content_div">
                    <p>{{item.RF}}</p>
                </div>
                <div class="content_div">
                    <p style="color: rgb(241,145,56);" v-if="item.S==1">已委托</p>
                    <p style="color: rgb(241,145,56);" v-if="item.S==2">部分成交</p>
                    <p style="color: rgb(241,145,56);" v-if="item.S==3">全部成交</p>
                    <p style="color: rgb(241,145,56);" v-if="item.S==4">全部撤单</p>
                    <p style="color: rgb(241,145,56);" v-if="item.S==5">部分撤单</p>
                </div>
            </div>
            <div class="titleContract">
                <div class="title_div" style="margin-left: 10px;">
                    <p>委托单号</p>
                </div>
                <div class="title_div">
                    <p>委托时间</p>
                </div>
            </div>
            <div class="cantitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p>{{item.ON}}</p>
                </div>
                <div class="content_div">
                    <p  style="width: 150%;">{{item.OT|formatDateTime}}</p>
                </div>
            </div>
            <div class="titleContract">
                <div class="title_div" style="margin-left: 10px;">
                    <p>修改时间</p>
                </div>
            </div>
            <div class="canTimetitle">
                <div class="content_div" style="margin-left: 10px;">
                    <p style="width: 150%;">{{item.MT|formatDateTime}}</p>
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
        ...mapState(['firmId','isLogin','sessionId'])
    },
    data () {
        return {
            isdisplay:false,
            entrustList:[
            //     {
            //    'ON':105,
            //    'C':10,
            //    'CI':5,
            //    'P':16,
            //    'Q':5000,
            //    'EQ':'2016-05-01 10.20.11',
            //    'OT':'2016-05-01 10.20.11',
            //    'MT':'2016-05-01 10.20.11',
            //    'FM':1.55,
            //    'FF':10.05,
            //    'RM':16.99,
            //    'RF':6.01,
            //    'S':'全部撤单',
            //    'WTF':'交易撤单',
            //    'WTI':'2016-05-01 10.20.11',
            // },{
            //  'ON':105,
            //    'C':10,
            //    'CI':5,
            //    'P':16,
            //    'Q':5000,
            //    'EQ':'2016-05-01 10.20.11',
            //    'OT':'2016-05-01 10.20.11',
            //    'MT':'2016-05-01 10.20.11',
            //    'FM':1.55,
            //    'FF':10.05,
            //    'RM':16.99,
            //    'RF':6.01,
            //    'S':'全部撤单',
            //    'WTF':'交易撤单',
            //    'WTI':'2016-05-01 10.20.11',
            // },{
            //   'ON':105,
            //    'C':10,
            //    'CI':5,
            //    'P':16,
            //    'Q':5000,
            //    'EQ':'2016-05-01 10.20.11',
            //    'OT':'2016-05-01 10.20.11',
            //    'MT':'2016-05-01 10.20.11',
            //    'FM':1.55,
            //    'FF':10.05,
            //    'RM':16.99,
            //    'RF':6.01,
            //    'S':'全部撤单',
            //    'WTF':'交易撤单',
            //    'WTI':'2016-05-01 10.20.11',
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
        getEntrustList(){
            var timestamp = Date.parse(new Date())
            var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="order_query"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI><PID>1</PID><TI>'+timestamp+'</TI></REQ></GNNT>'
            this.$ajax.post('',data).then(resp => {
                //将服务器获取的xml格式转化为json对象
                var jsonObj = this.$x2js.xml2js(resp.data)
                console.log(jsonObj)
                var retcode = jsonObj.GNNT.REP.RESULT.RETCODE;
                if(retcode < 0 ||jsonObj.GNNT.REP.RESULTLIST == ''){
                    this.isdisplay = true;
                }
                this.entrustList = jsonObj.GNNT.REP.RESULTLIST.REC;
                if(this.entrustList.length <= 0 ||this.entrustList ==undefined || this.entrustList == ''){
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
      this.getEntrustList();
    }
}
</script>

<style>
 @import "../../../style/zs/css/zs.css";
    .entrustContract{
        background-color: white;
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
