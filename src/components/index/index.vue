<template>
    <div>
        <header class="myheader">
            <router-link :to="{path: 'tocontainer/person', query: {flag : 4}}" tag="a" class="left">
                <img src="../../style/mudh/images/mine.png" alt="">
            </router-link>
            <router-link :to="{path: 'dataQuery', query: {flag : 4}}" tag="a" class="right">
                查询
            </router-link>
            <span style="padding-right: 0rem;">待交易标的清单</span>
        </header>
        <div style="clear: both;"></div>
        <div class="gray"></div>
        <div v-show="list2.length > 0">
            <tab  active-color='#4a93d7' >
                <tab-item class="vux-center fontsize17" :selected="index == 0" v-for="(item, index) in list2"
                          @on-item-click="commodity_query(item,'')" :key="index" >第{{item}}交易节</tab-item>
            </tab>
            <div class="List">
                <div class="info_item"  v-for="commodity in commodityList" :key="commodity.C">
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


        <tabbar>
            <tabbar-item  selected @on-item-click="untrade_dlvrprop_query(tabbar1)">
                <img slot="icon" src="../../style/mudh/images/buy-.png">
                <img slot="icon-active" src="../../style/mudh/images/buy.png">
                <span slot="label">{{tabbar1name}}</span>
            </tabbar-item>
            <tabbar-item @on-item-click="untrade_dlvrprop_query(tabbar2)">
                <img slot="icon" src="../../style/mudh/images/sell-.png">
                <img slot="icon-active" src="../../style/mudh/images/sell.png">
                <span slot="label">{{tabbar2name}}</span>
            </tabbar-item>
        </tabbar>

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
                tabbar1:1,
                tabbar1name:'竞价采购',
                tabbar2:2,
                tabbar2name:'竞价销售',
                list2: [],
                dlvrpropList:['含糖量','蛋白质','P'],
                pidSelete:0,
                sidSelete:0,
                commodityList:{},
                msg:'',
            }
        },
        methods:{
            plate_config_query(pid){
                console.log(this.dlvrpropList.indexOf('P'));
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
                            this.tabbar1 = plate1.PID
                            this.tabbar1name = plate1.PN
                            this.tabbar2 = plate2.PID
                            this.tabbar2name = plate2.PN
                            this.untrade_dlvrprop_query(pid == '' ?  this.tabbar1 : pid)
                        }
                    }).catch(error => {

                    return;
                })
            },
            untrade_dlvrprop_query(pid){
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
                        }else{
                            this.list2 =[]
                            this.commodityList ={}
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
            commodity_detail(code){
                console.log('commodity_detail '+ code)
                this.$router.push({
                    name: 'commoditydetail',
                    params: {
                        pid :  this.pidSelete,
                        sid : this.sidSelete ,
                        code: code
                    }
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

    .List{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgb(239, 239, 239);
        font-size: 0.3rem;
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

</style>