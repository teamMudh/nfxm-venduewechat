<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p @click.prevent="doSomething">
      9999888889
    </p>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    gettest(){
      var data = '<?xml version="1.0" encoding="GB2312"?><GNNT><REQ name="system_time_query"></REQ></GNNT>'
      this.$ajax.post('',data)
              .then(resp => {
                console.log(resp)
                console.log(resp.data)
                //将服务器获取的xml格式转化为json对象
                var jsonObj = this.$x2js.xml2js(resp.data)
                console.log(jsonObj)
                console.log(jsonObj.GNNT.REP.RESULT.TD)

              }).catch(error => {

        return;
      })
    },
    doSomething(){
      this.$router.push('mymenu');
    }
  },

  created() {
    this.gettest();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
