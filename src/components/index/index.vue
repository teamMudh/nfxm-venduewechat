<template>
    <div >
        <div>
        <header class="myheader">
            <router-link :to="{path: 'user'}" tag="a" class="left">
                <img src="../../style/mudh/images/mine.png" alt="">
            </router-link>
            <span style="padding-right: 0rem;">待交易标的清单</span>
            <a @click.prevent="toSerach()"  class="right">
                查询
            </a>
        </header>
        <div style="clear: both;"></div>
        <div class="gray"></div>
        <div v-show="showMsg">
            <div class="nofound">
                <img src="../../style/zs/images/select.png">
            </div>
            <div class="nofoundp">
                <p>很抱歉，没有找到相关信息</p>
            </div>
        </div>
        <div v-show="list2.length > 0">
            <div class="weui-tab">
                <tab  active-color='#4a93d7'>
                    <tab-item class="vux-center fontsize17" :selected="index == 0" v-for="(item, index) in list2"
                              @on-item-click="commodity_query(item,'')" :key="index" >第{{item}}交易节</tab-item>
                </tab>
            </div>
            <div class="List">
                <div class="info_item" @click.prevent="toDetail(commodity)"  v-for="commodity in commodityList" :key="commodity.C">
                    <div class="info_item_top">
                        <div class="info_item_top_td">
                            <span class="span_name">标的代码</span>
                            <span class="span_value">{{commodity.C}}</span>
                        </div>
                        <div class="info_item_top_td">
                            <span class="span_name">数量</span>
                            <span class="span_value">{{commodity.Q | formatNumber }}</span>
                        </div>
                        <div class="info_item_top_td">
                            <span class="span_name">起拍价</span>
                            <span class="span_value">{{commodity.BP}}</span>
                        </div>
                    </div>
                    <div class="info_item_top" v-show="commodity.DP.length > 0" v-for="(dlvrpropArry,index) in commodity.DP" :key="index">
                        <div class="info_item_top_td"  v-for="(dlvrprop) in dlvrpropArry" :key="dlvrprop.PI">
                            <span class="span_name">{{dlvrprop.PN}}</span>
                            <span class="span_value">{{dlvrprop.PV}}</span>
                        </div>
                        <div class="info_item_top_td" v-if="dlvrpropArry.length <3" v-for="n in 3 - dlvrpropArry.length" >
                            <span class="span_name"></span>
                            <span class="span_value"></span>
                        </div>
                    </div>

                    <div class="info_item_top" v-show="commodity.DDP.length > 0" v-for="dlvrprop in commodity.DDP" >
                        <div class="info_item_top_td"  >
                            <span class="span_th">{{dlvrprop.PN}}</span>
                            <span class="span_td">{{dlvrprop.PV}}</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="weui-tabbar" id="tabbar">
            <a class="weui-tabbar__item " @click.prevent="untrade_dlvrprop_query(plate.PID)"  v-for="plate in plateList" :key="plate.PID" :id="forId(plate.PID)">
                <div name="icon" class="weui-tabbar__icon" v-show="true">
                    <img :src="iconUrl[plate.TM].icon" class="img">
                </div>
                <div name="active" class="weui-tabbar__icon" v-show="false">
                    <img :src="iconUrl[plate.TM].iconactive" class="img">
                </div>
                <p class="weui-tabbar__label weui-tabbar-color"><span>{{plate.PN}}</span> </p>
            </a>
        </div>
    </div>
     <div id="detail">
         <div class="mask" @click.prevent="closemask()"></div>
         <div class="detailcon">
            <header class="detailHeader">
                <a  class="right" @click.prevent="closemask()">关闭</a>
                <span style="padding-left: 0.7rem;">标的详情</span>
            </header>
             <div class="cont">
                 <div class="info_header" >
                     <span class="span_value">标的详情</span>
                 </div>
                 <div class="info_item" >
                    <div class="info_item_top" >
                        <div class="info_item_top_td"  >
                            <span class="span_name">品种名称</span>
                            <span class="span_value">{{commodityDetail.BN}}</span>
                        </div>
                        <div class="info_item_top_td"  >
                            <span class="span_name">起拍价</span>
                            <span class="span_value">{{commodityDetail.BP}}</span>
                        </div>
                        <div class="info_item_top_td"  >
                            <span class="span_name">报警价</span>
                            <span class="span_value">{{commodityDetail.AP}}</span>
                        </div>
                    </div>
                    <div class="info_item_top" >
                        <div class="info_item_top_td"  >
                            <span class="span_name">标的数量</span>
                            <span class="span_value">{{commodityDetail.Q | formatNumber}}</span>
                        </div>
                        <div class="info_item_top_td"  >
                            <span class="span_name">最小变动数量</span>
                            <span class="span_value">{{commodityDetail.TU | formatNumber}}</span>
                        </div>
                        <div class="info_item_top_td"  >
                            <span class="span_name">最小报单数量</span>
                            <span class="span_value">{{commodityDetail.MIQ | formatNumber}}</span>
                        </div>
                    </div>
                    <div class="info_item_top" >
                        <div class="info_item_top_td"  >
                            <span class="span_name">加价幅度</span>
                            <span class="span_value">{{commodityDetail.SP}}</span>
                        </div>
                        <div class="info_item_top_td"  >
                            <span class="span_name">最高加价幅度</span>
                            <span class="span_value">{{commodityDetail.BP}}</span>
                        </div>
                        <div class="info_item_top_td"  >
                            <span class="span_name">最大报单数量</span>
                            <span class="span_value">{{commodityDetail.MXSP}}</span>
                        </div>
                    </div>
                     <div class="info_item_top" >
                         <div class="info_item_top_td"  >
                             <span class="span_name">手续费率</span>
                             <span class="span_value" id="fee"></span>
                         </div>
                         <div class="info_item_top_td"  >
                             <span class="span_name">交易保证金</span>
                             <span class="span_value" id="bond"></span>
                         </div>
                         <div class="info_item_top_td"  >
                             <span class="span_name"></span>
                             <span class="span_value"></span>
                         </div>
                     </div>
                 </div>


                     <div class="info_header" v-show="commoditydp.length > 0  ||commodityddp.length > 0">
                         <span class="span_value">商品属性</span>
                     </div>
                     <div class="info_item" v-show="commoditydp.length > 0  || commodityddp.length > 0">
                         <div class="info_item_top" v-show="commoditydp.length > 0" v-for="(dlvrpropArry,index) in commoditydp" :key="index">
                             <div class="info_item_top_td"  v-for="(dlvrprop) in dlvrpropArry" :key="dlvrprop.PI">
                                 <span class="span_name">{{dlvrprop.PN}}</span>
                                 <span class="span_value">{{dlvrprop.PV}}</span>
                             </div>
                             <div class="info_item_top_td" v-if="dlvrpropArry.length <3" v-for="n in 3 - dlvrpropArry.length" >
                                 <span class="span_name"></span>
                                 <span class="span_value"></span>
                             </div>
                         </div>

                         <div class="info_item_top" v-show="commodityddp.length > 0" v-for="dlvrprop in commodityddp" >
                             <div class="info_item_top_td"  >
                                 <span class="span_th">{{dlvrprop.PN}}</span>
                                 <span class="span_td">{{dlvrprop.PV}}</span>
                             </div>
                         </div>

                     </div>
                 </div>
              </div>
        </div>
    </div>


</template>

<script>
    import { Tabbar, TabbarItem,Tab, TabItem} from 'vux'

    export default {
        name: "index",
        components: {
            Tabbar,
            TabbarItem,
            Tab,
            TabItem,
        },
        data () {
            return {
                showMsg:false,
                plateList:{},
                list2: [],
                pidSelete:0,
                sidSelete:0,
                commodityList:{},
                msg:'',
                commodityDetail:{},
                commoditydp:[],
                commodityddp:[],
                iconUrl: {
                    1: {
                        icon:require("../../style/mudh/images/buy-.png") ,
                        iconactive:require("../../style/mudh/images/buy.png")
                    },
                    2: {
                        icon:require("../../style/mudh/images/sell-.png"),
                        iconactive:require("../../style/mudh/images/sell.png")
                    },
                    3: {
                        icon:require("../../style/mudh/images/tender-.png"),
                        iconactive:require("../../style/mudh/images/tender.png")
                    },
                }
            }
        },
        methods:{
            closemask(){
                this.commodityddp = []
                this.commoditydp = []
                this.commodityDetail = {},
                $("#detail").hide();
            },
            forId(index){
                return "forid_" +index
            },
            plate_config_query(pid){
                var xml = '<?xml version="1.0" encoding ="GB2312"?><GNNT><REQ name="plate_config_query"><PID>'
                    + pid + '</PID></REQ></GNNT>';

                this.$ajax.post('',xml)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        console.log(jsonObj.GNNT.REP)
                        if(jsonObj.GNNT.REP.RESULT.RETCODE == 0){
                            var plate1 = jsonObj.GNNT.REP.RESULTLIST.REC[0]
                            var plate2 = jsonObj.GNNT.REP.RESULTLIST.REC[1]
                            this.plateList = jsonObj.GNNT.REP.RESULTLIST.REC
                            this.pidSelete = pid == '' ?  plate1.PID : pid
                        }
                    }).catch(error => {
                    return;

                })
            },
            untrade_dlvrprop_query(pid){

                $("#tabbar  [name='active']").hide();
                $("#tabbar  [name='icon']").show();
                $("#tabbar  p").removeClass("weui-tabbar-color_active").addClass("weui-tabbar-color");
                $("#forid_"+pid+" [name='icon']").hide();
                $("#forid_"+pid+" [name='active']").show();
                $("#forid_"+pid+" p").removeClass("weui-tabbar-color").addClass("weui-tabbar-color_active");

                this.pidSelete = pid
                console.log('untrade_dlvrprop_query'+pid)
                var xml = '<?xml version="1.0" encoding ="GB2312"?><GNNT><REQ name="untrade_dlvrprop_query"><PID>'
                    + pid + '</PID></REQ></GNNT>';

                this.$ajax.post('',xml)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        console.log(jsonObj.GNNT.REP.RESULT)
                        if(jsonObj.GNNT.REP.RESULT.SID){
                            console.log('untrade_dlvrprop_query success')
                            var sidList = []
                            console.log(jsonObj.GNNT.REP.RESULT.SID.split(','))
                            this.list2 = jsonObj.GNNT.REP.RESULT.SID.split(',')
                            this.commodity_query(this.list2[0],'')
                            this.showMsg = false
                        }else{
                            this.list2 =[]
                            this.commodityList ={}
                            this.showMsg = true
                        }

                    }).catch(error => {

                    return;
                })
            },
            commodity_query(sid,code){
                // console.log('commodity_query start')
                if(sid!=null && sid != ''){
                    this.sidSelete = sid
                }else{
                    sid = this.sidSelete
                }
                var xml = '<?xml version="1.0" encoding = "GB2312"?><GNNT><REQ name="commodity_query"><PID>'
                    + this.pidSelete + '</PID><SID>' + sid + '</SID><C>' + code + '</C></REQ></GNNT>';
                this.$ajax.post('',xml)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        // console.log(jsonObj.GNNT.REP.RESULTLIST)
                        if(jsonObj.GNNT.REP.RESULT.TC > 0){
                            console.log(jsonObj.GNNT.REP.RESULTLIST.REC)
                            var arr = []
                            if(jsonObj.GNNT.REP.RESULT.TC == 1){
                                var obj = jsonObj.GNNT.REP.RESULTLIST.REC
                                if(obj.DP !=null && obj.DP != ''){
                                    //将dp转为二维数组

                                    // obj.DP=JSON.parse(obj.DP)
                                    obj.DP=this.toTwodimenArray(JSON.parse(obj.DP))
                                }
                                if(obj.DDP != null && obj.DDP != ''){
                                    obj.DDP = JSON.parse(obj.DDP)
                                }
                                arr.push(obj)
                            }else{
                                jsonObj.GNNT.REP.RESULTLIST.REC.forEach(obj=> {
                                    if(obj.DP !=null && obj.DP != ''){
                                         // console.log(JSON.parse(obj.DP))
                                        // console.log(JSON.parse(obj.DP)[1])
                                         // console.log(this.toTwodimenArray(JSON.parse(obj.DP)))
                                        obj.DP=this.toTwodimenArray(JSON.parse(obj.DP))
                                    }
                                    if(obj.DDP != null && obj.DDP != ''){
                                        obj.DDP = JSON.parse(obj.DDP)
                                    }
                                        arr.push(obj)
                                    }
                                )

                            }
                            this.commodityList = arr
                            // console.log(this.commodityList)
                        }

                    }).catch(error => {

                    return;
                })
            },
            toTwodimenArray(arr){
                var a = 0
                var j = 0
                var arrCopy = []
                var arr2=[]
                for (var i=0; i<arr.length; i++) {
                    arr2[j] = arr[i]
                    j ++
                    arrCopy[a] = arr2
                    if( (i+1)% 3 == 0){
                        arr2 = []
                        a = a+1
                        j = 0
                    }
                }
                return arrCopy
            },
            toDetail(obj){
                $("#detail").show();

                this.commodityDetail = obj
                if(obj.DP){
                    this.commoditydp = obj.DP
                }
                if(obj.DDP){
                    this.commodityddp = obj.DDP
                }
                var fee,bond
                if(obj.BS == 1 ){ //B  判断买卖方向
                    if(obj.MAA == 1){   //判断保证金算法(1-按百分比，2-按数量)
                        var num = parseFloat(obj.MAB)*100
                        bond = num.toFixed(2) + '%'
                    }else{
                        bond = parseFloat(obj.MAB).toFixed(2)
                    }

                    if(obj.FEA == 1 ){ //判断手续费算法(1-按百分比，2-按数量)
                        var num = parseFloat(obj.FEB)*100
                        fee = num.toFixed(2) + '%'
                    }else{
                        fee = parseFloat(obj.FEB).toFixed(2)
                    }
                }else{//S判断买卖方向
                    if(obj.MAAS == 1){   //判断保证金算法(1-按百分比，2-按数量)
                        var num = parseFloat(obj.MAS)*100
                        bond = num.toFixed(2) + '%'
                    }else{
                        bond = parseFloat(obj.MAS).toFixed(2)
                    }

                    if(obj.FEAS == 1 ){ //判断手续费算法(1-按百分比，2-按数量)
                        var num = parseFloat(obj.FES)*100
                        fee = num.toFixed(2) + '%'
                    }else{
                        fee = parseFloat(obj.FES).toFixed(2)
                    }
                }

                $("#fee").html(fee)
                $("#bond").html(bond)
            },
            toSerach(){
                this.$store.commit('RECORD_PID',this.pidSelete)
                this.$router.push({path: '/dataQuery'})
            }


        },
        watch: {
            plateList: function () {
                var _this = this;
                _this.$nextTick(function () {
                    this.untrade_dlvrprop_query(this.pidSelete)
              });
            }
         },
        created() {
            this.plate_config_query("");
        }
    }
</script>

<style scoped>
    @import "../../style/mudh/css/mudh.css";
    @import "../../style/user/css/common.css";
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

    .List{
        margin-top: 0.9rem;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgb(239, 239, 239);
        font-size: 0.3rem;
        margin-bottom: 1.0rem;
        overflow-x: scroll;
    }

    .info_item{
        width: 100%;
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
        height: 1.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgb(239, 239, 239);
    }
    .info_item_top_td{
        flex: 1;
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
        height: 50%;
        text-align: center;
        color: rgb(241,145,56);
        border: 2px solid rgb(241,145,56);
        border-radius: 9px;
        background: rgb(255,255,255);
    }

    .span_th{
        color: black;
        text-align: left;
        padding-left: 0.65rem;
    }

    .span_td{
        color: rgb(125, 131, 147);
        text-align: left;
        padding-left: 0.65rem;
    }



    #detail {
        z-index:9999;
        display:none;
        position:fixed;
        top     : 0;
        left    : 0;
        bottom  : 0;
        right   : 0;
    }
    .info_header{
        height: 0.8rem;
        font-size: 0.35rem;
        line-height: 0.9rem;
        padding-left: 0.5rem;
        text-align: left;
        background-color: rgb(239, 239, 239);
    }

</style>