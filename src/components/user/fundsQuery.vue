<template>
    <div>
        <div>
            <header class="myheader">
                <a class="left" href="" @click.prevent="back">
                    <img src="../../style/mudh/images/back.png" alt="">
                </a>
                <span style="padding-right: 0.7rem;">资金查询</span>
            </header>
        </div>
        <div class="main">
            <div class="username">交易商代码&nbsp;&nbsp;&nbsp;&nbsp;999984</div>
            <div class="content">
                <div class="content_top">
                    <div class="content_top_title">
                        <div class="content_top_title_img"><img src="../../style/user/images/user.png" alt=""></div>
                        <div class="content_top_title_info">
                            <div class="content_top_title_info_item" style="color:rgb(188,30,45)">0.00</div>
                            <div class="content_top_title_info_item">当前权益</div>
                        </div>
                    </div>
                    <div class="content_top_body">
                        <div class="content_line">
                            <div class="content_line_item">
                                <p>0.00</p>
                                <p>期初余额</p>
                            </div>
                            <div class="content_line_item" style="border-right:0">
                                <p>0.00</p>
                                <p>当前可用资金</p>
                            </div>
                        </div>
                        <div class="content_line">
                            <div class="content_line_item" style="border-bottom:0">
                                <p>0.00</p>
                                <p>期初权益</p>
                            </div>
                            <div class="content_line_item" style="border-right:0;border-bottom:0">
                                <p style="color:rgb(187,110,108)">0.00</p>
                                <p>当前余额</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content_bottom">
                    <div class="content_line">
                        <div class="content_line_item">
                            <p style="color:rgb(187,110,108)">0.00</p>
                            <p>划入资金</p>
                        </div>
                        <div class="content_line_item" style="border-right:0">
                            <p style="color:rgb(188,30,45)">0.00</p>
                            <p>划出资金</p>
                        </div>
                    </div>
                    <div class="content_line">
                        <div class="content_line_item">
                            <p>0.00</p>
                            <p>冻结手续费</p>
                        </div>
                        <div class="content_line_item" style="border-right:0">
                            <p>0.00</p>
                            <p>冻结保证金</p>
                        </div>
                    </div>
                    <div class="content_line">
                        <div class="content_line_item">
                            <p>0.00</p>
                            <p>上日保证金</p>
                        </div>
                        <div class="content_line_item" style="border-right:0">
                            <p>0.00</p>
                            <p>当日保证金</p>
                        </div>
                    </div>
                    <div class="content_line">
                        <div class="content_line_item">
                            <p>0.00</p>
                            <p>当日违约金</p>
                        </div>
                        <div class="content_line_item" style="border-right:0">
                            <p>0.00</p>
                            <p>当日交易手续费</p>
                        </div>
                    </div>
                    <div class="content_line">
                        <div class="content_line_item" style="border-bottom:0">
                            <p>0.00</p>
                            <p>贷款收入</p>
                        </div>
                        <div class="content_line_item" style="border-right:0;border-bottom:0">
                            <p>0.00</p>
                            <p>贷款支出</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'money',

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../style/mudh/css/common.css";
    @import "../../style/user/css/common.css";

    p {
        display: block;
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
    }

    .main {
        margin-top:7vh;
        height: 93vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgb(239, 239, 237);
        font-size: 0.3rem;
    }

    .username {
        width: 100vw;
        height: 6vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        background: rgb(255, 255, 253);
        padding-left: 5vw;
    }

    .content {
        margin-top: 2vh;
        width: 100vw;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content_top {
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgb(255, 255, 253);
    }

    .content_top_title {
        width: 100%;
        height: 8vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid rgb(239, 239, 237);
    }

    .content_top_title_img {
        width: 15%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .content_top_title_img img {
        width: 8vw;
        height: 4vh;
    }

    .content_top_title_info {
        height: 100%;
        width: 82vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .content_top_title_info_item {
        height: 3vh;
        width: 100%;
        text-align: left;
    }

    .content_top_body {
        padding: 1vh 1vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content_line {
        height: 8vh;
        width: 93vw;
        display: flex;
        flex-direction: row;
    }

    .content_line_item {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid rgb(239, 239, 237);
        border-bottom: 1px solid rgb(239, 239, 237);
    }

    .content_bottom {
        margin-top: 2vh;
        height: auto;
        display: flex;
        padding: 2vh 1vw;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgb(255, 255, 253);
    }
</style>
