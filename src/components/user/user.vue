<template>
    <div style="height: 100%;width: 100%;overflow: hidden">
        <div>
            <header class="myheader">
                <a class="left" href="" @click.prevent="back">
                    <img src="../../style/mudh/images/back.png" alt="">
                </a>
                <span style="padding-right: 0.7rem;">我的</span>
            </header>
        </div>
        <div class="main">
            <div class="query_item" @click.prevent="nav('/fundsQuery')">
                <span>资金查询</span>
                <img src="../../style/zs/images/right.png">
            </div>
            <div class="query_item" @click.prevent="nav('/debitFundsQuery')">
                <span>出入金查询</span>
                <img src="../../style/zs/images/right.png">
            </div>
            <div class="button" @click.prevent="logout">退出登录</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'user',
        computed:{
            ...mapState(['firmId','isLogin','sessionId'])
        },
        methods:{
            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/'})
                    return false
                } else {
                    this.$router.push({path: '/user'})
                }
            },
            nav(name){
                this.$router.push({path:name})
            },
            logout(){
                var that=this;
                var data = '<?xml version="1.0" encoding="GB2312"?><MEBS_MOBILE><REQ name="user_logout"><U>'+this.firmId+'</U><S_I>'+this.sessionId+'</S_I></REQ></MEBS_MOBILE>'
                this.$ajax.post('',data)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        if (jsonObj.GNNT.REP.RESULT.RETCODE>=0){
                            that.$store.commit('RECORD_USERINFO',{'firmId':"",'sessionId':""})
                            that.$store.commit('IS_LOGIN',false)
                            that.$router.push({path: '/'})
                        } else {
                            return;
                        }
                    }).catch(error => {
                    return;
                })
            }
        },
        created(){
            console.log(this.isLogin+"  "+this.firmId)
            if (!this.isLogin) {
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../style/mudh/css/common.css";
    @import "../../style/user/css/common.css";
    
    .query_item{
        height: 7%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: rgb(255,255,255);
        margin-top: 3%;
    }
    .query_item img{
        width: 6%;
        height: 45%;
    }
    .query_item span{
        width: 85%;
    }
</style>
