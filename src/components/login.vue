<template>
    <div class="content">
        <header class="myheader">
            <span>登录</span>
        </header>
        <div class="main">
            <div class="form_user" style="margin-top: 6%">
                <img class="form_user_img" src="../style/user/images/user.png"/>
                <input v-model="userId" class="form_user_input" name="userId" type="text" placeholder="请输入交易账号/用户名"/>
                <img v-if="userId!=''" class="form_user_cancel" @click.prevent="userId=''" src="../style/user/images/cancel.png"/>
            </div>
            <div class="form_user"><img class="form_user_img" src="../style/user/images/password.png"/>
                <input v-model="password" name="password" class="form_user_input" type="password" placeholder="请输入交易密码"/>
                <img v-if="password!=''" class="form_user_cancel" @click.prevent="password=''" src="../style/user/images/cancel.png"/>
            </div>

            <div class="form_code">
                <div class="form_code_left">
                    <img class="form_code_left_img" src="../style/user/images/verificationcode.png">
                    <input v-model="msg_code" class="form_code_left_input" name="msgcode" type="text" placeholder="验证码">
                    <img v-if="msg_code!=''" class="form_code_left_cancel" @click.prevent="msg_code=''" src="../style/user/images/cancel.png"/>
                </div>
                <div class="form_code_right"><p @click.prevent="getvcode">{{code}}</p></div>
            </div>
            <v-dialog v-show="showDialog" :show="showDialog" v-on:change="change($event)" :dialog-option="dialogOption" ref="dialog"></v-dialog>
            <div class="button" @click="submit">登录</div>
        </div>
    </div>
</template>

<script>

    import dialog from '@/components/user/dialog/Dialog'
    import {mapState} from 'vuex';

    export default {
        name: 'login',
        components:{
          'v-dialog':dialog
        },
        computed:{
            ...mapState(['firmId','isLogin'])
        },
        data() {
            return {
                userId:"",
                password: "",
                msg_code: "",
                code:"",
                showDialog: false,
                dialogOption: {
                    title: '提示',
                    text: '',
                    cancelButtonText: '取消',
                    confirmButtonText: '确定'
                }
            }
        },
        methods: {
            change(msg){
                this.showDialog=msg;
            },
            confirm() {
            },
            submit() {
                if (this.userId==""){
                    this.dialogOption.text="请输入用户名"
                    this.showDialog=true
                    return;
                }else if(this.password==""){
                    this.dialogOption.text="请输入密码"
                    this.showDialog=true
                    return;
                }else if(this.msg_code==""){
                    this.dialogOption.text="请输入验证码"
                    this.showDialog=true
                    return;
                }else if (this.msg_code!=this.code){
                    this.getvcode();
                    this.dialogOption.text="验证码错误，请重新输入"
                    this.showDialog=true
                    return;
                }
                var that=this;
                var data = '<?xml version="1.0" encoding="GB2312"?><MEBS_MOBILE><REQ name="user_logon"><U>'+this.userId+'</U><PASSWORD>'+this.password+'</PASSWORD></REQ></MEBS_MOBILE>'
                this.$ajax.post('',data)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        if (jsonObj.GNNT.REP.RESULT.RETCODE>=0){
                            that.$store.commit('RECORD_USERINFO',{'firmId':jsonObj.GNNT.REP.RESULT.U,'sessionId':jsonObj.GNNT.REP.RESULT.RETCODE})
                            that.$store.commit('IS_LOGIN',true)
                            that.$router.push({path: '/user'})
                        } else {
                            that.dialogOption.text="用户名或密码错误"
                            that.showDialog=true
                            that.getvcode();
                            return;
                        }
                    }).catch(error => {
                    return;
                })
            },
            getvcode(){//获取验证码
                var data = '<?xml version="1.0" encoding="GB2312"?><MEBS_MOBILE><REQ name="getvcode"></REQ></MEBS_MOBILE>'
                this.$ajax.post('',data)
                    .then(resp => {
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        if (jsonObj.GNNT.REP.RESULT.RETCODE>=0){
                            if (jsonObj.GNNT.REP.RESULT.NUM<=999){
                                this.code='0'+jsonObj.GNNT.REP.RESULT.NUM
                            }else {
                                this.code=""+jsonObj.GNNT.REP.RESULT.NUM
                            }
                        }
                    }).catch(error => {
                    return;
                })
            },
        },
        created() {
            this.getvcode();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../style/mudh/css/common.css";
    @import "../style/user/css/common.css";

    .form_user {
        display: flex;
        flex-direction: row;
        width: 90%;
        height: 6%;
        align-items: center;
        justify-content: center;
        margin-top: 1%;
        border: 1px solid rgb(216, 214, 214);
        border-radius: 8px;
        background: rgb(255, 255, 255);
    }

    .form_user_img {
        height: 60%;
        width: 7%;
        margin-left: 4%;
    }

    .form_user_input {
        margin-left: 2%;
        margin-right: 2%;
        flex: 1;
        font-size: 0.3rem;
        border: 0px;
    }
    .form_user_cancel{
        height: 50%;
        width: 6%;
        margin-right: 2%;
    }

    .form_code {
        width: 100%;
        height: 6%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 1%;
    }

    .form_code_left {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: 1px solid rgb(216, 214, 214);
        border-radius: 8px;
        background: rgb(255, 255, 255);
    }

    .form_code_left_img {
        margin-left: 7%;
        height: 60%;
        width: 13%;
        background: rgb(255, 255, 255);
    }

    .form_code_left_input {
        width: 82%;
        font-size: 0.3rem;
        border: 0px;
        margin-left: 2%;
    }

    .form_code_left_cancel{
        height: 50%;
        width: 11%;
        margin-right: 3%;
    }

    input::-webkit-input-placeholder {
        color: rgb(191, 191, 191);
        font-size: 0.3rem;
    }

    .form_code_right {
        width: 35%;
        height: 100%;
        margin-left: 4%;
        background: rgb(255, 255, 255);
        border-radius: 8px;
        border: 1px solid rgb(216, 214, 214);
        line-height: 1;
        font-size: 0.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.2rem;
    }
</style>
