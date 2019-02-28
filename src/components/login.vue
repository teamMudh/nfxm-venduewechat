<template>
    <div style="height: 100%;width: 100%;background: yellow;overflow: hidden">
        <header class="myheader">
            <span>登录</span>
        </header>
        <div class="main">
            <div class="form_user" style="margin-top: 6%">
                <img class="form_user_img" src="../style/user/images/user.png"/>
                <input v-model="username" class="form_user_input" name="username" type="text"
                       placeholder="请输入交易账号/用户名"/>
            </div>

            <div class="form_user"><img class="form_user_img" src="../style/user/images/password.png"/><input
                    v-model="password" name="password" class="form_user_input" type="password" placeholder="请输入交易密码"/>
            </div>

            <div class="form_code">
                <div class="form_code_left">
                    <img class="form_code_left_img" src="../style/user/images/verificationcode.png"><input
                        v-model="msg_code" class="form_code_left_input" name="msgcode" type="text" placeholder="验证码">
                </div>
                <div class="form_code_right"><img class="form_code_right_img" src="../style/user/images/logo.png"></div>
            </div>

            <div class="button" @click="submit">登录</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data: {
            username: "",
            password: "",
            msg_code: ""
        },
        methods: {
            submit() {

            }
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
        margin-left: 8%;
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

    input::-webkit-input-placeholder {
        color: rgb(191, 191, 191);
        font-size: 0.3rem;
    }

    .form_code_right {
        width: 35%;
        height: 100%;
        margin-left: 4%;
        background: rgb(255, 255, 255);
    }

    .form_code_right_img {
        border: 1px solid rgb(216, 214, 214);
        border-radius: 8px;
        height: 100%;
        width: 100%;
    }
</style>
