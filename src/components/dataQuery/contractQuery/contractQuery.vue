<template>
  <div class="content">
    <header class="myheader">
        <img @click.prevent="back" src="../../../style/mudh/images/back.png" alt="">
      <span style="padding-right: 0.7rem;">合同查询</span>
    </header>
    <div id="main" class="main">
        <div class="nodata" v-if="isdisplay">
            <div class="nofound_head">
                <div class="nofound">
                <img src="../../../style/zs/images/select.png">
                </div>
            </div>
            <div class="nofoundp">
            <p>很抱歉，没有找到相关信息</p>
            </div>
        </div>
        <div class="info_item" v-for="(item,index ) in contractList "  :key="index" v-else>
            <div class="info_item_top">
                <div class="info_item_top_left" >
                    <span class="span_name">合同编号</span>
                    <span class="span_value" style="white-space: nowrap; color: black;margin-top: 0.1rem;">{{item.I}}</span>
                </div>
                <div class="info_item_top_mid">
                    <span class="span_name">标的代码</span>
                    <span class="span_value" style="white-space: nowrap; color: black;margin-top: 0.1rem;">{{item.CI}}</span>
                </div>
                <div class="info_item_top_right">
                    <span class="span_name">交易节代码</span>
                    <span class="span_value" style="white-space: nowrap; color: black;margin-top: 0.1rem;">{{item.SID}}</span>
                </div>
            </div>
            <div class="info_item_bottom">
                <div class="info_item_bottom_">
                    <span class="span_name">交收方式</span>
                    <span class="span_value" style="white-space: nowrap; color: black;margin-top: 0.1rem;">--</span>
                </div>
                <div class="info_item_bottom_">
                    <span class="span_name">创建时间</span>
                    <span class="span_value" style="white-space: nowrap; color: black;margin-top: 0.1rem;">{{item.T | formatDateTime}}</span>
                </div>
                <div class="info_item_bottom_button">
                    <button @click.prevent="gotodetails(item.I)">查看</button>
                </div>
            </div>
            </div>
            <p class="buttomp"></p>
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
            contractList:[
            ],
        }
    },
    mounted: function () {
        //原生获取屏幕高度
        var orderHight = document.body.clientHeight
        document.getElementById('main').style.height = orderHight-50 + 'px'
    },
    methods:{
        getContractList(){
            var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="contract_query"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI><PID>'+this.pid+'</PID></REQ></GNNT>'
            this.$ajax.post('',data).then(resp => {
                //将服务器获取的xml格式转化为json对象
                var jsonObj = this.$x2js.xml2js(resp.data)
                 console.log(jsonObj)
                var retcode = jsonObj.GNNT.REP.RESULT.RETCODE;
                if(retcode < 0 ||jsonObj.GNNT.REP.RESULTLIST == ''){
                    this.isdisplay = true;
                }
                if(jsonObj.GNNT.REP.RESULT.TC == 1){
                    var arr = []
                    arr.push(jsonObj.GNNT.REP.RESULTLIST.REC)
                    this.contractList = arr
                }else{
                    this.contractList =jsonObj.GNNT.REP.RESULTLIST.REC
                }
                if(this.contractList.length <= 0 ||this.contractList ==undefined || this.contractList == ''){
                    this.isdisplay = true;
                }
              }).catch(error => {
            return;
            })
        },
        //查看详情
        gotodetails(id){
             this.$router.push({
                path: '/contractDetails',
                query: {
                ID: id,
                }
            });
        },
        //返回
        back() {
        history.back();
      },
    },
    created() {
        if (!this.isLogin) {
            this.$router.push({path: '/'})
        }
        this.getContractList();
    }
}
</script>

<style>
 @import "../../../style/zs/css/zs.css";
    .info_item{
        width: 100%;
        height: 20%;
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
        align-items:center;
    }
    .info_item_top_mid{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
    }

    .info_item_top_right{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
    }
    .info_item_bottom{
        width: 95%;
        height: 50%;
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
        align-items:center;
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
    .span_name {
        color: rgb(125, 131, 147);
    }

    span {
        margin-bottom: 2px;
    }
</style>
