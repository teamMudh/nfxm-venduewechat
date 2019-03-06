<template>
  <div class="notFounds">
      <header class="myheader">
      <a class="left" href="" @click.prevent="back">
        <img src="../../../style/mudh/images/back.png" alt="">
      </a>
      <span style="padding-right: 0.7rem;">合同查询</span>
    </header>
    <div class="nodata" v-if="isdisplay">
        <div class="nofound">
        <img src="../../../style/zs/images/select.png">
        </div>
        <div class="nofoundp">
        <p>很抱歉，没有找到相关信息</p>
        </div>
    </div>
    <div class="content" v-else>
      <p class="padtop1"></p>
      <section class="sectionContract" v-for="(item,index ) in contractList "  :key="index">
        <div class="titleContract">
            <div class="title_div" style="margin-left: 10px;">
                <p>合同编号</p>
            </div>
            <div class="title_div">
                <p>标的代码</p>
            </div>
            <div class="title_div">
                <p>交易节代码</p>
            </div>
        </div>
        <div class="cantitle">
            <div class="content_div" style="margin-left: 10px;">
                <p>{{item.I}}</p>
            </div>
            <div class="content_div">
                <p>{{item.CI}}</p>
            </div>
            <div class="content_div">
                <p>{{item.SID}}</p>
            </div>
        </div>
        <div class="titleContract" style="margin-left: 10px;">
            <div class="title_div">
                <p>交收方式</p>
            </div>
            <div class="title_div">
                <p>创建时间</p>
            </div>
            <div class="found_div">
                <p @click="gotodetails(item.I)">查看</p>
            </div>
        </div>
        <div class="titleContract">
            <div class="content_div" style="margin-left: 10px;">
                <p>--</p>
            </div>
            <div class="content_div">
                <p  class="title_date">{{item.T|formatDateTime}}</p>
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
            contractList:[
            ],
        }
    },
    methods:{
        getContractList(){
            var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="contract_query"><U>'+this.firmId+'</U><SI>'+this.sessionId+'</SI><PID>1</PID></REQ></GNNT>'
            this.$ajax.post('',data).then(resp => {
                //将服务器获取的xml格式转化为json对象
                var jsonObj = this.$x2js.xml2js(resp.data)
                // console.log(jsonObj)
                var retcode = jsonObj.GNNT.REP.RESULT.RETCODE;
                if(retcode < 0 ||jsonObj.GNNT.REP.RESULTLIST == ''){
                    this.isdisplay = true;
                }
                this.contractList = jsonObj.GNNT.REP.RESULTLIST.REC;
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
        this.getContractList();
    }
}
</script>

<style>
 @import "../../../style/zs/css/zs.css";
    .padtop1 {
        width: 100%;
        padding-top: 1rem;
    }
    .sectionContract{
        background-color: white;
        margin-top: 10px;
    }
    .sectionContract p{
        font-size: 15px;
    }
    .titleContract{
        display: flex;
        width: 90%;
    }
    .cantitle{
        display: flex;
        border-bottom:1px solid #B8B8B8;
        width: 90%;
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
    .found_div{
        width: 15%;
        height: 20px;
        position: absolute;
        border: 2px solid rgb(241,145,56);
        border-radius: 9px;
        margin-left: 6rem;
        margin-top: 8px;
        text-align: center;
        color: rgb(241,145,56);
    }
</style>
