<template>
    <div class="content">
        <header class="myheader">
            <span>登录</span>
        </header>
        <div class="main">
            <div class="form_user" style="margin-top: 6%">
                <img class="form_user_img" src="../style/user/images/user.png"/>
                <input v-model="username" class="form_user_input" name="username" type="text" placeholder="请输入交易账号/用户名"/>
                <img v-if="username!=''" class="form_user_cancel" @click.prevent="username=''" src="../style/user/images/cancel.png"/>
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
                <div class="form_code_right"><p @click.prevent="gettest">{{msg_code!=''?msg_code:'验证码'}}</p></div>
            </div>

            <div class="button" @click="submit">登录</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                username: "",
                password: "",
                msg_code: ""
            }
        },
        methods: {
            submit() {

            },
            gettest(){
                    var data = '<?xml version="1.0" encoding="GB2312"?><MEBS_MOBILE><REQ name="getnum"><U>11222222222211</U></REQ></MEBS_MOBILE>'
                this.$ajax.post('',data)
                    .then(resp => {
                        console.log(resp)
                        console.log(resp.data)
                        //将服务器获取的xml格式转化为json对象
                        var jsonObj = this.$x2js.xml2js(resp.data)
                        console.log(jsonObj)
                        console.log(jsonObj)

                    }).catch(error => {

                    return;
                })
            },
        },
        created() {
            this.gettest();
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
